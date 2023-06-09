const Key = "05138500be22715eaf4a7f8c4904a03c"
const country = "https://flagsapi.com//flat/64.png"

const InputCity = document.querySelector("#city-input")
const searchBtn = document.querySelector("#search")

const NameCity = document.querySelector("#city") //span
const TempCity = document.querySelector("#temperature span")
const DescCity = document.querySelector("#description")
const WeatherIconCity = document.querySelector("#weather-icon")
const CountryIcon = document.querySelector("#country")
const UmidityCity = document.querySelector("#umidity span")
const WindCity = document.querySelector("wind span")

//funções
const GetWeatherData = async(city) =>{
    const ApiWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=${city}'
}

const ShowWeatherData = (city) => {
    console.log(city)
}

//eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = InputCity.value
    ShowWeatherData(city)
});