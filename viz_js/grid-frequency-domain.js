/**
 * Created by SorosLiu on 16/10/18.
 */
function initialSVG(svg, data, para) {
    var width = para.width;
    var barPadding = para.barPadding;
    var cards = svg.selectAll('.grid').data(data);
    var row_num = data.length / 25;
    var col_num = data.length / 8;
    var grid_size = width / col_num;
    svg.attr('height', grid_size * row_num);
    cards.enter().append('rect')
        .attr('x', function (d, i) {
            return (i % col_num) * grid_size;
        })
        .attr('y', function (d, i) {
            return (Math.floor(i / col_num)) * grid_size;
        })
        .attr('rx', 5)
        .attr('ry', 5)
        .attr('class', 'grid')
        .attr('width', grid_size)
        .attr('height', grid_size)
        .style('fill', 'rgb(237,248,177)');
}

function updateSVG(analyser, data) {
    // use frequency domain data as visualization source
    analyser.getByteFrequencyData(data);
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

var grid_frequency_domain = {
    'init': initialSVG,
    'update': updateSVG,
    'render': renderSVG
};