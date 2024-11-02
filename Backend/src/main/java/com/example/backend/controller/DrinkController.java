package com.example.backend.controller;



import com.example.backend.entity.Drink;
import com.example.backend.service.DrinkService;
import com.example.backend.utils.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/drinks")
public class DrinkController {
    private final DrinkService drinkService;

    //모든 drink 호출
    @GetMapping()
    public ResponseEntity<Object> getDrinks() {
        List<Drink> drinks = drinkService.getAllDrinks();
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                drinks
        );
    }

    //해당 drink 호출
    @GetMapping("/{drink_type}")
    public ResponseEntity<Object> getDrink_type(@PathVariable String drink_type) {
        List<Drink> drinks = drinkService.getDrinkByType(drink_type);
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                drinks
        );
    }
}
