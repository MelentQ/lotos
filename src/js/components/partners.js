import percentageSeen from './percentageSeen';

$(window).scroll(partnersAnimation);
$(document).ready(partnersAnimation);
function partnersAnimation() {
    $(".partners_list__item").each(function() {
        var seenPercent = percentageSeen($(this)[0]);
        if(seenPercent <= 20) {
            $(this).css("transform", "scale(0.8)");
        } else {
            $(this).css("transform", "scale(1)");
        }
    });
}