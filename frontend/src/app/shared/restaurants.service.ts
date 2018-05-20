import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/internal/operators';
import {AppSettings} from './app-settings.service';

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

  private readonly googlePlacePhotoUrl: string;
  private readonly googleMapsKey: string;

  constructor(private httpClient: HttpClient, appSetting: AppSettings) {
    this.googlePlacePhotoUrl = appSetting.googlePlacePhotoUrl;
    this.googleMapsKey = appSetting.googleMapsKey;
  }

  public getNearbyRestaurants(): Promise<Restaurant[]> {
    return this.httpClient.get('/api/v1/restaurants').pipe(map(r => this.mapToRestaurant(r))).toPromise();
  }

  private mapToRestaurant(restaurants: any): Restaurant[] {
    return restaurants.map(restaurant => {
      return {
        id: restaurant.id,
        name: restaurant.name,
        lat: restaurant.lat,
        lng: restaurant.lng,
        photos: restaurant.photosReference.map(photo => this.buildUrl(photo))
      }
    });
  }

  private buildUrl(photo: string): string {
    return this.googlePlacePhotoUrl + '?maxwidth=400&photoreference=' + photo + '&key=' + this.googleMapsKey;
  }

}
