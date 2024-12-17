package com.example.backend.repository;

import com.example.backend.entity.Item;
import com.example.backend.entity.MyCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyCartRepository extends JpaRepository<MyCart, Integer> {
    MyCart findOneById(int id); //해당 id 유무 판단
}
