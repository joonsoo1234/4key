package com.example.backend.service;


import com.example.backend.entity.Drink;
import com.example.backend.entity.MyDrink;
import com.example.backend.repository.DrinkRepository;
import com.example.backend.repository.MyDrinkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyDrinkService {

    private final MyDrinkRepository myDrinkRepository;
    private final DrinkRepository drinkRepository;

    public MyDrink addDrinkToCart(int drinkId, char size, int shot, int quantity) {
        // 1. 선택한 음료 정보 가져오기
        Drink drink = drinkRepository.findByOpId(drinkId).orElseThrow(() -> new RuntimeException("음료를 찾을 수 없습니다"));

        // 2. 가격 계산 (1개 샷 500원 추가)
        int shotPrice = 500;
        int totalPrice = (drink.getPrice() + shotPrice * shot) * quantity;

        // 3. Mydrink 객체 생성
        MyDrink mydrink = new MyDrink();
        mydrink.setSize(size);             // 사이즈 설정
        mydrink.setShot(shot);             // 샷 수 설정
        mydrink.setQuantity(quantity);     // 수량 설정
        mydrink.setTotalPrice(totalPrice); // 총 가격 설정

        // 4. Mydrink 테이블에 저장
        return myDrinkRepository.save(mydrink);
    }
}
