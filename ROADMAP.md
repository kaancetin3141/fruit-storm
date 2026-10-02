# 🌪️ Fruit Storm! — Ürün Yol Haritası (Roadmap)

> Oluşturan: Z.ai Code yazılım ekibi · Baz sürüm: **v5.2** (commit 744c6b2)
> Mimari: tek dosya oyun (`public/game.html` ~419KB) + Next.js API (`/api/[ep]`) + Prisma/SQLite
> i18n: tr, en, de, es, fr, it, pt, ru (8 dil — her yeni metin 8 dilde eklenir)
> Kural: tüm animasyonlar `reduce-motion` korumalı · v5.2 performans desenleri (fxQ, bgDpr, sprite cache, DOM yazım koruması) bozulmaz

---

## Mevcut Durum Analizi (Araştırma — Ekim 2025)

### ✅ Zaten var olan sistemler
| Sistem | Detay |
|---|---|
| Ses | WebAudio SFX motoru (16+ efekt) + prosedürel müzik (calm/dark, tension 0-2) |
| Oyun modları | score, time (saat şekerleri +5s), collect1, collect2 (çift sipariş), jelly |
| Engeller | taş (-2), kafes/buz (locked), çikolata (-3, yeniden doğar), sandiye (-4) |
| Özel şekerler | çizgili (4'lü), bomba, gökkuşağı (5'li, renk patlatması) |
| Meta | görevler (günlük ×3), klan + sohbet, liderlik, market, bahçe (8 eşya), rozetler, başarımlar (ACH), günlük bonus (7 gün), çark, canlar (6 maks, 3sa), XP/seviye |
| Booster | çekiç, karıştır, +5 hamle, can doldur |
| Reklam katmanı | revive +5 hamle, 2× altın, interstitial (SDK tek nokta) |
| Bulut | hesaplar (scrypt), misafir, bulut kayıt, liderlik, klanlar (Prisma) |
| Performans | v5.2: bgDpr, fxQ partikül bütçesi, FPS bekçisi (QUAL 0-2), halo sprite cache, DOM yazım koruması |
| Tema | mevsimsel (Cadılar Bayramı aktif: kabak, hayalet, şeker mısırı parçaları) |
| PWA | manifest + splash, tek dosya dağıtım |

### 🎯 Tespit edilen boşluklar (fırsat alanları)
1. Boss savaşı yok — 10'un katları sadece "ZOR" etiketli, memetik değeri düşük
2. Arcade modu yok — ilerleme dışı "hemen oyna" akışı yok
3. Bal engeli yok — 15+ seviyeden sonra engel çeşitliliği stagnasyonu
4. Klan savaşları yok — klan pasif bir sohbet odası
5. Yaşam boyu istatistik görünümü eksik (stats verisi toplanıyor ama gösterilmiyor)

---

## FAZ PLANI

### 🔥 Faz A — Boss Savaşları (SEÇİLDİ: Task 55)
**Hedef:** Her 10. bölüm (`n%10===0`) "Çikolata Kral" boss savaşına dönüşür.
- `getLevel(n)` içinde `mode:'boss'` + `L.boss={hp, atkEvery:3}` (hp seviyeyle ölçeklenir)
- Boss taşı `type:-5`, `isBlocked` kapsamında (yer değiştirmez), tahtanın üst bölgesinde tek hücre
- Hasar: boss hücresine/komşusuna patlama → `hitBoss()` (özel şekerler 2× hasar)
- Saldırı: her 3 oyuncu hamlesinde rastgele hücreye taş/çikolata fırlatır (maks 6 engel sınırı)
- UI: tahta üstü HP barı (taçlı çikolata kral yüzü + segment bar + krack aşamaları)
- Zafer: HP=0 → dev patlama fx + `Sfx.boom+sugar` + altın bonus; kayıp koşulu mevcut hamle akışı
- Bir kerelik öğretici toast (`tutBoss`) + harita düğümünde 👑 + hedef kartı metni
- Kabul kriteri: Bölüm 10'da boss görünür, hasar/algoritma çalışır, 8 dil tam, 0 konsol hatası

### ⚡ Faz B — Zaman Saldırısı (SEÇİLDİ: Task 56)
**Hedef:** Menüde "ZAMAN SALDIRISI" girişi; 90 sn sınırsız hamleli skor saldırısı.
- Ana menüde OYNA altında pill buton (can harcamaz — erişilebilirlik kancası)
- `mode:'timeatk'`: saat şekerleri çalışır, müzik tension 2, kombo zinciri puanı katlar
- Süre bitişi: özel özet paneli (skor, rekor `Save.data.best.timeatk`, YENİ REKOR bandı, TEKRAR/MENÜ)
- Bir kerelik tanıtım toastı; reduce-motion uyumlu geri sayım pulse'ı
- Kabul kriteri: menüden 2 tıkla girilir, skor kaydedilir, mevcut modlar etkilenmez

### 🍯 Faz C — Bal Engeli (SEÇİLDİ: Task 57)
**Hedef:** 2 katmanlı yapışkan bal engeli (n≥20'de belirir).
- `L.honey` hücre listesi (2|1 katman) — taş/kafes/çikolata/sandiye/jöle ile çakışmaz
- Kural: balın ÜSTÜNDE eşleşme 1 katman eritir; özel şeker patlaması da 1 katman
- Render: amber damla blob (2 aşama master sprite, v5.2 cache deseni) + `Sfx.honey()`
- Entegrasyon: `stats.honeyCleared` sayaç + "Bal Avcısı" başarımı + `tutHoney` toastı (8 dil)
- Kabul kriteri: Bölüm 20'de görünür, katmanlı erime görsel olarak doğru, performans nötr

### 📅 Faz D — Klan Savaşları (sırada — sonraki oturum)
- Haftalık klan vs klan yıldız düellosu (Pazartesi sıfırlama), savaş barı UI
- Katılım ödülü + galip klan sandiyesi; bot klanlar demo modda simüle
- Backend: Prisma `ClanWar` modeli + `/api/war` uçları

### 🗺️ Faz E — Hazine Avı Etkinliği (sonraki oturum)
- Hafta sonu etkinliği: harita üstü 5 duraklı hazine yolu, her durak mini hedef
- Kancalı sandiye açılışı (anahtar toplama), etkinlik sayacı UI

### 🐾 Faz F — Evcil Hayvanlar (backlog)
- Mascot genişletmesi: 3 evcil hayvan (kiraz kuşu, nane fare, üzüm ejderi), pasif perk (ekstra hamle ihtimali, altın bonusu), besleme döngüsü

### 🛠️ Faz G — Teknik Borç & PWA (backlog)
- Offline önbellek (service worker), paylaşım kartı (canvas → PNG), seviye editörü (JSON içe/dışa)
- Portal/konveyör mekanikleri, lint CI (GitHub Actions)

---

## Sürüm Geçmişi Şeması
- **v5.3** = Faz A + B + C (boss + zaman saldırısı + bal)
- **v5.4** = Faz D + E (klan savaşları + hazine avı)
- **v6.0** = Faz F + G (evcil hayvanlar + offline/editör)
