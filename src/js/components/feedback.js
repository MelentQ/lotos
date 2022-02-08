import percentageSeen from './percentageSeen';

$(window).scroll(feedbackAnimation);
$(document).ready(feedbackAnimation);
function feedbackAnimation() {
    $(".feedback_section").each(function() {
        var seenPercent = percentageSeen($(this)[0]);
        if(seenPercent >= 30) {
            $(this).css("opacity", 1)
        } else {
            $(this).css("opacity", 0)
        }
    });
}