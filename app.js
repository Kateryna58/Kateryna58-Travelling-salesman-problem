// var i,
//     s,
//     N = document.querySelector('#cities').value,
//     E = 500,
//     g = {
//         nodes: [],
//         edges: []
//     };

// // Generate a random graph:
// for (i = 0; i < N; i++)
//     g.nodes.push({
//         id: 'n' + i,
//         x: Math.random(),
//         y: Math.random(),
//         size: Math.random(),
//         color: 'rgb(224, 42, 42)'
//     });

// for (i = 0; i < E; i++)
//     g.edges.push({
//         id: 'e' + i,
//         source: 'n' + (Math.random() * N | 0),
//         target: 'n' + (Math.random() * N | 0),
//         size: Math.random(),
//         color: '#ccc'
//     });

// function new_graph() {
//     // Instantiate sigma:
//     s = new sigma({
//         graph: g,
//         container: 'graph-container'
//     });
//     console.log(document.querySelector('#cities').value);
// }



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
    for (i = 0; i < N; i++) {
        var X = getRandomPos(5, window.innerWidth * 0.7 - 50),
            Y = getRandomPos(5, window.innerHeight - 50);
        for (j = 0; j < m; j++) {
            if (j == 0) {
                points[i][j] = X;
            } else {
                points[i][j] = Y;
            }
        }



        document.querySelector('#graph-container').innerHTML += "<div class='point p" + i + "' style='top:" + Y + "px;left:" + X + "px;'>" + i + "</div>";
    }
    document.querySelector('#graph-container').innerHTML += "<svg><line stroke-width='2px' stroke='rgb(219, 162, 88)'  x1=" + points[0][0] + "px y1=" + points[0][1] + "px x2=" + points[1][0] + "px y2=" + points[1][1] + "px id='mySVG'/></svg>";
    // document.querySelector('#graph-container').innerHTML += "<svg><line stroke-width='1px' stroke='#000000'  x1='" + points[1][0] + "' y1='" + points[1][1] + "' x2='" + points[2][0] + "' y2='" + points[2][1] + "' id='mySVG'/></svg>";
    // console.log(points);
    // document.querySelector('#graph-container').innerHTML += "<svg><line stroke-width='1px' stroke='#000000'  x1='" + points[2][0] + "px' y1='" + points[2][1] + "px' x2='" + points[3][0] + "px' y2='" + points[3][1] + "px' id='mySVG'/></svg>";
    // document.querySelector('#graph-container').innerHTML += "<svg><line stroke-width='1px' stroke='#000000'  x1='" + points[3][0] + "' y1='" + points[3][1] + "' x2='" + points[4][0] + "' y2='" + points[4][1] + "' id='mySVG'/></svg>";
    console.log(points[0][0] + ";" + points[0][1]);
    console.log(points);

}