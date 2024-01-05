
export default class WeatherDetails{
    white:topics
    constructor(white:topics){
        this.white = white;
    }
    weatherDetails = this.createElement('weather-details-container','div')
    weatherDetailsContent = this.createElement('weather-details-content','div')


    mainDetailsContent = this.createElement('main-details-content','div')
    currentTemperature = this.createElement('current-temperature','div')
    feelsLike = this.createElement('feels-like','div')
    sunriseContent = this.createElement('sunrise-content','div')
    sunriseImg= this.createElement('sunrise-img','img','../assets/sunrise-white.png')

    sunriseTextContent = this.createElement('sunrise-text-content','div')
    sunriseText = this.createElement('sunrise-text','div','Sunrise')
    sunriseTime = this.createElement('sunrise-time','div')
    sunsetContent = this.createElement('sunset-content','div')
    sunsetImg= this.createElement('sunset-img','img','../assets/sunset-white.png')

    sunsetTextContent = this.createElement('sunset-text-content','div')
    sunsetText = this.createElement('sunset-text','div','Sunset')
    sunsetTime = this.createElement('sunset-time','div')
    
    iconWeather = this.createElement('icon-weather-content','div')
    iconWeatherImg = this.createElement('icon-weather-img','img')
    typeWeather = this.createElement('type-weather','div')

    extraDetails = this.createElement('extra-details-content','div')

    humidity = this.createElement('humidity-content','div')
    humidityImg = this.createElement('humidity-img','img','../assets/humidity.png')
    humidityData = this.createElement('humidity-data','div')
    humidityText = this.createElement('humidity-text','div','Humidity')

    windSpeed = this.createElement('wind-speed-content','div')
    windSpeedImg = this.createElement('wind-speed-img','img','../assets/wind.png')
    windSpeedData = this.createElement('wind-speed-data','div')
    windSpeedText = this.createElement('wind-speed-text','div','Wind Speed')

    pressure = this.createElement('pressure-content','div')
    pressureImg = this.createElement('pressure-img','img','../assets/pressure-white.png')
    pressureData = this.createElement('pressure-data','div')
    pressureText = this.createElement('pressure-text','div','Pressure')

    ultraviolet = this.createElement('ultraviolet-content','div')
    ultravioletImg = this.createElement('ultraviolet-img','img','./assets/uv-white.png')
    ultravioletData = this.createElement('ultraviolet-data','div')
    ultravioletText = this.createElement('ultraviolet-text','div','UV')


    generationWeatherDetails(){
        this.sunriseTextContent.append(
            this.sunriseText,
            this.sunriseTime
        )
        this.sunriseContent.append(
            this.sunriseImg,
            this.sunriseTextContent
        )
        this.sunsetTextContent.append(
            this.sunsetText,
            this.sunsetTime
        )
        this.sunsetContent.append(
            this.sunsetImg,
            this.sunsetTextContent
        )
        this.mainDetailsContent.append(
            this.currentTemperature,
            this.feelsLike,
            this.sunriseContent,
            this.sunsetContent
        )

        this.iconWeather.append(
            this.iconWeatherImg,
            this.typeWeather
        )
        this.humidity.append(
            this.humidityImg,
            this.humidityData,
            this.humidityText
        )
        this.windSpeed.append(
            this.windSpeedImg,
            this.windSpeedData,
            this.windSpeedText
        )
        this.pressure.append(
            this.pressureImg,
            this.pressureData,
            this.pressureText
        )
        this.ultraviolet.append(
            this.ultravioletImg,
            this.ultravioletData,
            this.ultravioletText
        )
        this.extraDetails.append(
            this.humidity,
            this.windSpeed,
            this.pressure,
            this.ultraviolet
            )
        this.weatherDetailsContent.append(
            this.mainDetailsContent,
            this.iconWeather,
            this.extraDetails
        )

        this.weatherDetails.append(this.weatherDetailsContent)
        return this.weatherDetails;
    }


    updateTimeDate(temperature:string,feels:string,sunrise:string,sunset:string,icon:string,type:string,humidit:string,wind:string,pressure:string,ultraviolet:string){
        this.currentTemperature.textContent = `${temperature}℃`;
        this.feelsLike.innerHTML = `Feels like: <span class='feels-cel'>${feels}℃</span>`;
        this.sunriseTime.textContent = sunrise;
        this.sunsetTime.textContent = sunset;
        const arr:string[] = icon.split('/').slice(-2);
        (this.iconWeatherImg as HTMLImageElement).src = `../assets/${arr[0]+'/'+arr[1].slice(0,-4)+'/'+arr[1].slice(0,-4)}@3x.png`;
        this.typeWeather.textContent = type;
        this.humidityData.textContent = `${humidit}%`;
        this.windSpeedData.textContent = `${wind}km/h`;
        this.pressureData.textContent = `${pressure}hPa`;
        this.ultravioletData.textContent = ultraviolet;
    }



    switchTopics(){
        this.weatherDetailsContent.classList.toggle(this.white.main_background)
        this.currentTemperature.classList.toggle(this.white.current_temperature_white)

        if(JSON.parse(localStorage.getItem('topics') as string ) === 'black'){

            (this.sunriseImg as HTMLImageElement).src = './assets/sunrise-white.png';
            (this.sunsetImg as HTMLImageElement).src = './assets/sunset-white.png';
            (this.humidityImg as HTMLImageElement).src = './assets/humidity.png';
            (this.windSpeedImg as HTMLImageElement).src = './assets/wind.png';
            (this.pressureImg as HTMLImageElement).src = './assets/pressure-white.png';
            (this.ultravioletImg as HTMLImageElement).src = './assets/uv-white.png';

        }else{
            (this.sunriseImg as HTMLImageElement).src = './assets/sunrise-black.png';
            (this.sunsetImg as HTMLImageElement).src = './assets/sunset-black.png';
            (this.humidityImg as HTMLImageElement).src = './assets/humidity-black.png';
            (this.windSpeedImg as HTMLImageElement).src = './assets/wind-black.png';
            (this.pressureImg as HTMLImageElement).src = './assets/pressure-black.png';
            (this.ultravioletImg as HTMLImageElement).src = './assets/uv-black.png';
        }
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