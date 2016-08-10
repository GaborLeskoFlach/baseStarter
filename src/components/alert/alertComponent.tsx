
import * as React from 'react'
import {render, findDOMNode} from 'react-dom'
import {observable, action, IObservableArray, computed} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import './alert.css'
import {SlideAction, DWAlerts, DWAlertModle} from './modle'


interface iDWAlertAppProps {
    alerts: DWAlerts;
}

@observer
export class DWAlertApp extends React.Component<iDWAlertAppProps, {}>{
    constructor(props) { super(props); }

    showAlerts() {
       
       let {directionState} = this.props.alerts;
        if(!directionState.loaded){
             return <div className="alert-container">
             </div>
        }
        
        

        else {
            return (
                <div className="alert-container">
                    <Alert alert={directionState.previousAlert} slideAction={directionState.previousAlertSlideAction}
                        onReset={() => { this.props.alerts.resetSlider() } }/>
                    <Alert alert={directionState.currentAlert} slideAction={directionState.currentAlertSlideAction}
                        onReset={() => { this.props.alerts.resetSlider() } }/>
                </div>
            )
        }

    }

    render() {
        let directionState = this.props.alerts.directionState;
        return (

            <div>
                {this.showAlerts() }
                <button onClick={() => { this.props.alerts.moveSliderLeft() } }> {"<"} </button>
                <button onClick={() => { this.props.alerts.moveSliderRight() } }> {">"} </button>
                 <DevTools/> 
            </div>
        )
    }
}

interface iAlert {
    alert: DWAlertModle,
    slideAction: SlideAction,
    onReset: () => void
}


@observer
export class Alert extends React.Component<iAlert, {}>{
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

   
    componentDidMount() {
        let element = findDOMNode(this.refs["alertElement"]);
        let {onReset} = this.props;
        element.addEventListener("webkitAnimationEnd", onReset, false);
        element.addEventListener("animationend", onReset, false);
        element.addEventListener("oanimationend",onReset, false);

    }

    getClassForSlideAction(slideAction: SlideAction) {
        switch (slideAction) {
            case SlideAction.SlideInLeft: return "slide-in-left";
            case SlideAction.SlideInRight: return "slide-in-right";
            case SlideAction.SlideOutLeft: return "slide-out-left";
            case SlideAction.SlideOutRight: return "slide-out-right";
            case SlideAction.none: return "";
        }
        throw "invalid slider direction state";
    }
    render() {

        return <div ref="alertElement" className={"alert " + this.getClassForSlideAction(this.props.slideAction) }>
            {this.props.alert.text}
        </div>
    }
}

