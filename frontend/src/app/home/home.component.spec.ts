import {async, ComponentFixture, ComponentFixtureAutoDetect, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {RestaurantsService} from '../shared/restaurants.service';
import {Restaurant} from "../shared/Restaurant";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {UiModule} from "../ui.module";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let element: HTMLElement;
  const restaurants: Restaurant[] = [{
    id: '1',
    name: '',
    lat: 23,
    lng: 2,
    photos: [],
    photo: ''
  }];
  const mockRestaurantService = {
    getNearbyRestaurants: jasmine.createSpy('getNearbyRestaurants').and.returnValue(Promise.resolve(restaurants))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [UiModule],
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).overrideComponent(HomeComponent, {
      set: {
        providers: [{provide: RestaurantsService, useValue: mockRestaurantService}]
      }
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      element = fixture.debugElement.nativeElement;
      fixture.detectChanges();
    });
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
  it('should fetch nearby restaurants', () => {
    expect(component.restaurants).toEqual(restaurants);
  })

});
