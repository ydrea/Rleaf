Evo rješenja za oba zadatka, točno onako kako si zamislio.

---

## 0. Jest mock za testiranje karte

Budući da `react-leaflet` i `leaflet` koriste DOM i mjerenja koja Jest ne može izvesti bez pravog preglednika, potrebno je mockati ih. U rootu projekta (ili u `src/__mocks__`) kreiraj datoteku `leafletMocks.js`:

```javascript
// src/__mocks__/leafletMocks.js

// Mock za leaflet
jest.mock('leaflet', () => {
  const mockMap = {
    on: jest.fn(),
    off: jest.fn(),
    flyTo: jest.fn(),
    getContainer: jest.fn(() => document.createElement('div')),
    getSize: jest.fn(() => ({ x: 800, y: 600 })),
    latLngToContainerPoint: jest.fn(() => ({ x: 400, y: 300 })),
    getBounds: jest.fn(() => ({
      getSouthWest: () => ({ lat: 45, lng: 16 }),
      getNorthEast: () => ({ lat: 46, lng: 17 }),
    })),
    closePopup: jest.fn(),
  }

  const mockLayer = {
    addTo: jest.fn().mockReturnThis(),
    on: jest.fn(),
    off: jest.fn(),
  }

  return {
    __esModule: true,
    default: {
      map: jest.fn(() => mockMap),
      tileLayer: jest.fn(() => mockLayer),
      marker: jest.fn(() => mockLayer),
      divIcon: jest.fn(() => ({ options: {} })),
      latLng: jest.fn((lat, lng) => ({ lat, lng })),
      popup: jest.fn(() => ({
        setLatLng: jest.fn().mockReturnThis(),
        setContent: jest.fn().mockReturnThis(),
        openOn: jest.fn(),
      })),
      CRS: {
        EPSG3857: {
          project: jest.fn((latlng) => ({ x: latlng.lng * 1000, y: latlng.lat * 1000 })),
        },
      },
      Util: {
        getParamString: jest.fn(() => '?mocked=true'),
      },
      TileLayer: {
        WMS: {
          extend: jest.fn((obj) => obj),
          prototype: {
            onAdd: jest.fn(),
            onRemove: jest.fn(),
          },
        },
      },
    },
  }
})

// Mock za react-leaflet
jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }) => <div data-testid="map-container">{children}</div>,
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ children }) => <div data-testid="marker">{children}</div>,
  Popup: ({ children }) => <div data-testid="popup">{children}</div>,
  LayersControl: Object.assign(
    ({ children }) => <div data-testid="layers-control">{children}</div>,
    {
      BaseLayer: ({ children }) => <div data-testid="base-layer">{children}</div>,
      Overlay: ({ children }) => <div data-testid="overlay">{children}</div>,
    }
  ),
  ZoomControl: () => <div data-testid="zoom-control" />,
  useMap: () => mockMap,
}))

// Mock za react-leaflet-cluster
jest.mock('react-leaflet-cluster', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="marker-cluster-group">{children}</div>,
}))
```

Zatim u `jest.config.js` ili `package.json` (u `setupFiles`) dodaj:

```javascript
setupFiles: ['<rootDir>/src/__mocks__/leafletMocks.js'],
```

I u samom testu možeš pisati:

```javascript
import { render, screen } from '@testing-library/react'
import { Karta } from './Karta'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'
import { MemoryRouter } from 'react-router-dom'

test('renders map with markers', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Karta />
      </MemoryRouter>
    </Provider>
  )
  expect(screen.getByTestId('map-container')).toBeInTheDocument()
})
```

---

## 1. Karta preko cijelog ekrana, bez margina, bez skrolanja

Tvoj trenutni `Karta.tsx` ima `<MapContainer style={{ height: '90vh' }}>`, a ispod njega `BlockWithStickyTitle`. Trebamo:
- Ukloniti `BlockWithStickyTitle` i zamijeniti ga s gumbom "O karti" koji otvara bočni panel.
- Postaviti kartu da zauzme cijeli prostor ispod navigacije, bez margina.
- Onemogućiti vertikalni scroll na stranici.
- Onemogućiti zoom kotačićem bez Ctrl (to već imaš u `GestureHandling`, samo trebaš ukloniti `map.scrollWheelZoom.enable()` — vidi dolje).
- Dodati gumb "O karti" u gornji lijevi kut karte.
- Dodati bočni panel s uvodnim tekstom.

### 1.1. Izmjena `Karta.tsx`

Zamijeni `return` dio tako da izgleda ovako:

