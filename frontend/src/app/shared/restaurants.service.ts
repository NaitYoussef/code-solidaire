import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/internal/operators";

export interface Restaurant {
  id: string;
  name: string;
  lat: number;
  lng: number;
  photos: string[];
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(private httpClient: HttpClient) {
  }

  getNearbyRestaurants(): Promise<Restaurant[]> {
    // function mapToRestaurant(): Restaurant[]{
    //   return null;
    // }

    return this.httpClient.get('/api/v1/restaurants').pipe(map(this.mapToRestaurant)).toPromise();
  }

  private mapToRestaurant(restaurants: any): Restaurant[] {
    return restaurants.map(restaurant => {
      return {
        id: restaurant.id,
        name: restaurant.name,
        lat: restaurant.lat,
        lng: restaurant.lng,
        photos: ['toto']
      }
    });
  }
}
