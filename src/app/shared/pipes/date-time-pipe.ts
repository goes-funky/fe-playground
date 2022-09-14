import { Pipe, PipeTransform } from '@angular/core';
import moment from "moment";

@Pipe({
    name: 'dateTimeFormat',
    pure: false,
})
export class DateTimeFormatPipe implements PipeTransform {
    transform(date: any, format: string = 'mm:ss'): string {
        return moment(date, format).fromNow();
    }
}