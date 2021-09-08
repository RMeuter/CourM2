
var w = 500;
var h = 500;
var r = Math.min(w, h)/2;

var d;

d3.json("flare.json").then(function(data) {
    var svg = d3.select("body").append("svg")
    .attr("width", w)
    .attr("height", h);
    
    var g = svg.append('g')
    .attr('transform', 'translate(' + w/2 + ',' + h/2 + ')');
    
    
    var root = d3.hierarchy(data).sum(function (d) { return d.size})
    
    var partition = d3.partition()
    .size([2 * Math.PI, r]);
    
    partition(root)
    d = root;

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var arc = d3.arc()
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
        if (d.depth > 0){
            return color(d.height); 
        }
    });
    arcs.append("title").text(function(d) { return d.data.name; });
    
    var z = d3.zoom();
    z.on("zoom", function({transform}){
        g.attr("transform", transform);
    });
    svg.call(z);
    
})


/*
console.log("1")
console.log(d.parent)
console.log("2")
console.log(d)


ata
:
name
:
"GraphDistanceFilter"
size
:
3165
__proto__
:
Object
depth
:
4
height
:
0
parent
:
Zh
children
:
(3) [Zh, Zh, Zh]
data
:
children
:
Array(3)
0
:
{name: "FisheyeTreeFilter", size: 5219}
1
:
{name: "GraphDistanceFilter", size: 3165}
2
:
{name: "VisibilityFilter", size: 3509}
length
:
3
__proto__
:
Array(0)
name
:
"filter"
__proto__
:
Object
depth
:
3
height
:
1
parent
:
Zh {data: {…}, height: 2, depth: 2, parent: Zh, children: Array(11), …}
value
:
11893
x0
:
5.1568922933887515
x1
:
5.235046938691098
y0
:
150
y1
:
200
__proto__
:
Object
value
:
3165
x0
:
5.191188862280784
x1
:
5.2119876054391066
y0
:
200
y1
:
250
__proto__
:
Obj

*/