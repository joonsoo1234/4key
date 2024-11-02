package com.example.backend.repository;

import com.example.backend.entity.Drink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DrinkRepository extends JpaRepository <Drink, Integer> {

    List<Drink> findByType(String type); // 타입에 해당하는 drink 반환
}
