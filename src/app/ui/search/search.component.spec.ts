/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, SearchComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event if control change value', fakeAsync(async () => {
    const component = fixture.componentInstance
    const input = 'y42'
    jest.spyOn(component.search, 'emit');

    component.control.setValue(input);
    tick();

    expect(component.search.emit).toHaveBeenLastCalledWith(input);
  }));

  it('should emit search event if control change value after 300 ms', fakeAsync(async () => {
    const component = fixture.componentInstance
    const input = 'y42'
    jest.spyOn(component.search, 'emit');
    component.debounceTime = 300

    component.control.setValue(input);

    tick(100);
    expect(component.search.emit).not.toBeCalled();
    tick(300);
    expect(fixture.componentInstance.search.emit).toHaveBeenLastCalledWith(input);
  }));
});