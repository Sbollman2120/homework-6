moment().format();

$( document ).ready(function() {

    var searchButton = $("#search-button");
    var cityName = $("#city-name");
    var cityNameBanner = $("#main-city-name");
    var tempBanner = $("#main-temp");
    var humidBanner = $("#main-humidity");
    var speedBanner = $("#main-speed");
    var uvBanner = $("#main-uv");
    var buttonsCol = $("#buttons-col");
    var imageBanner =$("#icon-main");
    var todayDate =$("#today-date");
    var jumbo = $("#jumbo");

    var dayOne = $("#day-one");
    var dayTwo = $("#day-two");
    var dayThree = $("#day-three");
    var dayFour = $("#day-four");
    var dayFive = $("#day-five");
    var dayOneDate = $("#day-one-date");
    var dayOneImage = $("#day-one-image");
    var dayOneTemp  =  $("#day-one-temp");
    var dayOneHumid = $("#day-one-humid");
    var dayTwoDate = $("#day-two-date");
    var dayTwoImage = $("#day-two-image");
    var dayTwoTemp  =  $("#day-two-temp");
    var dayTwoHumid = $("#day-two-humid")
    var dayThreeDate = $("#day-three-date");
    var dayThreeImage = $("#day-three-image");
    var dayThreeTemp  =  $("#day-three-temp");
    var dayThreeHumid = $("#day-three-humid");
    var dayFourDate = $("#day-four-date");
    var dayFourImage = $("#day-four-image");
    var dayFourTemp  =  $("#day-four-temp");
    var dayFourHumid = $("#day-four-humid");
    var dayFiveDate = $("#day-five-date");
    var dayFiveImage = $("#day-five-image");
    var dayFiveTemp  =  $("#day-five-temp");
    var dayFiveHumid = $("#day-five-humid");

    

    searchButton.on("click", function(event){
        event.preventDefault();
        var cityNameVal = cityName.val();
        console.log(cityNameVal);
        var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityNameVal+",us&units=imperial&appid=f6df7e32fa8a0e7d8e049359ebaa2318";
        var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+cityNameVal+",us&units=imperial&appid=f6df7e32fa8a0e7d8e049359ebaa2318";
        cityNameBanner.text(cityNameVal);
        jumbo.attr("class","jumbotron jumbotron-fluid d-block")
        $.ajax({
            url:  weatherUrl,
            method: "GET"
        }).then(function(response){
            tempBanner.text(response.main.temp);
            humidBanner.text(response.main.humidity);
            speedBanner.text(response.wind.speed);
            todayDate.text(moment().format('MMMM Do YYYY'));
            var imageCode = response.weather[0].icon;
            var imageSrc = "https://openweathermap.org/img/wn/"+imageCode+"@2x.png"
            imageBanner.attr("src",imageSrc);
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            uvUrl ="https://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid=f6df7e32fa8a0e7d8e049359ebaa2318"
            $.ajax({
                url:  uvUrl,
                method: "GET"
            }).then(function(response){
                uvBanner.text(response.value)
                if (response.value<=3){
                    uvBanner.attr("class","low")
                } else if (response.value>3 && response.value<=6){
                    uvBanner.attr("class","mod")
                } else if (response.value>6) {
                    uvBanner.attr("class","high")
                }
            });
        });

        $.ajax({
            url:  forecastUrl,
            method: "GET"
        }).then(function(response){
            dayOneDate.text(moment().add('1','d').format('MMMM Do YYYY'))
            dayTwoDate.text(moment().add('2','d').format('MMMM Do YYYY'))
            dayThreeDate.text(moment().add('3','d').format('MMMM Do YYYY'))
            dayFourDate.text(moment().add('4','d').format('MMMM Do YYYY'))
            dayFiveDate.text(moment().add('5','d').format('MMMM Do YYYY'))
            var imageCodeOne = response.list[7].weather[0].icon;
            var imageSrcOne = "https://openweathermap.org/img/wn/"+imageCodeOne+"@2x.png"
            dayOneImage.attr("src",imageSrcOne);
            var imageCodeTwo = response.list[15].weather[0].icon;
            var imageSrcTwo = "https://openweathermap.org/img/wn/"+imageCodeTwo+"@2x.png"
            dayTwoImage.attr("src",imageSrcTwo);
            var imageCodeThree = response.list[23].weather[0].icon;
            var imageSrcThree = "https://openweathermap.org/img/wn/"+imageCodeThree+"@2x.png"
            dayThreeImage.attr("src",imageSrcThree);
            var imageCodeFour = response.list[31].weather[0].icon;
            var imageSrcFour = "https://openweathermap.org/img/wn/"+imageCodeFour+"@2x.png"
            dayFourImage.attr("src",imageSrcFour);
            var imageCodeFive = response.list[39].weather[0].icon;
            var imageSrcFive = "https://openweathermap.org/img/wn/"+imageCodeFive+"@2x.png"
            dayFiveImage.attr("src",imageSrcFive);
            dayOne.attr("class","card d-block");
            dayTwo.attr("class","card d-block");
            dayThree.attr("class","card d-block");
            dayFour.attr("class","card d-block");
            dayFive.attr("class","card d-block");
            dayOneTemp.text(response.list[7].main.temp);
            dayOneHumid.text(response.list[7].main.humidity);
            dayTwoTemp.text(response.list[15].main.temp);
            dayTwoHumid.text(response.list[15].main.humidity);
            dayThreeTemp.text(response.list[23].main.temp);
            dayThreeHumid.text(response.list[23].main.humidity);
            dayFourTemp.text(response.list[31].main.temp);
            dayFourHumid.text(response.list[31].main.humidity);
            dayFiveTemp.text(response.list[39].main.temp);
            dayFiveHumid.text(response.list[39].main.humidity);
        });
        var newButton = $("<button>");
        newButton.attr("class","btn btn-success city-button");
        newButton.attr("type","button");
        newButton.text(cityNameVal);
        newButton.attr("data-name",cityNameVal);
        buttonsCol.append(newButton);
        console.log(newButton.attr("data-name"));
        console.log(newButton.attr("class"));
    });
    $(document).on("click", ".city-button", function() {
        event.preventDefault();
        var cityNameVal = $(this).attr("data-name");
        console.log(cityNameVal);
        var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityNameVal+",us&units=imperial&appid=f6df7e32fa8a0e7d8e049359ebaa2318";
        var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+cityNameVal+",us&units=imperial&appid=f6df7e32fa8a0e7d8e049359ebaa2318";
        cityNameBanner.text(cityNameVal);
        jumbo.attr("class","jumbotron jumbotron-fluid d-block")
        $.ajax({
            url:  weatherUrl,
            method: "GET"
        }).then(function(response){
            tempBanner.text(response.main.temp);
            humidBanner.text(response.main.humidity);
            speedBanner.text(response.wind.speed);
            todayDate.text(moment().format('MMMM Do YYYY'));
            var imageCode = response.weather[0].icon;
            var imageSrc = "https://openweathermap.org/img/wn/"+imageCode+"@2x.png"
            imageBanner.attr("src",imageSrc);
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            uvUrl ="https://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid=f6df7e32fa8a0e7d8e049359ebaa2318"
            $.ajax({
                url:  uvUrl,
                method: "GET"
            }).then(function(response){
                uvBanner.text(response.value)
                if (response.value<=3){
                    uvBanner.attr("class","low")
                } else if (response.value>3 && response.value<=6){
                    uvBanner.attr("class","mod")
                } else if (response.value>6) {
                    uvBanner.attr("class","high")
                }
            });
        });

        $.ajax({
            url:  forecastUrl,
            method: "GET"
        }).then(function(response){
            dayOneDate.text(moment().add('1','d').format('MMMM Do YYYY'))
            dayTwoDate.text(moment().add('2','d').format('MMMM Do YYYY'))
            dayThreeDate.text(moment().add('3','d').format('MMMM Do YYYY'))
            dayFourDate.text(moment().add('4','d').format('MMMM Do YYYY'))
            dayFiveDate.text(moment().add('5','d').format('MMMM Do YYYY'))
            var imageCodeOne = response.list[7].weather[0].icon;
            var imageSrcOne = "https://openweathermap.org/img/wn/"+imageCodeOne+"@2x.png"
            dayOneImage.attr("src",imageSrcOne);
            var imageCodeTwo = response.list[15].weather[0].icon;
            var imageSrcTwo = "https://openweathermap.org/img/wn/"+imageCodeTwo+"@2x.png"
            dayTwoImage.attr("src",imageSrcTwo);
            var imageCodeThree = response.list[23].weather[0].icon;
            var imageSrcThree = "https://openweathermap.org/img/wn/"+imageCodeThree+"@2x.png"
            dayThreeImage.attr("src",imageSrcThree);
            var imageCodeFour = response.list[31].weather[0].icon;
            var imageSrcFour = "https://openweathermap.org/img/wn/"+imageCodeFour+"@2x.png"
            dayFourImage.attr("src",imageSrcFour);
            var imageCodeFive = response.list[39].weather[0].icon;
            var imageSrcFive = "https://openweathermap.org/img/wn/"+imageCodeFive+"@2x.png"
            dayFiveImage.attr("src",imageSrcFive);
            dayOne.attr("class","card d-block");
            dayTwo.attr("class","card d-block");
            dayThree.attr("class","card d-block");
            dayFour.attr("class","card d-block");
            dayFive.attr("class","card d-block");
            dayOneTemp.text(response.list[7].main.temp);
            dayOneHumid.text(response.list[7].main.humidity);
            dayTwoTemp.text(response.list[15].main.temp);
            dayTwoHumid.text(response.list[15].main.humidity);
            dayThreeTemp.text(response.list[23].main.temp);
            dayThreeHumid.text(response.list[23].main.humidity);
            dayFourTemp.text(response.list[31].main.temp);
            dayFourHumid.text(response.list[31].main.humidity);
            dayFiveTemp.text(response.list[39].main.temp);
            dayFiveHumid.text(response.list[39].main.humidity);
        });
    });
});