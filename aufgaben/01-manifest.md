# Aufgabe 1: Web App Manifest & Installierbarkeit

**Ziel:** FocusBoard so erweitern, dass der Browser sie als installierbare App erkennt.

**Zeitrahmen:** ca. 20 Minuten

## Hintergrund

Das **Web App Manifest** ist eine JSON-Datei, die u. a. Namen, Icons, Start-URL und Display-Modus beschreibt. Ohne gültiges Manifest (plus Icons und sicheren Kontext) erscheint in Chromium typischerweise kein Install-Prompt.

## Schritte

1. Lege unter `app/` die Datei `manifest.webmanifest` an.
2. Fülle mindestens folgende Felder:
   - `name` und `short_name`
   - `start_url` (z. B. `./` oder `./index.html`)
   - `display`: `"standalone"`
   - `background_color` und `theme_color` (passend zur App, z. B. `#0f3d3e`)
   - `icons` mit mindestens **192×192** und **512×512**  
     (vorhanden: `icons/icon-192.svg`, `icons/icon-512.svg` – `type: "image/svg+xml"`)
3. Verlinke das Manifest in `app/index.html` im `<head>`:

   ```html
   <link rel="manifest" href="./manifest.webmanifest" />
   ```

4. Stelle sicher, dass `theme-color` in der HTML-Meta und im Manifest zusammenpassen.

## Prüfen

1. App neu laden (`npm start` → localhost).
2. Chrome DevTools → **Application** → **Manifest**: Einträge sollten fehlerfrei erscheinen.
3. In der Adressleiste (Desktop) oder über das Browser-Menü nach **App installieren** / Install-Icon suchen.

## Reflexion

- Welche Felder sind für die Installierbarkeit kritisch, welche eher UX (Name, Farben)?
- Was ändert `display: "standalone"` gegenüber dem normalen Tab?

## Bonus

- `description` und `id` ergänzen (siehe [Richer Install UI](https://web.dev/patterns/web-apps/richer-install-ui)).
- `display_override` oder `screenshots` ausprobieren (optional, nicht nötig für den Workshop-Kern).
