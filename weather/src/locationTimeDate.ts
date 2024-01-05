

export default class LocationTimeDate{
    
    white:topics;

    constructor(white:topics){
        this.white = white;

    }
    
    locationTimeDate = this.createElement('location-time-date-container','div')
    locationTimeDateContent = this.createElement('location-time-date-content','div')
    location = this.createElement('location','div')
    time = this.createElement('time','div')
    date = this.createElement('date','div')


    generationLocationTimeDate(){
        this.locationTimeDate.innerHTML = '';
        this.locationTimeDateContent.append(this.location,this.time,this.date);
        this.locationTimeDate.append(this.locationTimeDateContent);
        return this.locationTimeDate;
    }
    

    updateTimeDate(location:string,time:string,date:string){
        this.location.textContent = location;
        this.time.textContent = time;
        this.date.textContent = date;
    }


    switchTopics(){
        this.locationTimeDateContent.classList.toggle(this.white.main_background)
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