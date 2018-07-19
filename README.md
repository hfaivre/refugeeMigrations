# refugeeMigrations


This project is a simple interactive D3 dashboard using Refugee Migration data from the [the World Bank Data](https://data.worldbank.org/).


## Functionnality

### Vizualisations
This dashboard comprises of 3 main vizualisation, namely:

* a world map displaying refugee numbers(by country of origin or of asylumby year, following a color scale by country
* a pie chart the 20 countries with the most number of refugees(by country of origin or of asylumby year, following a color scale by country)
* A histrogram with tracing the evolution of the number of refugees for one selected country over the past 20 years

### Other tools
This dashboard allows the user to browse through data with additional tools:
* A refugee by country of origin or refugee by country of asylum selector
* A year range input which goes from 1996 to 2016
* A tooltip displaying various information appears when hovering specific areas of the dashboard

## Implementation

### Maps

The map used in this dashboard is a topojson format found at the following url :https://unpkg.com/world-atlas@1.1.4/world/50m.json
Countries in this map are identified by their ISO 3166-1 numeric code. In this project, Antarctica and Greenland have been removed for simplicity purposes.

### Code Structure

The code for this project is divided in 3 parts :

* Data handling code : 
  ** dataExtractor.js
* Data drawing code : 
  ** map.js
  ** pie.js
  ** bar.js
  ** tooltip.js
* Core code: 
  ** app.js


*Note: The data module's purpose is to merge data pulled from The World Bank with another dataset in order to get the ISO 3166-1 numeric codes. Idealy, the input data should already be formatted

### Tools used

* [D3](https://d3js.org/)
* [SVG](https://developer.mozilla.org/kab/docs/Web/SVG)
* [WORLD BANK](https://data.worldbank.org/)
* [ISO 3166-1 numeric code](https://en.wikipedia.org/wiki/ISO_3166-1_numeric)


## Improvements (by order of importance and feasability)

* Show both refugees by origin and refugees by asylum on the same bar chart to show difference
* Add population data to have refugee/population ratios
* Plug an API to retrieve data from world bank
* Study abrupt variations in refugee numbers and tie to historical event (e.g. War in Syria, 2011)










