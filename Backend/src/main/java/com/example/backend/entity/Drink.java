package com.example.backend.entity;


import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Drink {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "drink_id", updatable = false)
    private int id;

    @Column(name="name", nullable=false)
    private String name;

    @Column(name="price", nullable = false)
    private int price;

    @Column(name = "drink_image")
    private String drinkImage;

    @Column(name="drink_type")
    private String drinkType; //아이스, 핫, 커피, 디카페인, 음료, 티 등등
}
