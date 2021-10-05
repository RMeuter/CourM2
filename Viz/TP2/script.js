
var w = 500;
var h = 500;
var r = Math.min(w, h)/2;

var d;

var setParent = new Set();

var svg = d3.select("body").append("svg")
.attr("width", w)
.attr("height", h);

var g = svg.append('g')
.attr('transform', 'translate(' + w/2 + ',' + h/2 + ')');

var data1;

d3.json("flare.json").then(function(data) {

    data1 = data;
    var root = d3.hierarchy(data).sum(function (d) { return d.size})
    
    var partition = d3.partition()
            .size([2 * Math.PI, r]);
    
    partition(root)

    d = root;

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var arc = d3.arc() // Fonctionne comme un générateur d'arc
        .startAngle(function (d) { return d.x0 })
        .endAngle(function (d) { return d.x1 })
        .innerRadius(function (d) { return d.y0 })
        .outerRadius(function (d) { return d.y1 });
         
    var arcs = g.selectAll('.arcs')
        .data(root.descendants())
        .enter().append('path');


    arcs.attr("d", arc)
    .attr("stroke-width", 1).attr("stroke", "#FFFFFF")
    .attr("fill", function(d) {
        var v = sameParent(d)

        if (d.depth > 0){
            v = v.split(" ")
            if (setParent.has(v[v.length-2] == false)){
                setParent.add(v[v.length-2])
            } 
            let i=0;
            for (let item of setParent.values()){
                console.log(i++);
            } 


            return color(d.depth); 

        } else {
            
        }
    });
    arcs.append("title").text(function(d) { return d.data.name; });
    
    var z = d3.zoom();
    z.on("zoom", function({transform}){
        g.attr("transform", transform);
    });
    svg.call(z);
    
})


function sameParent(child) {
    if (child.parent != null){
        return child.data.name+ " "+ sameParent(child.parent)
    } else {
        return null
    }
}

/*
console.log("1")
console.log(d.parent)
console.log("2")
console.log(d)


*/