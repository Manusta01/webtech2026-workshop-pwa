# Aufgaben – Progressive Web Apps

Die Demo-App **FocusBoard** liegt unter `app/` und startet bewusst **ohne** Manifest und Service Worker.
Ziel: Schritt für Schritt eine installierbare, offlinefähige PWA aufbauen.

## Ablauf (Theorie → Aufgabe im Wechsel)

| Block | Theorie                 | Hands-on                                         |     Zeit |
| ----- | ----------------------- | ------------------------------------------------ | -------: |
| A     | PWA-Idee & Case Studies | Setup                                            |  ~8 Min. |
| B     | Manifest                | [01](01-manifest.md)                             | ~20 Min. |
| C     | Service Worker          | [02](02-service-worker.md)                       | ~25 Min. |
| D     | Caching                 | [03](03-caching.md)                              | ~20 Min. |
| E     | DevTools / Kamera       | [04](04-devtools-lighthouse.md) (gern gemeinsam) | ~10 Min. |

Gesamt Hands-on ca. 75 Min. · Folien: [`../folien/`](../folien/)

Lösungshinweise (nicht vorab öffnen) liegen auf eigenen Branches und bauen aufeinander auf:

```bash
git switch solution-aufgabe-01   # Manifest
git switch solution-aufgabe-02   # + Service Worker
git switch solution-aufgabe-03   # + Caching-Strategien
```

Danach wie gewohnt `npm start` im jeweiligen Branch.

## Start

Im Projektroot:

```bash
npm start
```

Dann im Browser: [http://localhost:3000](http://localhost:3000)

> Service Worker und Manifest setzen **HTTPS** oder **localhost** voraus – lokal mit `npm start` seid ihr auf der sicheren Seite.
