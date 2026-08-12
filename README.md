# FLOCK Network — Public Map

3D globe visualization of **106,308 Flock Safety camera locations** across the United States, built with [globe.gl](https://globe.gl).

## Data

- **Source:** [DeFlock](https://deflock.org) / [dontgetflocked.com](https://dontgetflocked.com) crowdsourced ALPR map
- **License:** © OpenStreetMap contributors & DeFlock — **ODbL** ([full copyright](https://www.openstreetmap.org/copyright))
- **Nature:** Crowdsourced and volunteer-mapped from FOIA requests and public records. **Not exhaustive**, not official, and **not affiliated with or endorsed by Flock Safety**.

## Features

- 106,308 public Flock camera locations as points on a 3D globe
- Density (hexbin) heat view toggle
- Click a point to zoom; drag to rotate; scroll to zoom
- Dark ops-dashboard aesthetic

## Local use

```bash
python3 -m http.server 8198
# open http://localhost:8198
```

No build step — plain HTML + JS, data inlined in `flock_points.js`.

## License

Visualization code: MIT. Data: ODbL (attribution above).
