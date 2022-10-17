import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceBusinessComponent } from './finance-business.component';

describe('FinanceBusinessComponent', () => {
  let component: FinanceBusinessComponent;
  let fixture: ComponentFixture<FinanceBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceBusinessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
