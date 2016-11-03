/**
 * Created by SorosLiu on 16/11/3.
 */
var width = window.innerWidth;
var height = window.innerHeight;
var circles = [{cx: 150, cy: 200, r: 30},
    {cx: 250, cy: 200, r: 30}];

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "frame");

var drag = d3.drag()
    .on("drag", dragmove);

var colors = ['rgb(19,147,117)', 'rgb(86,154,252)'];

svg.selectAll("circle")
    .data(circles)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
        return d.cx;
    })
    .attr("cy", function (d) {
        return d.cy;
    })
    .attr("r", function (d) {
        return d.r;
    })
    .attr("fill", function (d, i) {
        return colors[i];
    })
    .call(drag);

function dragmove(d) {
    d3.select(this)
        .attr("cx", d.cx = d3.event.x)
        .attr("cy", d.cy = d3.event.y);
}