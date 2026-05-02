package com.example.gym.Enditity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;

@Entity
@Data
public class Customer {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Email
    private String email;
    private String phone;
    private String gender;

    @Min(18)
    private int age;

    @ManyToOne
    @JoinColumn(name="trainer_id")
    private Trainer trainer;

    @OneToOne
    @JoinColumn(name="subscription_id")
    private Subscription subscription;
}
