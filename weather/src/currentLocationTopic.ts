
export default class CurrentLocationTopic{

    white:topics;
    constructor(white:topics){
        this.white = white;
    }
    currentLocationTopic = this.createElement('current-location-topic-container','div');
    currentLocationTopicContent = this.createElement('current-location-topic-content','div');

    topicContainer = this.createElement('topic-container','div');
    topicItem = this.createElement('topic-item','div');
    topicToggle = this.createElement('topic-toggle','div');
    topicText = this.createElement('topic-text','div','Dark Mode');

    searchContainer = this.createElement('search-container','div');
    searchBtn = this.createElement('search-btn','button');
    searchElemInput = this.createElement('search-elem-input','input','Search for your preffered city...');

    currentLocationContainer = this.createElement('current-location-container','button');
    currentLocationImg = this.createElement('current-location-img','img','./assets/current-location-icon.png');
    currentLocationText = this.createElement('current-location-text','div','Current Location');


    generationCurrentLocationTopic(){
        this.topicItem.append(this.topicToggle);
        this.topicContainer.append(this.topicItem,this.topicText);
        this.searchContainer.append(this.searchBtn, this.searchElemInput);
        this.currentLocationContainer.append(this.currentLocationImg,this.currentLocationText);
        this.currentLocationTopicContent.append(this.topicContainer, this.searchContainer, this.currentLocationContainer);
        this.currentLocationTopic.append(this.currentLocationTopicContent);
        return this.currentLocationTopic;
    }



    switchTopics(){
        this.searchContainer.classList.toggle(this.white.btn_search);
        this.searchElemInput.classList.toggle(this.white.btn_search_input);
        this.topicItem.classList.toggle(this.white.btn_topics);
        this.currentLocationContainer.classList.toggle(this.white.current_location);

        if(JSON.parse(localStorage.getItem('topics') as string) === 'black'){
            localStorage.setItem('topics',JSON.stringify('white'));
            this.topicText.textContent = 'Dark Mode';
        }else{
            localStorage.setItem('topics',JSON.stringify('black'));
            this.topicText.textContent = 'Light Mode';
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
        } else if(tag === 'input'){
            (elem as HTMLInputElement).placeholder = text;
        }else{
            elem.textContent = text
        }
        return elem;
    }
}