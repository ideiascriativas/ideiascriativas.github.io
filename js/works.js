var countWorks = 1;

var works = [
    { id: 1, name: 'MM Artes', description: 'Lorem ipsum soijda aoidoiasjddj dsaoijs', site: 'link', face: 'alsd', insta: 'asdas' },
    { id: 2, name: 'Other', description: 'Lorem ipsum soijda aoidoiasjddj dsaoijs', site: 'link', face: 'alsd', insta: 'asdas' },
    { id: 3, name: 'Other2', description: 'Lorem ipsum soijda aoidoiasjddj dsaoijs', site: 'link', face: 'alsd', insta: 'asdas' }
];

function transactionWorks() {
    $('.info').toggleClass('toEffect');
    $('.video').toggleClass('toEffect');
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
    }, 1500);
}

showLoading();

$(document).ready(function (){
    hideLoading();
});