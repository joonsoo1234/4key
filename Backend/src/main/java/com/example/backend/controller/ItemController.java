package com.example.backend.controller;

import com.example.backend.entity.Item;
import com.example.backend.entity.MyDrink;
import com.example.backend.service.ItemService;
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
@RequestMapping("/api/items")
public class ItemController {
    private final ItemService itemService;
    private final MyDrinkService myDrinkService;

    //모든 item 호출
    @GetMapping()
    public ResponseEntity<Object> getItems() {
        List<Item> items = itemService.getAllItems();
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                items
        );
    }

    //type에 해당하는 item 호출 {item_type}
    @GetMapping("/{item_type}")
    public ResponseEntity<Object> getItem_type(@PathVariable String item_type) {
        List<Item> drinks_type = itemService.getItemByType(item_type);
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                drinks_type
        );
    }

    //item 선택 시 상세
    @GetMapping("/choice")
    public ResponseEntity<Object> getItem_id(@RequestParam int item_id) {
        List<Item> items = itemService.getItemById(item_id);
        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                null,
                items
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
