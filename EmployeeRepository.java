package com.example.biometricpayroll.repository;

import com.example.biometricpayroll.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
