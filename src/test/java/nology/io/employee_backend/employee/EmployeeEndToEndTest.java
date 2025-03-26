package nology.io.employee_backend.employee;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;

import io.restassured.RestAssured;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class EmployeeEndToEndTest {

    @LocalServerPort
    private int port;

    @Autowired
    private EmployeeRepository employeeRepository;

    private List<Employee> employees = new ArrayList<>();

    @BeforeEach
    public void setUp() {
        RestAssured.port = port;
        employeeRepository.deleteAll();
        employees.clear();

        Employee emp1 = new Employee();
        emp1.setFirstName("John");
        emp1.setLastName("Doe");
        emp1.setEmail("john.doe@example.com");
        emp1.setMobileNumber("1234567890");
        emp1.setAddress("123 Main St");
        emp1.setStartDate(LocalDate.now().minusMonths(1));
        emp1.setContract(ContractType.PERMANENT);
        emp1.setRole(RoleType.FULLTIME);
        emp1.setHoursPerWeek(40);
        emp1.setAvatarUrl("http://example.com/john.jpg"); 
        employees.add(employeeRepository.save(emp1));

        Employee emp2 = new Employee();
        emp2.setFirstName("Jane");
        emp2.setLastName("Doe");
        emp2.setEmail("jane.doe@example.com");
        emp2.setMobileNumber("0987654321");
        emp2.setAddress("456 Main St");
        emp2.setStartDate(LocalDate.now().minusMonths(2));
        emp2.setFinishDate(LocalDate.now().plusWeeks(1));
        emp2.setContract(ContractType.CONTRACT);
        emp2.setRole(RoleType.PARTTIME);
        emp2.setHoursPerWeek(20);
        emp2.setAvatarUrl("http://example.com/jane.jpg");
        employees.add(employeeRepository.save(emp2));
    }

    @Test
    public void getAllEmployees_ReturnsSuccess() {
        given().when()
                .get("/employee")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("$", hasSize(2))
                .body("firstName", hasItems("John", "Jane"))
                .body("avatarUrl", hasItems("http://example.com/john.jpg", "http://example.com/jane.jpg")); 
    }

    @Test
    public void getEmployeeById_ValidId_ReturnsEmployee() {
        Long id = employees.get(0).getId();

        given().when()
                .get("/employee/" + id)
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("firstName", equalTo("John"))
                .body("avatarUrl", equalTo("http://example.com/john.jpg")); 
    }

    @Test
    public void createEmployee_ValidData_ReturnsSuccess() {
        CreateEmployeeDTO employeeDTO = new CreateEmployeeDTO(
                "Alice", "M", "Smith", "alice.smith@example.com", "1112223333",
                "789 Main St", LocalDate.now(), null, ContractType.PERMANENT,
                RoleType.FULLTIME, 40, "http://example.com/alice.jpg"); 

        given()
                .contentType("application/json")
                .body(employeeDTO)
                .when()
                .post("/employee")
                .then()
                .statusCode(HttpStatus.CREATED.value())
                .body("firstName", equalTo("Alice"))
                .body("lastName", equalTo("Smith"))
                .body("avatarUrl", equalTo("http://example.com/alice.jpg")); 
    }

    @Test
    public void updateEmployee_ValidData_ReturnsUpdatedEmployee() {
        Long id = employees.get(0).getId();
        Employee updatedEmployee = employees.get(0);
        updatedEmployee.setFirstName("Johnny");

        given()
                .contentType("application/json")
                .body(updatedEmployee)
                .when()
                .put("/employee/" + id)
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("firstName", equalTo("Johnny"))
                .body("avatarUrl", equalTo("http://example.com/john.jpg")); 
    }

    @Test
    public void deleteEmployee_ValidId_ReturnsSuccess() {
        Long id = employees.get(0).getId();

        given().when()
                .delete("/employee/" + id)
                .then()
                .statusCode(HttpStatus.OK.value())
                .body(equalTo("Employee Successfully Deleted"));
    }
}