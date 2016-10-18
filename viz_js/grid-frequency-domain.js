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
            return (Math.floor(i / row_num)) * grid_size;
        })
        .attr('y', function (d, i) {
            return (i % row_num) * grid_size;
        })
        .attr('rx', 5)
        .attr('ry', 5)
        .attr('class', 'grid')
        .attr('width', grid_size - barPadding)
        .attr('height', grid_size - barPadding);
}

function updateSVG(analyser, data) {
    // use frequency domain data as visualization source
    analyser.getByteFrequencyData(data);
    return data;
}

function renderSVG(svg, data, para) {

    svg.selectAll('rect')
        .data(data)
        .attr('fill', function (d) {
            return makeColorGrid(d);
        })
}

var grid_frequency_domain = {
    'init': initialSVG,
    'update': updateSVG,
    'render': renderSVG
};