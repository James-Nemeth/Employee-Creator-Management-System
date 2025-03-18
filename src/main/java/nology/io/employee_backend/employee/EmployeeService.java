package nology.io.employee_backend.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class EmployeeService {

    private static final Logger LOGGER = Logger.getLogger(EmployeeService.class.getName());

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(Long id) {
        Optional<Employee> employeeOptional = employeeRepository.findById(id);
        if (employeeOptional.isPresent()) {
            return employeeOptional.get();
        } else {
            throw new IllegalArgumentException("Employee not found");
        }
    }

    public Employee createEmployee(CreateEmployeeDTO employeeDTO) {
        validateEmployeeDTO(employeeDTO);

        if (employeeRepository.findByEmail(employeeDTO.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Employee with this email already exists");
        }

        Employee employee = employeeDTO.toEntity();
        setDefaultValues(employee);

        Employee savedEmployee = employeeRepository.save(employee);
        LOGGER.info("Created new employee: " + savedEmployee.getId());
        return savedEmployee;
    }

    public Employee updateEmployee(Long id, Employee employeeDetails) {
        validateEmployeeDetails(employeeDetails);

        Optional<Employee> employeeOptional = employeeRepository.findById(id);
        if (employeeOptional.isPresent()) {
            Employee employee = employeeOptional.get();
            employee.update(employeeDetails);

            Employee updatedEmployee = employeeRepository.save(employee);
            LOGGER.info("Updated employee: " + updatedEmployee.getId());
            return updatedEmployee;
        } else {
            throw new IllegalArgumentException("Employee not found");
        }
    }

    public void deleteEmployee(Long id) {
        Optional<Employee> employeeOptional = employeeRepository.findById(id);

        if (employeeOptional.isPresent()) {
            employeeRepository.deleteById(id);
            LOGGER.info("Deleted employee: " + id);
        } else {
            throw new IllegalArgumentException("Employee not found");
        }
    }

    private void validateEmployeeDTO(CreateEmployeeDTO employeeDTO) {
        if (employeeDTO.getFirstName() == null || employeeDTO.getFirstName().isEmpty()) {
            throw new IllegalArgumentException("First name is required");
        }
        if (employeeDTO.getLastName() == null || employeeDTO.getLastName().isEmpty()) {
            throw new IllegalArgumentException("Last name is required");
        }
        if (employeeDTO.getEmail() == null || employeeDTO.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
    }

    private void validateEmployeeDetails(Employee employeeDetails) {
        if (employeeDetails.getFirstName() == null || employeeDetails.getFirstName().isEmpty()) {
            throw new IllegalArgumentException("First name is required");
        }
        if (employeeDetails.getLastName() == null || employeeDetails.getLastName().isEmpty()) {
            throw new IllegalArgumentException("Last name is required");
        }
        if (employeeDetails.getEmail() == null || employeeDetails.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
    }

    private void setDefaultValues(Employee employee) {
        if (employee.getRole() == null) {
            employee.setRole(RoleType.FULLTIME);
        }
    }
}