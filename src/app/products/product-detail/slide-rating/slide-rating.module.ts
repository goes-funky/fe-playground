import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SlideRatingComponent} from "./slide-rating.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSliderModule} from "@angular/material/slider";

@NgModule({
    exports: [SlideRatingComponent],
    declarations: [SlideRatingComponent],
    imports: [
        CommonModule,
        MatIconModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatSliderModule,
    ],
})
export class SlideRatingModule {}
