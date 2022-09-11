import { TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { ProductService } from '../product.service';
import { LAST_FETCH_SECONDS } from './last-fetch-seconds';

describe(`LAST_FETCH_SECONDS`, () => {
  let productService: ProductService;

  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  beforeEach(() => {
    class Mock {
      subject$ = new Subject();
      products$ = of([]);
    }

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ProductService,
          useClass: Mock,
        },
      ],
    });

    productService = TestBed.inject(ProductService);
  });

  it('should emit values every 60 seconds', () => {
    testScheduler.run(({expectObservable}) => {
        const token = TestBed.inject(LAST_FETCH_SECONDS);

        const expected = 'a 59999ms b 59999ms c';
        const sub = '- 59999ms - 59999ms -!';

        expectObservable(token, sub).toBe(expected, {
            a: 0,
            b: 60, 
            c: 120
        })
    })
  })
});
