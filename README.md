# Spiritwind Fellowship Church — Website

A fast, static, single-page church website that church admins can update themselves through a free admin page. No build step, no database, no server.

**Loving God. Loving People.**

---

## How it works

The site is plain HTML/CSS/JS with **no build step**. All church content lives in small JSON files in `content/`, which `main.js` loads when the page opens. Church admins edit those files through a friendly admin page at **`/admin`** ([Sveltia CMS](https://sveltiacms.app), free, MIT). Every save becomes a Git commit, and GitHub Pages republishes the site in about a minute.

- **Admins** change content (events, photos, sermons, contacts…). See **[ADMIN-GUIDE.md](ADMIN-GUIDE.md)**.
- **The developer** changes layout, styles and code.

## What's in the folder

```
spiritwind-website/
├── index.html              ← page layout (developer)
├── content/                ← ★ ALL CHURCH CONTENT (edited via /admin)
│   ├── settings.json       ← name, service times, address, contacts, social links, contact form
│   ├── home.json           ← banner, welcome, worship, about cards, verses, plan-your-visit
│   ├── events.json         ← special events (past ones hide automatically)
│   ├── sermons.json        ← sermon highlights
│   ├── ministries.json     ← ministry cards
│   ├── gallery.json        ← "Sundays at SFC" photos
│   └── bereans.json        ← School of Bereans
├── admin/
│   ├── index.html          ← the admin page (loads Sveltia CMS 0.239.1 from unpkg)
│   └── config.yml          ← which fields admins can edit, labels, help text, photo resizing
├── ADMIN-GUIDE.md          ← plain-language guide for church admins
├── privacy.html, 404.html
├── favicon.ico, site.webmanifest, robots.txt, sitemap.xml
├── .nojekyll               ← tells GitHub Pages to serve files as-is
├── netlify.toml, .htaccess ← only for Netlify / Apache hosting (unused on GitHub Pages)
└── assets/
    ├── css/styles.css      ← all styling
    ├── js/main.js          ← loads content/*.json and renders the page
    ├── js/vendor/          ← Lenis smooth-scroll library + license
    ├── fonts/              ← web fonts + licenses
    ├── img/                ← photos and logos (admin uploads also land here)
    └── icons/              ← favicon and app icons
```

---

## Preview on your computer

The page loads `content/*.json` with `fetch`, so it needs a local web server (double-clicking `index.html` shows a "couldn't load" notice):

```bash
python3 -m http.server 8000      # then open http://localhost:8000
# or:  npx serve .
```

**Try the admin locally:** with the server running, open <http://localhost:8000/admin/> in Chrome or Edge and choose **Work with Local Repository**, then pick this folder. Edits are written straight to your files, so you can test before pushing.

---

## Content model (for developers)

| File | Shape | Rendered in |
|---|---|---|
| `settings.json` | church info, `services[] {day, time, ampm, name, note}`, `social{}`, `form{provider, endpoint}` | hero chips, worship card, visit, contact, footer |
| `home.json` | `hero{}`, `welcome{}`, `worship{}`, `pillars[]`, `verses[]`, `visit{}` | top half of the page |
| `events.json` | `events[] {title, date YYYY-MM-DD, time, location, text, image, url}` | Events (soonest is featured; past ones hidden, Manila time) |
| `sermons.json` | `sermons[] {title, image, speaker, scripture, date, url, featured}` | Sermons |
| `ministries.json` | `ministries[] {name, image, text, when, link}` | Ministries (pads to 3 cards with a "coming soon" card) |
| `gallery.json` | `photos[] {image, caption, size: normal|tall|wide}` | Gallery + lightbox |
| `bereans.json` | intro, verse, poster, milestone, latest, schedule, enroll, `levels[5]` | School of Bereans |

Image paths are stored by the CMS as `/assets/img/…`. `main.js` strips the leading slash so they also work when the site lives in a sub-folder (`<org>.github.io/spiritwind-website/`).

To add a **new editable field**: add it to the JSON file, render it in `main.js`, and add a matching field in `admin/config.yml`. Fields the config doesn't know about may be dropped when an admin saves.

---

## Publishing on GitHub Pages (free)

Works on **GitHub Free** as long as the repository is **public**. Full steps (organization, admins, Pages, login helper, Formspree) are in the setup notes from the developer. In short:

1. Repository in a church-owned GitHub organization; admins added with **Write** access.
2. **Settings → Pages → Deploy from a branch → `main` / `(root)`**.
3. Edit the three `CHANGE ME` lines in `admin/config.yml` (repo, login-helper URL, site URL).
4. Deploy the free **Sveltia CMS Authenticator** on Cloudflare Workers for "Sign in with GitHub" (<https://github.com/sveltia/sveltia-cms-auth>).

### Before you go live
- Replace `https://www.example.com` with the real address in `index.html` (canonical + Open Graph tags), `robots.txt` and `sitemap.xml`.
- Have the church review and date `privacy.html`.
- Confirm the YouTube link under **Church info & contacts**.

---

## Contact form

GitHub Pages can't receive form posts, so connect **Formspree** (free tier): create a form at <https://formspree.io>, then in **/admin → Church info & contacts → Contact form** choose *Formspree* and paste the form URL. Until then (`provider: none`) the form validates and asks visitors to email instead. It **never** shows a fake "sent". `custom` POSTs JSON `{name, email, topic, message}` to your own endpoint. Validate and rate-limit there too.

---

## Built-in features

- Parallax hero with animated "spirit wind" light and scroll reveals
- Momentum smooth scrolling for mouse wheels and trackpads ([Lenis](https://github.com/darkroomengineering/lenis) 1.3.26, MIT, bundled in `assets/js/vendor/`). Phones keep native touch scrolling; it switches off for visitors who prefer reduced motion. Tune the feel with `lerp` in `initSmooth()` in `main.js` (lower = smoother/slower).
- Sticky navigation that turns solid on scroll; animated mobile menu
- Light and dark mode follow the visitor's device setting
- Respects "reduce motion" accessibility settings
- Keyboard and touch-friendly photo lightbox; accessible dialogs
- Next Sunday's date is calculated in Philippine time (Asia/Manila)
- SEO: meta description, Open Graph share image, `Church` structured data, sitemap
- Content loads with `cache: no-cache`, so admin edits show as soon as GitHub Pages has republished

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
