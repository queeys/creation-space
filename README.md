# Creation Space — static website

A responsive, dependency-free site for a Singapore 3D printing business. Charcoal, orange, silver, and white; **DESIGN • CREATE • PRINT**. No installation, build service, database, or backend is needed. Upload the **contents of this folder**, not the enclosing folder, to your website repository.

## Configured business details

- WhatsApp: **+65 9855 8758** (`6598558758` in configuration)
- Enquiry email: **creation.space@hotmail.com**
- Domain: **thecreationspace.com**
- Location: Singapore; no street address, opening hours, pricing, material range, turnaround promise, or customer testimonials have been invented.
- Gallery: four actual products from your live Shopee listings, reviewed 21 October 2026: car plate keychains, QR code signs with stands, name keychains / bag tags, and clicker keychains. Original listing photos are saved locally in `assets/products/`. Photos show sample customisations. `products.json` records the editorial snapshot; gallery HTML is edited manually. Prices and inventory are intentionally not duplicated; the public Shopee store link provides current details.
- Service copy is introductory. Confirm the actual service scope before launch.

## Preview locally

From this folder, run:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. Stop with Ctrl+C. Use a local server rather than opening `index.html` directly: loading the JSON configuration requires HTTP. There are no npm packages to install. Relative asset links support both repository subpaths and custom domains.

## How the enquiry works

The form validates required name and project description fields, then prepares an encoded WhatsApp message or email draft. The visitor reviews and presses Send in the chosen application. Email requires an email handler. If an app does not open, the form displays a direct draft link. No success message claims the enquiry has been sent.

There is **no upload control, file upload backend, automatic submission, payment system, or order checkout**. Customers attach files themselves in WhatsApp or email. No enquiry details are saved in site storage. Do not enter secrets into the configuration: all website files are public.

## Publish on GitHub Pages — browser steps

1. Sign in to GitHub and create a new **public** repository, for example `creation-space`. A public repository is the simplest option for GitHub Pages on GitHub Free. To host at your account root instead, name it `YOUR-USERNAME.github.io`.
2. Open the repository, select **Add file → Upload files**, and upload the files and `assets` folder from this directory. Ensure `index.html` sits at the repository root. Include `.nojekyll` (a blank file); if your file picker hides it, create it using **Add file → Create new file**. The `scripts` folder and README are useful to retain but are not needed to serve the site.
3. For an initial GitHub URL preview, leave `CNAME` out until you connect the domain. Temporarily set `siteUrl` to `https://YOUR-USERNAME.github.io/creation-space` and run the configuration script described below before upload. If using the root repository, use `https://YOUR-USERNAME.github.io`.
4. Commit the upload to `main`.
5. Open **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
6. Wait for deployment to finish. Check the repository's **Actions** tab for any failure. **Settings → Pages → Visit site** provides the live address, typically `https://YOUR-USERNAME.github.io/creation-space/`.
7. Test the navigation, mobile menu, filters, form validation, email draft, WhatsApp draft, and privacy page on the live URL. Verify the intended recipient in both drafts. Nothing is actually sent until you send it in your app.

This package is ready for publishing; no repository has been created or deployed automatically.

## Connect thecreationspace.com

You must control this domain and its DNS account. The supplied `CNAME` contains `thecreationspace.com`; use it when ready to connect the domain. It is not a DNS record itself.

1. In your GitHub **account Settings → Pages**, use **Add a domain** to verify domain ownership. GitHub provides a unique TXT record: copy its exact name and value into your DNS provider, verify it, and retain the record. Do not invent the verification value.
2. Set `siteUrl` in `site-config.json` to `https://thecreationspace.com` and regenerate SEO files (below). Upload the updated files, including `CNAME`.
3. In your repository **Settings → Pages → Custom domain**, enter `thecreationspace.com` and save. GitHub may commit the `CNAME` file; keep it in future uploads.
4. At your domain registrar or DNS provider, create these records. `@` means the apex/root domain. Some providers expect an empty host instead.

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | YOUR-USERNAME.github.io |