```tsx
return (
  <div className="karta-wrapper">
    <MapContainer
      center={[45.2, 16.2]}
      zoom={10}
      minZoom={8}
      maxZoom={28}
      style={{ width: '100%', height: '100%', cursor: 'crosshair' }}
      zoomControl={false}
    >
      <GestureHandling />
      <LayerHandler kartografijeSet={kartografijeSet} onLayersChange={handleLayersChange} />
      <ZoomControl position="bottomright" />

      <MapZoomer position={popupPosition} />

      <CustomLayersControl collapsed={windowWidth < 1248} activeLayers={activeLayers}>
        {/* ... tvoji slojevi ... */}
      </CustomLayersControl>

      {photoId && <SingleMarker />}

      {popupPosition && currentPhoto && (
        <Popup /* ... tvoj popup ... */ />
      )}

      {/* 🔥 Gumb "O karti" */}
      <button
        className="about-map-btn"
        onClick={() => setAboutOpen(true)}
      >
        O karti
      </button>
    </MapContainer>

    {/* 🔥 Bočni panel */}
    {aboutOpen && (
      <div className="about-panel">
        <button
          className="about-panel-close"
          onClick={() => setAboutOpen(false)}
        >
          ×
        </button>
        <h2>Opservatorij krajobraza</h2>
        <p>
          Dobrodošli na interaktivnu kartu "Opservatorija krajobraza". Ova karta predstavlja našu
          kontinuirano nadopunjujuću kolekciju georeferenciranih podataka koja vam omogućuje uvid u
          različite aspekte krajobraza. Upotrijebite alate za odabir podloge, prilagodbu slojeva i
          filtriranje informacija kako biste prilagodili prikaz prema vlastitim istraživačkim
          potrebama.
        </p>
      </div>
    )}
  </div>
)
```

Dodaj `const [aboutOpen, setAboutOpen] = useState(false)` na vrh komponente.

### 1.2. CSS (u `Karta.sass`)

```sass
html, body, #root
  height: 100%
  margin: 0
  padding: 0
  overflow: hidden

.karta-wrapper
  position: relative
  width: 100%
  height: calc(100vh - 80px) // prilagodi visinu navigacije (80px je primjer)
  overflow: hidden

  .leaflet-container
    width: 100%
    height: 100%

.about-map-btn
  position: absolute
  top: 10px
  left: 10px
  z-index: 1000
  padding: 8px 12px
  background: white
  border: 1px solid #ccc
  border-radius: 4px
  cursor: pointer
  font-size: 14px
  box-shadow: 0 2px 6px rgba(0,0,0,0.2)

  &:hover
    background: #f0f0f0

.about-panel
  position: absolute
  top: 0
  left: 0
  width: 300px
  height: 100%
  background: white
  box-shadow: 2px 0 10px rgba(0,0,0,0.2)
  z-index: 1100
  padding: 20px
  overflow-y: auto
  transition: transform 0.3s ease

  .about-panel-close
    position: absolute
    top: 10px
    right: 10px
    background: none
    border: none
    font-size: 24px
    cursor: pointer
    color: #333
```

### 1.3. Uklanjanje zoom-a kotačićem bez Ctrl

U `GestureHandling` komponenti, **ukloni** liniju `map.scrollWheelZoom.enable()`. Trenutno tvoj kod radi ovako:

```tsx
el.addEventListener('wheel', onWheel)
map.scrollWheelZoom.enable() // ovo omogućuje zoom kotačićem
```

Ako želiš da kotačić **ništa ne radi** (osim s Ctrl), samo **ne pozivaj** `map.scrollWheelZoom.enable()`. Time ćeš onemogućiti zoom kotačićem u cijelosti, a `onWheel` će i dalje prikazivati poruku "Zumirajte kartu uz Ctrl/Cmd + kotačić miša".

Alternativno, ako želiš da kotačić **radi zumiranje samo s Ctrl**, trebaš u `onWheel` provjeriti `e.ctrlKey` i ručno pozvati `map.zoomIn()`/`map.zoomOut()`. Ali najlakše je samo ne pozivati `map.scrollWheelZoom.enable()`.

### 1.4. Uklanjanje `BlockWithStickyTitle` iz `Karta.tsx`

Obriši `<BlockWithStickyTitle title='Mape'>...</BlockWithStickyTitle>` na dnu. Također ukloni import ako ti više ne treba.

### 1.5. Uklanjanje margina iz `Karta.sass`

Provjeri da `.map` i `#map-container` nemaju margine:

```sass
.map
  margin: 0
  padding: 0

#map-container
  margin: 0
  padding: 0
```

