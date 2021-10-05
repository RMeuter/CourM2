function rand(min, max) { return Math.floor((Math.random() * (max-min)) + min); }

var color = d3.scaleOrdinal(d3.schemeCategory10);

function abs(v) { return (v < 0) ? v * -1 : v; }
