var h = 500;
var w = 500;
var r = 5;

var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

function rand(mi, ma) {
  return Math.random() * (ma - mi) + mi;
}

var color = d3.scaleOrdinal(d3.schemeCategory10);

var gGlobal = svg.append("svg");

d3.json("miserables.json").then(function (graph) {
  // for(i=0;i<graph.nodes.length;i++){
  //     var node = svg.append("circle"); // ajout d’un cercle
  //     node.attr("r", r);
  //     node.attr("id", "node"+graph.nodes[i].id); // identifiant
  //     // node.attr("cx", ); // position X
  //     // node.attr("cy", ); // position y
  //     node.attr("class", ".node"); // ajout d'une classe
  //     node.attr("fill", function(d) { return color(graph.nodes[i].group) });
  // }

  // gxAxisCloud = svgCloud.append("g")
	// 	.call(xAxisCloud)
	// 	.attr("transform","translate(25,"+(hCloud-25)+")");

  var link = gGlobal
  .attr("class", "links")
  .selectAll("line")
  .data(graph.links)
  .enter().append("line")
  .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

  var nodes = gGlobal
  .attr("class", "nodes")
    .selectAll(".node")
    .data(graph.nodes)
    .enter()
    .append("circle");
  nodes
    .attr("stroke", "#aaaaaa")
    .attr("r", 5)
    .attr("id", function (d) {
      return "node" + d.id;
    })
    .attr("cx", function (d) {
      return rand(2 * r, w - 2 * r);
    })
    .attr("cy", function (d) {
      return rand(2 * r, h - 2 * r);
    })
    .attr("fill", function (d) {
      return color(d.group);
    });

    var drag_handler = d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);

    drag_handler(node);

  //   var z = d3.zoom();
  //   z.on("zoom", function ({ transform }) {
  //     svg.attr("transform", transform);
  //   });
  //   svg.call(z);
  function dragstarted(e, d) {
    if (!e.active) forceDirectedLayout.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(e, d) {
    d.fx = e.x;
    d.fy = e.y;
  }
  function dragended(e, d) {
    if (!e.active) forceDirectedLayout.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  gGlobal.call(
    d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended)
  ); //Il faut ensuite définir les fonction dragstarted, draggedet dragendedainsi:function dragstarted(e, d) {if (!e.active) forceDirectedLayout.alphaTarget(0.3).restart();d.fx = d.x;d.fy = d.y;}function dragged(e, d) {d.fx = e.x;d.fy = e.y;}function dragended(e, d) {if (!e.active) forceDirectedLayout.alphaTarget(0);d.fx = null;d.fy = null;}

});
