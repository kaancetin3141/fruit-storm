# 🍓 Meyve Patlat! — Oyun Yayınlama Rehberi

Bu dosya, oyunu internete nasıl çıkaracağını (yayınlayacağını) adım adım anlatır.
Oyun tek dosyalık statik bir web oyunudur (`public/game.html`) — sunucu gerektirmez,
herhangi bir statik hosting'de çalışır.

---

## 1. Oyunun Yapısı (Neyi Yayınlayacağız?)

```
public/game.html   → OYUNUN KENDİSİ (tüm kod + stiller tek dosyada)
public/themes/     → Tema görselleri (default, halloween, christmas, valentine, realistic)
src/app/page.tsx   → Next.js kök sayfası (oyunu iframe ile gösterir)
```

- Oyun **tamamen istemci tarafında** çalışır: skor, bölüm, altın hepsi tarayıcının
  `localStorage`'ında saklanır (`meyve_v2` anahtarı).
- İnternet olmadan da çalışır (offline demo modu).
- Opsiyonel API (giriş/kayıt/liderlik) varsa `Settings` ekranından sunucu adresi girilir;
  girilmezse "Yerel Demo" modu aktif olur.

---

## 2. En Hızlı Yol: Ücretsiz Statik Hosting (5 dakika)

### Seçenek A — Vercel (önerilen, Next.js olduğu için birebir uyumlu)

```bash
npm i -g vercel          # veya: bunx vercel
vercel login
vercel --prod
```

- İlk seferde soruları Enter ile geç (varsayılanlar doğru).
- Bitince `https://oyun-adin.vercel.app` adresi verilir.
- Sonraki yayınlarda sadece `vercel --prod` yeterli.

### Seçenek B — Netlify Drop (hiç kurulum yok)

1. https://app.netlify.com/drop adresini aç
2. `public/` klasörünü sürükle-bırak
3. Anında `https://rastgele-ad.netlify.app` adresinde yayında

> Not: `public` klasörü tek başına yeterli (game.html + themes).
> Ama Vercel seçeneği Next.js sayfasını da (kök `/`) yayınlar.

### Seçenek C — GitHub Pages

```bash
git init && git add . && git commit -m "ilk yayın"
# GitHub'da boş bir repo aç (ör. meyve-patlat), sonra:
git remote add origin https://github.com/KULLANICI-ADI/meyve-patlat.git
git push -u origin main
# Repo → Settings → Pages → Source: "GitHub Actions" → "Deploy static site"
```

Oyun `https://kullanici-adi.github.io/meyve-patlat/game.html` adresinde açılır.

### Seçenek D — Cloudflare Pages

```bash
npm i -g wrangler && wrangler login
npx wrangler pages deploy public --project-name=meyve-patlat
```

---

## 3. Kendi Alan Adın (Custom Domain)

1. Bir alan adı al (ör. `meyvepatlat.com` — Namecheap, GoDaddy, isimtescil vb.)
2. Hosting panelinde **Domains → Add domain** ile alan adını bağla
   - Vercel: `vercel domains add meyvepatlat.com`
   - Netlify: Site settings → Domain management → Add domain
3. Alan adı sağlayıcında DNS kayıtlarını gir:
   - `A` kaydı: `76.76.21.21` (Vercel) veya `75.2.60.5` (Netlify)
   - ya da `CNAME`: `cname.vercel-dns.com` / `(site-adı).netlify.app`
