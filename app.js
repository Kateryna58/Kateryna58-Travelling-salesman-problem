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
            document.querySelector('#graph-container').innerHTML += "<svg class='rebro'><line stroke-width='1px' stroke='#000'  x1=" + points[i][0] + "px y1=" + points[i][1] + "px x2=" + points[j][0] + "px y2=" + points[j][1] + "px /></svg>";
            pairs[k] = [i, j];
            k++;
        }
    }
    let len = new Array();
    for (let i = 0; i < pairs.length; i++) {
        len[i] = [Math.sqrt(Math.pow(points[pairs[i][1]][0] - points[pairs[i][0]][0], 2) + Math.pow(points[pairs[i][1]][1] - points[pairs[i][0]][1], 2)),pairs[i][0],pairs[i][1] ]; //ADDED LENGTH
        // console.log(pairs[i]);
    }
    let summ,
        ALPHA = 1,
        BETA = 5,
        RHO = 0.75,
        Q = 100;
    for (let i = 0; i < len.length; i++) {
        len[i][3] = 1 / len[i][0]; //n(r,u)
        len[i][4] = Q / N; //pher t0
        
    }
    // console.log("LEN(length,n(r,u),pheromone t0):\n", len);
    // console.log("pairs:\n", pairs);
    // console.log("points:\n", points);
    var indexGoodRoad, P = new Array(),curCity,tabu = new Array(),bestRoadsList=new Array(),l=0;

    function findTheBestRoad(a) {
        summ=0;
        tabu = [];
        indexGoodRoad=0;
        curCity = a;
        count = 0;
        tabu[count] = curCity;
        var noMatches=false;
    while (tabu.length!= N ) {
        P = [], summ = 0;
        for (let i = 0; i < pairs.length; i++) {
            if  ((pairs[i].includes(curCity))&&!(tabu.includes(pairs[i][0])&&(pairs[i][0] != curCity))&&!(tabu.includes(pairs[i][1])&&(pairs[i][1] != curCity))) {
                summ += Math.pow(len[i][4], ALPHA) * Math.pow(len[i][3], BETA);//len[i][4] інтенсивність ферменту між вузлами, len[i][3] вимір зворотнього шляху
            }
        }
        // console.log("proverka:\n", pairs[0].includes(curCity));
        // console.log("carent city:\n", curCity);
        let j = 0;
        for (let i = 0; i < pairs.length; i++) {
            if  ((pairs[i].includes(curCity))&&!(tabu.includes(pairs[i][0])&&(pairs[i][0] != curCity))&&!(tabu.includes(pairs[i][1])&&(pairs[i][1] != curCity))) {
                P[j] = [(Math.pow(len[i][4], ALPHA) * Math.pow(len[i][3], BETA)) / summ, pairs[i][0], pairs[i][1]];
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
        for(let i=0;i<15;i++){
            for(let i=0;i<N;i++){
                findTheBestRoad(i);
                for(let i=0;i<tabu.length-1;i++){
                    // console.log(tabu[i],"and",tabu[i+1]," ;");
                    for(let j=0;j<len.length;j++){
                        if(len[j][1]==tabu[i]&&len[j][2]==tabu[i+1]||len[j][2]==tabu[i]&&len[j][1]==tabu[i+1]){
                            len[j][4]+=len[j][4];
                            len[j][4]*=RHO;
                            // console.log('do it');
                        }else{
                            len[j][4]*=(1-RHO);
                        }
                    }
                }
                bestRoadsList[l]=tabu;
                l++;
            }
            
           
            // if(bestRoadsList.includes(tabu)){
            //     break;
            // }

}

    console.log("points",points);

if(bestRoadsList.includes(tabu)){
        console.log("includes",tabu);
        for(let i=0;i<tabu.length-1;i++){
            document.querySelector('#graph-container').innerHTML += "<svg><line stroke-width='2px' stroke='rgb(248, 58, 58)'  x1=" + points[tabu[i]][0] + "px y1=" + points[tabu[i]][1] + "px x2=" + points[tabu[i+1]][0] + "px y2=" + points[tabu[i+1]][1] + "px /></svg>";
        }
}    
console.log(tabu);
}