// document.getElementById('humidity-slider').disabled = true;

// const apiUrl = "http://weatherstack.com/current";
//const urlParams = {
//   query: "Norwich",
// access_key: "671b96094755c3d56105233875e5b2e9",
//}

const humiditySlider = document.getElementById('humidity-slider');

const temperatureSlider = document.getElementById('temperature-slider');
const windSpeedSlider = document.getElementById('windspeed-slider');


const temperatureValue = document.getElementById('temperature-value');
const windSpeedValue = document.getElementById('windspeed-value');
const humidityValue = document.getElementById('humidity-value');
const rainValue = document.getElementById('raining-value');


const leafAnimations = document.getElementsByClassName('leaf');
const rainAnimations = document.getElementsByClassName('rain');



const humidityFilter = document.getElementById("humidity-filter");


function sliderChange(){

}

const apiUrl = "http://localhost:5501/assets/code/test.json";

async function fetchData(){
   try{
     const response = await fetch(apiUrl + new URLSearchParams(urlParams));

     // check response
     if (!response.ok) {
        throw new Error("response status: ", response.status);
     }
     const json = await response.json();
     console.log(json);
     console.log(json.current.wind_speed);
    
     updateHumidity(json.current.humidity);
     updateWindSpeed(json.current.wind_speed);
     updateTemperature(json.current.temperature);
     updatePrecip(json.current.precip); /* ??? */

   } catch(error) {
    console.error(error)
   }
}

function updatevalue(sliderElement, value){
    sliderElement.value = value;
}




function updateHumidity(newValue){
    humiditySlider.value = newValue;
    humidityValue.innerHTML = newValue;

    humidityFilter.style.opacity = 0.5* Number(newValue)/100;
}

function updateWindSpeed(newValue){
    windSpeedSlider.value = newValue;
    windSpeedValue.innerHTML = newValue;
    
    const newDuration = (32- Number(newValue)) * 11 /32 + 1;
    for(const leaf of leafAnimations){
        console.log(newDuration)
        leaf.style.animationDuration = newDuration + "s";
    }
}

function updateTemperature(temperatureValue){
    temperatureSlider.value = temperatureValue;
    temperatureValue.innerHTML = humidityValue;
}

function updatePrecip(newValue){
    rainValue.value = newValue;

    const newDuration = (10-Number(newValue)) * 3/10 +1;
    for(const rain of rainAnimations){
        console.log(newDuration)
        rain.style.animationDuration = newDuration + "s";
    }
}

setInterval(fetchData, 500);