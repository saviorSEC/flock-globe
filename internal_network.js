// INTERNAL NETWORK — Flock Safety infrastructure topology
// Source: passive OSINT (crt.sh certificate transparency, DNS resolution, frontend analysis)
// RFC1918 addresses shown are NOT routable from the internet. For research visualization only.
const FLOCK_INT = {
  "zones": [
    { "id": "z-edge", "name": "EDGE // CLOUDFLARE", "color": "#00ffaa", "note": "104.18.16.189 / 104.18.17.189 — WAF front for user-facing apps" },
    { "id": "z-aws", "name": "AWS // ELB DIRECT", "color": "#ffb020", "note": "Direct AWS load balancers — no Cloudflare" },
    { "id": "z-gov", "name": "GOVCLOUD", "color": "#ff6b6b", "note": "*.gov.flocksafety.com — separate GovCloud cert chain" },
    { "id": "z-ops", "name": "OPS", "color": "#ffd166", "note": "*.ops.flocksafety.com — VPN & internal ops" },
    { "id": "z-dev", "name": "DEV", "color": "#a78bfa", "note": "dev-* environments — 10+ subdomains" },
    { "id": "z-saas", "name": "SAAS // THIRD-PARTY", "color": "#00d0ff", "note": "Auth0, Salesforce, ReadMe, Atlassian, Grafana, Tableau, Datadog..." },
    { "id": "z-k8s", "name": "K8S // CLUSTER", "color": "#f472b6", "note": "Kubernetes internal DNS — svc.cluster.local" },
    { "id": "z-int", "name": "INTERNAL IP POOLS", "color": "#94a3b8", "note": "RFC1918 addresses leaked via DNS — not routable" }
  ],
  "services": [
    // ---- Edge / Cloudflare ----
    { "id": "s-users", "name": "users.flocksafety.com", "zone": "z-edge", "role": "User-facing web app", "dns": ["104.18.16.189", "104.18.17.189"], "note": "Cloudflare WAF" },
    { "id": "s-app", "name": "app.flocksafety.com", "zone": "z-edge", "role": "User-facing web app", "dns": ["104.18.16.189", "104.18.17.189"], "note": "Cloudflare WAF" },
    { "id": "s-admin", "name": "admin.flocksafety.com", "zone": "z-edge", "role": "Admin console", "dns": ["104.18.16.189", "104.18.17.189"], "note": "Cloudflare WAF" },
    { "id": "s-api", "name": "api.flocksafety.com", "zone": "z-edge", "role": "Core API — M2M audience", "dns": ["104.18.16.189", "104.18.17.189"], "note": "OIDC audience: https://api.flocksafety.com/" },
    { "id": "s-integrations", "name": "integrations.flocksafety.com", "zone": "z-edge", "role": "Integrations API", "dns": ["104.18.16.189", "104.18.17.189"] },
    { "id": "s-search", "name": "search-api.flocksafety.com", "zone": "z-edge", "role": "Search API", "dns": ["104.18.16.189", "104.18.17.189"] },
    { "id": "s-id", "name": "id.flocksafety.com", "zone": "z-edge", "role": "Identity", "dns": ["104.18.16.189", "104.18.17.189"] },
    { "id": "s-login", "name": "login.flocksafety.com", "zone": "z-edge", "role": "Login — Auth0 alias", "dns": ["104.18.16.189", "104.18.17.189"], "note": "Alias of flocksafety.auth0.com — same JWKS" },
    { "id": "s-nova", "name": "nova.flocksafety.com", "zone": "z-edge", "role": "Nova platform", "note": "SSL handshake error 525 — restricted access / possible mTLS" },
    { "id": "s-planner", "name": "planner.flocksafety.com", "zone": "z-edge", "role": "Flock Planning Center — React SPA (deployment planner)" },
    { "id": "s-jack", "name": "jack.flocksafety.com", "zone": "z-edge", "role": "Camera Manager API backend", "note": "Codename: JAGER", "endpoints": ["/api/v1/crm/location/", "/api/v1/crm/opportunity/", "/api/v1/crm/opportunity/search", "/api/v1/crm/asset?serial=", "/api/v2/crm/asset", "/api/v1/device/", "/api/v1/device/search", "/api/v1/devices/", "/api/v1/device-logs/", "/api/v2/device/", "/api/v1/tunnels/", "/api/v1/tunnels/device/", "/api/v1/devices/nearby/installer?latitude="] },
    { "id": "s-grenadine", "name": "grenadine.flocksafety.com", "zone": "z-edge", "role": "BFF (Backend for Frontend) API" },
    // ---- AWS direct ----
    { "id": "s-jameson", "name": "jameson.flocksafety.com", "zone": "z-aws", "role": "Internal tool", "dns": ["CNAME → external-bw.flocksafety.com"], "note": "No Cloudflare — direct AWS" },
    { "id": "s-bw", "name": "external-bw.flocksafety.com", "zone": "z-aws", "role": "AWS ELB", "note": "No Cloudflare — direct AWS" },
    { "id": "s-bwdev", "name": "external-bw.dev.flocksafety.com", "zone": "z-aws", "role": "AWS ELB (dev)" },
    { "id": "s-prom", "name": "prometheus.flocksafety.com", "zone": "z-aws", "role": "Prometheus monitoring", "dns": ["CNAME → internal-prod-int-pfucp-prometheus-19799892.us-east-1.elb.amazonaws.com"], "note": "Leaks 4x RFC1918 addresses via DNS" },
    // ---- GovCloud ----
    { "id": "s-dbproxy", "name": "prod-dbproxy.gov.flocksafety.com", "zone": "z-gov", "role": "GovCloud production DB proxy", "note": "Separate GovCloud cert chain" },
    { "id": "s-govtest", "name": "blahtest*.gov.flocksafety.com", "zone": "z-gov", "role": "GovCloud test" },
    { "id": "s-gov", "name": "*.gov.flocksafety.com", "zone": "z-gov", "role": "GovCloud infra (6+ subdomains)" },
    // ---- Ops ----
    { "id": "s-vpntest", "name": "vpn-test.ops.flocksafety.com", "zone": "z-ops", "role": "Ops VPN (test)", "cert": "Amazon RSA 2048 M02 (2025-11-22)" },
    { "id": "s-ops", "name": "*.ops.flocksafety.com", "zone": "z-ops", "role": "Internal ops (7+ subdomains)" },
    // ---- Dev ----
    { "id": "s-devnova", "name": "dev-nova.flocksafety.com", "zone": "z-dev", "role": "Dev Nova", "cert": "Amazon RSA 2048 M02 (2025-11-22)", "note": "Cloudflare error 1016 — origin DNS resolution failure" },
    { "id": "s-devjameson", "name": "dev-jameson.flocksafety.com", "zone": "z-dev", "role": "Dev internal tool", "dns": ["CNAME → external-bw.dev.flocksafety.com"] },
    { "id": "s-devops2", "name": "hello-devops2.flocksafety.com", "zone": "z-dev", "role": "Okta testing", "cert": "Amazon RSA 2048 M02 (2025-11-22)" },
    // ---- Internal services (codenames) ----
    { "id": "s-jager", "name": "jager", "zone": "z-dev", "role": "Camera Manager app codename" },
    { "id": "s-gimlet", "name": "gimlet", "zone": "z-dev", "role": "Internal service codename" },
    { "id": "s-cognac", "name": "cognac", "zone": "z-dev", "role": "Internal API", "note": "OIDC audience: com.flocksafety.cognac-api" },
    // ---- Internal DNS / K8s ----
    { "id": "s-gimletint", "name": "gimlet-internal.flocksafety.com", "zone": "z-int", "role": "Internal service DNS", "note": "Leaks 4x RFC1918 addresses" },
    { "id": "s-streamint", "name": "stream-service-internal.flocksafety.com", "zone": "z-int", "role": "Stream service internal DNS", "note": "Same leaked pool as gimlet-internal" },
    { "id": "s-devgimlet", "name": "dev-gimlet-internal.flocksafety.com", "zone": "z-int", "role": "Dev gimlet internal DNS", "note": "Leaks 4x 10.12.x.x addresses" },
    { "id": "s-jamesonint", "name": "jameson-internal.flocksafety.com", "zone": "z-k8s", "role": "Internal DNS", "note": "CNAME → jameson.default.svc.cluster.local" },
    { "id": "s-k8s", "name": "jameson.default.svc.cluster.local", "zone": "z-k8s", "role": "Kubernetes service DNS" },
    // ---- SaaS ----
    { "id": "s-auth0", "name": "flocksafety.auth0.com", "zone": "z-saas", "role": "Auth0 tenant (prod-flock-device)", "keys": ["SPA client: wzFDtwtSSJzXBzQd7Wbc5sQjmG3PS83c", "JWKS: 2x RSA-256 (issuer CN=prod-flock.auth0.com)"], "note": "Device tenant: prod-flock-device" },
    { "id": "s-help", "name": "help.flocksafety.com", "zone": "z-saas", "role": "Salesforce" },
    { "id": "s-docs", "name": "docs.flocksafety.com", "zone": "z-saas", "role": "ReadMe docs" },
    { "id": "s-status", "name": "status.flocksafety.com", "zone": "z-saas", "role": "Atlassian status page" },
    { "id": "s-grafana", "name": "flocksafety.grafana.net", "zone": "z-saas", "role": "Grafana Cloud (us-central)", "note": "Device health dashboard: /d/bilKcMIVk/device-health-timeseries — auth required" },
    { "id": "s-tableau", "name": "us-east-1.online.tableau.com", "zone": "z-saas", "role": "Tableau" },
    { "id": "s-dd", "name": "Datadog (devices app)", "zone": "z-saas", "role": "RUM/monitoring", "keys": ["app id: 3911fc69-75d4-4599-bbde-f3cd5df1eb56", "client token: pubda47a8a2391ba25b9af8c1f000d1cc54"] },
    { "id": "s-dd2", "name": "Datadog (camera mgr)", "zone": "z-saas", "role": "RUM/monitoring", "keys": ["app id: dbcd4459-72d8-4bc7-92b7-da377590a086", "client token: pub37ebf5528da71715fd2505f89559a64d"] },
    { "id": "s-segment", "name": "Segment", "zone": "z-saas", "role": "Analytics", "keys": ["camera manager key: EG2u2hLdqtlP5MnuRg4HSGMbyGHfGAc3"] },
    { "id": "s-beamer", "name": "app.getbeamer.com", "zone": "z-saas", "role": "Changelog / updates widget" },
    { "id": "s-peregrine", "name": "app.peregrine.io", "zone": "z-saas", "role": "Third-party integration (unknown purpose)" }
  ],
  "ipPools": [
    { "id": "i-192-prom", "name": "192.168.x.x pool A", "role": "prometheus.flocksafety.com origin", "ips": ["192.168.51.28", "192.168.98.168", "192.168.180.129", "192.168.247.120"] },
    { "id": "i-192-gim", "name": "192.168.x.x pool B", "role": "gimlet / stream-service origins", "ips": ["192.168.53.239", "192.168.122.153", "192.168.185.156", "192.168.242.35"] },
    { "id": "i-10-dev", "name": "10.12.x.x pool", "role": "dev-gimlet origins", "ips": ["10.12.128.154", "10.12.187.160", "10.12.207.232", "10.12.228.115"] },
    { "id": "i-cf", "name": "104.18.16.189/17.189", "role": "Cloudflare edge", "ips": ["104.18.16.189", "104.18.17.189"] }
  ],
  "links": [
    // service -> zone
    ["s-users", "z-edge"], ["s-app", "z-edge"], ["s-admin", "z-edge"], ["s-api", "z-edge"],
    ["s-integrations", "z-edge"], ["s-search", "z-edge"], ["s-id", "z-edge"], ["s-login", "z-edge"],
    ["s-nova", "z-edge"], ["s-planner", "z-edge"], ["s-jack", "z-edge"], ["s-grenadine", "z-edge"],
    ["s-jameson", "z-aws"], ["s-bw", "z-aws"], ["s-bwdev", "z-aws"], ["s-prom", "z-aws"],
    ["s-dbproxy", "z-gov"], ["s-govtest", "z-gov"], ["s-gov", "z-gov"],
    ["s-vpntest", "z-ops"], ["s-ops", "z-ops"],
    ["s-devnova", "z-dev"], ["s-devjameson", "z-dev"], ["s-devops2", "z-dev"],
    ["s-jager", "z-dev"], ["s-gimlet", "z-dev"], ["s-cognac", "z-dev"],
    ["s-gimletint", "z-int"], ["s-streamint", "z-int"], ["s-devgimlet", "z-int"],
    ["s-jamesonint", "z-k8s"], ["s-k8s", "z-k8s"],
    ["s-auth0", "z-saas"], ["s-help", "z-saas"], ["s-docs", "z-saas"], ["s-status", "z-saas"],
    ["s-grafana", "z-saas"], ["s-tableau", "z-saas"], ["s-dd", "z-saas"], ["s-dd2", "z-saas"],
    ["s-segment", "z-saas"], ["s-beamer", "z-saas"], ["s-peregrine", "z-saas"],
    // infra edges
    ["z-edge", "i-cf"], ["s-prom", "i-192-prom"], ["s-gimletint", "i-192-gim"],
    ["s-streamint", "i-192-gim"], ["s-devgimlet", "i-10-dev"],
    // service relationships
    ["s-jameson", "s-bw"], ["s-devjameson", "s-bwdev"], ["s-jamesonint", "s-k8s"],
    ["s-jameson", "s-jamesonint"], ["s-login", "s-auth0"], ["s-jager", "s-jack"],
    ["s-grenadine", "s-jack"], ["s-jack", "s-cognac"], ["s-jack", "s-dd2"],
    ["s-jager", "s-grafana"], ["s-jager", "s-dd"], ["s-jack", "s-segment"], ["s-planner", "s-beamer"]
  ]
};
