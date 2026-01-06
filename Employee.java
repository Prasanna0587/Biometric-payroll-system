/*package com.example.biometricpayroll.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String role;
    private int hourlyRate;

    @Column(length = 2000)
    private String faceEmbedding;   // JSON string from frontend

    private LocalDate joinDate;

    // ✅ Constructors
    public Employee() {}

    public Employee(String name, String role, int hourlyRate, String faceEmbedding) {
        this.name = name;
        this.role = role;
        this.hourlyRate = hourlyRate;
        this.faceEmbedding = faceEmbedding;
        this.joinDate = LocalDate.now();
    }

    // ✅ Getters & Setters
    public Long getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public int getHourlyRate() { return hourlyRate; }
    public void setHourlyRate(int hourlyRate) { this.hourlyRate = hourlyRate; }

    public String getFaceEmbedding() { return faceEmbedding; }
    public void setFaceEmbedding(String faceEmbedding) { this.faceEmbedding = faceEmbedding; }

    public LocalDate getJoinDate() { return joinDate; }
    public void setJoinDate(LocalDate joinDate) { this.joinDate = joinDate; }
}
*/
package com.example.biometricpayroll.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String role;
    private double hourlyRate;

    @Column(columnDefinition = "LONGTEXT")
    private String faceImage; // Base64 image
}
