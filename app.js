d3.queue()
	.defer(d3.csv, './data/country_data.csv') // country <-> country code
	.defer(d3.csv, './data/data.csv')// county,year <-> #Refugees by Country of Origin, #Refugees by Country of Asylum
	.defer(d3.json, 'https://unpkg.com/world-atlas@1.1.4/world/50m.json')
	.await(function(error, countryCodeData,  data, mapData){
		if(error) throw error;

		// Data extraction
		formattedData = formatData(data, countryCodeData);

		const yearRange = d3.extent(Object.keys(formattedData).map(year=>+year));
		var year = yearRange[0];


		var currentDataType = d3.select('select').property('value');

		console.log(topojson);
		//Topojson to GeoJson convert
		var geoData = topojson.feature(mapData, mapData.objects.countries).features;

		


		//Initialize Map
		var width = +d3.select(".chart-container").node().offsetWidth;
		var height = 300;
		createMap(width, width *4/5);
		createPie(width, height);
		createBar(width, height);
		drawPie(formattedData, year,currentDataType );
		drawMap(geoData, formattedData, year,currentDataType, data);
		drawBar(data, currentDataType,"");


		//Selector event handler
		d3.select('select')
			.on('change', d=> {
				currentDataType = d3.select('select').property('value');
				var active = d3.select(".active").data()[0];
	          	var country = active ? active.properties.country : "";
				drawMap(geoData, formattedData, year, currentDataType, data);
				drawPie(formattedData, year,currentDataType);
				drawBar(data, currentDataType, country);

			});


		
		//Range input event handler
		d3.select('#year')
			.property('min', year)
			.property('max', yearRange[1])
			.property('value', year)
			.on('input',()=> {
				year = +d3.event.target.value;
				drawMap(geoData, formattedData, year,currentDataType, data);
				drawPie(formattedData, year,currentDataType);
				highlightBars(year);

			});

		d3.selectAll("svg")
        .on("mousemove touchmove", updateTooltip);



	});
