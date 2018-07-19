function createMap(width, height){
	//Create Map Canvas
	d3.select('#mapArea')
		.attr('width', width + 100)
		.attr('height', height+300)
	  .append('g')
		.classed('map', true);

	d3.select('.map')
			.attr('width', width + 100)
			.attr('height', 300)
		.append('text')
	        .attr('x', width / 2)
	        .attr('y', '2em')
	        .attr('text-anchor', 'middle')
	        .style('font-size', '1.5em')
	        .classed('title', true)
	        .style('font-family', 'Rubik');


	//Create Legend        
	var defs = d3.select('#mapArea').append("defs");
	defs.append("linearGradient")
		.classed("linearGradient", true)
	    .attr("id", "linear-gradient")
	    .attr("x1", "0%")
	    .attr("y1", "0%")
	    .attr("x2", "100%")
	    .attr("y2", "0%");

	//Set axis for color scale
	d3.select('#mapArea')
	    .append("g")
	    .classed("colorAxis", true)
	    .attr("transform", "translate(" + 20 + ","+ (height) +")")

	d3.select('.colorAxis')
		.append("rect")
		.classed('colorLegend', true);


}

function drawMap(geoData, data, year, dataType, rawData){

	var colorRanges = {
       refugeeByCountryOfAsylum: ["white", "red"],
       refugeeByCountryOfOrigin: ["white", "green"],
    };

	var map = d3.select('.map');
	var projection = d3.geoMercator()
				   .scale(110)
				   .translate([
				   		+map.attr('width')/2.5, 
				   		+map.attr('height')/.9
				   	]);

	var path = d3.geoPath()
			 .projection(projection);

	d3.select("#year-val").text(year);

	//Create link between topojson country id and country id from csv
	 data[year].forEach(row=>{
	 	var countries = geoData.filter(d=>d.id === row.countryCode);
	 	countries.forEach(country=>country.properties = row);
	 });


	var scale = d3.scaleSqrt()
			.domain(d3.extent(data[year], d=> d[dataType]))
			.range(colorRanges[dataType]);


	drawLegend(dataType, scale, colorRanges);
	fillColor(geoData, data, scale, map, path, rawData);
	

}

function fillColor(geoData, data, scale, map, path, rawData){
	console.log(geoData);
	var update = map
	  .selectAll('.country')
	  .data(geoData.filter(d => d.id !== "304" && d.id !== "010"));

	var currentDataType = d3.select('select').property('value');

	update
	  .enter()
	  	.append('path')
	  	.classed('country', true)
		.on("click", function() {
	        var country = d3.select(this);
	        var isActive = country.classed("active");
	        console.log(country.data()[0].properties.country);
	        var countryName = isActive ? "" : country.data()[0].properties.country;
	        drawBar(rawData, currentDataType, countryName);
        	highlightBars(+d3.select("#year").property("value"));
	        d3.selectAll(".country").classed("active", false);
	        country.classed("active", !isActive);
	      })
	  	.attr('d', path)
	  .merge(update)
	  	.transition()
	    .duration(250)
	    .ease(d3.easeBackIn)
	    .attr('fill', d=>{
	    	var data = d.properties[currentDataType];
	    	return data ? scale(data) : "#ccc";
	    });
}



function drawLegend(val, scale, colorRanges){

	var linearGradient = d3.select('.linearGradient');
	linearGradient.append("stop")
					.classed('startColor', true);
	linearGradient.append("stop")
					.classed('stopColor', true);
	var startColor = linearGradient.select('.startColor');
	var stopColor = linearGradient.select('.stopColor');
	var map = d3.select('.map');


	var legendscale = d3.scaleSqrt()
	    .range([10, map.attr('width')-140])
	    .domain(scale.domain());

	var legendaxis = d3.axisBottom()
	    .scale(legendscale)
	    .tickSize(6)
	    .ticks(8);

	//Set the color for the start (0%)
	startColor
		.transition()
		.duration(350)
	    .attr("offset", "0%")
	    .attr("stop-color", colorRanges[val][0]); 

	//Set the color for the end (100%)
	stopColor
	.transition()
		.duration(350)
	    .attr("offset", "100%")
	    .attr("stop-color", colorRanges[val][1]); 

	//Draw the rectangle and fill with gradient
	d3.select('.colorAxis')
      .call(legendaxis)
      .selectAll("text")
	    .attr("y", 4)
	    .attr("x", 9)
	    .attr("dy", ".35em")
	    .attr("transform", "rotate(70)")
	    .style("text-anchor", "start");
      
	d3.select('.colorLegend')
	    .style("fill", "url(#linear-gradient)")
	    .attr("width", map.attr('width')-150)
	    .attr("height", 20)
	    .attr('x', 10)
	    .attr('y', -30)
	    .style('stroke', "#ccc");

	    
		
}