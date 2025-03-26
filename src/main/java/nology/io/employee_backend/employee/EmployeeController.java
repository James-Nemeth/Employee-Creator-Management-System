package nology.io.employee_backend.employee;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmployeeController {
    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees(
            @RequestParam(required = false) ContractType contract,
            @RequestParam(required = false) RoleType role,
            @RequestParam(required = false, defaultValue = "false") boolean previous) {
        List<Employee> employees;

        if (contract != null) {
            employees = employeeService.getEmployeesByContract(contract);
        } else if (role != null) {
            employees = employeeService.getEmployeesByRole(role);
        } else if (previous) {
            employees = employeeService.getPreviousEmployees();
        } else {
            employees = employeeService.getAllEmployees();
        }

        return ResponseEntity.ok(employees);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        try {
            Employee employee = employeeService.getEmployeeById(id);
            return ResponseEntity.ok(employee);
        } catch (IllegalArgumentException e) {
            Employee errorEmployee = new Employee();
            errorEmployee.setFirstName("Error");
            errorEmployee.setLastName(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorEmployee);
        }
    }

    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody CreateEmployeeDTO employeeDTO) {
        try {
            Employee createdEmployee = employeeService.createEmployee(employeeDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdEmployee);
        } catch (IllegalArgumentException e) {
            Employee errorEmployee = new Employee();
            errorEmployee.setFirstName("Error");
            errorEmployee.setLastName(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorEmployee);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
        try {
            Employee updatedEmployee = employeeService.updateEmployee(id, employeeDetails);
            return ResponseEntity.ok(updatedEmployee);
        } catch (IllegalArgumentException e) {
            Employee errorEmployee = new Employee();
            errorEmployee.setFirstName("Error");
            errorEmployee.setLastName(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorEmployee);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id) {
        try {
            employeeService.deleteEmployee(id);
            return ResponseEntity.ok("Employee Successfully Deleted");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error deleting employee: " + e.getMessage());
        }
    }
}