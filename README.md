# Lösung Aufgabe 3 – Caching-Strategien

Branch: `solution-aufgabe-03`

App-Dateien: [`app/`](./app/)

Baut auf Aufgabe 2 auf und ersetzt die Fetch-Logik:

- Cache-Name `focusboard-shell-v2`
- **Cache-First** für die App-Shell
- **Network-First** für `data/tips.json`
- `tips.json` nicht mehr im reinen Precache der Shell (wird bei Bedarf nachgeladen/gecacht)

```bash
git switch solution-aufgabe-03
npm start
```
