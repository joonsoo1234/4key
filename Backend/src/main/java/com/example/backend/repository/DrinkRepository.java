package com.example.backend.repository;

import com.example.backend.entity.Drink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DrinkRepository extends JpaRepository <Drink, Integer> {

    List<Drink> findBydrinkType(String drinkType); // 타입에 해당하는 drink 반환
    List<Drink> findById(int id); //해당 id 정보 반환
    Drink findOneById(int id); //해당 id 유무 판단
}
