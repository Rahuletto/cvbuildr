package com.example.resumebuilder.repository;

import com.example.resumebuilder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {  // Change Long to String
    Optional<User> findByUuid(String uuid);  // New method for finding by UUID
}
