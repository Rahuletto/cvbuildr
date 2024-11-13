package com.example.resumebuilder.service;

import com.example.resumebuilder.model.User;
import com.example.resumebuilder.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Create a new user (UUID should be sent from the frontend)
    public User createUser(User user) {
        // Ensure the UUID is provided by the frontend
        if (user.getUuid() == null || user.getUuid().isEmpty()) {
            throw new IllegalArgumentException("UUID must be provided from the frontend.");
        }

        // Set the user reference for each nested entity
        setNestedEntitiesUserReference(user);

        // Set default values for education, work experience, and projects if not provided
        setDefaultValues(user);

        return userRepository.save(user);
    }

    // Set user reference for nested entities
    private void setNestedEntitiesUserReference(User user) {
        if (user.getSocialMedia() != null) {
            user.getSocialMedia().forEach(socialMedia -> socialMedia.setUser(user));
        }
        if (user.getEducation() != null) {
            user.getEducation().forEach(education -> {
                education.setUser(user);
                if (education.getStartYear() == null || education.getStartYear().isEmpty()) {
                    education.setStartYear(LocalDate.now().toString()); // Default to current date
                }
                if (education.getEndYear() == null || education.getEndYear().isEmpty()) {
                    education.setEndYear("Present"); // Default to Present
                }
            });
        }
        if (user.getWorkExperience() != null) {
            user.getWorkExperience().forEach(workExperience -> {
                workExperience.setUser(user);
                if (workExperience.getStartYear() == null || workExperience.getStartYear().isEmpty()) {
                    workExperience.setStartYear(LocalDate.now().toString()); // Default to current date
                }
                if (workExperience.getEndYear() == null || workExperience.getEndYear().isEmpty()) {
                    workExperience.setEndYear("Present"); // Default to Present
                }
            });
        }
        if (user.getProjects() != null) {
            user.getProjects().forEach(project -> {
                project.setUser(user);
                if (project.getStartYear() == null || project.getStartYear().isEmpty()) {
                    project.setStartYear(LocalDate.now().toString()); // Default to current date
                }
                if (project.getEndYear() == null || project.getEndYear().isEmpty()) {
                    project.setEndYear("Present"); // Default to Present
                }
            });
        }
        if (user.getSkills() != null) {
            user.getSkills().forEach(skill -> skill.setUser(user));
        }
        if (user.getLanguages() != null) {
            // No need to set user reference for languages as they are just strings
        }
        if (user.getCertifications() != null) {
            // No need to set user reference for certifications as they are just strings
        }
    }

    // Set default values for nested entities
    private void setDefaultValues(User user) {
        if (user.getEducation() != null) {
            user.getEducation().forEach(education -> {
                if (education.getStartYear() == null || education.getStartYear().isEmpty()) {
                    education.setStartYear(LocalDate.now().toString()); // Default to current date
                }
                if (education.getEndYear() == null || education.getEndYear().isEmpty()) {
                    education.setEndYear("Present"); // Default to Present
                }
            });
        }
        if (user.getWorkExperience() != null) {
            user.getWorkExperience().forEach(workExperience -> {
                if (workExperience.getStartYear() == null || workExperience.getStartYear().isEmpty()) {
                    workExperience.setStartYear(LocalDate.now().toString()); // Default to current date
                }
                if (workExperience.getEndYear() == null || workExperience.getEndYear().isEmpty()) {
                    workExperience.setEndYear("Present"); // Default to Present
                }
            });
        }
        if (user.getProjects() != null) {
            user.getProjects().forEach(project -> {
                if (project.getStartYear() == null || project.getStartYear().isEmpty()) {
                    project.setStartYear(LocalDate.now().toString()); // Default to current date
                }
                if (project.getEndYear() == null || project.getEndYear().isEmpty()) {
                    project.setEndYear("Present"); // Default to Present
                }
            });
        }
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by UUID
    public Optional<User> getUserByUuid(String uuid) {
        return userRepository.findByUuid(uuid);
    }

    // Update user by UUID
    public User updateUser(String uuid, User userDetails) {
        User user = userRepository.findByUuid(uuid)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        user.setName(userDetails.getName());
        user.setPosition(userDetails.getPosition());
        user.setNumber(userDetails.getNumber());
        user.setEmail(userDetails.getEmail());
        user.setAddress(userDetails.getAddress());
        user.setProfilePicture(userDetails.getProfilePicture());
        user.setSummary(userDetails.getSummary());

        // Update nested entities if necessary (code omitted for brevity)

        return userRepository.save(user);
    }

    // Delete user by UUID
    public boolean deleteUser(String uuid) {
        Optional<User> userOptional = userRepository.findByUuid(uuid);
        if (userOptional.isPresent()) {
            userRepository.delete(userOptional.get());
            return true;
        }
        return false;
    }
}
