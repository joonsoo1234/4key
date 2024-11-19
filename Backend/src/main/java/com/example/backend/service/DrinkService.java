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

    // 전체 표시
    public List<Drink> getAllDrinks() {
        return drinkRepository.findAll();
    }
    //해당 type drink 호출
    public List<Drink> getDrinkByType(String type) {
        return drinkRepository.findBydrinkType(type);
    }

    //해당 id drink 호출
    public List<Drink> getDrinkById(int id) {
        return drinkRepository.findById(id);
    }
}
