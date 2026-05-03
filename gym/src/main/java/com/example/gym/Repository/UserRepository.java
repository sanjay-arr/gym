package com.example.gym.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.gym.Enditity.User;

public interface UserRepository extends JpaRepository<User,Long>{
    Optional<User> findByEmail(String email);

}
