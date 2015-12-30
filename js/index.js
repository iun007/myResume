
var main = document.querySelector("#main");
var list = document.querySelectorAll("#list>li");
var winW = window.innerWidth;
var winH = window.innerHeight;

for (var i = 0; i < list.length; i++) {
    list[i].index = i;
    list[i].addEventListener("touchstart", start, false);
    list[i].addEventListener("touchmove", move, false);
    list[i].addEventListener("touchend", end, false);
}

function start(e) {
    this.startY = e.changedTouches[0].pageY;
}
function move(e) {
    this.flag=true;
    var curY = e.changedTouches[0].pageY;
    var changePos = curY - this.startY;
    var cur = this.index;
    for (var i = 0; i < list.length; i++) {
        if (i != cur) {
            list[i].style.display = "none";
        }
        list[i].firstElementChild.id="";
    }
    list[cur].className = "";
    if (changePos > 0) {
        this.nextIndex = cur == 0 ? list.length - 1 : cur - 1;
        var distance = -winH + changePos;
    } else if (changePos < 0) {
        distance = winH + changePos;
        this.nextIndex = cur == list.length - 1 ? 0 : cur + 1;
    }
    var scalePos = 1 - Math.abs(changePos) / winH;
    list[cur].style.webkitTransform = "scale("+(1-Math.abs(changePos)/winH)+") translate(0,"+changePos+"px)";
    list[this.nextIndex].style.display = 'block';
    list[this.nextIndex].className = "zIndex";
    list[this.nextIndex].style.webkitTransform = 'translate(0,' + distance + 'px)';
}

function end(e) {
    if (this.flag) {
        list[this.nextIndex].style.webkitTransform = 'translate(0,0)';
        list[this.nextIndex].style.webkitTransition = '0.5s';

        list[this.nextIndex].addEventListener('webkitTransitionEnd', function () {
            this.style.webkitTransition = '';
            this.firstElementChild.id='a'+(this.index+1);
        }, false);

    }
}
document.addEventListener("touchmove",function(){});

var a1=document.querySelector(".a1");

window.setTimeout(function () {
    a1.id="a1";
});
window.addEventListener("load", function () {
    var musicAudio = document.querySelector("#musicAudio");
    var music = document.querySelector(".music");

    musicAudio.addEventListener("canplay", function () {
        music.style.display = "block";
        music.className = "music move";
    }, false);
    musicAudio.play();

    $t.tap(music, {
        end: function (e) {
            if (musicAudio.paused) {
                musicAudio.play();
                this.className = "music move";
                return;
            }
            musicAudio.pause();
            this.className = "music";
        }
    });
}, false);