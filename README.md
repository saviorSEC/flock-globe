# Church of Malware Presents

## FLOCK NETWORK — Public Map

Multi-view operations dashboard mapping the public Flock Safety camera network and the infrastructure that runs it. Plain HTML + JS, no build step. Built with [globe.gl](https://globe.gl) for the 3D views.

## Views

The app is organized as four tabs, with the internal topology view as the landing page:

- **Internal** (landing) — Flock Safety infrastructure topology: 87-subdomain inventory, VPC/IP pools, deployment architecture (EKS, S3, RDS, ElastiCache, SQS), GovCloud, and monitoring stack
- **Network layer** — the public camera network rendered as a network-layer map
- **Internal+Network** — end-to-end flow visualization: camera fleet, edge, API gateway, core, data, GovCloud
- **Globe** — 106,308 public Flock camera locations as points on a 3D globe, with a density (hexbin) heat view toggle

## Data

- **Public camera data:** [DeFlock](https://deflock.org) / [dontgetflocked.com](https://dontgetflocked.com) crowdsourced ALPR map
- **License:** © OpenStreetMap contributors & DeFlock — **ODbL** ([full copyright](https://www.openstreetmap.org/copyright))
- **Nature:** Crowdsourced and volunteer-mapped from FOIA requests and public records. **Not exhaustive**, not official, and **not affiliated with or endorsed by Flock Safety**
- **Infrastructure views:** assembled from open-source intelligence — public subdomain enumeration and open records

## Features

- 106,308 public Flock camera locations as points on a 3D globe
- Density (hexbin) heat view toggle
- Infrastructure topology graph with 87-subdomain inventory
- End-to-end camera-to-cloud flow visualization
- Dark ops-dashboard aesthetic
- Mobile responsive: compact tabs, stacked HUD, bottom-sheet detail panels

## Local use

```bash
python3 -m http.server 8198
# open http://localhost:8198
```

No build step — plain HTML + JS, data inlined in `flock_points.js`.

## License

Visualization code: MIT. Data: ODbL (attribution above).
