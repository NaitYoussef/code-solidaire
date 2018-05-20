import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {RestaurantsService} from '../shared/restaurants.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let element: HTMLElement;
  const mockRestaurantService = {
    getNearbyRestaurants: jasmine.createSpy('getNearbyRestaurants')
  };
  beforeEach(async(() => {
    mockRestaurantService.getNearbyRestaurants.and.returnValue(Promise.resolve([
      {id: 1},
      {id: 2}
    ]));
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{provide: RestaurantsService, useValue: mockRestaurantService}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      element = fixture.debugElement.nativeElement;
    });
  }));


  it('should fetch and display all nearby restaurants', fakeAsync(() => {
    fixture.detectChanges();
    const restaurantCount = element.querySelectorAll('app-restaurant').length;
    expect(restaurantCount).toEqual(2);
    tick()
  }));
});