4. HTTPS otomatik gelir (Let's Encrypt).

---

## 4. Mobil Uygulama Olarak Yayınlama (Google Play / App Store)

Oyun zaten PWA temelli (viewport-fit=cover, standalone metaları mevcut).
Mağazalara çıkmak için web sürümünü sarmalayıp (wrapper) uygulama paketi üretirsin.

### 4a. Google Play — TWA (Trusted Web Activity) yöntemi

Web adresini Play Store'da uygulama yapan resmi yöntem. Kod değişikliği gerekmez.

```bash
npm i -g @bubblewrap/cli
bubblewrap init --manifest https://SITESI-ADIN/manifest.json
bubblewrap build        # app-release-signed.apk + .aab üretir
```

Gerekenler:
- **manifest.json** (aşağıdaki 5. bölümde hazır şablon var) ve 512×512 ikon
- Play Console'a kayıt (tek seferlik ~25$)
- `assetlinks.json` doğrulaması (Bubblewrap komutları yönlendirir)

### 4b. App Store (iOS) — Capacitor yöntemi

```bash
npm i @capacitor/core @capacitor/cli
npx cap init "Meyve Patlat" com.oyunadin.meyvepatlat --web-dir=public
npx cap add ios
npx cap open ios        # Xcode açılır → Signing Team seç → Archive → Upload
```

Gerekenler: macOS + Xcode + Apple Developer hesabı (yıllık ~99$).

### 4c. Daha kolay alternatif: web oyun portalları

Mağaza yerine hemen para kazanmak / kitleye ulaşmak için:

| Portal | Nasıl |
|---|---|
| **itch.io** | Zip olarak yükle (HTML5 oyun) — 5 dakikada yayında |
| **CrazyGames** | Geliştirici panelinden başvuru → QA süreci |
| **Poki** | Geliştirici başvurusu (daha seçici, gelir paylaşımı iyi) |
| **Yandex Games** | Geliştirici konsolundan HTML5 yükleme (TR/RU kitlesi için iyi) |

> Portallar genellikle kendi SDK'larını ister (reklam/skor); önce itch.io ile başla,
> kitleni gör, sonra portallara başvur.

---

## 5. PWA + İkon Şablonu (opsiyonel ama önerilir)

`public/` içine **manifest.json** ekle:

```json
{
  "name": "Meyve Patlat! — Sweet Match 3",
  "short_name": "Meyve Patlat",
  "start_url": "/game.html",
  "display": "fullscreen",
  "orientation": "any",
  "background_color": "#5E2F8F",
  "theme_color": "#8E4FC7",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

`game.html` `<head>` kısmına ekle:

```html
<link rel="manifest" href="/manifest.json">
<link rel="icon" href="/icon-192.png">
<link rel="apple-touch-icon" href="/icon-192.png">
```

İkon üretmek için: oyunun 🍓 görselini 192×192 ve 512×512 PNG olarak kaydet
(ya da herhangi bir araca ürettir).

**Basit service worker** (`public/sw.js`) — oyunu offline cache'ler:

```js
const C='meyve-v1';
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(['/game.html']))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
```

`game.html`'e: `<script>navigator.serviceWorker&&navigator.serviceWorker.register('/sw.js')</script>`

> SW ekleyince tarayıcı "Ana ekrana ekle" ile tam ekran uygulama gibi açar.

---

## 6. Yayınlama Öncesi Kontrol Listesi

- [ ] `game.html`'i telefonunda aç: dokunma/drag akıcı mı?
- [ ] Farklı dillerde dene (TR/EN/DE/ES/FR/IT/PT/RU) — Ayarlar → Dil
- [ ] Ses aç/kapa, titreşim, dark temalı telefonlarda renkler OK mi?
- [ ] `localStorage` sıfırlanınca (yeni oyuncu) eğitim akışı düzgün mü?
- [ ] Alan adı + HTTPS aktif mi? (TWA ve PWA için şart)
- [ ] manifest + ikonlar ekli mi?
- [ ] Google Analytics / Plausible gibi basit analiz eklemeyi düşün
- [ ] Reklam istiyorsan: AdMob (uygulama) veya portal SDK'sı (itch/CrazyGames)

---

## 7. Önerilen Yayın Sırası (yol haritası)

1. **Bugün:** Vercel/Netlify'a ücretsiz kur → linki arkadaşlarla paylaş
2. **1. hafta:** Alan adı bağla + PWA manifest/ikon ekle
3. **2. hafta:** itch.io'ya yükle, geri bildirim topla
4. **1. ay:** Google Play TWA paketini hazırla ve yayınla (25$ kayıt)
5. **Sonra:** iOS (99$/yıl) veya CrazyGames/Poki başvurusu

---

*Sorun olursa: `git log` ile son değişiklikleri, `worklog.md` ile geliştirme
geçmişini görebilirsin. Oyunun tamamı `public/game.html` içinde tek dosyadır —
yedeklemesi ve taşıması en kolay hali budur.*
