import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventaryBusinessComponent } from './inventary-business.component';

describe('InventaryBusinessComponent', () => {
  let component: InventaryBusinessComponent;
  let fixture: ComponentFixture<InventaryBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventaryBusinessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventaryBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
