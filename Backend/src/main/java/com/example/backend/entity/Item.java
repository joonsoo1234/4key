package com.example.backend.entity;


import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "4keyTable")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id", updatable = false)
    private int id;

    @Column(name="name", nullable=false)
    private String name;

    @Column(name="price", nullable = false)
    private int price;

    @Column(name = "item_image")
    private String itemImage;

    @Column(name="item_type")
    private String itemType; //아이스, 핫, 커피, 디카페인, 음료, 티 등등
}
