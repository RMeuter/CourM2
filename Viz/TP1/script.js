var h = 500;
var w = 500;
var r = 5;

var svg = d3.select("body").append("svg")
    .attr("width", w)
    .attr("height", h);

function rand(mi, ma){
    return Math.random()*(ma-mi)+mi;
}



var color = d3.scaleOrdinal(d3.schemeCategory10);


d3.json("miserables.json").then(function(graph) {  
    


    // for(i=0;i<graph.nodes.length;i++){
    //     var node = svg.append("circle"); // ajout d’un cercle
    //     node.attr("r", r); 
    //     node.attr("id", "node"+graph.nodes[i].id); // identifiant
    //     // node.attr("cx", ); // position X
    //     // node.attr("cy", ); // position y
    //     node.attr("class", ".node"); // ajout d'une classe
    //     node.attr("fill", function(d) { return color(graph.nodes[i].group) });
    // }

    
    var nodes = svg.selectAll(".node")
        .data(graph.nodes)
        .enter().append("circle");
    nodes.attr("stroke", "#aaaaaa")
        .attr("r", 5)
        .attr("id", function(d) { return "node"+d.id; } )
        .attr("cx", function(d) { return rand(2*r, w-2*r); } )
        .attr("cy", function(d) { return rand(2*r, h-2*r); } )
        .attr("fill", function(d) { return color(d.group) });

    var links = svg.selectAll(".link")
        .data(graph.links)
        .enter().append("line");
        links.attr( "x1", function(d){ return d3.select("#node"+d.source).attr("cx");});
        links.attr( "y1", function(d){ return d3.select("#node"+d.source).attr("cy");});
        links.attr( "x2", function(d){ return d3.select("#node"+d.target).attr("cx");});
        links.attr( "y2", function(d){ return d3.select("#node"+d.target).attr("cy");});
        links.attr("stroke-width", function(d){ return Math.sqrt(d.value);})
        links.style("opacity", 0.6);
        links.attr("stroke", "#aaaaaa"); // couleur de la bordure


    var forceDirectedLayout = d3.forceSimulation()
    .nodes(graph.nodes)
    .force("repulsion", d3.forceManyBody())
    .force("attraction", d3.forceLink(graph.links))
    .force("center", d3.forceCenter(w / 2, h / 2));

    forceDirectedLayout.on("tick", function() {
        links
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

        nodes
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
        }
    );


});