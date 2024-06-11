const city = document.querySelector('.city_name');
const dateTime = document.querySelector('.date_time');
const wartherForcast = document.querySelector('.weather_forcast');
const weatherIcon = document.querySelector('.weather_icon');
const temperature = document.querySelector('.temp_container');
const minTemp = document.querySelector('.min_temp');
const maxTemp = document.querySelector('.max_temp');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const pressure = document.getElementById('presseure')
const search = document.getElementById('search-icon');






const getCountryFullName = (countryCode)=>{
    const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });
    const contryFullName = regionNamesInEnglish.of(`${countryCode}`);
    return contryFullName;
}

const getDateTimeFormat = (dateInSecond)=>{
    const date = new Date(dateInSecond*1000);
    const dateFormat = {
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric",
        hour:"numeric",
        minute:"numeric",
    };
    const getFormat = new Intl.DateTimeFormat('en-US',dateFormat);
    const formattedDate = getFormat.format(date);
    return formattedDate;
}

const getweatherData = async (cityInput)=>{
    const weatherAPIurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&APPID=a6e2ca9695c30f064bc4b58790478f9e`;
    try{
        const response = await fetch(weatherAPIurl);
        const data = await response.json();
        console.log(data);
        const {main, name, sys, weather, wind, dt} = data;
        const country = getCountryFullName(sys.country);
        const datetime = getDateTimeFormat(dt);

        // input the data field
        city.innerText = `${name}, ${country}`;
        dateTime.innerText = `${datetime}`;
        wartherForcast.innerText = weather[0].main;
        weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${weather[0].icon}.png" />`;
        temperature.innerHTML = `${main.temp.toFixed()} &#176`;
        minTemp.innerText = `Min:${main.temp_min.toFixed()}`;
        maxTemp.innerText = `Max:${main.temp_max.toFixed()}`;
        feelsLike.innerHTML = `${main.feels_like.toFixed()} &#176`;
        pressure.innerText = `${main.pressure} hPa`;
        humidity.innerText = `${main.humidity} %`;
        windSpeed.innerText = `${wind.speed} m/s`;
    }catch(err){
        console.log(err);
    }
}

search.addEventListener('click', (e)=>{
    const inputCity = document.getElementById('search_box');
    getweatherData(inputCity.value);
    inputCity.value = "";

});

document.body.addEventListener('load',getweatherData("jaipur"));