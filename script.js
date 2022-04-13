var APIkey = "5653051af8595ec21720cf5c767ab487 ";
var UserInput = $("input").val();
var currentcity = "PlaceHolder";
var today = moment();
$("#currentDay").text( currentcity +" (" + today.format("M,D,YYYY")+")");



var searchBtn = $(".search");


searchBtn.on("click", function(){
    UserInput = $("input").val();
    var today = moment();
    $("#currentDay").text( UserInput +" (" + today.format("M,D,YYYY")+")");
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${UserInput}&appid=${APIkey}&units=imperial`)
    .then(function(response){
    return response.json();
    })
    .then(function(data){
    for (var i= 0; i < data.length; i++){
        console.log(data[i].temp);
        console.log(data[i].speed);
        console.log(data[i].humidity);
        console.log(data[i].uvi);    
    }
})
    console.log(UserInput);
});


    
