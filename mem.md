
# Project Memory & Developer Profile

## 1. Project Context: Rleaf (Opservatorij)
**Overview:** A React/Vite application for visualizing landscape data (specifically the Banija region in Croatia).
**Tech Stack:**
- **Framework:** React 18, Vite, TypeScript
- **Maps:** Leaflet, React-Leaflet, Leaflet-Geoman, Leaflet-WMS
- **State Management:** Redux Toolkit
- **UI/Styling:** SCSS (.sass indented syntax), FontAwesome, Framer Motion
- **Deployment:** Linux VPS (Apache/Nginx), aiming for clean URLs via rewrites.

### Key Configuration (from opservatorij25.md)
- **Region:** Banija (Zoom 8-18)
- **Base Layers:** Reljef, ESRI World Imagery
- **Overlays:** Fiksni elementi (Always on), Kartografija CB/DOF
- **WMS Layers:** Land use, Nature protection, Wooden architecture, Photo catalog
- **API Endpoints:**
    - Server: `https://server.croatianlandscape.hr`
    - Client: `https://client.croatianlandscape.hr`

## 2. Developer Profile (User to Fill)

### Projects to Study
*Add your reference projects here. I will analyze them to understand your preferred coding style.*

- **Project Name:** [e.g., My GIS Dashboard]
  - **Location:** [e.g., /home/user/projects/gis-dash or https://github.com/user/gis-dash]
  - **Key Patterns:** [e.g., "Check how I handle Leaflet popups" or "Look at the custom hooks"]
  - **Description:** [Brief context about the project]

- **Project Name:** 
  - **Location:** 
  - **Key Patterns:** 
  - **Description:** 

### Skills & Preferences
*Help me tailor my code generation to your level and style.*

- **Core Stack:** [e.g., React, TS, Node]
- **Expertise Level:** [e.g., Senior Frontend, Junior Backend]
- **Specific Focus:** [e.g., "I want to learn Three.js" or "Keep CSS simple"]
- **Preferred Tools:** VS Code (Insiders), Linux

## 3. Important Conventions & Architecture

### File Structure Patterns
- **Components:** `src/components/Name/Name.tsx` + `Name.sass` (Co-located styles).
- **Services:** `src/services/feature-name/feature-name.ts` (Functional, isolated utilities).
- **Redux:** 
  - Slices: `src/redux/rtk/` (State logic)
  - API: `src/redux/api/` (RTK Query definitions)
- **Maps:** `src/maps/karta/` contains the core mapping logic and custom Leaflet components.

### Map Configuration (Banija Region)
- **Legend Handling:** Custom JSON legends are fetched from QGIS WMS (`GetLegendGraphic`) and rendered via `CustomLayersControl.tsx`.
- **Tilesets:**
  - *Reljef:* `https://landscape.agr.hr/tiles/banija_reljef_light/{z}/{x}/{y}.jpg`
  - *Fiksni elementi:* `https://landscape.agr.hr/tiles/banija_fiksni_elementi/{z}/{x}/{y}.png`
  - *Kartografija CB:* `https://landscape.agr.hr/tiles/banija_kartografija_cb/{z}/{x}/{y}.png`
  - *Kartografija DOF:* `https://landscape.agr.hr/tiles/banija_kartografija_dof/{z}/{x}/{y}.png`
- **WMS Layers:** Land use, Nature protection, Wooden architecture, Photo catalog (via `https://landscape.agr.hr/qgis`).

### Deployment & Routing
- **Server:** Linux VPS (Apache/Nginx).
- **Routing:** Client-side routing (React Router) requires server-side rewrites (try_files / index.html).
- **API:** Client (`client.croatianlandscape.hr`) talks to Server (`server.croatianlandscape.hr`).
- **Environment Variables:** Vite handles `.env` files automatically. Do NOT import `dotenv` in client-side code (it causes browser crashes).
- **TypeScript & Timers:** Use `ReturnType<typeof setTimeout>` instead of `NodeJS.Timeout` in browser-side code to avoid type errors or missing node types.

### Linux/Wayland Troubleshooting
- **Mouse Offset Issue:** If clicking in VS Code (Linux) selects the wrong line or the UI flickers, it's likely an XWayland fractional scaling issue.
  - **Fix:** Enable native Wayland support in `~/.vscode-insiders/argv.json` (or `~/.vscode/argv.json`):
    ```json
    "ozone-platform-hint": "auto",
    "password-store": "gnome-libsecret"
    ```
