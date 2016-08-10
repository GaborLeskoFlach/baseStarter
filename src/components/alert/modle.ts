import {observable, action, IObservableArray, computed} from 'mobx';

export enum AlertLevel {
    High,
    Medium,
    Low
}

export enum SlideDirection {
    slideLeft,
    SlideRight
}

export enum SlideAction {
    SlideInLeft,
    SlideOutLeft,
    SlideInRight,
    SlideOutRight,
    none
}

let Globid = 0;
export class DWAlertModle {
    constructor(aText: string, aLeveel: AlertLevel, active: boolean = false) {
        this.text = aText;
        this.Level = aLeveel;
        this.Id = Globid++;
    }
    @observable text: string;
    @observable Level: AlertLevel;
    Id: number
}

export interface iDirectionState {
    previousAlert: DWAlertModle;
    previousAlertSlideAction: SlideAction
    currentAlert: DWAlertModle;
    currentAlertSlideAction: SlideAction;
    loaded:boolean;
}

export class DWAlerts {
    constructor() {
        this.activeIndex = 0;
        this.previousIndex = 0;
        this.isLoading = true;;
    }
    DWAlertsModle = observable<DWAlertModle>([]);
    @observable activeIndex: number;
    @observable previousIndex: number;
    @observable slideDirection: SlideDirection;
    @observable reset: boolean;
    @observable isLoading: boolean;

    @action("move slider right")
    moveSliderRight = action(() => {
        this.slideDirection = SlideDirection.SlideRight;
        this.previousIndex = this.activeIndex;
        if (++this.activeIndex >= this.DWAlertsModle.length) this.activeIndex = 0;
        this.reset = false;
    });

    @action("move slider right")
    moveSliderLeft = action(() => {
        this.slideDirection = SlideDirection.slideLeft;
        this.previousIndex = this.activeIndex;
        if (--this.activeIndex < 0) this.activeIndex = this.DWAlertsModle.length - 1;
        this.reset = false;
    });

    @action("reset slider")
    resetSlider = action(() => {
        this.reset = true;
    });


    @computed get directionState(): iDirectionState {
        return {
            previousAlert: this.DWAlertsModle[this.previousIndex],
            previousAlertSlideAction: (this.slideDirection == SlideDirection.slideLeft) ? SlideAction.SlideOutLeft : SlideAction.SlideOutRight,
            currentAlert: this.DWAlertsModle[this.activeIndex],
            currentAlertSlideAction: (this.slideDirection == SlideDirection.slideLeft) ? SlideAction.SlideInLeft : SlideAction.SlideInRight,
            loaded : !this.isLoading
        }
    }

    ////////////////////////////

    GetAlerts() {
        window.setTimeout(() => {
            this.DWAlertsModle.push(new DWAlertModle("this is my first alert", AlertLevel.Medium));
            this.DWAlertsModle.push(new DWAlertModle("this is my second alert", AlertLevel.Medium));
            this.DWAlertsModle.push(new DWAlertModle("this is my third alert", AlertLevel.Medium));
            this.DWAlertsModle.push(new DWAlertModle("this is my forth alert", AlertLevel.Medium));
            this.isLoading = false;
        }, 500);

    }

}
