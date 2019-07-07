$(document).scroll(function () {
    var y = $(this).scrollTop();
    if (y > 400) {
        $(".nav-bar").addClass('fixed-nav-bar');
    } else {
        $(".nav-bar").removeClass('fixed-nav-bar');
    }
});