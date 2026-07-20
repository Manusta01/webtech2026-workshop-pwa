# Progressive Web Apps – Workshop 2026

Workshop-Repository zu **Progressive Web Apps** (Web Technologien 2026).  
Ausgangspunkt ist die Demo-App **FocusBoard**; Manifest, Service Worker und Caching erarbeitet ihr in den Aufgaben.

**Termin:** Dienstag, 21. Juli 2026 · ca. 120 Minuten

## Lernziele

Nach dem Workshop könnt ihr:

- erklären, was eine PWA von einer klassischen Webanwendung unterscheidet
- eine App um ein gültiges **Web App Manifest** erweitern und Installierbarkeit prüfen
- einen **Service Worker** registrieren und Assets mit einer Caching-Strategie vorladen
- mit **DevTools**, **Cache Storage** und **Lighthouse** analysieren und debuggen
- Caching-Entscheidungen (Cache-First vs. Network-First) begründen

## Voraussetzungen

- Aktueller Browser (empfohlen: **Chrome**/Chromium wegen Lighthouse)
- Code-Editor
- **Node.js** ≥ 18 inkl. npm

## Schnellstart

```bash
npm start
```

Demo: [http://localhost:3000](http://localhost:3000)  
Die Starter-App unter `app/` hat bewusst **kein** Manifest und **keinen** Service Worker.

## Struktur

```
app/                 # Starter-Demo (FocusBoard)
aufgaben/            # Hands-on-Aufgaben 01–04
```

## Aufgaben

Siehe [`aufgaben/README.md`](aufgaben/README.md) – Ablauf im Wechsel mit den Folienblöcken A–E:

1. Web App Manifest & Installierbarkeit
2. Service Worker & Precaching
3. Caching-Strategien
4. DevTools, Cache Storage & Lighthouse

Referenzlösungen (nach eigenen Versuchen): Branches `solution-aufgabe-01` … `solution-aufgabe-03`.

## Material

- [MDN: Progressive Web Apps](https://developer.mozilla.org/de/docs/Web/Progressive_web_apps)
- [web.dev: Learn PWA](https://web.dev/learn/pwa?hl=de)
- [web.dev: Service Worker](https://web.dev/learn/pwa/service-workers?hl=de)
- [Richer Install UI](https://web.dev/patterns/web-apps/richer-install-ui?hl=de)
