import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeJuegosComponent } from './home-juegos.component';

describe('HomeJuegosComponent', () => {
  let component: HomeJuegosComponent;
  let fixture: ComponentFixture<HomeJuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeJuegosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
