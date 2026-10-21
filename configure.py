#!/usr/bin/env python3
"""Regenerate static SEO metadata from site-config.json. Standard library only."""
import json, re
from pathlib import Path
from urllib.parse import urlsplit
from xml.sax.saxutils import escape
root = Path(__file__).resolve().parents[1]
config = json.loads((root / 'site-config.json').read_text())
url = config['siteUrl'].rstrip('/') + '/'
parts = urlsplit(url)
if parts.scheme != 'https' or not parts.hostname or parts.query or parts.fragment:
    raise SystemExit('siteUrl must be a complete HTTPS URL without query or fragment.')
html = (root / 'index.html').read_text()
for pattern, replacement in [
    (r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="{escape(url, {chr(34): "&quot;"})}">'),
    (r'<meta property="og:url" content="[^"]*">', f'<meta property="og:url" content="{escape(url, {chr(34): "&quot;"})}">'),
    (r'<meta property="og:image" content="[^"]*">', f'<meta property="og:image" content="{escape(url, {chr(34): "&quot;"})}assets/social-card.png">'),
]:
    html = re.sub(pattern, lambda _: replacement, html)
schema = {'@context': 'https://schema.org', '@type': 'Organization', 'name': config['businessName'], 'url': url, 'description': 'Singapore 3D printing business', 'areaServed': {'@type': 'Country', 'name': 'Singapore'}}
if config.get('email'): schema['email'] = config['email']
if config.get('whatsapp'): schema['telephone'] = '+' + config['whatsapp']
schema_text = json.dumps(schema, ensure_ascii=False).replace('<', '\\u003c')
html = re.sub(r'(<script type="application/ld\+json" id="business-schema">).*?(</script>)', lambda m: m[1] + schema_text + m[2], html, flags=re.S)
(root / 'index.html').write_text(html)
(root / 'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: ' + url + 'sitemap.xml\n')
(root / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>' + escape(url) + '</loc></url></urlset>\n')
print('Updated canonical URL, social metadata, structured data, robots.txt, and sitemap.xml for ' + url)
