import { Pipe, PipeTransform } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Pipe({
  name: 'dateAgo'
 
})
export class DateAgoPipe implements PipeTransform {
  today: Date = new Date();
  transform(date: any, args?: any): Observable<any> { 
    return interval(60000).pipe(map(() => {     
      if (date) {      
        let seconds = Math.floor((+new Date() - +new Date(this.today)) / 1000); 
        date='Fetched '+ seconds + ' seconds ago'         
      }      
      return date
       }));
    
  }

}