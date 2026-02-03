# Fwd: Opservatorij 

slijedi popis slojeva koje rabimo

## Pre renderirani tilesetovi:

- **reljef** - [https://landscape.agr.hr/tiles/banija_reljef_light/{z}/{x}/{y}.jpg](https://landscape.agr.hr/tiles/banija_reljef_light/%7Bz%7D/%7Bx%7D/%7By%7D.jpg)
- **fiksni elementi** - [https://landscape.agr.hr/tiles/banija_fiksni_elementi/{z}/{x}/{y}.png](https://landscape.agr.hr/tiles/banija_fiksni_elementi/%7Bz%7D/%7Bx%7D/%7By%7D.png)
- **kartografija CB** - [https://landscape.agr.hr/tiles/banija_kartografija_cb/{z}/{x}/{y}.png](https://landscape.agr.hr/tiles/banija_kartografija_cb/%7Bz%7D/%7Bx%7D/%7By%7D.png)
- **kartografija DOF** - [https://landscape.agr.hr/tiles/banija_kartografija_dof/{z}/{x}/{y}.png](https://landscape.agr.hr/tiles/banija_kartografija_dof/%7Bz%7D/%7Bx%7D/%7By%7D.png)

## Vanjski tilesetovi:

- **ESRI world imagery** - [https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}](https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/%7Bz%7D/%7By%7D/%7Bx%7D)  
  (Za ESRI je potrebna atribucija: Source: Esri, Maxar, Earthstar Geographics)

## WMS (zahtjev za GetLegendGraphic):

- **korištenje zemljišta** - [https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=tema_koristenje_zemljista_novo&FORMAT=image/png&STYLE=default&SLD_VERSION=1.1.0](https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=tema_koristenje_zemljista_novo&FORMAT=image/png&STYLE=default&SLD_VERSION=1.1.0)
- **zaštita prirode** - [https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=zasticena_podrucja&FORMAT=image/png&STYLE=default&SLD_VERSION=1.1.0](https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=zasticena_podrucja&FORMAT=image/png&STYLE=default&SLD_VERSION=1.1.0)
- **drvena arhitektura** - [https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=preklop_drvene_zgrade&FORMAT=image/png&STYLE=default&SLD_VERSION=1.1.0](https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=preklop_drvene_zgrade&FORMAT=image/png&STYLE=default&SLD_VERSION=1.1.0)
- **foto katalog** - [https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=preklop_foto_katalog&FORMAT=image/png&STYLE=default&SLD_VERSION=1.1.0](https://landscape.agr.hr/qgis?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=preklop_foto_katalog&FORMAT=image/png&STYLE=default&SLD_VERSION=1.1.0)

---

## Shema karte

**Centrirano na Baniju**  
**Zoom levels:** 8-18

**Uvijek uključen sloj (nema kontrole):**
- **fiksni elementi**

**Podloga** (radio button, odaberi jedan od ponuđenih, jedan mora uvijek biti uključen):
- **reljef**
- **ESRI world imagery**

**Kartografija** (čekboks, može se uključiti i isključiti):
- **kartografija CB** - Kartografija kada je kao podloga uključen reljef
- **kartografija DOF** - Kartografija kada je kao podloga uključen ESRI world

**Preklopi** (čekboks, može ih se odabrati više od jednom):
- **foto katalog**
- **drvena arhitektura**
- **zaštita prirode**
- **korištenje zemljišta**

---
