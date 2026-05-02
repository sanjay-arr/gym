package com.example.gym.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.gym.Enditity.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment,Long>{
}
