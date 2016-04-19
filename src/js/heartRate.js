var hearRate = function(){

    var maximum = 100;
    var minimum = 65;
    var data = [[]];
    var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;


    var getRandomNumber = function(){
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    };


    return {
        getRandomDataSet : function(numberOfInstances) {
            var day = parseInt(1, 10);

            for(var i = 0; i < numberOfInstances; i++){
                data[0].push({
                    "date": "2014-01-"+day,
                    "value": getRandomNumber()
                });
                day = day + 1;
            }
            return data;
        }
    };
}();