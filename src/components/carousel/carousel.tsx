import * as React from 'react'
import {render, findDOMNode} from 'react-dom'
import {observable, action, IObservableArray, computed} from 'mobx';
import {observer} from 'mobx-react';
import {Slides} from './model'
import DevTools from 'mobx-react-devtools';

interface iCarouselProps{
    SlidesColl: Slides
}

@observer
export class Carousel extends React.Component<iCarouselProps,{}>{
    render(){
        if(!this.props.SlidesColl.loaded){
            return <div>loading...</div>
        }
        return(

            <div>
                <div>{this.props.SlidesColl.SlideArray[this.props.SlidesColl.slideIndex].title}</div>
                <button onClick={()=>{ this.props.SlidesColl.GotoNextSlide()}}> update slide</button>
                <DevTools />
            </div>
        )

    }
}
