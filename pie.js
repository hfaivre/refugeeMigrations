function createPie(width, height) {
  var pie = d3.select("#pie")
                  .attr("width", width)
                  .attr("height", height)

  pie.append("g")
      .attr("transform", "translate(" + width / 2 + ", " + (height / 2 + 10) + ")")
      .classed("chart", true);

  pie.append("text")
      .attr("x", width / 2)
      .attr("y", "1em")
      .attr("font-size", "1.5em")
      .style("text-anchor", "middle")
      .classed("pie-title", true);
}


function drawPie(data, year, dataType) {

  var colorRanges = {
     refugeeByCountryOfAsylum: ["white", "red"],
     refugeeByCountryOfOrigin: ["white", "green"],
  };

  var pie = d3.select("#pie");

  var arcs = d3.pie()
                .value(d => d[dataType]);

  console.log(pie);

  var path = d3.arc()
               .outerRadius(+pie.attr("height") / 2 -25)
               .innerRadius(60);


  //get top 20 countries
  var yearData = data[year].sort((a,b)=>b[dataType]-a[dataType]).slice(0,20);



    var scale = d3.scaleOrdinal()
      .domain(d3.extent(data[year], d=> d[dataType]))
      .range(d3.schemeCategory20c);



  var update = pie
     .select(".chart")
     .selectAll(".arc")
     .data(arcs(yearData));

  update
    .exit()
    .remove();

  update
    .enter()
      .append("path")
      .classed("arc", true)
      .attr("stroke", "#ccc")
      .attr("stroke-width", "0.05px")
    .merge(update)
      .attr("d", path)
      .transition()
      .duration(250)
      .ease(d3.easeBackIn)
      .attr('fill', d=>scale(d.data[dataType]));

  pie.select(".pie-title")
      .text("Number of refugees my country of asylum, " + year);
}



