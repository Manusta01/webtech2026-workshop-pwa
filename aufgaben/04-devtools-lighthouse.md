# Aufgabe 4: DevTools, Cache Storage & Lighthouse

**Ziel:** Die PWA systematisch analysieren und typische Fehlerquellen finden.

**Zeitrahmen:** ca. 15 Minuten  
**Voraussetzung:** Aufgaben 1–3 weitgehend fertig

## Schritte

### A) Application-Panel

1. DevTools → **Application**:
   - Manifest: Icons, `start_url`, Fehler/Warnungen
   - Service Workers: Status, Update, Bypass
   - Cache Storage: Inhalt eures Caches prüfen
2. Einen Cache-Eintrag manuell löschen und das Verhalten der App beobachten.
3. Service Worker **Unregister** → Seite neu laden → erneut registrieren. Was ändert sich?

### B) Offline & Network

1. Network → **Offline**, Hard-Reload.
2. Welche Requests schlagen fehl, welche kommen aus dem Service Worker (`from ServiceWorker`)?
3. Online zurück: Network-First für `tips.json` – erscheint der Request im Network-Tab?

### C) Lighthouse

1. DevTools → **Lighthouse** → Kategorie **Progressive Web App** (ggf. unter Best Practices / Installable je nach Chrome-Version).
2. Audit auf Desktop (oder Mobile) gegen `http://localhost:3000` laufen lassen.
3. Mindestens zwei Hinweise aus dem Report notieren und – wenn machbar – beheben (z. B. fehlendes Icon, Manifest-Feld, Offline-Start).

### D) Kamera-Berechtigung (optional, ~3 Min.)

1. In FocusBoard **Kamera starten** – Browser-Permission-Dialog beobachten.
2. Statuszeile „Berechtigung: …“ und DevTools → **Site settings** / Schloss-Icon prüfen.
3. Zugriff verweigern oder widerrufen, erneut starten – welche Fehlermeldung erscheint?
4. Kurz notieren: Warum braucht `getUserMedia` einen Secure Context (wie Service Worker)?

## Checkliste „fertig“

- [ ] Manifest verlinkt und in Application sichtbar
- [ ] Installieren (Desktop oder Android/Chrome) möglich oder klar begründet, warum nicht
- [ ] Service Worker aktiv, Shell offline erreichbar
- [ ] Unterschiedliche Strategie für Tipp vs. Shell nachvollziehbar
- [ ] Lighthouse einmal durchgelaufen
