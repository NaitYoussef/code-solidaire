import {Component, OnInit} from '@angular/core';
import {Restaurant, RestaurantsService} from '../shared/restaurants.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public restaurants: Restaurant[] = [];

  constructor(private restaurantsService: RestaurantsService) {
    this.restaurantsService.getNearbyRestaurants().then(restaurants => this.restaurants = restaurants);
  }

  ngOnInit() {

  }

}
