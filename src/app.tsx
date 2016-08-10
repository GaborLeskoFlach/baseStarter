import * as React from 'react'
import {render, findDOMNode} from 'react-dom'
import {observable, action, IObservableArray, computed} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import {DWAlerts} from './components/alert/modle'
import {DWAlertApp } from './components/alert/alertComponent'
import {Carousel} from './components/carousel/carousel'

import {Slides} from './components/carousel/model'



window.onload = () => {
    let alerts = new DWAlerts();
    alerts.GetAlerts();
     render(<DWAlertApp  alerts={alerts}/> , document.getElementById('content'))

    let slides = new Slides();
    slides.GetSlides();
    // render(<Carousel SlidesColl={slides}/> , document.getElementById('content'))
}
