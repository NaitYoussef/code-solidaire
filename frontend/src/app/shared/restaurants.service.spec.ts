import {TestBed} from '@angular/core/testing';

import {RestaurantsService} from './restaurants.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('RestaurantsService', () => {
  let httpBackend: HttpTestingController;
  let restaurantService: RestaurantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestaurantsService]
    });
    httpBackend = TestBed.get(HttpTestingController);
    restaurantService = TestBed.get(RestaurantsService);
  });

  it('should request backend to get nearby restaurants', () => {

    let photoReference = "reference1";
    const expectedResponse = [
      {
        "id": "id",
        "name": "name",
        "lat": 0,
        "lng": 0,
        "photosReference":[photoReference]
      }
    ];

    restaurantService.getNearbyRestaurants().then(restaurants => {

      const googlePlacePhoto = 'https://developers.google.com/places/web-service/photos'
      const apiKey = "AIzaSyBvLjHOMjmRVWELPcxI-YJ43rGJk2-cw2w";
      const realUrlPhoto = (googlePlacePhoto + "?maxwidth=400&photoreference=" + photoReference + "&key=" + apiKey);

      expect(restaurants).toEqual([{
        id: 'id',
        name: 'name',
        lat: 0,
        lng: 0,
        photos:[ realUrlPhoto]
      }]);
    });
    httpBackend.expectOne('/api/v1/restaurants').flush(expectedResponse);

  });
});
