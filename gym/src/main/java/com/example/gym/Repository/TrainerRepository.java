package com.example.gym.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.gym.Enditity.Trainer;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer,Long>{
}
