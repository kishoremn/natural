/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { NaturalTestModule } from '../../../test.module';
import { ProductKbDialogComponent } from '../../../../../../main/webapp/app/entities/product-kb/product-kb-dialog.component';
import { ProductKbService } from '../../../../../../main/webapp/app/entities/product-kb/product-kb.service';
import { ProductKb } from '../../../../../../main/webapp/app/entities/product-kb/product-kb.model';
import { SubCategoryKbService } from '../../../../../../main/webapp/app/entities/sub-category-kb';
import { BrandKbService } from '../../../../../../main/webapp/app/entities/brand-kb';

describe('Component Tests', () => {

    describe('ProductKb Management Dialog Component', () => {
        let comp: ProductKbDialogComponent;
        let fixture: ComponentFixture<ProductKbDialogComponent>;
        let service: ProductKbService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [NaturalTestModule],
                declarations: [ProductKbDialogComponent],
                providers: [
                    SubCategoryKbService,
                    BrandKbService,
                    ProductKbService
                ]
            })
            .overrideTemplate(ProductKbDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductKbDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductKbService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProductKb(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.product = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'productListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProductKb();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.product = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'productListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
