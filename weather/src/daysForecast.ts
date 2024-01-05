
export default class DaysForecast{
    white:topics;
    constructor(white:topics){
        this.white = white;
    }
    daysForecast = this.createElement('days-forecast-container','div')
    daysForecastContent = this.createElement('days-forecast-content','div')
    daysForecastTitle = this.createElement('days-forecast-title','div','5 Days Forecast:')

    generationDaysForecast(){
        this.daysForecast.innerHTML = '';
        this.daysForecastContent.innerHTML = '';
        this.daysForecastContent.append(this.daysForecastTitle);
        this.daysForecast.append(this.daysForecastContent);
        return this.daysForecast;
    }

    updateDaysForecast(data:any,getDate:(str:string,sss:boolean)=>string){
        this.daysForecastContent.innerHTML = '';
        this.daysForecastContent.append(this.daysForecastTitle);
        data.forecast.forecastday.forEach((element:any) => {
            this.createDayWeatgher(element.day.condition.icon,element.day.avgtemp_c,getDate(element.date,true))
          });

    }


    createDayWeatgher(img:string,temp:string,date:string){
        const dayContainer = this.createElement('day-forecast-container','div')
        console.log(img)
        const arr:string[] = img.split('/').slice(-2);
        const dayImg = this.createElement('day-forecast-img','img',`../assets/${arr[0]+'/'+arr[1].slice(0,-4)+'/'+arr[1].slice(0,-4)}.png`);
        const dayTemperature = this.createElement('day-forecast-temperature','div',`${temp}℃`)
        const dayDate = this.createElement('day-forecast-date','div',date)
        dayContainer.append(dayImg,dayTemperature,dayDate)
        this.daysForecastContent.append(dayContainer);
    }

    switchTopics(){
        this.daysForecastContent.classList.toggle(this.white.main_background)
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