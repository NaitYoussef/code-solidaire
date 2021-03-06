package com.zeros.backend.domain.services.impl;

import com.google.common.base.Preconditions;
import com.google.common.base.Strings;
import com.zeros.backend.domain.exceptions.AlreadySubscribedRestaurantException;
import com.zeros.backend.domain.models.Restaurant;
import com.zeros.backend.domain.repositories.RestaurantRepository;
import com.zeros.backend.domain.services.RestaurantSubscriber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SimpleRestaurantSubscriber implements RestaurantSubscriber {

    private RestaurantRepository restaurantRepository;

    @Autowired
    public SimpleRestaurantSubscriber(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    public Restaurant subscribe(Restaurant restaurant) {

        Preconditions.checkArgument(!Strings.isNullOrEmpty(restaurant.getName()), "Restaurant name should be present");
        Preconditions.checkArgument(!Strings.isNullOrEmpty(restaurant.getaddress()), "Restaurant address should be present");

        if (restaurantRepository.exists(restaurant.getName(), restaurant.getaddress())) {
            throw new AlreadySubscribedRestaurantException("The restaurant '" + restaurant.getId() + "'already SubscribedR !");
        } else {
            return restaurantRepository.save(restaurant);
        }

    }
}
