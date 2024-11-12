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
const rainValue = document.getElementById('ground-rain');
const rotateValue = document.getElementById('rotate-value');


const leafAnimations = document.getElementsByClassName('leaf');
const rainAnimations = document.getElementsByClassName('rain');



const humidityFilter = document.getElementById("humidity-filter");
const groundRain = document.getElementById("ground-rain-div");

const arrowRotate = document.getElementById("arrow");


function sliderChange(){

}
const apiUrl = "/assets/code/test.json";


async function fetchData(){
   try{
    //  const response = await fetch(apiUrl + new URLSearchParams(urlParams));
     const response = await fetch(apiUrl);

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
     updateGroundPrecip(json.current.precip);
     updateArrow(json.current.wind_degree);

   } catch(error) {
    console.error(error);
   }
}


async function updateHumidity(newValue){
    humiditySlider.value = newValue;
    humidityValue.innerHTML = newValue;

    humidityFilter.style.opacity = 0.5* Number(newValue)/100;
}

async function updateWindSpeed(newValue){
    windSpeedSlider.value = newValue;
    windSpeedValue.innerHTML = newValue;
    
    const newDuration = (32- Number(newValue)) * 11 /32 + 1;
    for(const leaf of leafAnimations){
        console.log(newDuration)
        leaf.style.animationDuration = newDuration + "s";
    }
}

async function updateTemperature(newValue){
    temperatureSlider.value = newValue;
    temperatureValue.innerHTML = newValue;    
}


async function updateGroundPrecip(newValue){
    rainValue.innerHTML = newValue;
    groundRain.style.top = (100- Number(newValue) * 2.2) + "vh";
}

async function updateArrow(newValue){
    arrowRotate.style.rotate = newValue +'deg';
    rotateValue.innerHTML = newValue;
}

setInterval(fetchData, 500);