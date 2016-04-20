$( document ).ready(function() {
    var d3 = Plotly.d3;

    var WIDTH_IN_PERCENT_OF_PARENT = 95,
        HEIGHT_IN_PERCENT_OF_PARENT = 80;


    var graphs =  [
        {
            name: "PAP",
            order: 1,
            node : "",
            data : [{
                y: [7, 8, 9,10, 11, 12, 13, 14, 15, 14, 10, 12, 7, 12, 8],
                type: 'scatter',
                //text: ['Text A', 'Text B', 'Text C', 'Text D', 'Text E'],
                //mode: 'markers'
            }],
            "image" : "images/blood-pressure.png"
        },
        {
            name: "SVO2",
            order: 2,
            node : "",
            data : [{
                y: [7, 8, 9,10, 11, 12, 13, 14, 15, 14, 10, 12, 7, 12, 8],
                type: 'scatter',
                //text: ['Text A', 'Text B', 'Text C', 'Text D', 'Text E'],
                //mode: 'markers'
            }],
            "image" : "images/lungs.png"
        },
        {
            name: "Hear Rate",
            order: 3,
            node : "",
            data : [{
                y: [11, 12, 13, 14, 15, 14,7, 8, 9,10, 10, 12, 7, 12, 8],
                type: 'scatter',
                //text: ['Text A', 'Text B', 'Text C', 'Text D', 'Text E'],
                //mode: 'markers'
            }],
            "image" : "images/heart-rate.png"
        },
        {
            name: "ABP NON",
            order: 4,
            node : "",
            data : [{
                y: [ 15, 14, 10, 12, 7, 12, 8,7, 8, 9,10, 11, 12, 13, 14,],
                type: 'scatter',
                //text: ['Text A', 'Text B', 'Text C', 'Text D', 'Text E'],
                //mode: 'markers'
            }],
            "image" : "images/blood-pressure.png"

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
                'margin-left': (100 - WIDTH_IN_PERCENT_OF_PARENT) / 2 + '%',
                height: 100,
            });

        graphs[i].node = gd3.node();
        //var data = [
        //    {
        //        //x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
        //        y: [7, 8, 9,10, 11, 12, 13, 14, 15, 14, 10, 12, 7, 12, 8],
        //        type: 'scatter',
        //        //text: ['Text A', 'Text B', 'Text C', 'Text D', 'Text E'],
        //        //mode: 'markers'
        //    }
        //];


        var layout = {
            yaxis: {
                linewidth: 0,
                showticklabels: true
            },
            xaxis: {
                showgrid: false,                  // remove the x-axis grid lines
                tickformat: "%B, %Y"              // customize the date format to "month, day"
            },
            margin: {                           // update the left, bottom, right, top margin
                l: 100, b: 0, r: 0, t: 0
            },
        };

        Plotly.plot(graphs[i].node, graphs[i].data, layout);

        $(graph).find('.graph-name').text(graphs[i].name);
        $(graph).find(" .graph-photo").css("background-image","url("+graphs[i].image+")");


        window.onresize = function() {
            for(var j = 0; j < graphs.length; j++){
                Plotly.Plots.resize(graphs[j].node);
            }
        };
    }

    /****
     *
     *
     *
     *
     *
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

