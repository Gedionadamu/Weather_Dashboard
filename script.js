var APIkey = "5653051af8595ec21720cf5c767ab487";
// var APIkey2 = "6ecdc1928c85022b921384c321b71183";
var UserInput = $("input").val();
var currentcity = "PlaceHolder";
var searchHistory = [];
var searchBtn = $(".search");
var cardEl = $(".card");
var days = 5;



 function init(){
     var savedsearch = JSON.parse(localStorage.getItem("savedHistory"));
     if (savedsearch !== null){
         savedsearch = searchHistory;
     }
     renderHistory();
 }
function saveHistory(){
    searchHistory.push(UserInput)
    localStorage.setItem("savedHistory", JSON.stringify(searchHistory));
    // console.log(searchHistory);
}
function renderHistory(){
    var localsearch = JSON.parse(localStorage.getItem("savedHistory"));
    console.log(localsearch);
       var historyEl = $('.history')
       if (localsearch == null){
           return
       }
       else{
    for(var i=0; i < localsearch.length; i++) {
        var search = $('<button>');
        search.text(localsearch[i]);
        search.addClass('btn btn-secondary historybtn ms-1 mt-1');
        historyEl.append(search);

    }
}


}
//  var historybutton = $(".historybtn");
//  console.log(historybutton);
//  historybutton.on("click", function(){
//      var txt = $(this).val();
//      console.log(txt)

//  })
//  console.log


searchBtn.on("click", function(){
    
    UserInput = $("input").val();
    var today = moment();
    var lat = [];
    var lon = [];
    $("#currentDay").text( UserInput +" (" + today.format("M/D/YYYY")+")");
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${UserInput}&appid=${APIkey}&units=imperial`)
    .then(function(response){
    return response.json();
    })
    .then(function(data){
        console.log(data)
        $("#currenttemp").text("Current Temprature : " + data.main.temp + "°F");
        $("#currentwind").text("Current Wind : " + data.wind.speed + "MPH");
        $("#currenthumidity").text("Current Humidity : " + data.main.humidity + "%");
        console.log(data.coord.lat);    
        console.log(data.coord.lon);
        lat.push(data.coord.lat);
        lon.push(data.coord.lon);
        
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${APIkey}`)
        .then(function(response2){
            return response2.json();
        })
        .then(function(data2){
            $("#currentuv").text("Current UVI : " + data2.current.uvi)
        })
       
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${APIkey}&units=imperial`)
        .then(function(response1){
            return response1.json();
        })
        .then(function(data1){
            console.log(data1.daily);
            for(var i=0; i < 5; i++){
                
                    $("#day"+[i]).text(moment().add(i+1, 'days').format("M/D/YYYY"));
                    $("#temp"+[i]).text("Temprature : " + data1.daily[i].temp.day + "°F" );
                    $("#wind"+[i]).text( "Wind : " + data1.daily[i].wind_speed  + "MPH");
                    $("#humidity"+[i]).text("Humidity : " + data1.daily[i].humidity + "%" );
                    $("#uv"+[i]).text( "UVI : " + data1.daily[i].uvi);
                }
           
        })      
    })
    saveHistory();
    renderHistory();
    
    
});

init();


    
