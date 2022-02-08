$(window).on("load", function() {
    if(!window.matchMedia("(max-width: 1199px)").matches) {
        $(".bannerContainer").addClass("loaded");
    }
});