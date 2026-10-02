import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";

/* Meyve Patlat! — bulut backend (cloud save + liderlik + klan)
   Oyun client'ı POST {base}/{ep} çağırır; ep = register|login|guest|save|load|scores|clan|ping
   Yanıt sözleşmeleri game.html içindeki Api.mock ile birebir uyumludur. */

type Progress = {
  unlocked?: number;
  stars?: Record<string, number>;
  best?: Record<string, number>;
  gold?: number;
};

const hashPass = (pass: string) => {
  const salt = crypto.randomBytes(12).toString("hex");
  const h = crypto.scryptSync(pass, salt, 32).toString("hex");
  return salt + ":" + h;
};
const verifyPass = (pass: string, stored: string | null) => {
  if (!stored || !stored.includes(":")) return false;
  const [salt, h] = stored.split(":");
  const c = crypto.scryptSync(pass, salt, 32).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(h, "hex"), Buffer.from(c, "hex"));
};
const tok = () => "tk_" + crypto.randomBytes(12).toString("hex");

const starSum = (stars: Progress["stars"]) =>
  stars && typeof stars === "object"
    ? Object.values(stars).reduce((a: number, b) => a + (Number(b) || 0), 0)
    : 0;

const parseProgress = (raw: string | null | undefined): Progress | null => {
  if (!raw || raw === "{}") return null;
  try {
    return JSON.parse(raw) as Progress;
  } catch {
    return null;
  }
};

async function playerFromToken(token: unknown) {
  if (typeof token !== "string" || !token) return null;
  const ses = await db.session.findUnique({
    where: { token },
    include: { player: true },
  });
  return ses ? ses.player : null;
}

const publicUser = (p: { email: string | null; name: string; avatar: number }) => ({
  email: p.email,
  name: p.name,
  avatar: p.avatar,
});

const clanPayload = async (clanId: string, meId: string) => {
  const clan = await db.clan.findUnique({
    where: { id: clanId },
    include: { players: true, chat: { orderBy: { ts: "desc" }, take: 30 } },
  });
  if (!clan) return null;
  return {
    name: clan.name,
    members: clan.players
      .map((m) => ({
        name: m.name,
        stars: m.totalStars,
        av: m.avatar,
        you: m.id === meId,
      }))
      .sort((a, b) => b.stars - a.stars),
    chat: clan.chat
      .reverse()
      .map((c) => ({ n: c.n, m: c.m, ts: c.ts.getTime() })),
  };
};

