/*package com.example.biometricpayroll.controller;

import com.example.biometricpayroll.entity.Attendance;
import com.example.biometricpayroll.entity.Employee;
import com.example.biometricpayroll.repository.AttendanceRepository;
import com.example.biometricpayroll.repository.EmployeeRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin("*")
public class AttendanceController {

    private final AttendanceRepository attendanceRepo;
    private final EmployeeRepository empRepo;

    public AttendanceController(AttendanceRepository attendanceRepo, EmployeeRepository empRepo) {
        this.attendanceRepo = attendanceRepo;
        this.empRepo = empRepo;
    }

    @PostMapping
    public Attendance mark(@RequestBody Attendance att) {
        att.setDate(LocalDate.now());
        return attendanceRepo.save(att);
    }

    @GetMapping("/payslip/{empId}")
    public Map<String, Object> payslip(@PathVariable Long empId) {

        Employee emp = empRepo.findById(empId).orElseThrow();
        List<Attendance> list = attendanceRepo.findByEmployeeId(empId);

        double totalHours = list.stream().mapToDouble(Attendance::getHoursWorked).sum();
        double salary = totalHours * emp.getHourlyRate();

        Map<String, Object> slip = new HashMap<>();
        slip.put("name", emp.getName());
        slip.put("role", emp.getRole());
        slip.put("totalHours", totalHours);
        slip.put("salary", salary);

        return slip;
    }
}
*/

package com.example.biometricpayroll.controller;

import com.example.biometricpayroll.entity.Attendance;
import com.example.biometricpayroll.entity.Employee;
import com.example.biometricpayroll.repository.AttendanceRepository;
import com.example.biometricpayroll.repository.EmployeeRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin("*")
public class AttendanceController {

    private final AttendanceRepository attendanceRepo;
    private final EmployeeRepository empRepo;

    public AttendanceController(AttendanceRepository attendanceRepo, EmployeeRepository empRepo) {
        this.attendanceRepo = attendanceRepo;
        this.empRepo = empRepo;
    }

    @PostMapping
    public Attendance mark(@RequestBody Attendance att) {
        att.setDate(LocalDate.now());
        return attendanceRepo.save(att);
    }

    @GetMapping("/payslip/{empId}")
    public Map<String, Object> payslip(@PathVariable Long empId) {

        Employee emp = empRepo.findById(empId).orElseThrow();
        List<Attendance> list = attendanceRepo.findByEmployeeId(empId);

        double totalHours = list.stream().mapToDouble(Attendance::getHoursWorked).sum();
        double salary = totalHours * emp.getHourlyRate();

        Map<String, Object> slip = new HashMap<>();
        slip.put("name", emp.getName());
        slip.put("role", emp.getRole());
        slip.put("totalHours", totalHours);
        slip.put("salary", salary);

        return slip;
    }
}

