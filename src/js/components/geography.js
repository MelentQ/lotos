import percentageSeen from './percentageSeen';

$(window).scroll(geographyAnimation);
$(document).ready(geographyAnimation);
function geographyAnimation() {
    $(".geography_section__map").each(function() {
        var seenPercent = percentageSeen($(this)[0]);
        if(seenPercent <= 40) {
            $(this).css("transform", "scale("+(seenPercent / 150 + 0.7)+")");
        } else {
            $(this).css("transform", "scale("+((100 - seenPercent) / 190 + 0.7)+")");
        }
    });
}