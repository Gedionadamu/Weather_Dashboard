var APIkey = "5653051af8595ec21720cf5c767ab487";
// var APIkey2 = "6ecdc1928c85022b921384c321b71183";
var UserInput = $("input").val();
var currentcity = "PlaceHolder";
var searchHistory = [];
var searchBtn = $(".search");
var days = 5




function saveHistory(){
    searchHistory.push(UserInput)
    localStorage.setItem("savedHistory", JSON.stringify(searchHistory));
    console.log(searchHistory);
}
function renderHistory(){

}

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
        console.log(data.main.temp);
        console.log(data.wind.speed);
        console.log(data.main.humidity);
        console.log(data.coord.lat);    
        console.log(data.coord.lon);
        lat.push(data.coord.lat);
        lon.push(data.coord.lon); 
       
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${APIkey}&units=imperial`)
        .then(function(response1){
            return response1.json();
        })
        .then(function(data1){
            console.log(data1.daily);
            for(var i=0; i < 5; i++){
                    console.log(data1.daily[i].temp.day)
                    console.log(data1.daily[i].wind_speed)
                    console.log(data1.daily[i].humidity)
                    console.log(data1.daily[i].uvi)
                }
           
        })      
    })
    
    saveHistory();
});


    
