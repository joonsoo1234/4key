package com.example.backend.service;


import com.example.backend.entity.Item;
import com.example.backend.entity.MyCart;
import com.example.backend.repository.ItemRepository;
import com.example.backend.repository.MyCartRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class MyCartService {

    private static final Logger logger = LoggerFactory.getLogger(MyCartService.class); //log test

    private final MyCartRepository myCartRepository;
    private final ItemRepository itemRepository;

    // 카트에 저장
    @Transactional
    public MyCart addDrinkToCart(MyCart request) {
        String Choice_type = request.getItem().getItemType();
        if (Objects.equals(Choice_type, "커피")) {
            return myCartRepository.save(request);
        }
        // 1. 선택한 음료 정보 가져오기
        Item item = itemRepository.findOneById(request.getItem().getId());
        logger.info(item.toString());

        request.setItem(item);

        // Mydrink 테이블에 저장
        return myCartRepository.save(request);
    }

    // 카트 초기화
    public void clearCart() {
        try {
            // DB에서 모든 카트 데이터를 삭제
            myCartRepository.deleteAll();
        } catch (Exception e) {
            // 예외 처리: 예외 발생 시 필요한 작업을 여기에 추가
            throw new RuntimeException("장바구니 초기화 실패", e);
        }
    }


}
