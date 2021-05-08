import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareElementDialogComponent } from './share-element-dialog.component';

describe('ShareElementDialogComponent', () => {
  let component: ShareElementDialogComponent;
  let fixture: ComponentFixture<ShareElementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareElementDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareElementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
