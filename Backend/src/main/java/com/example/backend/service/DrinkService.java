package com.example.backend.service;

import com.example.backend.entity.Drink;
import com.example.backend.repository.DrinkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DrinkService {
    private final DrinkRepository drinkRepository;

    public List<Drink> getAllDrinks() {
        return drinkRepository.findAll();
    }
    //해당 type drink 호출
    public List<Drink> getDrinkByType(String type) {
        return drinkRepository.findByType(type);
    }
}
