function getRandomPos(minX, maxX) {
    return Math.random() * (maxX - minX) + minX;
}

function createGraph() {
    var e = document.querySelector('#cities'),
        N = e.options[e.selectedIndex].text;
    var points = new Array();
    var n = N,
        m = 2;
    for (let i = 0; i < n; i++) {
        points[i] = new Array(m);
    }

    document.querySelector('#graph-container').innerHTML = "";
    for (i = 0; i < n; i++) {
        var X = getRandomPos(5, window.innerWidth * 0.7 - 50),
            Y = getRandomPos(5, window.innerHeight - 50);
        for (j = 0; j < m; j++) {
            if (j == 0) {
                points[i][j] = X;
            } else {
                points[i][j] = Y;
            }
        }

        document.querySelector('#graph-container').innerHTML += "<div class='point p" + i + "' style='top:" + Y + "px;left:" + X + "px;'>" + (i) + "</div>";
    }
    var pairs = new Array();
    var k = 0;
    for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
            document.querySelector('#graph-container').innerHTML += "<svg><line stroke-width='1px' stroke='#000'  x1=" + points[i][0] + "px y1=" + points[i][1] + "px x2=" + points[j][0] + "px y2=" + points[j][1] + "px /></svg>";
            pairs[k] = [i, j];
            k++;
        }

    }
    var len = new Array();
    for (let i = 0; i < pairs.length; i++) {
        len[i] = [Math.sqrt(Math.pow(points[pairs[i][1]][0] - points[pairs[i][0]][0], 2) + Math.pow(points[pairs[i][1]][1] - points[pairs[i][0]][1], 2)), ]; //ADDED LENGTH
    }

    var summ = 0,
        ALPHA = 1,
        BETA = 5,
        RHO = 0.5,
        Q = 100;
    for (let i = 0; i < len.length; i++) {
        len[i][1] = 1 / len[i][0]; //n(r,u)
        len[i][2] = 0.5; //pheromote t0
    }

    console.log("LEN(length,n(r,u),pheromone t0):\n", len);
    console.log("pairs:\n", pairs);
    console.log("points:\n", points);



    var curCity = 0;
    P = new Array();
    for (let i = 0; i < pairs.length; i++) {
        if (pairs[i][0] == curCity || pairs[i][1] == curCity) {
            summ += Math.pow(len[i][2], ALPHA) * Math.pow(len[i][1], BETA);
        }
    }
    console.log("summ:\n", summ);
    var j = 0;
    for (let i = 0; i < pairs.length; i++) {
        if (pairs[i][0] == curCity || pairs[i][1] == curCity) {
            P[j] = (Math.pow(len[i][2], ALPHA) * Math.pow(len[i][1], BETA)) / summ;
            j++;
        }
    }

    function min(obj) {
        var a = obj[0];
        for (var i = 1; i < obj.length; i++) {
            if (obj[i] < a) {
                a = obj[i];
            }
        }
        return a;
    }

    console.log("P:\n", min(P));
    console.log("P:\n", P);
    // console.log("P:\n", P.indexOf(min(P)));

}