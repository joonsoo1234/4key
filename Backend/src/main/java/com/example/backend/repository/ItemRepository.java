package com.example.backend.repository;

import com.example.backend.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository <Item, Integer> {

    List<Item> findByitemType(String itemType); // 타입에 해당하는 drink 반환
    List<Item> findById(int id); //해당 id 정보 반환
    Item findOneById(int id); //해당 id 유무 판단
}
