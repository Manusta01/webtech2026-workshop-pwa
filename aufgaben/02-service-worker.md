# Aufgabe 2: Service Worker registrieren & Precaching

**Ziel:** Einen Service Worker registrieren und die App-Shell beim Install-Event cachen.

**Zeitrahmen:** ca. 25 Minuten  
**Voraussetzung:** Aufgabe 1 (Manifest) erledigt oder parallel möglich

## Hintergrund

Ein **Service Worker** ist ein Skript, das der Browser im Hintergrund verwaltet. Er kann Fetch-Events abfangen und Antworten aus dem **Cache Storage** liefern – Grundlage für Offline-Fähigkeit.

## Schritte

1. Öffnet das vorbereitete Gerüst **`app/sw.js`** und lest es kurz durch (`install` / `activate` / minimaler `fetch`).
2. Ergänzt bei Bedarf die Precache-Liste (z. B. Manifest / weitere Icons).  
   `tips.json` ist vorerst mit dabei – in Aufgabe 3 noch einmal überdenken.
3. Optional: `self.skipWaiting()` bzw. `self.clients.claim()` aktivieren (Zeilen sind als Kommentar vorbereitet).
4. Registriert den Service Worker in `app/index.html` (vor `</body>`, Kommentar ist schon markiert) oder am Ende von `app.js`:

   ```js
   if ("serviceWorker" in navigator) {
     navigator.serviceWorker.register("./sw.js");
   }
   ```

5. Strategien (Cache-First / Network-First) kommen erst in Aufgabe 3 – der minimale `fetch`-Handler in `app/sw.js` reicht hier.

## Prüfen

1. Hard-Reload der Seite.
2. DevTools → **Application** → **Service Workers**: Status *activated*.
3. **Cache Storage**: euer Cache-Name enthält die precachten Dateien.
4. Offline schalten (DevTools → Network → Offline) und Seite neu laden: Shell sollte noch erscheinen.

## Reflexionsfragen

- Warum muss der Service Worker über **HTTP(S)** ausgeliefert werden (nicht `file://`)?
- Was passiert, wenn ihr `sw.js` ändert, aber den Cache-Namen nicht erhöht?

## Tipps

- Fehler in `sw.js` erscheinen in der Console der **Service-Worker**-Inspektion (Link neben dem Worker in Application).
- Nach Änderungen: „Update on reload“ in DevTools aktivieren oder Cache + Worker manuell unregister/clearen.
