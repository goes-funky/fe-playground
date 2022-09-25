import {Injectable, OnDestroy} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class Unsibscriber implements OnDestroy {
    public unSubscriber$$ = new Subject();

    public ngOnDestroy() {
        this.unSubscriber$$.next(true);
        this.unSubscriber$$.complete()
    }
}
