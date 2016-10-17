/**
 * Created by SorosLiu on 16/10/13.
 */
function onInputFileChange() {
    var file = $('#audioSource').get(0).files[0];
    $('#audioElement').get(0).src = window.URL.createObjectURL(file);
    main();
}

function getAnalyser() {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var audioElement = $('#audioElement').get(0);
    var audioSrc = audioCtx.createMediaElementSource(audioElement);
    var analyser = audioCtx.createAnalyser();

    audioSrc.connect(analyser);
    audioSrc.connect(audioCtx.destination);

    return analyser;
}

function getWindowWidth() {
    return window.innerWidth;
}

function createSvg(parent, height, width) {
    return d3.select(parent).append('svg').attr('height', height).attr('width', width);
}

function renderFrame(parent, height, width, analyser, initFunc, updateFunc, renderFunc) {
    var data = new Uint8Array(200);

    var svg = createSvg(parent, height, width);

    var para = {'height': height, 'width': width, 'barPadding': '1'};
    initFunc(svg, data, para);
    function renderChart() {
        requestAnimationFrame(renderChart);
        data = updateFunc(analyser, data);
        renderFunc(svg, data, para);
    }

    renderChart();
}

function _byte2Hex(n)
{
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

function _RGB2Color(r,g,b)
{
    return '#' + _byte2Hex(r) + _byte2Hex(g) + _byte2Hex(b);
}

function makeColorGradient(i, frequency1, frequency2, frequency3,
                           phase1, phase2, phase3,
                           center, width)
{
    if (frequency1 == undefined)
        frequency1 = 0.1;
    if (frequency2 == undefined)
        frequency2 = 0.1;
    if (frequency3 == undefined)
        frequency3 = 0.1;
    if (phase1 == undefined)
        phase1 = 0;
    if (phase2 == undefined)
        phase2 = 2;
    if (phase3 == undefined)
        phase3 = 4;
    if (center == undefined)
        center = 200;
    if (width == undefined)
        width = 55;

    var red = Math.sin(frequency1*i + phase1) * width + center;
    var grn = Math.sin(frequency2*i + phase2) * width + center;
    var blu = Math.sin(frequency3*i + phase3) * width + center;
    return _RGB2Color(red,grn,blu);
}

function main() {
    var framesFuncsArray = [bar_time_domain, bar_frequency_domain];
    var analyser = getAnalyser();
    var width = (getWindowWidth() * 0.9).toString();
    for (var i = 0; i < framesFuncsArray.length; i++) {
        renderFrame(
            '#d' + i.toString(),
            '300',
            width,
            analyser,
            framesFuncsArray[i].init,
            framesFuncsArray[i].update,
            framesFuncsArray[i].render
        )
    }
}
