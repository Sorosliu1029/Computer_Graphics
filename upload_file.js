/**
 * Created by SorosLiu on 16/10/13.
 */
function onInputFileChange() {
    var file = $('#audioSource').get(0).files[0];
    $('#audioElement').get(0).src = window.URL.createObjectURL(file);
}