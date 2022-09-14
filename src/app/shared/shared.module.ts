import { NgModule } from '@angular/core';
import { DateTimeFormatPipe } from './pipes/date-time-pipe';

@NgModule({
    imports: [],
    declarations: [DateTimeFormatPipe],
    exports: [DateTimeFormatPipe],
})
export class SharedModule { }
