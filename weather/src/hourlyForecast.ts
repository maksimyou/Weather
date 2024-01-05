
export default class HourlyForecast{
    white:topics;
    constructor(white:topics){
        this.white = white;
    }
    hourlyForecast = this.createElement('hourly-forecast-container','div')
    hourlyForecastContent = this.createElement('hourly-forecast-content','div')
    hourlyForecastTitle = this.createElement('hourly-forecast-title','div','Hourly Forecast:')
    hourlyForecastItems = this.createElement('hourly-forecast-items','div')

    generationHourlyForecast(){
        this.hourlyForecast.innerHTML = '';
        this.hourlyForecastItems.innerHTML = '';
        this.hourlyForecastContent.append(this.hourlyForecastTitle,this.hourlyForecastItems);
        this.hourlyForecast.append(this.hourlyForecastContent);
        return this.hourlyForecast;
    }

    createHourlyWeatgher(time:string,img:string,temp:string,speed:string,said?:string){
        const hourlyContainer = this.createElement('hourly-item-container','div')
        const hourlyTime = this.createElement('hourly-item-time','div',time);
        const arr:string[] = img.split('/').slice(-2);
        const hourlyImg = this.createElement('hourly-item-img','img',`../assets/${arr[0]+'/'+arr[1].slice(0,-4)+'/'+arr[1].slice(0,-4)}@2x.png`);
        const hourlyTemperature = this.createElement('hourly-item-temperature','div',`${temp}℃`)
        let hourlyImg2;
        if(said==='left'){
            hourlyImg2 = this.createElement('hourly-item-img2','img','./assets/navigation-left.png');
        }else if(said==='right'){
            hourlyImg2 = this.createElement('hourly-item-img2','img','./assets/navigation-right.png');
        }else{
            hourlyImg2 = this.createElement('hourly-item-img2','img','./assets/navigation.png');
        }
        const hourlySpeed = this.createElement('hourly-item-speed','div',`${speed}km/h`)
        hourlyContainer.append(hourlyTime,hourlyImg,hourlyTemperature,hourlyImg2,hourlySpeed)
        this.hourlyForecastItems.append(hourlyContainer);
    }

    updateHourlyWeatgher(data:any){
        this.hourlyForecastItems.innerHTML = '';
        let current = +data.location.localtime.slice(-5,-3);
        while(current%3 !== 0){
          current++;
        }
        
        for (let i = 0; i < 5; i++) {
            if(i==1){
              this.createHourlyWeatgher(data.forecast.forecastday[0].hour[current].time.slice(-5),data.forecast.forecastday[0].hour[current].condition.icon,data.forecast.forecastday[0].hour[current].temp_c,data.forecast.forecastday[0].hour[current].wind_kph,'left');
            }else if(i===3) {
              this.createHourlyWeatgher(data.forecast.forecastday[0].hour[current].time.slice(-5),data.forecast.forecastday[0].hour[current].condition.icon,data.forecast.forecastday[0].hour[current].temp_c,data.forecast.forecastday[0].hour[current].wind_kph,'right');
            }else{
              this.createHourlyWeatgher(data.forecast.forecastday[0].hour[current].time.slice(-5),data.forecast.forecastday[0].hour[current].condition.icon,data.forecast.forecastday[0].hour[current].temp_c,data.forecast.forecastday[0].hour[current].wind_kph);
            }
            current+=3
            if(current===24) current = 0;
          }
    }

    switchTopics(){
        this.hourlyForecastContent.classList.toggle(this.white.main_background)
        Array.from(this.hourlyForecastItems.children).forEach(element => {
            let str:string|undefined =  element.querySelector('.hourly-item-time')?.textContent?.split(':')[0];
            let num:number = Number(str)
            if(num>=6&&num<=18){
            element.classList.toggle(this.white.hourly_background_day)
            }else{
            element.classList.toggle(this.white.hourly_background_nigth)
            }
        });
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