package com.example.gym.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.gym.Enditity.Subscription;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription,Long>{
    
}
