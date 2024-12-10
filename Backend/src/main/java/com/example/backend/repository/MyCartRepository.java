package com.example.backend.repository;

import com.example.backend.entity.MyCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyCartRepository extends JpaRepository<MyCart, Integer> {
}
