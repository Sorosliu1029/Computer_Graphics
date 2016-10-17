/**
 * Created by SorosLiu on 16/10/13.
 */
function initialSVG(svg, data, para) {
    var width = para.width;
    var barPadding = para.barPadding;
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', function (d, i) {
            return i * (width / data.length);
        })
        .attr('width', width / data.length - barPadding);
}

function updateSVG(analyser, data) {
    // use time domain data as visualization source
    analyser.getByteTimeDomainData(data);
    return data;
}

function renderSVG(svg, data, para) {
    var height = para.height;
    svg.selectAll('rect')
        .data(data)
        .attr('y', function (d) {
            return height - d;
        })
        .attr('height', function (d) {
            return d;
        })
        .attr('fill', function (d, i) {
            return makeColorGradient(i);
        });
}

var bar_time_domain = {
    'init': initialSVG,
    'update': updateSVG,
    'render': renderSVG
};