Ako imaš `container` klasu oko karte, ukloni je ili postavi `padding: 0`.

---

## Sažetak promjena

1. **Jest mock** – kreiraj `src/__mocks__/leafletMocks.js` i dodaj u `setupFiles`.
2. **Karta preko cijelog ekrana** – postavi `karta-wrapper` s `height: calc(100vh - visina navigacije)`, ukloni `BlockWithStickyTitle`, ukloni margine.
3. **Gumb "O karti"** – dodaj unutar `<MapContainer>` u gornji lijevi kut.
4. **Bočni panel** – dodaj unutar `karta-wrapper`, prikazuje se na klik gumba.
5. **Onemogući zoom kotačićem bez Ctrl** – ukloni `map.scrollWheelZoom.enable()` iz `GestureHandling`.

Ako želiš da panel bude "overlay" preko karte (kao što je sada zamišljeno), on se prikazuje preko karte s `position: absolute` i `left: 0`, a karta ostaje ispod. Ako želiš da se karta smanji kad se panel otvori, možeš dodati klasu na `karta-wrapper` koja pomiče kartu udesno, ali to je složenije – ovako je najjednostavnije.

======================================================================


# apache + node

## Table of Contents

<details>

   <summary>Contents</summary>

   1. [alter](#alter)
1. [to VPS](#to-vps)

</details>
1. Update your React .env.production
env
VITE_SERVER_PUB=https://server.croatianlandscape.hr/public
VITE_API_URL=https://server.croatianlandscape.hr
2. Configure Apache for your React app
Create/edit /etc/apache2/sites-available/client.croatianlandscape.hr.conf:

apache
<VirtualHost *:80>
    ServerName client.croatianlandscape.hr
    ServerAlias www.client.croatianlandscape.hr
    
    # Your React build folder
    DocumentRoot /var/www/client.croatianlandscape.hr
    
    <Directory /var/www/client.croatianlandscape.hr>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/client_error.log
    CustomLog ${APACHE_LOG_DIR}/client_access.log combined
</VirtualHost>
3. Create .htaccess in your React build folder
At /var/www/client.croatianlandscape.hr/.htaccess:

apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

4. Enable required Apache modules and restart
bash
sudo a2enmod rewrite
sudo a2ensite client.croatianlandscape.hr.conf
sudo systemctl restart apache2
5. Build and deploy your React app

# On your local machine
npm run build
scp -r ./build/* user@your-server:/var/www/client.croatianlandscape.hr/
🔍 Verify It's Working
Your API should respond at:

https://server.croatianlandscape.hr/photos → returns JSON

https://server.croatianlandscape.hr/json_photos → returns GeoJSON

https://server.croatianlandscape.hr/public/BAN-002-91.jpg → returns image

Your React app should respond at:

https://client.croatianlandscape.hr → loads React

https://client.croatianlandscape.hr/photos/BAN-002-91 → shows photo page

https://client.croatianlandscape.hr/maps/BAN-002-91 → shows map with marker

⚠️ Important
The 404 you're getting at https://server.croatianlandscape.hr is normal because your Node server doesn't have a route for / (only /photos, /json_photos, etc.). That's fine!

Your Node server should only respond to specific API endpoints, not serve HTML pages. That's your React app's job on client. subdomain.

This is now a perfect, production-ready architecture:

✅ React client on client. (served by Apache)

✅ Node API on server. (your backend)

✅ Clean separation of concerns

✅ No more routing conflicts

### alter
SOLUTION 1: Apache Configuration (Recommended)
Change the server to support client-side routing

What you add to .htaccess or Apache config:
apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
How it works:
Server checks if the requested URL matches an actual file (.jpg, .js, .css) or folder

If yes → serves that file directly

If no → serves index.html and React Router takes over

✅ Pros:
Clean URLs: https://client.croatianlandscape.hr/photos/BAN-002-91

No hash fragments needed: No #imgcnt or #mapcnt

SEO friendly: Search engines see your actual routes

Better user experience: URLs are meaningful and shareable

One-time fix: Set it once, all routes work forever

Standard practice: This is how 90% of React apps are deployed

❌ Cons:
Requires server access: You need to be able to modify Apache config or upload .htaccess

Hosting dependent: Some cheap hosting might restrict .htaccess overrides

Initial setup: Requires testing to ensure it doesn't break existing file serving

SOLUTION 2: Hash Router (React Router alternative)
Change your client-side routing to work with any server

What you change in your React code:
tsx
// Instead of:
import { BrowserRouter } from 'react-router-dom'

// Use:
import { HashRouter } from 'react-router-dom'

// In your App.tsx:
<HashRouter>
  <Routes>
    <Route path="/photos" element={<Photos />} />
    <Route path="/photos/:photoId" element={<Photo />} />
    <Routeting dependent: Some cheap hosting might restrict .htaccess overrides

Initial setup: Requires testing to ensure it doesn't break existing file serving

SOLUTION 2: Hash Router (React Router alternative)
Chan path="/maps" element={<Karta />} />
    <Route path="/maps/:photoId" element={<Karta />} />
  </Routes>
</HashRouter>
How it works:
URLs use a hash (#) before the route:

https://client.croatianlandscape.hr/#/photos/BAN-002-91

https://client.croatianlandscape.hr/#/maps/BAN-002-91

Everything after # is never sent to the server

Server alwayting dependent: Some cheap hosting might restrict .htaccess overrides

Initial setup: Requires testing to ensure it doesn't break existing file serving

SOLUTION 2: Hash Router (React Router alternative)
Chans sees only: https://client.croatianlandscape.hr/

Server serves index.html for that root path

React Router reads the hash and renders the correct component

✅ Pros:
Works on any server: Even static file hosting (GitHub Pages, S3 buckets)

No server configuration needed: Just upload your build files

Always works: No 404s, ever, because server only sees root path

Simple deployment: Just copy files to server

❌ Cons:
Ugly URLs: The #/ looks unprofessional and technical

Not SEO friendly: Search engines often ignore everything after #

Link sharing issues: Some platforms strip or mishandle hash fragments

Your current code uses BrowserRouter: Would need refactoring

Your existing links with #imgcnt: This is actually a different thing (anchor links), not HashRouter routes. You'd need to change all navigation logic.

Why Your Current #imgcnt Isn't Working
You're currently mixing approaches:

You use BrowserRouter (clean URLs) in your React code

But you're appending #imgcnt to URLs like an anchor link

The server returns 404 because it doesn't serve index.html for /photos/BAN-002-91.jpg

The #imgcnt in your current URL is not doing what you think:

It's just an anchor fragment (scrolls to element with id="imgcnt")

It doesn't help with routing

The server still sees /photos/BAN-002-91.jpg → 404

My Recommendation
🔥 Go with Solution 1 (Apache Config)
Why?

You clearly have Apache access (you can see the server headers)

Your code is already written for clean URLs (BrowserRouter)

Better long-term - professional URLs, SEO, sharing

This is the industry standard for React deployment

Only choose Solution 2 (HashRouter) if:
Your hosting provider blocks .htaccess

You don't have access to Apache configuration

You need to host on static file servers like GitHub Pages

Quick Test:
Before implementing either solution, verify you can add .htaccess:

Create a file called test.txt and upload it to your server root

Try accessing: https://client.croatianlandscape.hr/test.txt

If you can access it, you can upload .htaccess

Based on your server response, you have Apache access and can implement Solution 1 in about 5 minutes. It will permanently fix all your routing issues.

## to VPS

Absolutely! Moving to Nginx is actually a great choice. Here's a complete guide to deploy your React app on a VPS with Nginx.

🚀 Deploy React App to VPS with Nginx
Step 1: Build Your React App
On your local machine:

bash
# Navigate to your project root
cd ~/Documents/Rleaf

# Install dependencies if needed
npm install

# Create production build
npm run build
This creates a build folder (or dist depending on your setup) with all your compiled files.

Step 2: Upload to VPS
bash
# SCP the build folder to your VPS
# Replace with your VPS IP and username
scp -r ./build user@your-vps-ip:/var/www/croatianlandscape.hr

# Or if using a different build folder name
scp -r ./dist user@your-vps-ip:/var/www/croatianlandscape.hr
Step 3: SSH into Your VPS
bash
ssh user@your-vps-ip
Step 4: Install Nginx (if not installed)
Ubuntu/Debian:

bash
sudo apt update
sudo apt install nginx -y
CentOS/RHEL:

bash
sudo yum install nginx -y
Step 5: Configure Nginx for Your React App
Create a new Nginx configuration file:

bash
sudo nano /etc/nginx/sites-available/croatianlandscape.hr
Paste this configuration:

nginx
server {
    listen 80;
    listen [::]:80;
    
    server_name client.croatianlandscape.hr;
    
    root /var/www/croatianlandscape.hr;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # React routes - THIS IS THE KEY PART
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Handle 404 errors
    error_page 404 /index.html;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
}
What this does:

try_files $uri $uri/ /index.html; → Tries to serve the actual file, if not found, serves index.html (your React app)

This solves your routing problem!

Step 6: Enable the Site
bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/croatianlandscape.hr /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# If test passes, reload Nginx
sudo systemctl reload nginx
Step 7: Set Up SSL with Let's Encrypt (HTTPS)
bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d client.croatianlandscape.hr

# Follow the prompts
Certbot will automatically update your Nginx config for HTTPS.

Step 8: Set Proper Permissions
bash
# Set ownership
sudo chown -R www-data:www-data /var/www/croatianlandscape.hr

# Set permissions
sudo chmod -R 755 /var/www/croatianlandscape.hr
📁 Alternative: Using Docker
If you prefer Docker, create a Dockerfile in your project root:

dockerfile
# Dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
And nginx.conf:

nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
Build and run:

bash
docker build -t croatianlandscape-client .
docker run -d -p 80:80 --name client-app croatianlandscape-client
✅ Verification Checklist
After deployment, test these URLs:

Homepage: https://client.croatianlandscape.hr → Should load React app

Photo page: https://client.croatianlandscape.hr/photos/BAN-002-91 → Should show specific photo

Map page: https://client.croatianlandscape.hr/maps/BAN-002-91 → Should show map with marker

Static assets: https://client.croatianlandscape.hr/static/js/main.xyz.js → Should load (200)

Non-existent route: Should still show your React app, not 404

🔧 Troubleshooting
If you get 403 Forbidden:

bash
# Check permissions
sudo chmod 755 /var/www
sudo chmod 755 /var/www/croatianlandscape.hr
If routes still don't work:

bash
# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Check access logs
sudo tail -f /var/log/nginx/access.log
If environment variables aren't working:
Your React build includes environment variables at build time. Make sure .env.production has the correct values before running npm run build.

🎯 Summary
The key line that solves your routing problem is:

nginx
location / {
    try_files $uri $uri/ /index.html;
}
This does the same job as the Apache .htaccess solution, but it's cleaner and more performant with Nginx. Your React Router will work perfectly with clean URLs, no hashes needed.

Your URLs will be:

✅ https://client.croatianlandscape.hr/photos/BAN-002-91

✅ https://client.croatianlandscape.hr/maps/BAN-002-91

No more #imgcnt or #mapcnt needed!

this doesn't exist in my folder structure! and it shouldn't as far as i see... 
✅ https://client.croatianlandscape.hr/maps/BAN-002-91
Reading
Reading
You're absolutely right to question this! The URL https://client.croatianlandscape.hr/maps/BAN-002-91 should not exist as a physical file in your folder structure - that's exactly the point of client-side routing.

The fact that it returns 404 confirms that Nginx is not yet configured to handle React Router paths. Your server is looking for a physical file at that path and not finding it.

🔍 What's Happening
What you have	What you need
Nginx serves files only from disk	Nginx serves index.html for all routes
/maps/BAN-002-91 → looks for file → 404	/maps/BAN-002-91 → serves index.html → React Router shows map
Static files work (JS, CSS, images)	Dynamic routes don't work yet
✅ The Fix
You need to add the try_files rule to your Nginx configuration. SSH into your VPS and do:

bash
# Edit your Nginx config
sudo nano /etc/nginx/sites-available/client.croatianlandscape.hr

# Or if you're using the default config
sudo nano /etc/nginx/sites-available/default
Find the location / block and make sure it looks like this:

nginx
location / {
    root /var/www/client.croatianlandscape.hr;  # your actual path
    index index.html;
    try_files $uri $uri/ /index.html;  # THIS IS THE CRITICAL LINE
}
Then reload Nginx:

bash
sudo nginx -t  # test configuration
sudo systemctl reload nginx
📂 Your Folder Structure Should Be
text
/var/www/client.croatianlandscape.hr/
├── index.html
├── static/
│   ├── js/
│   │   └── main.abc123.js
│   └── css/
│       └── main.xyz456.css
├── asset-manifest.json
└── favicon.ico
No maps/ folder. No photos/ folder. Just index.html and your compiled assets.

🔄 After You Apply This Fix
https://client.croatianlandscape.hr/maps/BAN-002-91 → serves index.html

React loads

React Router sees /maps/BAN-002-91

React renders your Karta component with the photo marker

The URL will work perfectly even though no such file exists on disk.

⚡ Quick Test
After updating Nginx, you can verify it's working:

bash
# This should now return index.html (200), not 404
curl -I https://client.croatianlandscape.hr/maps/BAN-002-91
You should see HTTP/2 200 and content-type: text/html.

This is the exact same principle as the Apache .htaccess solution I mentioned earlier - just implemented in Nginx syntax. Once this is in place, all your React Router paths will work immediately.

