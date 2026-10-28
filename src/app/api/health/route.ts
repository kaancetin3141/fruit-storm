import { NextResponse } from "next/server";

// Fruit Storm — hafif sağlık ucu (Liveness probe)
// Ana sayfa derlemesini tetiklemeden sürecin ayakta olduğunu doğrular.
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "fruitstorm",
    port: 3004,
    db: "fruitstorm@postgresql-17",
    at: new Date().toISOString(),
  });
}
