# Spiritwind Fellowship Church — Website

A fast, static, single-page church website. No build step, no database, no framework: upload the folder to any web host and it works.

**Loving God. Loving People.**

---

## What's in the folder

```
spiritwind-website/
├── index.html              ← the homepage
├── privacy.html            ← privacy policy (draft — church to approve)
├── 404.html                ← "page not found" page
├── favicon.ico
├── site.webmanifest        ← app icon / "Add to Home Screen" info
├── robots.txt, sitemap.xml ← for Google (edit the domain)
├── netlify.toml            ← only used on Netlify
├── .htaccess               ← only used on Apache / cPanel hosts
└── assets/
    ├── css/styles.css      ← all styling (colors, fonts, layout)
    ├── js/content.js       ← ★ ALL CHURCH CONTENT — edit this
    ├── js/main.js          ← site behaviour (no need to edit)
    ├── fonts/              ← web fonts + their licenses
    ├── img/                ← photos, logo, social share image
    └── icons/              ← favicon and app icons
```

---

## Preview it on your computer

Double-click `index.html` to open it in a browser. Everything works except the Netlify form option.

For a more accurate preview, run a tiny local server from inside the folder:

```bash
python3 -m http.server 8000      # then open http://localhost:8000
# or:  npx serve .
```

---

## Editing content (no coding needed)

Open **`assets/js/content.js`** in any text editor (VS Code, Notepad++, even Notepad). Everything on the page is generated from the `SITE` object in that file:

| To change… | Edit this in `SITE` |
|---|---|
| Service times | `services` — add a line for midweek services; `day: 0` is Sunday, `3` is Wednesday |
| Mission / beliefs | `pillars` — fill in `big` and `full`, then set `status: "verified"` |
| Ministries | `ministries` — replace the two placeholder cards |
| School of Bereans | `bereans` — add a description to each level (`text`), plus `schedule` and `enroll` |
| Sermons | `sermons` — add `speaker`, `scripture`, `date` and a video `url` |
| Events | `events` — `{ title, date: "2026-12-24", time, location, text, img, url }`. Past events hide automatically. |
| Bible verses | `verses` |
| Gallery | `gallery` — `size: "tall"` or `"wide"` makes a tile bigger |
| Phone, kids, parking | `phone`, `visit.kids`, `visit.parking` |

Anything still missing shows a dashed **"To confirm"** label on the site, so nothing invented ever appears. The footer's **Content checklist** link lists what's still needed.

### Changing photos

1. Put the new photo in `assets/img/` (WebP or JPG, ideally 1600px wide for the hero and 800px for others).
2. In `content.js`, point the matching key in `IMG` at the new file, e.g. `p7: "assets/img/christmas-service.jpg"`.
3. The hero and worship-section backgrounds are also set in `index.html` (search for `background-image`).

> **Important:** the current photos are small thumbnails taken from the public Facebook page (about 160px). They look soft when enlarged. Replacing them with the church's original photos is the single biggest visual upgrade.

---

## Publishing the site

Pick one. All are free or very cheap.

### Option A — Netlify (easiest, free)
1. Go to <https://app.netlify.com/drop>.
2. Drag the whole `spiritwind-website` folder onto the page.
3. Done — you get a live link. Add a custom domain under **Domain settings**.
4. For the contact form, set `provider: "netlify"` in `content.js` (see below), then re-upload.

### Option B — GitHub Pages (free)
1. Create a repository and upload the folder's contents (not the folder itself).
2. **Settings → Pages → Deploy from branch → main / root**.

### Option C — cPanel / shared hosting (Hostinger, Bluehost, etc.)
1. Open **File Manager → public_html**.
2. Upload the folder's contents (including the hidden `.htaccess`).

### Before you go live
- Replace `https://www.example.com` with your real domain in `index.html`, `robots.txt` and `sitemap.xml`.
- Have the church review and date `privacy.html`.
- Confirm the YouTube link in `content.js` (`social.youtube`).

---

## Contact form

The form validates everything in the browser and has a hidden anti-spam field. Choose how messages are delivered in `content.js → SITE.form`:

| `provider` | What to do | Notes |
|---|---|---|
| `"none"` (default) | Nothing | The form tells visitors to email instead. It **never** shows a fake "sent". |
| `"netlify"` | Host on Netlify | Messages appear under **Netlify → Forms**; turn on email notifications there. Free for 100/month. |
| `"formspree"` | Sign up at <https://formspree.io>, create a form, paste its URL into `endpoint` | Works on any host. Formspree emails each message to the church and filters spam. |
| `"custom"` | Point `endpoint` at your own API | Receives JSON `{name, email, topic, message}`. **Validate and rate-limit on the server too.** |

Browser checks can be bypassed, so always rely on the provider's (or your server's) own validation and spam filtering.

---

## Built-in features

- Parallax hero with animated "spirit wind" light, scroll reveals, smooth scrolling
- Sticky navigation that turns solid on scroll; animated mobile menu
- Light and dark mode follow the visitor's device setting
- Respects "reduce motion" accessibility settings
- Keyboard and touch-friendly photo lightbox; accessible dialogs
- Next Sunday's date is calculated in Philippine time (Asia/Manila)
- SEO: meta description, Open Graph share image, `Church` structured data, sitemap

## Fonts & colors

The site uses an **Avant Garde Gothic + Cooper** pairing, self-hosted in `assets/fonts/` (no Google Fonts needed):

| Role | Look | File used | License |
|---|---|---|---|
| Headings, body, buttons | ITC Avant Garde Gothic | **TeX Gyre Adventor** — a free version of Avant Garde Gothic | GUST Font License (free, included) |
| Accent words, Bible verses | Cooper BT | **Fraunces** with its "Soft" axis at maximum — a free serif inspired by Cooper | SIL Open Font License (free, included) |

ITC Avant Garde Gothic and Cooper BT themselves are paid fonts, so they can't be shared freely. If the church buys webfont licenses for them, put the `.woff2` files in `assets/fonts/` and change the `src:` lines of the `@font-face` rules at the top of `styles.css`. Keep the family names (`SFC Avant`, `SFC Cooper`) and everything else updates automatically.

Colors are defined as variables at the top of `styles.css` (`--orange`, `--burnt`, `--amber`, `--bg`…).

---

## Sources

Church name, logo, photos, tagline, Sunday 9:00 AM service, address, email and social handles were taken from the official Facebook page: <https://www.facebook.com/spiritwindfellowshipchurch> (October 2026).
