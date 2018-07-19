function updateTooltip(){
	var tooltip = d3.select('.tooltip');
	var tgt = d3.select(d3.event.target);
    var isCountry = tgt.classed("country");
    var isBar = tgt.classed("bar");
    var isArc = tgt.classed("arc");     
    var dataType = d3.select("select")
                       .property("value");
    var data;

    if (isCountry) data = tgt.data()[0].properties;
	if (isArc) {
	    data = tgt.data()[0].data;
	    percentage = `<p>Percentage of total: ${getPercentage(tgt.data()[0])}</p>`;
    }
    if (isBar) data = tgt.data()[0];

    tooltip
      .style("opacity", +(isCountry || isArc || isBar))
      .style("left", (d3.event.pageX - tooltip.node().offsetWidth / 2) + "px")
      .style("top", (d3.event.pageY - tooltip.node().offsetHeight - 10) + "px");


    if(data){
    	tooltip
			.style('opacity',1)
			.style('left', (d3.event.pageX - tooltip.node().offsetWidth /2) + 'px')
			.style('top', (d3.event.pageY - tooltip.node().offsetHeight -10) + 'px')
			.html(`
				<p>Country: ${data.country}</p>
	            <p>Regufees by Country of Asylum: ${printStat(data.refugeeByCountryOfAsylum)}</p>
				<p>Regufees by Country of Origin: ${printStat(data.refugeeByCountryOfOrigin)}</p>			           

	      `)
    }


	
}

function printStat(d){
	if(d) return d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	else return 'N.A.'
}

function hideTooltip(d){
	d3.select('.tooltip')
		.style('opacity', 0);
}


function getPercentage(d) {
  var angle = d.endAngle - d.startAngle;
  var fraction = 100 * angle / (Math.PI * 2);
  return fraction.toFixed(2) + "%";
}