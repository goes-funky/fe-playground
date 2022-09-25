import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import {MatSliderChange} from "@angular/material/slider";

@Component({
    selector: 'slide-rating',
    templateUrl: './slide-rating.component.html',
    encapsulation: ViewEncapsulation.Emulated
})
export class SlideRatingComponent {

    @Input('value') value: number = 3;
    @Output() private ratingUpdated = new EventEmitter();

    updateSetting(event: MatSliderChange) {
        this.ratingUpdated.emit(event.value)
    }
}
