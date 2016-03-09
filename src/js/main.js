//
//
//d3.json('data/ufo-sightings.json', function(data) {
//    MG.data_graphic({
//        title: "UFO Sightings",
//        description: "Yearly UFO sightings (1945 to 2010).",
//        data: data,
//        width: 650,
//        height: 600,
//        target: '#ufo-sightings',
//        x_accessor: 'year',
//        y_accessor: 'sightings',
//        markers: [{'year': 1964,
//            'label': '"The Creeping Terror" released'
//        }]
//    })
//})

d3.json('data/fake_users3.json', function(data) {

    for (var i = 0; i < data.length; i++) {
        data[i] = MG.convert.date(data[i], 'date');
    }

    MG.data_graphic({
        title: "Test",
        description: "Drag the crosshair over the chart to zoom. For further details about this addon, take a look at its GitHub repo.",
        data: data,
        top: 70,
        width: 600,
        height: 400,
        right: 40,
        missing_is_hidden: true,
        target: '#brushing'
    });
});