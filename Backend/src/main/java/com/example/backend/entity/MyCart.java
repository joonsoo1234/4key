package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class MyCart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "my_id", updatable = false)
    private int id;

    @Column(name="size", nullable = false)
    private char size = 'S'; // S, L

    @Column(name="shot", nullable = false)
    private int shot = 0; // 기본값 0 / 샷 추가 0, 1, 2

    @Column(name = "quantity", nullable = false)
    private int quantity = 1;  // 수량

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;  // 아이템 엔티티와 연결

    public MyCart toEntity() {
        return MyCart.builder()
                .size(size)
                .shot(shot)
                .quantity(quantity)
                .item(item)
//                .totalPrice(totalPrice)
                .build();
    }
}
