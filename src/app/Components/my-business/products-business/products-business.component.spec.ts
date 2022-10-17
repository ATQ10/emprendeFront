import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsBusinessComponent } from './products-business.component';

describe('ProductsBusinessComponent', () => {
  let component: ProductsBusinessComponent;
  let fixture: ComponentFixture<ProductsBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsBusinessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
