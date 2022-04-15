// variable designation for api keyfor open weather
var APIkey = "5653051af8595ec21720cf5c767ab487";
// variable for userinput
var UserInput = $("input").val();
//empty array to push local storage 
var searchHistory = [];
// search button selection
var searchBtn = $(".search");
// card element selection
var cardEl = $(".card");

var days = 5;
var today = moment();


// function that renders localstorage when page loads
function init() {
    var savedsearch = JSON.parse(localStorage.getItem("savedHistory"));
    if (savedsearch !== null) {
        savedsearch = searchHistory;
    }
    renderHistory();
}
// function that save seach history to local storage
function saveHistory() {
    searchHistory.push(UserInput)
    localStorage.setItem("savedHistory", JSON.stringify(searchHistory));
    // console.log(searchHistory);
}
// places search history in local storage array into buttons
function renderHistory() {
    var localsearch = JSON.parse(localStorage.getItem("savedHistory"));


    if (localsearch == null) {
        return
    }
    else {
        for (var i = 0; i < localsearch.length; i++) {
            createhistorybtn(localsearch[i]);

        }
    }


}
// creates and displays history buttons on html
function createhistorybtn(cityname) {
    var historyEl = $('.history')
    var search = $('<button>');
    search.text(cityname);
    search.addClass('btn btn-secondary historybtn ms-1 mt-1');
    search.on("click", function () {
        console.log(search.text())
        fetchdata(search.text());
    });
    historyEl.append(search);

}
// gets data from openweathermap.org
function fetchdata(cityname) {
    var lat = [];
    var lon = [];
    // fetch api data 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}&units=imperial`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data)
            // using api data to update html elements
            $("#currenticon").attr("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
            $("#currenttemp").text("Current Temprature : " + data.main.temp + "°F");
            $("#currentwind").text("Current Wind : " + data.wind.speed + "MPH");
            $("#currenthumidity").text("Current Humidity : " + data.main.humidity + "%");
            // console.log(data.coord.lat);
            // console.log(data.coord.lon);
            lat.push(data.coord.lat);
            lon.push(data.coord.lon);
            // fetch api data to get UVI data
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${APIkey}`)
                .then(function (response2) {
                    return response2.json();
                })
                .then(function (data2) {
                    // using api data to update uvi index on html
                    $("#currentuv").text("Current UVI : " + data2.current.uvi)
                    // conditional statement to indicate conditions for uv index is favorable, moderate or severe
                    if(data2.current.uvi <= 2){
                        $("#currentuv").attr("class","bg-success")
                    }
                    else if(2 < data2.current.uvi <=7){
                        $("#currentuv").attr("class","bg-warning")
                    }
                    else{
                        $("#currentuv").attr("class","bg-danger")

                    }
                })
                // fetch data to get the 5 day forecast
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${APIkey}&units=imperial`)
                .then(function (response1) {
                    return response1.json();
                })
                .then(function (data1) {
                    console.log(data1.daily);
                    // create a for loop to iterate through the card and put relevant date in the cards
                    for (var i = 0; i < 5; i++) {
                        $("#day" + [i]).text(moment().add(i + 1, 'days').format("M/D/YYYY"));
                        $("#img"+[i]).attr("src", `http://openweathermap.org/img/wn/${data1.daily[i].weather[0].icon}@2x.png`)
                        $("#temp" + [i]).text("Temprature : " + data1.daily[i].temp.day + "°F");
                        $("#wind" + [i]).text("Wind : " + data1.daily[i].wind_speed + "MPH");
                        $("#humidity" + [i]).text("Humidity : " + data1.daily[i].humidity + "%");
                        $("#uv" + [i]).text("UVI : " + data1.daily[i].uvi);
                    }

                })
        })
}
// an event lister on the search button to call multiple function the get data, modify data and append to html
searchBtn.on("click", function () {
    UserInput = $("input").val();
    $("#currentDay").text(UserInput + " (" + today.format("M/D/YYYY") + ")");
    fetchdata(UserInput);
    createhistorybtn(UserInput);
    saveHistory();



});
// calls a function that  renders localstorage when page loads
init();



