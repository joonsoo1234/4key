package com.example.backend.controller;

import com.example.backend.entity.Drink;
import com.example.backend.entity.MyDrink;
import com.example.backend.service.DrinkService;
import com.example.backend.service.MyDrinkService;
import com.example.backend.utils.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/drinks")
public class DrinkController {
    private final DrinkService drinkService;
    private final MyDrinkService myDrinkService;

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

    //type에 해당하는 drink 호출 {drink_type}
    @GetMapping("/{drink_type}")
    public ResponseEntity<Object> getDrink_type(@PathVariable String drink_type) {
        List<Drink> drinks_type = drinkService.getDrinkByType(drink_type);
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                drinks_type
        );
    }

    //drink 선택 시 상세
    @GetMapping("/choice")
    public ResponseEntity<Object> getDrink_id(@RequestParam int drink_id) {
        List<Drink> drinks = drinkService.getDrinkById(drink_id);
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                drinks
        );
    }

    //drink 선택 바구니에 저장
    @PostMapping("/choice/test")
    public ResponseEntity<Object> addDrinkToCart(@ModelAttribute MyDrink request) {

        MyDrink myDrinks = myDrinkService.addDrinkToCart(request);
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                myDrinks
        );
    }

}
