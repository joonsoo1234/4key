package com.example.backend.repository;

import com.example.backend.entity.MyDrink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyDrinkRepository extends JpaRepository<MyDrink, Integer> {
}
