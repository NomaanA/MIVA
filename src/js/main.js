var config = {
    graph_margin : {
        l : 0,
        r: -10,
        b: 0,
        t: 5
    },
    number_of_reuslts : 10,
    dates :
        ["2001-06-11 11:00"
    ,"2001-06-11 11:10","2001-06-11 11:20","2001-06-11 11:30", "2001-06-11 11:40", "2001-06-11 11:50", "2001-06-11 12:00", "2001-06-11 12:10", "2001-06-11 12:20", "2001-06-11 12:30"]
};



$( document ).ready(function() {





    drawGraphs(getData());
    drawTimeline();


    /**
     *
     *    TAB
     */
    $(document).on('show.bs.tab', '.nav-tabs-responsive [data-toggle="tab"]', function(e) {
        var $target = $(e.target);
        var $tabs = $target.closest('.nav-tabs-responsive');
        var $current = $target.closest('li');
        var $parent = $current.closest('li.dropdown');
        $current = $parent.length > 0 ? $parent : $current;
        var $next = $current.next();
        var $prev = $current.prev();
        var updateDropdownMenu = function($el, position){
            $el
                .find('.dropdown-menu')
                .removeClass('pull-xs-left pull-xs-center pull-xs-right')
                .addClass( 'pull-xs-' + position );
        };

        $tabs.find('>li').removeClass('next prev');
        $prev.addClass('prev');
        $next.addClass('next');

        updateDropdownMenu( $prev, 'left' );
        updateDropdownMenu( $current, 'center' );
        updateDropdownMenu( $next, 'right' );
    });
});


var generateRandom = function(low, high, instances){
    var resultArray = [];
    for(var i= 0; i <= instances; i++){
        resultArray[i] =  Math.floor(Math.random() * (high - low) + low);
    }

    return resultArray;
};


var drawGraphs = function (graphs, layout) {
    var WIDTH_IN_PERCENT_OF_PARENT = 92,
        HEIGHT_IN_PERCENT_OF_PARENT = 90;

    var d3 = Plotly.d3;





    var y1 = ["medication", "note", "med", "lab results", "note", "note", "note", "note"];
    var y2 = y1.reverse();

    for(var i= 0; i < graphs.length; i++){
        var graph = "#graph";
        graph = graph+ graphs[i].order;

        var gd3 = d3.select(graph)
            .append('div')
            .style({
                width: WIDTH_IN_PERCENT_OF_PARENT + '%',
                'margin-left': (100 - WIDTH_IN_PERCENT_OF_PARENT) + '%',
                height: 100,
                position: "relative",
                top: -10
            });


        //graphs[i].data[0].mode = "lines";
        graphs[i].node = gd3.node();

        var layout = {
            yaxis: {
                linewidth: 0,
                showticklabels: true,
                autorange: true
            },
            xaxis: {
                showgrid: false,
                // remove the x-axis grid lines
                tickformat: "%B, %Y"              // customize the date format to "month, day"
            },
            margin: {                           // update the left, bottom, right, top margin
                l: 100, b: 0, r: 0, t: 0
            }
        };

        if(i == graphs.length - 1) {
            gd3.style({
                height: 300
            });
            layout.showlegend = false;

            layout.yaxis = {
                showgrid: false,
                //zeroline: false,
                showline: false,
                autotick: true,
                ticks: '',
                showticklabels: false,
                showlegend: false,
                mirror: 'ticks',
                rangemode: 'nonnegative',
                fixedrange: true
                //type: log
            };

            layout.xaxis = {
                //rangemode: 'tozero',
                //showgrid: true,
                ////zeroline: false,
                //showline: true,
                //autotick: true,
                //ticks: '',
                //showticklabels: true,
                //showlegend: true,
                //mirror: 'ticks',
                //rangemode: 'nonnegative',
                //fixedrange: true
            }
            //graphs[i].node = "timeline";
        }


        if(i != graphs.length - 1) {
            Plotly.plot(graphs[i].node, graphs[i].data, layout, {
                displayModeBar: false,
                //scrollZoom: true
            });
            $(graph).find('.graph-name').text(graphs[i].name);
            //OUCH THIS HURTS!
            $(graph).append("<div class='current'>" + graphs[i].current + "</div>");
            //$(graph).find('.current').text(graphs[i].current);
            $(graph).find(" .graph-photo").css("background-image", "url(" + graphs[i].image + ")");
        }


        window.onresize = function() {
            for(var j = 0; j < graphs.length; j++){
                Plotly.Plots.resize(graphs[j].node);
            }
        };
    }
};

var drawTimeline = function () {
    //debugger;
    //var gd3 = d3.select("#timeline")
    //    .append('div')
    //    .style({
    //        width: 100 + '%',
    //        //'margin-left': (100 - WIDTH_IN_PERCENT_OF_PARENT) + '%',
    //        height: 100,
    //        position: "relative",
    //        //top: -10
    //    });


    var trace1 = {
        x: config.dates,
        y: [1, 1, 1, 1, 1, 1, 1, 1, 1],
        mode: 'markers',
        marker: {
            size: [20, 20, 20, 20],
            color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
            symbol: ['square', 'square', 'square', 'square']
        }
    };

    var data = [trace1];

    var layout = {
        showlegend: false,
        height: 200,
        //width: 480
        yaxis: {
            autorange: true,
            showgrid: false,
            zeroline: false,
            showline: false,
            autotick: true,
            ticks: '',
            showticklabels: false
        }
        //width: 480
    };

    Plotly.newPlot("test", data, layout,  {displayModeBar: false});

}

var getData = function () {
    var data =  [
        {
            name: "PAP",
            order: 1,
            node : "",
            data : [{
                y: generateRandom(7, 17,config.number_of_reuslts) ,
                type: 'scatter',
                text: ['', '', '', '', ''],
            }],
            "image" : "images/blood-pressure.png",
            margin: config.graph_margin,
            symbol : "circle",
            current: "12"
        },
        {
            name: "SVO2",
            order: 2,
            node : "",
            data : [{
                y: generateRandom(19, 49, config.number_of_reuslts),
                type: 'scatter',
                text: ['', '', '', '', '']
            }],
            "image" : "images/lungs.png",
            margin: config.graph_margin,
            current: "41"
        },
        {
            name: "Hear Rate",
            order: 3,
            node : "",
            data : [{
                y: generateRandom(45, 125, config.number_of_reuslts),
                type: 'scatter',
                //text: ['Text A', 'Text  'Text C', 'Text D', 'Text E'],
            }],
            "image" : "images/heart-rate.png",
            margin: config.graph_margin,
            current: "75"

        },
        {
            name: "ABP NON",
            order: 4,
            node : "",
            data : [{
                y: generateRandom(45, 85, config.number_of_reuslts),
                type: 'scatter',
            }],
            "image" : "images/blood-pressure.png",
            margin: config.graph_margin,
            current: "73"
        },
        {
            name: ".",
            order: 5,
            node : "",
            data: {
                x: [1, 2, 3, 4],
                y: [10, 11, 12, 13],
                mode: 'lines',
                marker: {
                    size: [40, 40, 40, 40],
                    color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
                }
            },
            margin: config.graph_margin,
            current: ""
        }
    ];

    return data;
}