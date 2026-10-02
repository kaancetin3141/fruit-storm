# 🌪️ Tatlı Fırtına! — Sweet Storm Match 3

Türkçe odaklı, **8 dilli** (tr · en · de · es · fr · it · pt · ru), tek dosyalık meyve eşleştirme (match-3) oyunu.
Komuta köprüsü temalı fütüristik ana menü, kaskad kombolar, gökkuşağı şekerleri, bulut kayıt ve gerçek global liderlik tablosu.

![stack](https://img.shields.io/badge/Next.js%2016-App%20Router-purple) ![db](https://img.shields.io/badge/Prisma-SQLite-orange) ![i18n](https://img.shields.io/badge/8-dil%20desteği-teal)

## ✨ Özellikler

- 🍭 **Özel şekerler**: 4'lü → çizgili şeker, 2×2 kutu → bomba, 5'li → gökkuşağı şeker (Divine! şok halkası efektiyle)
- 🗺️ **5 bölüm modu**: puan · süre · meyve toplama · jöle temizleme · 2. nesil toplama (buz çözme)
- ☁️ **Gerçek bulut backend**: hesap sistemi (scrypt), cihaz değiştirse de kayıt devam eder, global haftalık liderlik, klan sistemi ve klan sohbeti
- 📺 **Reklam katmanı**: can yenileme +5 hamle, 2× altın, interstitial — tek noktadan SDK bağlama
- 🎁 Yan sistemler: günlük bonus, çarkıfelek, görevler, başarımlar, bahçe, market, canlar/XP/seviye
- 🎬 Oyun hissi: tween motoru, ekran sarsıntısı, konfeti, yıldız patlamaları, sugar rush, reduce-motion desteği
- 📱 PWA hazır (dinamik manifest + ikonlar), mobil öncelikli dokunmatik kontroller

## 🚀 Çalıştırma

```bash
bun install            # veya npm install
bun run db:push        # Prisma şemasını SQLite'a bas
bun run dev            # http://localhost:3000
```

Oyun `/game.html` dosyasında tek başına da çalışır (statik hosting'e atılabilir);
Next.js kök sayfası onu iframe ile sarar ve `/api/*` bulut uçlarını sağlar.

## 🌐 Bulut API uçları

| Uç | İşlev |
|---|---|
| `POST /api/guest` | Misafir hesabı oluşturur |
| `POST /api/register` · `/api/login` | E-posta hesabı (scrypt hash) |
| `POST /api/save` · `/api/load` | Bulut kayıt/yükleme |
| `GET /api/leaderboard` | Global haftalık yıldız sıralaması |
| `POST /api/clan/*` | Klan kur / katıl / sohbet |

Oyun içi **Ayarlar → Sunucu Adresi** alanına kendi adresini girerek bulut modu etkinleşir;
boşsa çevrimdışı yerel demo çalışır.

## 📦 Yayınlama

Adım adım rehber için **[YAYINLAMA.md](./YAYINLAMA.md)**: Vercel/Netlify statik yayınlama, VDS dağıtımı, PWA/Google Play (TWA) ve itch.io/CrazyGames gibi portal yolları.

## 🧱 Teknoloji

Next.js 16 (App Router) · TypeScript · Prisma + SQLite · Tailwind CSS 4 · tek dosyalık canvas oyun motoru (`public/game.html`)
