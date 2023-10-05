import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CazaSlimeComponent } from './caza-slime.component';

describe('CazaSlimeComponent', () => {
  let component: CazaSlimeComponent;
  let fixture: ComponentFixture<CazaSlimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CazaSlimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CazaSlimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
