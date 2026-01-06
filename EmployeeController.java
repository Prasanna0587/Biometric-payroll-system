/*package com.example.biometricpayroll.controller;

import com.example.biometricpayroll.entity.Employee;
import com.example.biometricpayroll.repository.EmployeeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin("*")
public class EmployeeController {

    private final EmployeeRepository repo;

    public EmployeeController(EmployeeRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public Employee register(@RequestBody Employee emp) {
        return repo.save(emp);
    }

    @GetMapping
    public List<Employee> all() {
        return repo.findAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
*/
package com.example.biometricpayroll.controller;

import com.example.biometricpayroll.entity.Employee;
import com.example.biometricpayroll.repository.EmployeeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin("*")
public class EmployeeController {

    private final EmployeeRepository repo;

    public EmployeeController(EmployeeRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public Employee register(@RequestBody Employee emp) {
        return repo.save(emp);
    }

    @GetMapping
    public List<Employee> all() {
        return repo.findAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
