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

function main() {
    // $.getScript('viz_js/simple_style.js');
    renderFrame(
        '#d1',
        '300',
        (getWindowWidth() * 0.8).toString(),
        getAnalyser(),
        initialSVG,
        updateSVG,
        renderSVG
    )
}
