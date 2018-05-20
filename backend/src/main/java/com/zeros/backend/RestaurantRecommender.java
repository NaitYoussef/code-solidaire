package com.zeros.backend;

import com.google.maps.GeoApiContext;
import com.google.maps.PlacesApi;
import com.google.maps.model.LatLng;
import com.google.maps.model.PlaceType;
import com.google.maps.model.PlacesSearchResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toList;

@Service
public class RestaurantRecommender {


    private String googleApiKey="AIzaSyBvLjHOMjmRVWELPcxI-YJ43rGJk2-cw2w";

    public List<Restaurant> getNearbyRestaurant() {
        GeoApiContext context = new GeoApiContext.Builder()
                .apiKey(googleApiKey)
                .build();
        LatLng searchLocation = new LatLng(48.874037, 2.339619);
        try {
            PlacesSearchResponse searchResponse = PlacesApi.nearbySearchQuery(context, searchLocation)
                    .radius(1000)
                    .type(PlaceType.RESTAURANT)
                    .await();
            return Stream.of(searchResponse.results).limit(5)
                    .map(searchResult -> {
                        List<String> photos = Stream.of(searchResult.photos).map(photo -> photo.photoReference).collect(toList());
                        Location location = new Location(searchResult.geometry.location.lat, searchResult.geometry.location.lng);
                        return new Restaurant(searchResult.name, location, searchResult.rating, photos);
                    })
                    .collect(toList());
        } catch (Exception e) {
            throw new RuntimeException("Ooops! we cant get places from google maps service", e);
        }
    }
}
