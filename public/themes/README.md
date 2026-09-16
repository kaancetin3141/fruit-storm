# Meyve Patlat! — Asset Tema Sistemi

Bu klasör meyve asset'lerini yönetir. Kendi asset'lerinizi kolayca ekleyebilir, etkinlik temaları oluşturabilirsiniz.

## 📁 Klasör Yapısı

```
public/themes/
├── config.json          ← Aktif tema + tema listesi
├── README.md            ← Bu dosya
├── default/             ← Varsayılan tema (Sweet Bonanza candy stili)
│   ├── fr0.png (Kiraz 🍒)
│   ├── fr1.png (Limon 🍋)
│   ├── fr2.png (Yabanmürver 🫐)
│   ├── fr3.png (Elma 🍏)
│   ├── fr4.png (Üzüm 🍇)
│   └── fr5.png (Portakal 🍊)
├── realistic/           ← Gerçekçi stil (alternatif)
│   └── fr0-5.png
└── halloween/           ← Cadılar Bayramı etkinlik teması (örnek - boş)
    └── fr0-5.png        ← Kendi etkinlik asset'lerinizi koyun
```

## 🎨 Yeni Tema Ekleme

1. `public/themes/` altına yeni klasör aç (örn: `christmas/`)
2. 6 meyve PNG'sini koy (`fr0.png` ... `fr5.png`)
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
| fr1.png | Limon | Sarı |
| fr2.png | Yabanmürver | Mavi |
| fr3.png | Elma | Yeşil |
| fr4.png | Üzüm | Mor |
| fr5.png | Portakal | Turuncu |

Asset bulunamazsa oyun otomatik olarak prosedürel (çizim) meyvelere düşer.
