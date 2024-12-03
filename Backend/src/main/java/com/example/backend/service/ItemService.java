package com.example.backend.service;

import com.example.backend.entity.Item;
import com.example.backend.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;

    // 전체 표시
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }
    //해당 type drink 호출
    public List<Item> getItemByType(String type) {
        return itemRepository.findByitemType(type);
    }

    //해당 id drink 호출
    public List<Item> getItemById(int id) {
        return itemRepository.findById(id);
    }
}
