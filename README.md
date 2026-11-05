# BOLDEST Website 2.0 – Netlify package

Static site, no build step. Upload this folder to Netlify (drag and drop, or connect a repo with publish directory `.`).

## Structure

```
index.html            All pages (single-page app, hash routes such as #about, #products)
css/main.css          All styles
js/main.js            All behaviour (router, sliders, forms, animations, EN/ES switch)
assets/img/           Images (WebP), named by their role (bn_creative.webp, tm_keith.webp, …)
assets/video/         Videos: hero (MP4 + WebM), Fiona mascot (MP4 + WebM), PathSuite reel (MP4)
assets/data/i18n-es.json  Spanish translations (editable source; a copy is inlined in index.html)
netlify.toml          Caching headers
```

## How the pages work

* Every page is a `<section class="page" data-page="NAME">` inside `<main>`. Navigation uses hash links (`#creative`, `#pathfinder`, `#beyond-shopify-plus`, …). The router in `js/main.js` shows one section at a time and updates the title and description from `data-title` / `data-desc`.
* Dynamic lists are rendered from arrays near the top of `js/main.js`:
  * `ARTICLES` – News & Views cards (title, excerpt, date, image, topic, url)
  * `PARTNERS` – partner rows and the homepage partner slider
  * `TEAM` – "Meet the Boldies" cards (name, designation, photo, LinkedIn)
  * `IND` – industry use cases
  * `IMG` – image key → file path map
* Article bodies, product pages, privacy policy and all other copy are plain HTML in `index.html`.

## Headless CMS notes

The arrays above (`ARTICLES`, `PARTNERS`, `TEAM`, `IND`) are the natural first content types. Replace each array with data fetched from the CMS (or generated at build time) and keep the same field names, and the existing render functions will work unchanged. Article pages are currently static sections; for a CMS, generate one section per article from the same fields or move articles to real URLs.

## Language switch (EN / ES)

* English is the source. `js/main.js` swaps visible text using `assets/data/i18n-es.json` (inlined as `<script id="i18n-es">`). Keys are the exact English text (or inner HTML) of each element.
* If you edit English copy, update the matching key in the JSON, otherwise that line stays in English when ES is selected.
* Long-form articles and the privacy policy are currently English only.
* The choice is remembered in `localStorage` and can be forced with `?lang=es`.

## Forms

Contact and lead forms validate in the browser and then open the visitor's email app with the message addressed to keith.pires@theboldest.ai (mailto). To store submissions instead, switch to Netlify Forms (add `data-netlify="true"` and a `name` to each `<form>`) or post to the CMS / CRM.

## Videos

Banner, mascot and reel videos load from `assets/video/`. Product films (PathFinder, PathWay, PathWise, PathBreaker) are Vimeo embeds loaded on click.

## Pending content

* Testimonials: four placeholder quotes on the homepage.
* Team: Gamal Mohd LinkedIn URL; Instagram, X and Facebook handles (footer links point to the platform home pages).
* Metarouter partner logo is in; all partner figures are as published by each partner.
