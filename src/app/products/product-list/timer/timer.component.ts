import { Component, OnInit } from '@angular/core';
import { map, startWith, switchMap, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { timer } from 'rxjs/internal/observable/timer';
import { ProductHttpService } from '../../product-http.service';
import { ProductService } from '../../product.service';

@Component({
  selector: 'y42-timer',
  template: `
    <ng-container *ngIf="(timer$ | async) as timer">
    <ng-container *ngIf="undefined !== timer">
      <div>Fetched {{ timer }} seconds ago</div>
    </ng-container>
    </ng-container>
  `,
  styles: [
  ]
})
export class TimerComponent implements OnInit {
  constructor(private productService: ProductService) { }
  
  protected timer$?: Observable<any>;

  ngOnInit(): void {
    this.timer$ = this.productService.requestTick$.pipe(
      switchMap(() => timer(0, 60000)),
      map((val) => val * 60)
    );
  }
}
