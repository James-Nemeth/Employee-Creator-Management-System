package nology.io.employee_backend.employee;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    private String middleName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String mobileNumber;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private LocalDate startDate;

    private LocalDate finishDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ContractType contract;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoleType role;

    @Column(nullable = false)
    private Integer hoursPerWeek;

    @Column(nullable = false)
    private String avatarUrl;

    public void update(Employee employeeDetails) {
        this.firstName = employeeDetails.getFirstName();
        this.middleName = employeeDetails.getMiddleName();
        this.lastName = employeeDetails.getLastName();
        this.email = employeeDetails.getEmail();
        this.mobileNumber = employeeDetails.getMobileNumber();
        this.address = employeeDetails.getAddress();
        this.startDate = employeeDetails.getStartDate();
        this.finishDate = employeeDetails.getFinishDate();
        this.contract = employeeDetails.getContract();
        this.role = employeeDetails.getRole();
        this.hoursPerWeek = employeeDetails.getHoursPerWeek();
        this.avatarUrl = employeeDetails.getAvatarUrl();
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(LocalDate finishDate) {
        this.finishDate = finishDate;
    }

    public ContractType getContract() {
        return contract;
    }

    public void setContract(ContractType contract) {
        this.contract = contract;
    }

    public RoleType getRole() {
        return role;
    }

    public void setRole(RoleType role) {
        this.role = role;
    }

    public Integer getHoursPerWeek() {
        return hoursPerWeek;
    }

    public void setHoursPerWeek(Integer hoursPerWeek) {
        this.hoursPerWeek = hoursPerWeek;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}

enum ContractType {
    PERMANENT,
    CONTRACT
}

enum RoleType {
    FULLTIME,
    PARTTIME,
    CASUAL
}