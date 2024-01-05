import './style.css'
import {white} from './topics'
import currentLocationTopic from './currentLocationTopic'
import LocationTimeDate from './locationTimeDate'
import WeatherDetails from './weatherDetails'
import DaysForecast from './daysForecast'
import HourlyForecast from './hourlyForecast'
if(JSON.parse(localStorage.getItem('topics') as string)){
  localStorage.setItem('topics',JSON.stringify('black'))
}

//if(JSON.parse(localStorage.getItem('topics') as string) === 'black'){
//}else{
//}


class Main {

root:HTMLElement = document.querySelector('.app') as HTMLElement;
loaderContainer = this.createElement(['loader-container', 'hidden'],'div')
loader = this.createElement('loader','div')

elemMainOne = this.createElement('main-one','div')
elemMainSecond = this.createElement('main-second','div')
currentLocationTopic = new currentLocationTopic(white)
locationTimeDate = new LocationTimeDate(white)
weatherDetails = new WeatherDetails(white)
daysForecast = new DaysForecast(white)
hourlyForecast = new HourlyForecast(white)


generationMain(){
  this.currentLocationTopic.topicItem.addEventListener('click',()=>{
    this.switchTopics()
  });
  this.currentLocationTopic.currentLocationContainer.addEventListener('click',()=>{
    this.getCurrentLocationApi()
  });
  this.currentLocationTopic.searchBtn.addEventListener('click',()=>{
    this.getSearchApi()
  });
  this.loaderContainer.append(this.loader)
  this.elemMainOne.append(this.locationTimeDate.generationLocationTimeDate(),this.weatherDetails.generationWeatherDetails())
  this.elemMainSecond.append(this.daysForecast.generationDaysForecast(),this.hourlyForecast.generationHourlyForecast())
  this.root!.append(this.loaderContainer,this.currentLocationTopic.generationCurrentLocationTopic(),this.elemMainOne,this.elemMainSecond)
}
//London

getDate(str:string,sss:boolean = false){
  const month:string[] = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const week =['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  if(sss){
    return `${week[new Date(str).getDay()]}, ${new Date(str).getDate()} ${month[new Date(str).getMonth()].slice(0,3)}`

  }else{
    return `${week[new Date(str).getDay()]}, ${new Date(str).getDate()} ${month[new Date(str).getMonth()]}`
  }
}



getCurrentLocationApi(){
  fetch('https://ipapi.co/json/')
  .then(Response=>Response.json())
  .then(dataip=>{
    console.log(dataip.city)
    this.getApiWeather(dataip.city);
    //main.generationMain()
  })
}


getSearchApi(){
  this.getApiWeather((this.currentLocationTopic.searchElemInput as HTMLInputElement).value);
  //main.generationMain()
}


getApiWeather(str:string){
  this.loaderContainer.classList.toggle('hidden')
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=6e22385dfa224a24843211644230603&q=${str}&days=5&aqi=no&alerts=yes`)
    .then(Response=>Response.json())
    .then(data=>{
      console.log(data)
      this.loaderContainer.classList.toggle('hidden')
      this.locationTimeDate.updateTimeDate(data.location.name,data.location.localtime.slice(-5),this.getDate(data.location.localtime))
      this.weatherDetails.updateTimeDate(data.current.temp_c,data.current.feelslike_c,data.forecast.forecastday[0].astro.sunrise,data.forecast.forecastday[0].astro.sunset,data.current.condition.icon,data.current.condition.text,data.current.humidity,data.current.wind_kph,data.current.pressure_mb,data.current.uv)
      this.daysForecast.updateDaysForecast(data,this.getDate)
      this.hourlyForecast.updateHourlyWeatgher(data)
    })
    .catch()
 
}

switchTopics(){

  this.root.classList.toggle(white.background_app);
  this.root.classList.toggle(white.color_text);
  this.currentLocationTopic.switchTopics()
  this.locationTimeDate.switchTopics()
  this.weatherDetails.switchTopics()
  this.daysForecast.switchTopics()
  this.hourlyForecast.switchTopics()
}



createElement(selector:string|string[], tag:string, text:string = '') {
  const elem = document.createElement(tag);
  if (Array.isArray(selector)) {
      elem.classList.add(...selector)
  } else {
      elem.classList.add(selector)
  }
  if (tag === 'img') {
      (elem as HTMLImageElement).src = text;
  } else {
      elem.textContent = text;
  }
  return elem;
}

}

const main = new Main()

main.getApiWeather('Moscow')
main.generationMain()


//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
//https://api.weatherapi.com/v1/forecast.json?key=6e22385dfa224a24843211644230603&q=London&days=1&aqi=no&alerts=yes