function ed() {
    var options = document.getElementById('options')
    var panes = document.getElementsByClassName('pane')
    var shade = document.getElementById('shade')
    var overlap = document.getElementById('overlap')
    var links = ['/bfv', '/r6', '/apex', '/bf1', '/discord']
        // var audio = document.getElementById('audio');
        // var source = document.getElementById('audioSource');
        // audio.volume = 0.2;
    rect = panes[0].getBoundingClientRect();
    x = rect.left;
    y = rect.top;
    topElt = document.elementFromPoint(x, y);

    rect2 = panes[1].getBoundingClientRect();

    x2 = rect2.left;
    y2 = rect2.top;
    topElt2 = document.elementFromPoint(x2, y2);

    rect3 = panes[2].getBoundingClientRect();
    x3 = rect3.left;
    y3 = rect3.top;
    topElt3 = document.elementFromPoint(x3, y3);

    rect4 = panes[3].getBoundingClientRect();
    x4 = rect4.left;
    y4 = rect4.top;
    topElt4 = document.elementFromPoint(x4, y4);

    rect5 = panes[4].getBoundingClientRect();
    x5 = rect5.left;
    y5 = rect5.top;
    topElt5 = document.elementFromPoint(x5, y5);

    if (overlap.isSameNode(topElt)) {

        reset(panes, 0)
        panes[0].addEventListener("click", () => {
            location.href = links[0];
        });
        // options.style.background = "URL('/public/images/bfv.jpg')"
        options.style.backgroundSize = "cover";

    } else if (overlap.isSameNode(topElt2)) {
        reset(panes, 1)

        panes[1].addEventListener("click", () => {
            location.href = links[1];
        });
        options.style.backgroundSize = "cover";

    } else if (overlap.isSameNode(topElt3)) {
        reset(panes, 2)

        panes[2].addEventListener("click", () => {
            location.href = links[2];
        });
        // options.style.background = "URL('/public/images/sledge.jpg')"
        options.style.backgroundSize = "cover";

    } else if (overlap.isSameNode(topElt4)) {
        reset(panes, 3)

        panes[3].addEventListener("click", () => {
            location.href = links[3];
        });
        // options.style.background = "URL('/public/images/bf1.jpg')"

        options.style.backgroundSize = "cover";

    } else if (overlap.isSameNode(topElt5)) {
        reset(panes, 4)
        panes[4].addEventListener("click", () => {
            alert('came')
            location.href = links[4];
        });
        // options.style.background = "URL('https://vistapointe.net/images/battlefield-4-7.jpg')"
        options.style.backgroundSize = "cover";
    }

}




function reset(divs, x) {
    for (var i = 0; i < 5; i++) {
        if (i == x) {
            divs[i].style.zIndex = '300';
            // divs[i].style.background = "red";
            divs[i].style.transform = "translateZ(95px)";
        } else if (i < x) {
            divs[i].style.zIndex = '200';

            // divs[i].style.background = "white";
            divs[i].style.transform = "translateZ(-250px) rotateY(45deg)";

        } else if (i > x) {
            divs[i].style.zIndex = '200';

            // divs[i].style.background = "white";
            divs[i].style.transform = "translateZ(-250px) rotateY(-45deg)";
        }
    }
}

function calcSpaceBetween() {
    var red_pos = $('#d1').position().left + $('#d1').width();
    var blu_pos = $('#d2').position().left;
    var space = blu_pos - red_pos;
    return space
}