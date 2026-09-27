# Meyve Patlat! — Asset Tema Sistemi

Bu klasör meyve asset'lerini yönetir. Kendi asset'lerinizi kolayca ekleyebilir, etkinlik temaları oluşturabilirsiniz.

## 📁 Klasör Yapısı

```
public/themes/
├── config.json          ← Aktif tema + tema listesi
├── README.md            ← Bu dosya
├── default/             ← Varsayılan tema (Sweet Bonanza cartoon stili, 8 meyve + 3 özel şeker)
│   ├── fr0.png (Kiraz 🍒)
│   ├── fr1.png (Limon dilim 🍋)
│   ├── fr2.png (Yabanmürver 🫐)
│   ├── fr3.png (Elma dilim 🍏)
│   ├── fr4.png (Üzüm 🍇)
│   ├── fr5.png (Portakal dilim 🍊)
│   ├── fr6.png (Karpuz dilim 🍉)
│   ├── fr7.png (Muz 🍌)
│   ├── sp_h.png (Çizgili şeker — 4'lü eşleşme)
│   ├── sp_b.png (Bomb şeker — L/T/Kare eşleşme)
│   └── sp_r.png (Gökkuşağı lolipop — 5'li eşleşme)
├── realistic/           ← Gerçekçi stil (alternatif, 6 meyve, özel şeker yok)
│   └── fr0-5.png
├── halloween/           ← Cadılar Bayramı etkinlik teması (11 asset hazır!)
│   ├── fr0.png (Balkabağı 🎃 — Jack-o'-lantern)
│   ├── fr1.png (Mısır şeker 🌽 — candy corn)
│   ├── fr2.png (İksir şişesi ⚗️ — mor iksir)
│   ├── fr3.png (Slom yaratık 🟢 — yeşil balçık)
│   ├── fr4.png (Yarasa şeker 🦇 — mor)
│   ├── fr5.png (Cadı şapkası 🧙 — turuncu)
│   ├── fr6.png (Kafatası jölesi 💀 — pembe/kırmızı)
│   ├── fr7.png (Hayalet muz 👻 — muz hayalet kostümünde)
│   ├── sp_h.png (Cadılar Bayramı çizgili şeker — siyah/turuncu)
│   ├── sp_b.png (Fırın bombası 🍲 — siyah kazan, yeşil iksir)
│   └── sp_r.png (Büyü lolipopi 🌀 — mor/yeşil girdap)
└── christmas/           ← Noel etkinlik teması (11 asset + gece sahnesi + kar efekti!)
    ├── fr0.png (Karlı elma 🍎 — kar kaplı, çilek yapraklı)
    ├── fr1.png (Şeker lolipop 🍭 — kırmızı-beyaz spiral)
    ├── fr2.png (Zencefilli adam 🍪 — beyaz süslemeli)
    ├── fr3.png (Çobanpüskülü 🌿 — kızıl meyveler)
    ├── fr4.png (Mandalina 🍊 — kar serpmeli)
    ├── fr5.png (Mini Noel ağacı 🎄 — süslü, yıldızlı)
    ├── fr6.png (Noel topu 🔴 — altın desenli)
    ├── fr7.png (Şeker eriği 🍬 — mor mukava şeker)
    ├── sp_h.png (Noel çizgili şeker — kırmızı-beyaz)
    ├── sp_b.png (Hediye kutusu bombası 🎁 — kırmızı, altın kurdele)
    └── sp_r.png (Noel roketi 🚀 — şeker çubuk gövdeli)
```

## 🎨 Yeni Tema Ekleme

1. `public/themes/` altına yeni klasör aç (örn: `christmas/`)
2. 8 meyve PNG'sini koy (`fr0.png` ... `fr7.png`)
3. `config.json`'a tema ekle:

```json
{
  "active": "default",
  "themes": {
    "default": { "name": "Klasik", "folder": "default", "fruits": [...] },
    "christmas": { "name": "Yılbaşı", "folder": "christmas", "fruits": [...] }
  }
}
```

## 🖼️ Asset Gereksinimleri

- **Boyut**: 128×128 veya daha büyük (oyun otomatik küçültür)
- **Format**: PNG (şeffaf arka plan önerilir)
- **Stil**: Glossy cartoon / Sweet Bonanza tarzı
  - Yuvarlatılmış, şişkin şekiller
  - Parlak specular highlight (sol üst)
  - Radial gradient (merkez parlak, kenar koyu)
  - Hipersatüre canlı renkler
  - Minimal detay, maksimum vurgu
  - **Gerçekçi olmamalı** — candy/jöle görünümü

## 🔄 Tema Değiştirme

- **Oyuncu**: Ayarlar → Tema seçici (geliştirilecek)
- **Manuel**: `config.json`'da `"active"` alanını değiştir, sayfayı yenile

## 📝 Meyve Sırası

| Dosya | Meyve | Renk |
|-------|-------|------|
| fr0.png | Kiraz | Kırmızı |
| fr1.png | Limon (dilim) | Sarı |
| fr2.png | Yabanmürver | Mavi |
| fr3.png | Elma (dilim) | Yeşil |
| fr4.png | Üzüm | Mor |
| fr5.png | Portakal (dilim) | Turuncu |
| fr6.png | Karpuz (dilim) | Pembe-Kırmızı |
| fr7.png | Muz | Altın Sarı |

### Özel Şekerler (Opsiyonel)
| Dosya | Şeker | Ne zaman oluşur |
|-------|-------|------------------|
| sp_h.png | Çizgili şeker (pembe-beyaz) | 4'lü eşleşme |
| sp_b.png | Bomb şeker (mor, sprinkles) | L/T/Kare eşleşme |
| sp_r.png | Gökkuşağı lolipop | 5'li eşleşme |

Asset bulunamazsa oyun otomatik olarak prosedürel (çizim) meyvelere/şekerlere düşer.
