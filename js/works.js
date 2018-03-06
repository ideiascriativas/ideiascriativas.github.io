var countWorks = 1;
var canScroll = true;

var works = [
    { id: 1, name: 'MM Artes', description: 'Lorem ipsum soijda aoidoiasjddj dsaoijs', site: 'link', face: 'alsd', insta: 'asdas' },
    { id: 2, name: 'Other', description: 'Lorem ipsum soijda aoidoiasjddj dsaoijs', site: 'link', face: 'alsd', insta: 'asdas' },
    { id: 3, name: 'Other2', description: 'Lorem ipsum soijda aoidoiasjddj dsaoijs', site: 'link', face: 'alsd', insta: 'asdas' }
];

function transactionWorks() {
    $('.info').toggleClass('toEffect');
    $('.video').toggleClass('toEffect');
    $('video').toggleClass('toEffect');
    $('.effectBack').css({
        "display": 'inline'
    })
    $('.content').animateCss('fadeOutDown', function (component) {
        $(component).animateCss('fadeInUp');
    });
    $('.effectBack').animateCss('fadeOutRightBig', function (component) {
        $(component).css({
            "display": 'none'
        });
    });
    setTimeout(function () {
        $('.info').toggleClass('toEffect');
        $('.video').toggleClass('toEffect');
        $('.effectBack').animateCss('fadeOutLeftBig');
        $('video').toggleClass('toEffect');
    }, 1500);
}

function goToSite() {
    window.open('https://mmartes.herokuapp.com');
}

function disabledScrollForSeconds(seconds) {
    this.canScroll = false;
    setTimeout(function () {
        this.canScroll = true;
    }, seconds * 1000)
}


showLoading();

$(document).ready(function () {
    hideLoading();

    $(window).mousewheel(function (event) {
        if (canScroll === true){
            transactionWorks();
            disabledScrollForSeconds(2);
        }
    });
});