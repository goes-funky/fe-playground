import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'y42-search',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatButtonModule, ReactiveFormsModule, MatInputModule, MatIconModule],
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input()
  set debounceTime(debounceTime: number | string) {
    this._debounceTime = coerceNumberProperty(debounceTime);

    if (this.valueChangeSubscription) {
      this.valueChangeSubscription.unsubscribe();
      this.valueChangeSubscription = this.onControlValueChangeSubscription;
    }
  }

  @Output()
  search: EventEmitter<string> = new EventEmitter();

  public control: FormControl = new FormControl('');

  private _debounceTime: number = 0;
  private valueChangeSubscription!: Subscription;
  private readonly destroy$: Subject<void> = new Subject();

  ngOnInit(): void {
    this.valueChangeSubscription = this.onControlValueChangeSubscription;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private get onControlValueChangeSubscription(): Subscription {
    return this.control.valueChanges
      .pipe(debounceTime(this._debounceTime), takeUntil(this.destroy$))
      .subscribe((value) => this.search.emit(value));
  }
}