export async function POST(
  req: Request,
  ctx: { params: Promise<{ ep: string }> }
) {
  const { ep } = await ctx.params;
  let b: Record<string, unknown> = {};
  try {
    b = await req.json();
  } catch {
    /* gövde opsiyonel */
  }

  try {
    /* ---------- PING ---------- */
    if (ep === "ping") return NextResponse.json({ ok: true });

    /* ---------- KAYIT ---------- */
    if (ep === "register") {
      const email = String(b.email || "").toLowerCase().trim();
      const pass = String(b.pass || "");
      const name = String(b.name || "").trim().slice(0, 18) || "Oyuncu";
      const avatar = Number(b.avatar) || 0;
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
        return NextResponse.json({ ok: false, error: "badMail" });
      if (pass.length < 4)
        return NextResponse.json({ ok: false, error: "shortPass" });
      const exists = await db.player.findUnique({ where: { email } });
      if (exists) return NextResponse.json({ ok: false, error: "exists" });
      const progress: Progress = { unlocked: 1, stars: {}, best: {}, gold: 0 };
      const p = await db.player.create({
        data: {
          email,
          passHash: hashPass(pass),
          name,
          avatar,
          progress: JSON.stringify(progress),
          totalStars: 0,
        },
      });
      const token = tok();
      await db.session.create({ data: { token, playerId: p.id } });
      return NextResponse.json({
        ok: true,
        token,
        user: publicUser(p),
        progress,
      });
    }

    /* ---------- GİRİŞ ---------- */
    if (ep === "login") {
      const email = String(b.email || "").toLowerCase().trim();
      const pass = String(b.pass || "");
      const p = await db.player.findUnique({ where: { email } });
      if (!p || !p.passHash)
        return NextResponse.json({ ok: false, error: "noUser" });
      if (!verifyPass(pass, p.passHash))
        return NextResponse.json({ ok: false, error: "wrongPass" });
      const token = tok();
      await db.session.create({ data: { token, playerId: p.id } });
      return NextResponse.json({
        ok: true,
        token,
        user: publicUser(p),
        progress: parseProgress(p.progress),
      });
    }

    /* ---------- MİSAFİR ---------- */
    if (ep === "guest") {
      const name = String(b.name || "Oyuncu").slice(0, 18);
      const avatar = Number(b.avatar) || 0;
      const p = await db.player.create({
        data: { name, avatar, progress: "{}", totalStars: 0 },
      });
      const token = tok();
      await db.session.create({ data: { token, playerId: p.id } });
      // Mock sözleşmesi: misafirde progress null — yerel kayıt korunur, kazançlar buluta yazılır
      return NextResponse.json({
        ok: true,
        token,
        user: { email: null, name, avatar },
        progress: null,
      });
    }

    /* ---------- KAYDET ---------- */
    if (ep === "save") {
      const p = await playerFromToken(b.token);
      if (!p) return NextResponse.json({ ok: false, error: "auth" });
      const pr = (b.progress || {}) as Progress;
      await db.player.update({
        where: { id: p.id },
        data: {
          progress: JSON.stringify(pr),
          totalStars: starSum(pr.stars),
        },
      });
      return NextResponse.json({ ok: true });
    }

    /* ---------- YÜKLE ---------- */
    if (ep === "load") {
      const p = await playerFromToken(b.token);
      if (!p) return NextResponse.json({ ok: true, progress: null });
      return NextResponse.json({
        ok: true,
        progress: parseProgress(p.progress),
      });
    }

    /* ---------- LİDERLİK TABLOSU ---------- */
    if (ep === "scores") {
      const p = await playerFromToken(b.token);
      if (!p) return NextResponse.json({ ok: true, list: [] });
      const stars = Math.max(0, Number(b.stars) || 0);
      await db.player.update({
        where: { id: p.id },
        data: {
          name: String(b.name || p.name).slice(0, 18),
          avatar: Number.isFinite(Number(b.avatar)) ? Number(b.avatar) : p.avatar,
          totalStars: Math.max(p.totalStars, stars),
        },
      });
      const top = await db.player.findMany({
        where: { id: { not: p.id }, totalStars: { gt: 0 } },
        orderBy: { totalStars: "desc" },
        take: 50,
        include: { clan: true },
      });
      return NextResponse.json({
        ok: true,
        list: top.map((t) => ({
          name: t.name,
          stars: t.totalStars,
          av: t.avatar,
          clan: t.clan ? t.clan.name : undefined,
        })),
      });
    }

    /* ---------- KLAN ---------- */
    if (ep === "clan") {
      const p = await playerFromToken(b.token);
      if (!p) return NextResponse.json({ ok: false, error: "auth" });
      const action = String(b.action || "");

      if (action === "create") {
        const name = String(b.name || "").trim().slice(0, 18);
        if (name.length < 2)
          return NextResponse.json({ ok: false, error: "needField" });
        const taken = await db.clan.findUnique({ where: { name } });
        if (taken) return NextResponse.json({ ok: false, error: "clanTaken" });
        const clan = await db.clan.create({
          data: { name, ownerId: p.id },
        });
        await db.player.update({
          where: { id: p.id },
          data: { clanId: clan.id },
        });
        await db.clanChat.create({
          data: {
            clanId: clan.id,
            playerId: p.id,
            n: "Sistem",
            m: "Klan kuruldu! Hoş geldin " + p.name + "!",
          },
        });
        const payload = await clanPayload(clan.id, p.id);
        return NextResponse.json({ ok: true, clan: payload });
      }

      if (action === "leave") {
        if (!p.clanId) return NextResponse.json({ ok: true });
        const clan = await db.clan.findUnique({
          where: { id: p.clanId },
          include: { players: true },
        });
        await db.player.update({
          where: { id: p.id },
          data: { clanId: null },
        });
        if (clan) {
          const rest = clan.players.filter((m) => m.id !== p.id);
          if (rest.length === 0) {
            await db.clanChat.deleteMany({ where: { clanId: clan.id } });
            await db.clan.delete({ where: { id: clan.id } });
          } else if (clan.ownerId === p.id) {
            await db.clan.update({
              where: { id: clan.id },
              data: { ownerId: rest[0].id },
            });
          }
        }
        return NextResponse.json({ ok: true });
      }

      if (action === "chat") {
        if (!p.clanId)
          return NextResponse.json({ ok: false, error: "noClan" });
        const msg = String(b.msg || "").trim().slice(0, 140);
        if (msg)
          await db.clanChat.create({
            data: { clanId: p.clanId, playerId: p.id, n: p.name, m: msg },
          });
        const payload = await clanPayload(p.clanId, p.id);
        return NextResponse.json({ ok: true, clan: payload });
      }

      if (action === "info") {
        if (!p.clanId) return NextResponse.json({ ok: true, clan: null });
        const payload = await clanPayload(p.clanId, p.id);
        return NextResponse.json({ ok: true, clan: payload });
      }

      return NextResponse.json({ ok: false, error: "srvFail" });
    }

    return NextResponse.json({ ok: false, error: "srvFail" });
  } catch (e) {
    console.error("api/" + ep, e);
    return NextResponse.json({ ok: false, error: "srvFail" });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, srv: "meyve-patlat" });
}
