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
└── halloween/           ← Cadılar Bayramı etkinlik teması (örnek - boş)
    └── fr0-7.png + sp_h/b/r.png  ← Kendi etkinlik asset'lerinizi koyun
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
