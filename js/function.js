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

function showLoading() {
    $('.loading').css({
        'zIndex': '1000'
    });
    $('.loading').animateCss('zoomIn', function (component) {
        $(component).css({
            'animation-delay': '2s'
        });
        console.log('Alterou');
    });
}

function hideLoading() {
    $('.loading').animateCss('zoomOut', function (component) {
        $(component).css({
            'zIndex': '-2',
            'animationDelay': '0'
        });
    });
}

$(document).ready(function () {
    hideLoading();
});