import {observable, action, IObservableArray, computed} from 'mobx';



export class Slide{
    constructor(_title:string){
        this.title = _title; 
    }
    @observable title:string;
}

export class Slides{
    constructor()
    {
        this.slideIndex = 0;
         this.loaded = false;
    }
    SlideArray  = observable<Slide>([]);
    @observable slideIndex : number;
    @observable loaded :boolean;

    @action("Get contente")
    GetSlides = ()=>{
        window.setTimeout(()=>{
        this.SlideArray.push(new Slide("Slide 1"));
        this.SlideArray.push(new Slide("Slide 2"));
        this.SlideArray.push(new Slide("Slide 3"));
        this.SlideArray.push(new Slide("Slide 4"));
        this.loaded = true;
        },500)

    }

    @action("Go to next slide")
    GotoNextSlide(){
        this.slideIndex++;
    }
    
}