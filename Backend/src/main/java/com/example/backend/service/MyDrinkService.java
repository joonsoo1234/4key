package com.example.backend.service;


import com.example.backend.entity.Drink;
import com.example.backend.entity.MyDrink;
import com.example.backend.repository.DrinkRepository;
import com.example.backend.repository.MyDrinkRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MyDrinkService {

    private static final Logger logger = LoggerFactory.getLogger(MyDrinkService.class); //log test

    private final MyDrinkRepository myDrinkRepository;
    private final DrinkRepository drinkRepository;

    @Transactional
    public MyDrink addDrinkToCart(MyDrink request) {
        // 1. 선택한 음료 정보 가져오기
        Drink drink = drinkRepository.findOneById(request.getDrink().getId());
        logger.info(drink.toString());

        // 2. 가격 계산 (1개 샷 500원 추가)
        int shotPrice = 500;
        int totalPrice = (drink.getPrice() + shotPrice * request.getShot()) * request.getQuantity();

        request.setDrink(drink);
        request.setTotalPrice(totalPrice);

        // 4. Mydrink 테이블에 저장
        return myDrinkRepository.save(request.toEntity());
    }
}
