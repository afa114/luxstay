# IIS-də LuxStay Qurulum Təlimatı

## Addım 1 — Lazımi proqramları yükləyin

### 1.1 Node.js yükləyin
- https://nodejs.org → LTS versiyasını yükləyin
- Quraşdırın (Next → Next → Finish)
- Yoxlayın: `node --version`

### 1.2 IIS-i aktivləşdirin
Windows Server-də:
```
Server Manager → Add Roles and Features
→ Web Server (IIS) → Install
```

### 1.3 URL Rewrite modulu yükləyin
- https://www.iis.net/downloads/microsoft/url-rewrite
- Yükləyin və quraşdırın

### 1.4 iisnode yükləyin
- https://github.com/Azure/iisnode/releases
- `iisnode-full-v0.2.26-x64.msi` faylını yükləyin
- Quraşdırın

---

## Addım 2 — PostgreSQL quraşdırın

- https://www.postgresql.org/download/windows/
- Yükləyin, quraşdırın
- Quraşdırma zamanı parol təyin edin (yadda saxlayın!)
- pgAdmin ilə `hotel_db` verilənlər bazası yaradın:
  ```sql
  CREATE DATABASE hotel_db;
  ```

---

## Addım 3 — Layihəni serverə köçürün

1. `hotel-app` qovluğunu serverə kopyalayın
   - Məsələn: `C:\inetpub\wwwroot\hotel-app\`

2. `.env` faylını düzəldin:
   ```
   PORT=80
   NODE_ENV=production
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=hotel_db
   DB_USER=postgres
   DB_PASS=SIZIN_PAROLUNUZ
   SESSION_SECRET=cox_uzun_ve_murekkel_bir_sifreyazin
   ```

3. Terminalda layihə qovluğuna girib:
   ```
   cd C:\inetpub\wwwroot\hotel-app
   npm install
   node seeders/seed.js
   ```

---

## Addım 4 — IIS-də sayt yaradın

1. **IIS Manager** açın
2. Sol paneldə **Sites** → sağ klikk → **Add Website**
3. Doldurun:
   - Site name: `LuxStay`
   - Physical path: `C:\inetpub\wwwroot\hotel-app`
   - Port: `80` (və ya istədiyiniz port)
4. **OK** basın

---

## Addım 5 — Application Pool ayarlayın

1. **Application Pools** → `LuxStay` pool-u tapın
2. Sağ klikk → **Advanced Settings**
3. **Identity** → `LocalSystem` seçin
4. **.NET CLR Version** → `No Managed Code` seçin
5. **OK** basın

---

## Addım 6 — Yoxlayın

Brauzerdə açın:
```
http://localhost
```
və ya serverın IP ünvanı ilə:
```
http://192.168.1.100
```

---

## Xəta olarsa

**iisnode_logs** qovluğuna baxın:
```
C:\inetpub\wwwroot\hotel-app\iisnode_logs\
```

**Ən çox rast gəlinən problemlər:**

| Problem | Həll |
|---------|------|
| 500 xətası | `.env` faylı düzgün doldurulub? |
| DB qoşulmur | PostgreSQL servisi işləyirmi? |
| node tapılmır | Node.js PATH-ə əlavə edilib? |
| 403 xətası | App Pool identity düzgündür? |

---

## Qeyd

Saytı xaricdən görmək üçün:
- Router-də **port 80** açın (Port Forwarding)
- Və ya şirkətin IT mütəxəssisi firewall-da icazə versin
