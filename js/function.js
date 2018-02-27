var countSubTitle = 1;
var countTitle = 1;
var canScroll = true;

var animationsBack = ['jackInTheBox', 'slideInRight', 'zoomInUp', 'flipInY', 'bounce', 'rubberBand', 'tada', 'jello', 'fadeInLeft', 'fadeInRight', 'bounceInRigth', 'bounceInLeft', 'zoomInLeft', 'zoomInRight'];

$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = (function (el) {
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };

            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        })(document.createElement('div'));

        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);

            if (typeof callback === 'function') callback(this);
        });

        return this;
    },
});

var intervalSubTitleId = null;
var intervalSubtitleManager = function (flag) {
    if (flag) {
        resetSubTitle();
        countSubTitle = 1;
        changeSubTitle();
        intervalSubTitleId = setInterval(function () {
            changeSubTitle();
        }, 6500);
    } else {
        clearInterval(intervalSubTitleId);
    }
}

function resetSubTitle() {
    $('.subtitle').removeClass('show');
}

function resetBackAndTitle() {
    $('.background-image').removeClass('show');
    $('.title').removeClass('show');
}

function disabledScrollForSeconds(seconds) {
    this.canScroll = false;
    setTimeout(function () {
        this.canScroll = true;
    }, seconds * 1000)
}

function resetBar() {
    $('#div-1').removeClass('open');
    $('#div-2').removeClass('open');
    $('#div-3').removeClass('open');
}

function updateBar() {
    resetBar();
    var bar = "#div-" + countTitle;
    $(bar).addClass('open');
}

function changeTitleAndBack() {
    resetBackAndTitle();
    intervalSubtitleManager(false);
    intervalSubtitleManager(true);
    var background = "#background-" + countTitle;
    var title = "#title-" + countTitle;
    updateBar();
    $(background).addClass('show');
    $(title).addClass('show');
    $(background).animateCss(sortedAnimation());
    $(title).animateCss(sortedAnimation());
}

function sortedAnimation() {
    var sorted = Math.floor((Math.random() * animationsBack.length));
    var animation = animationsBack[sorted];
    return animation;
}

function changeSubTitle() {
    var subtitle = '#sub-title-' + countTitle + "-" + countSubTitle;
    $(subtitle).addClass('show');
    $(subtitle).animateCss(sortedAnimation(), function (component) {
        setTimeout(function () {
            $(subtitle).animateCss('zoomOut', function (component) {
                resetSubTitle();
            });
        }, 4000);
    })
    if (countSubTitle === 3) {
        this.countSubTitle = 1;
    } else {
        this.countSubTitle++;
    }
}

function showLoading() {
    $('.loading').css({
        'zIndex': '1000',
        'display': 'block'
    });
    $('.loading').animateCss('fadeIn', function (component) {
        $(component).css({
            'animationDelay': '2s'
        });
    });
}

function hideLoading() {
    $('.loading').animateCss('zoomOut', function (component) {
        $(component).css({
            'zIndex': '-2',
            'animationDelay': '0',
            'display': 'none'
        });
    });
}

function nextBackground() {
    if (countTitle < 3 && countTitle > 0) {
        countTitle++;
        changeTitleAndBack();
    }
}

function backBackground() {
    if (countTitle < 4 && countTitle > 1) {
        countTitle--;
        changeTitleAndBack();
    }
}

function addEffect() {
    $('.info').toggleClass('toEffect');
    $('.video').toggleClass('toEffect');
    $('.effectBack').animateCss('fadeOutRightBig');
}

$(document).ready(function () {
    hideLoading();
    setTimeout(function () {
        changeTitleAndBack();
    }, 100);
    $(window).mousewheel(function (event) {
        if (event.deltaY > 0 && canScroll) {
            if (countTitle < 4 && countTitle > 1) {
                countTitle--;
                disabledScrollForSeconds(2);
                changeTitleAndBack();
            }
        } else if (event.deltaY < 0 && canScroll) {
            if (countTitle < 3 && countTitle > 0) {
                countTitle++;
                disabledScrollForSeconds(2);
                changeTitleAndBack();
            }
        }
    });

    $(function () {
        $(window).swipe({
            //Generic swipe handler for all directions
            swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                if (direction === 'up') {
                    if (countTitle < 3 && countTitle > 0) {
                        countTitle++;
                        disabledScrollForSeconds(2);
                        changeTitleAndBack();
                    }
                } else if (direction === 'down') {
                    if (countTitle < 4 && countTitle > 1) {
                        countTitle--;
                        changeTitleAndBack();
                    }
                }
            }
        });

        //Set some options later
        $("#test").swipe({ fingers: 2 });
    });
    $('#hambuguer-icon-menu').click(function () {
        $(this).toggleClass('is-active');
        $('#navigation').toggleClass('not-show');
        $('.little-menu').toggleClass('zIndex');
    })
});