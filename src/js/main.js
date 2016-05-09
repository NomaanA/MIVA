$( document ).ready(function() {
    var d3 = Plotly.d3;

    var WIDTH_IN_PERCENT_OF_PARENT = 92,
        HEIGHT_IN_PERCENT_OF_PARENT = 90;

    var number_of_reuslts = 10;
    var dates = ['2013-03-04 22:23:00', '2013-04-04 22:23:00', '2013-05-04 22:23:00', '2013-06-04 22:23:00', '2013-07-04 22:23:00', '2013-08-04 22:23:00', '2013-09-04 22:23:00',   '2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00']

    var graph_margin = {
        l : 0,
        r: -10,
        b: 0,
        t: 5
    };

    var generateRandom = function(low, high, instances){
        var resultArray = [];
        for(var i= 0; i <= instances; i++){
            resultArray[i] =  Math.floor(Math.random() * (high - low) + low);
        }


        return resultArray;
    };
    var graphs =  [
        {
            name: "PAP",
            order: 1,
            node : "",
            data : [{
                y: generateRandom(7, 17,number_of_reuslts) ,
                type: 'scatter',
                //text: ['Text A', 'Text B', 'Text C', 'Text D', 'Text E'],
                //mode: 'markers'
            }],
            "image" : "images/blood-pressure.png",
            margin: graph_margin,
            symbol : "circle",
            current: "12"
        },
        {
            name: "SVO2",
            order: 2,
            node : "",
            data : [{
                y: generateRandom(19, 49, number_of_reuslts),
                type: 'scatter',
                //text: ['Text A', 'Text B', 'Text C', 'Text D', 'Text E'],
                //mode: 'markers'
            }],
            "image" : "images/lungs.png",
            margin: graph_margin,
            current: "41"
        },
        {
            name: "Hear Rate",
            order: 3,
            node : "",
            data : [{
                y: generateRandom(45, 125, number_of_reuslts),
                type: 'scatter',
                //text: ['Text A', 'Text B', 'Text C', 'Text D', 'Text E'],
                //mode: 'markers'
            }],
            "image" : "images/heart-rate.png",
            margin: graph_margin,
            current: "75"

        },
        {
            name: "ABP NON",
            order: 4,
            node : "",
            data : [{
                y: generateRandom(45, 85, number_of_reuslts),
                type: 'scatter',
                //text: ['Text A', 'Text B', 'Text C', 'Text D', 'Text E'],
                //type: 'scatter'
            }],
            "image" : "images/blood-pressure.png",
            margin: graph_margin,
            current: "73"

        },
        {
            name: ".",
            order: 5,
            node : "",
            data : [{
                y: [1, 2, 3, 4, 4, 4, 4, 5, 8, 10],
                x: [1, 2, 3, 4, 4, 4, 4, 5, 8, 10],

                mode: 'markers',
                marker: {
                    size: [1, 2, 3, 4, 4, 4, 4, 5, 8, 10],
                    color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
                },
                //x: dates,
                //type: 'scatter',
                //text: ['Text A', 'Text B', 'Text C', 'Text D', 'Text E'],
                //type: 'scatter'
            }],
            //"image" : "images/blood-pressure.png",
            margin: graph_margin,
            current: ""

        }
    ];

    var graph = "#graph";


    for(var i= 0; i < graphs.length; i++){
        //for each graph, should pass in the info in to a loop

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


        graphs[i].data[0].mode = "lines";
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
                //tickformat: "%B, %Y"              // customize the date format to "month, day"
            },
            margin: {                           // update the left, bottom, right, top margin
                l: 100, b: 0, r: 0, t: 0
            },

        };

        if(i == graphs.length - 1) {
            //debugger;
            gd3.style({
                height: 80
            });

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
                rangemode: 'tozero',
            }
            //graphs[i].node = "timeline";
        }



        Plotly.plot(graphs[i].node, graphs[i].data, layout, {
            displayModeBar: false,
            //scrollZoom: true
        });
        $(graph).find('.graph-name').text(graphs[i].name);
        //OUCH THIS HURTS!
        $(graph).append("<div class='current'>"+graphs[i].current+"</div>");
        //$(graph).find('.current').text(graphs[i].current);
        $(graph).find(" .graph-photo").css("background-image","url("+graphs[i].image+")");



        window.onresize = function() {
            for(var j = 0; j < graphs.length; j++){
                Plotly.Plots.resize(graphs[j].node);
            }
        };
    }

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

