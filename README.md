# Ghost IDE Plugin Docs

سایت مستندات پلاگین‌نویسی برای Ghost IDE — دو زبانه (فارسی/English)، کاملاً استاتیک، بدون نیاز به build یا npm.
محتوا مستقیم از خواندن کد ماژول‌های `plugin-api`، `ide-api`، `ide-ui-api` و سیستم بارگذاری `.gpl` نوشته شده.

## ساختار

```
index.html                  پوسته‌ی اصلی سایت
assets/css/styles.css       کل استایل
assets/js/nav.js            ساختار سایدبار (مستقل از زبان)
assets/js/content.fa.js     محتوای فارسی
assets/js/content.en.js     محتوای انگلیسی
assets/js/app.js            روتر + رندر + سرچ + سوییچ زبان
.github/workflows/deploy.yml   دیپلوی خودکار روی GitHub Pages
```

هیچ مرحله‌ی build ای در کار نیست؛ فایل‌ها همان‌طور که هستند سرو می‌شوند.

## دیپلوی روی GitHub Pages

**راه ۱ — بدون Actions (ساده‌ترین):**
1. این پوشه را همین‌طوری داخل ریشه‌ی یک ریپو پوش کن.
2. `Settings → Pages → Build and deployment → Source: Deploy from a branch` را انتخاب کن، برنچ `main` و پوشه‌ی `/ (root)` را بزن.
3. چند ثانیه بعد آدرس سایت زیر همین تنظیمات نمایش داده می‌شود.

**راه ۲ — با Actions (خودکار روی هر push):**
1. `Settings → Pages → Build and deployment → Source: GitHub Actions` را انتخاب کن.
2. ورک‌فلوی آماده‌ی `.github/workflows/deploy.yml` با هر پوش به `main` سایت را خودش می‌سازد و دیپلوی می‌کند.

## قبل از پوش، این‌ها را عوض کن

- **آدرس گیت‌هاب** — در `assets/js/app.js` مقدار `SITE.githubUrl` را با آدرس واقعی ریپوی خودت جایگزین کن (همه‌ی لینک‌های گیت‌هاب سایت از همین یک مقدار خوانده می‌شوند)؛ الان یک مقدار حدسی است.
- **شماره نسخه** — مقدار `SITE.version` در `assets/js/app.js`، پایین سایدبار نمایش داده می‌شود.

## افزودن یک صفحه‌ی جدید

1. یک slug تازه به گروه موردنظر در `assets/js/nav.js` اضافه کن.
2. همان slug را هم در `pages` و هم در `nav.pages` هر دو فایل `content.fa.js` و `content.en.js` تعریف کن (اگر یکی از دو زبان جا بیفتد، آن صفحه در آن زبان ۴۰۴ نشان می‌دهد).

انواع بلاک محتوا: `p`, `h2`, `h3`, `code`, `note` (با `variant: 'info'|'tip'|'warn'`), `table`, `list`, `modulemap`.
# plugin-doc-ghost-ide