Replace `YOUR-USERNAME` with the GitHub account or organisation owning the repository. The `www` target has **no protocol, slash, or repository name**. GitHub can redirect the correctly configured `www` address to the chosen apex domain. Optional IPv6 AAAA records are documented in GitHub's guide linked below.

5. Remove conflicting web-hosting A/AAAA/ALIAS/ANAME records for `@`, and conflicting records for `www`. Preserve unrelated email MX, SPF, DKIM, verification TXT, and other service records. Avoid wildcard DNS records for Pages.
6. Allow DNS propagation (up to 24 hours). Return to **Settings → Pages**, confirm the DNS check, and enable **Enforce HTTPS** once available. Certificate availability can take up to 24 hours. If it fails, inspect conflicting DNS records using GitHub's troubleshooting guide.
7. Visit both `https://thecreationspace.com` and `https://www.thecreationspace.com`; confirm HTTPS, the intended redirect, and all assets and enquiry links.

Do not change nameservers unless your DNS provider specifically requires it. GitHub Pages does not host email; the Hotmail mailbox remains independent.

## Edit content and configuration

- **`index.html`**: section text, navigation, service scope, product cards, no-JavaScript contact links.
- **`styles.css`**: colours, layout, breakpoints, typography, focus states, reduced-motion support.
- **`app.js`**: mobile menu, filters, enquiry drafting and contact validation.
- **`site-config.json`**: public domain, email, WhatsApp, business name. WhatsApp must use international digits only, without `+` or spaces. Blank or invalid contact values disable that channel.
- **`assets/`**: supplied original Creation Space logo, archived SVG concept illustrations, and 1200 × 630 social preview PNG. Update alt descriptions when replacing illustrations with photos.
- **`privacy.html`**: review against actual handling of enquiries before launch. Update if you later add analytics or other services.

After changing `siteUrl`, name, or contact fields, run from this folder:

```sh
python3 scripts/configure.py
```

This standard-library script updates canonical URL, Open Graph URL/image, Organization JSON-LD, sitemap, and robots.txt. It does not change `CNAME` automatically: edit that file to the bare domain when switching domains, or remove it for the default GitHub Pages address. Contact changes also require updating the static fallback contact links in `index.html` and the email in `privacy.html`. Update the social image if the brand changes. Commit/upload all changed files together.

SEO includes a descriptive page title and description, semantic sections, one H1, canonical URL, social preview metadata, Organization structured data without a fabricated address, sitemap and robots file. Do not expect indexing until the domain is connected and crawled; SEO does not guarantee ranking.

## Launch check

- Confirm service wording and product options. Recheck Shopee listings when updating gallery content.
- Review privacy copy and contact details; open both draft channels to confirm recipients.
- Test on a phone and keyboard; confirm no horizontal scrolling, mobile menu operation, gallery filters, required fields, and reduced-motion behaviour.
- Publish the configured canonical domain, sitemap, robots, social image, and CNAME together.
- Check HTTPS and both domain variants. Share the live URL to inspect the social preview.

## Official setup references

Checked 21 October 2026. GitHub can update its interface and DNS requirements; use its current documentation if anything differs.

- [Publishing from a branch](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Manage a custom domain and DNS](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Verify domain ownership](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
- [HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
- [Troubleshoot custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages)

## Product source and maintenance

Source: [The Creation Space on Shopee](https://shopee.sg/thecreationspace), with product descriptions and images reviewed in Seller Centre on 21 October 2026. `products.json` lists the four item IDs for owner reference. The site links customers to the public storefront; no Seller Centre or authenticated URLs appear on the public website. No sales metrics or private account information have been copied.

There is no automatic Shopee synchronisation. Edit product cards in `index.html` and keep `products.json` aligned when listings change. Local listing JPEGs are used rather than external image hotlinks. The hero also uses the actual car plate keychain listing image.
