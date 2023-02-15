const container = document.querySelector('.container')

const searchForm = document.querySelector('.search-form')
const searchInput = document.querySelector('.search-input')

const weatherInfo = document.querySelector('.weather-info')
const notFound = document.querySelector('.not-found')

const locationEl = document.querySelector('.location')
const weatherState = document.querySelector('.weather-state')
const weatherStateImg = document.querySelector('.weather-state-img')
const temp = document.querySelector('.temp')
const tempFeelsLike = document.querySelector('.temp-feels-like')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')

searchForm.addEventListener('submit', (e) => {
   e.preventDefault()

   const location = searchInput.value
   if (location === '') return

   setWeather(location)
})

async function setWeather(location) {
   const APIKey = '728b0ee6df5687559812bd3169ad77b7';
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=ru&appid=${APIKey}`

   const response = await fetch(url)
   const data = await response.json()

   console.log(data)

   if (!(data.cod === '404')) {
      notFound.classList.add('none')
      weatherInfo.classList.remove('none')

      locationEl.innerText = data.name

      if (data.weather[0].icon.endsWith('n')) {
         document.querySelector('body').classList.add('night')
      } else {
         document.querySelector('body').classList.remove('night')
      }

      weatherStateImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      weatherState.innerText = data.weather[0].description
      temp.innerText = `${data.main.temp.toFixed(1)} °C`
      tempFeelsLike.innerText = `Ощущается как ${data.main.feels_like.toFixed(1)} °C`
      wind.innerHTML = `<i class="fa-solid fa-wind wind-i"></i> <br> ${data.wind.speed.toFixed(1)} м/сек`
      humidity.innerHTML = `<i class="fa-solid fa-water humidity-i"></i> <br> ${data.main.humidity.toFixed(1)} %`

      return
   }

   notFound.classList.remove('none')
   weatherInfo.classList.add('none')
}