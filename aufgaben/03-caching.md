# Aufgabe 3: Caching-Strategien

**Ziel:** Unterschiedliche Strategien für Shell-Assets und dynamische Daten umsetzen und begründen.

**Zeitrahmen:** ca. 25 Minuten  
**Voraussetzung:** Service Worker aus Aufgabe 2 läuft

## Hintergrund

| Strategie | Idee | Typische Nutzung |
| --- | --- | --- |
| **Cache-First** | Zuerst Cache, sonst Netz (und ggf. cachen) | Statische App-Shell (HTML, CSS, JS, Icons) |
| **Network-First** | Zuerst Netz, bei Fehler Cache | Daten, die möglichst frisch sein sollen |

FocusBoard lädt den Tages-Tipp aus `data/tips.json` – guter Kandidat für Network-First. Shell-Dateien eignen sich für Cache-First.

## Schritte

1. Arbeitet weiter in **`app/sw.js`** – das Scaffolding für Aufgabe 3 liegt dort bereits als **auskommentierter Block** am Dateiende.
2. Erhöht `CACHE_NAME` (z. B. `focusboard-shell-v2`).
3. Entfernt den aktiven `fetch`-Handler von Aufgabe 2.
4. Kommentiert den Block `// --- Aufgabe 3: ...` aus (`/* … */` entfernen), sodass Cache-First / Network-First aktiv werden.
5. Entfernt `tips.json` aus `APP_SHELL` **oder** lasst sie drin – Network-First muss online trotzdem zuerst das Netz nutzen.

`install` / `activate` bleiben; nur Cache-Name, Precache-Liste und `fetch`-Logik ändern sich.

## Experiment

1. Online: Tipp mehrmals neu laden – Network-Tab beobachten.
2. `tips.json` inhaltlich ändern, ohne den Cache-Namen zu wechseln.
3. Offline: App öffnen – welche Teile funktionieren noch? Aufgabenliste (localStorage) vs. Tipp?
4. Kurz notieren: Wann wäre Cache-First für `tips.json` problematisch?

## Reflexion

- Begründet für FocusBoard: Shell vs. Tipp – welche Strategie und warum?
- Wo liegen Grenzen von PWAs (große Downloads, Hintergrund-Sync, Push, iOS-Einschränkungen)?

## Bonus

- Stale-While-Revalidate für CSS/JS andenken (Antwort aus Cache, parallel Netz aktualisieren).
- Eigene API-Antwort simulieren: zweite JSON-Datei und andere Strategie zuweisen.
