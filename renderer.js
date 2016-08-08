
var ping = require("ping-wrapper2");
var pingSettings = {
    host: "ping.sunet.se",
    threshold: 25,

    config: {
        count: 20000
    }
};
var exec = ping(pingSettings.host, pingSettings.config); 
var xVal = 0;
var yVal = 50; 
var dataLength = 15; 
var dps = []; // dataPoints

CanvasJS.addColorSet("greenShades", [
    "#2F4F4F",
    "#008080",
    "#2E8B57",
    "#3CB371",
    "#90EE90"  
]); 
var chart = new CanvasJS.Chart("chartContainer", {

    theme: "theme2", // “theme1″,”theme2”, “theme3” 
    backgroundColor: "rgb(208, 204, 190)",
    colorSet:  "greenShades",


    title: {
        text: "ping ping.sunet.se",
    },

    legend: {
        horizontalAlign: "left", // "center" , "right"
        verticalAlign: "center",  // "top" , "bottom"
        fontSize: 15

    },

    axisX: {
        includeZero: false,
        lineThickness: 3,
        labelFormatter: function (event) {
            return '';
        }
    },

    axisY: {
        includeZero: false,
        lineThickness: 3,
        labelFormatter: function (event) {
            return event.value.toFixed(0) + " ms";
        }
    },


    data: [
        {
            name: "ms",
            type: "line", // "stepLine", "splineArea", "spline"
            indexLabelLineColor: "pink",
            markerType: "circle", //"none", "circle", "square", "cross", "triangle"
            dataPoints: dps
        }
    ]


});

var updateChart = function (count) {
    exec.on("data", function (data) {
        var ms = data.time;
        var color = "green";

        if (ms > pingSettings.threshold) {
            color = "red";
        }
        dps.push({
            x: xVal++,
            y: ms,
            color: color,
        });
        if (dps.length > dataLength) {
            dps.shift();                
        }

        document.getElementById('current-ping').innerHTML = Number((data.time).toFixed(0)) + " ms";
        chart.render();
    });
};

updateChart(dataLength); 
