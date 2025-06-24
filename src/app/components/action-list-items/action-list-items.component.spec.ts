import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionListItemsComponent } from './action-list-items.component';

describe('ActionListItemsComponent', () => {
  let component: ActionListItemsComponent;
  let fixture: ComponentFixture<ActionListItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionListItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
