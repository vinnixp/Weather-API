const apiKey = "219d867ae73d6d357a5c0c0d7e82e94a";
const countryFlagURL = "https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

// Selecionando os elementos do DOM
const inputCity = document.querySelector("#city-input"); // Campo de entrada para pesquisa a cidade
const searchBtn = document.querySelector("#search"); // Botão de pesquisa

const cityName = document.querySelector("#city"); // Span nome da cidade
const cityTemperature = document.querySelector("#temperature span"); // Span da temperatura da cidade
const cityDescription = document.querySelector("#description"); // Span da descrição da cidade
const weatherIcon = document.querySelector("#weather-icon"); // Imagem do ícone do clima da cidade
const countryFlag = document.querySelector("#country"); // Imagem da bandeira do país
const cityHumidity = document.querySelector("#humidity span"); // Span da umidade da cidade
const cityWind = document.querySelector("#wind span"); // Span da velocidade do vento da cidade
const weatherContainer = document.querySelector("#weather-data");
const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");
const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");

// Loader
const toggleLoader = () => {
  loader.classList.toggle("hide");
};

// função para obter os dados do clima da API
const getWeatherData = async (city) => {
  toggleLoader();

  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
  const response = await fetch(apiWeatherURL);
  const data = await response.json();

  toggleLoader();

  return data;
};

// Tratamento de erro
const showErrorMessage = () => {
  errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
  if (errorMessageContainer) {
    errorMessageContainer.classList.add("hide");
  }

  if (weatherContainer) {
    weatherContainer.classList.add("hide");
  }

  if (suggestionContainer) {
    suggestionContainer.classList.add("hide");
  }
};

// Função para exibir os dados do clima na interface
const showWeatherData = async (city) => {
  hideInformation();

  const data = await getWeatherData(city);

  if (data.cod === "404") {
    showErrorMessage();
    return;
  }

  cityName.innerText = data.name; // Define o nome da cidade
  cityTemperature.innerText = parseInt(data.main.temp); // Define a temperatura da cidade
  cityDescription.innerText = data.weather[0].description; // Define a descrição do clima da cidade se está chuvoso, nublado...
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  ); // Define o ícone do clima da cidade
  countryFlag.setAttribute("src", countryFlagURL + data.sys.country); // Define a bandeira do país
  cityHumidity.innerText = `${data.main.humidity}%`; // Define a umidade da cidade
  cityWind.innerText = `${data.wind.speed}km/h`; // Define a velocidade do vento da cidade

  // Change bg image
  document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

  weatherContainer.classList.remove("hide");

};

// Evento de clique quando o botão de pesquisa for clicado
searchBtn.addEventListener("click", async (e) => {
  e.preventDefault(); // Impede o envio do formulário

  const city = inputCity.value; // Obtém o valor digitado no campo de entrada
  showWeatherData(city); // Exibe os dados do clima da cidade
});

inputCity.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;

    showWeatherData(city);
  }
});

// Sugestões
suggestionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const city = btn.getAttribute("id");

    showWeatherData(city);
  });
}); 
