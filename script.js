async function getweather(){

    const city = document.getElementById('city').value;
    if(city===""){
        alert("Please enter a city name");
        return;
    }

    const apikey=config.apikey;
    const url= `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;

    const options={
        method: 'GET',
	headers: {
		'x-rapidapi-key': apikey,
		'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
	
	}

    };


    document.getElementById('loader').style.display='block';
    document.getElementById('weather').style.display='none';

    try{
        const response = await fetch(url, options);
        if(!response.ok) throw new Error("city not found");
const data= await response.json();
        updateWeather(data);
        updateDatetime(data);
    }catch(error){
        alert(error.message);
    }finally{
        document.getElementById('loader').style.display='none';
    }

};

function updateWeather(data){
    const weather = data.current;

    document.getElementById('weather').style.display='block';
    document.getElementById('city-name').innerText = data.location.name;
    document.getElementById('temp-value').innerHTML = `Temperature:${weather.temp_c}°C`;
    document.getElementById('description').innerText =`Description: ${weather.condition.text}`;
    document.getElementById('humidity-value').innerText=`Humidity:${weather.humidity}%`;
    document.getElementById('wind').innerText=`wind speed: ${weather.wind_kph}kph`;

    const weatherIcon = document.getElementById('weather-icon');
    const sunIcon = weatherIcon.querySelector('.fa-sun');
    const moonIcon= weatherIcon.querySelector('.fa-moon');
    const cloudIcon = weatherIcon.querySelector('.fa-cloud');
    const rainIcon = weatherIcon.querySelector('.fa-cloud-rain');
    const snowIcon = weatherIcon.querySelector('.fa-snowflake');
    const boltIcon = weatherIcon.querySelector('.fa-bolt');
    const windIcon = weatherIcon.querySelector('.fa-wind');


    sunIcon.style.display='none';
    moonIcon.style.display='none';
    cloudIcon.style.display='none';
    rainIcon.style.display='none';
    snowIcon.style.display='none';
    boltIcon.style.display='none';
    windIcon.style.display='none';


    if(weather.condition.text.includes('Sunny') || weather.condition.text.includes("Clear") ){
        sunIcon.style.display='block';
    }else if(weather.condition.text.includes('Cloudy') || weather.condition.text.includes('Overcast') || weather.condition.text.includes('Partly')){
        cloudIcon.style.display='block';
    }else if(weather.condition.text.includes('Rain') || weather.condition.text.includes('Light rain')){
        rainIcon.style.display='block';
    }else if(weather.condition.text.includes('Snow')){
        snowIcon.style.display='block';
    }else if(weather.condition.text.includes('Thunder')){
        boltIcon.style.display='block';
    }else if(weather.condition.text.includes('Night') || weather.condition.text.includes('Moon')){
        moonIcon.style.display='block';
    }

    if(weather.wind_kph > 0){
        windIcon.style.display='block'; 
    }

    
}


function updateDatetime(data){
const localtime = data.location.localtime;  
const dateTime = new Date(localtime); 

document.getElementById('date-value').innerText =dateTime.toLocaleDateString();
document.getElementById('time-value').innerText = dateTime.toLocaleTimeString();
document.getElementById('year-value').innerText= dateTime.getFullYear();
}