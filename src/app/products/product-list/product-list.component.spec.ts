import {ProductListComponent} from "./product-list.component";

describe('ProductListComponent', () => {
    let component: ProductListComponent;

    beforeEach(() => {
        component = new ProductListComponent(
            {
                getAll: jest.fn().mockReturnValue({
                    pipe: jest.fn().mockReturnValue({
                        subscribe: jest.fn()
                    })
                })
            } as any,
            {
                open: jest.fn().mockReturnValue({
                    afterDismissed: jest.fn().mockReturnValue({
                        pipe: jest.fn().mockReturnValue({
                            subscribe: jest.fn()
                        })
                    })
                })
            } as any,
        );
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should call getAll and reset counter every second', (done) => {
        expect(component.updatedTime).toBe(0);
        const spy = jest.spyOn((component as any).productService.getAll().pipe(), 'subscribe');
        component.ngOnInit();
        expect(spy).toHaveBeenCalled()
        setTimeout(() => {
            expect(component.updatedTime).toBe(1);
            done();
        }, 1010)
    });

    it('new product button should open bottom sheet', () => {
        const spy = jest.spyOn((component as any).bottomSheet, 'open');
        component.newProduct({ stopPropagation: jest.fn() } as any);
        expect(spy).toHaveBeenCalled();
    });

    it('should do unsubscribe', () => {
        const nextSpy = jest.spyOn((component as any).destroy$, 'next');
        const completeSpy = jest.spyOn((component as any).destroy$, 'complete');
        component.ngOnDestroy();
        expect(nextSpy).toBeCalledWith(true);
        expect(completeSpy).toBeCalled();
    });
});
