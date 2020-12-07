function getRandomPos(minX, maxX) {
    return Math.random() * (maxX - minX) + minX;
}

function createGraph() {
    let e = document.querySelector('#cities'),
        N = e.options[e.selectedIndex].text;
        let points = new Array();
        let n = N,
        m = 2;
    for (let i = 0; i < n; i++) {
        points[i] = new Array(m);
    }

    document.querySelector('#graph-container').innerHTML = "";
    for (i = 0; i < n; i++) {
        let X = getRandomPos(5, window.innerWidth * 0.7 - 50),
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
    let pairs = new Array();
    let k = 0;
    for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
            document.querySelector('#graph-container').innerHTML += "<svg><line stroke-width='1px' stroke='#000'  x1=" + points[i][0] + "px y1=" + points[i][1] + "px x2=" + points[j][0] + "px y2=" + points[j][1] + "px /></svg>";
            pairs[k] = [i, j];
            k++;
        }

    }
    let len = new Array();
    for (let i = 0; i < pairs.length; i++) {
        len[i] = [Math.sqrt(Math.pow(points[pairs[i][1]][0] - points[pairs[i][0]][0], 2) + Math.pow(points[pairs[i][1]][1] - points[pairs[i][0]][1], 2)), ]; //ADDED LENGTH
    }

    let summ,
        ALPHA = 1,
        BETA = 5,
        RHO = 0.5,
        Q = 100;
    for (let i = 0; i < len.length; i++) {
        len[i][1] = 1 / len[i][0]; //n(r,u)
        len[i][2] = Q / N; //pheromote t0
    }

    // console.log("LEN(length,n(r,u),pheromone t0):\n", len);
    // console.log("pairs:\n", pairs);
    // console.log("points:\n", points);
    var indexGoodRoad, P = new Array(),curCity,tabu = new Array();

    function findTheBestRoad(a) {
        summ=0;
        tabu = [];
        indexGoodRoad=0;
        curCity = a;
        count = 0;
        tabu[count] = curCity;
    while (curCity!= N-1 ) {
        P = [], summ = 0;
        for (let i = 0; i < pairs.length; i++) {
            if  ((pairs[i].includes(curCity))&&!(tabu.includes(pairs[i][0])&&(pairs[i][0] != curCity))&&!(tabu.includes(pairs[i][1])&&(pairs[i][1] != curCity))) {
                summ += Math.pow(len[i][2], ALPHA) * Math.pow(len[i][1], BETA);
            }
        }
        // console.log("proverka:\n", pairs[0].includes(curCity));
        // console.log("carent city:\n", curCity);
        let j = 0;
        for (let i = 0; i < pairs.length; i++) {
            if  ((pairs[i].includes(curCity))&&!(tabu.includes(pairs[i][0])&&(pairs[i][0] != curCity))&&!(tabu.includes(pairs[i][1])&&(pairs[i][1] != curCity))) {
                P[j] = [(Math.pow(len[i][2], ALPHA) * Math.pow(len[i][1], BETA)) / summ, pairs[i][0], pairs[i][1]];
                j++;
                // console.log("pairs mine:\n", pairs[i][0],"hhh",pairs[i][1]);
            }
        }
        function max(obj) {
            let a = obj[0];
            for (let i = 1; i < obj.length; i++) {
                if (obj[i] > a) {
                    a = obj[i];
                }
            }
            return a;
        }

        indexGoodRoad = P.indexOf(max(P));
        // console.log("P[indexGoodRoad]",P[indexGoodRoad]);
        for (let i = 1; i < 3; i++) {
            if(P[indexGoodRoad][i]!=curCity){
                curCity = P[indexGoodRoad][i];
                count++;
                tabu[count] = P[indexGoodRoad][i];
                break;
            }
        }
        // document.querySelector('#graph-container').innerHTML += "<svg><line stroke-width='2px' stroke='rgb(248, 58, 58)'  x1=" + points[P[indexGoodRoad][1]][0] + "px y1=" + points[P[indexGoodRoad][1]][1] + "px x2=" + points[P[indexGoodRoad][2]][0] + "px y2=" + points[P[indexGoodRoad][2]][1] + "px /></svg>";
    }
    }
    for(i=0;i<N;i++){
        findTheBestRoad(i);
        console.log("tabu",i,":",tabu);
    }
}