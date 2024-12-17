package com.example.backend.entity;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateMyCart {
    private int id;
    private int quantity;

}
