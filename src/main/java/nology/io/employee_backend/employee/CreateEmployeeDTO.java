package nology.io.employee_backend.employee;

import java.time.LocalDate;

public class CreateEmployeeDTO {
    private String firstName;
    private String middleName;
    private String lastName;
    private String email;
    private String mobileNumber;
    private String address;
    private LocalDate startDate;
    private LocalDate finishDate;
    private ContractType contract;
    private RoleType role;
    private Integer hoursPerWeek;
    private String avatarUrl;

    public CreateEmployeeDTO(String firstName, String middleName, String lastName, String email, String mobileNumber,
            String address, LocalDate startDate, LocalDate finishDate, ContractType contract, RoleType role,
            Integer hoursPerWeek, String avatarUrl) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.address = address;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.contract = contract;
        this.role = role;
        this.hoursPerWeek = hoursPerWeek;
        this.avatarUrl = avatarUrl;
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

    public Employee toEntity() {
        Employee employee = new Employee();
        employee.setFirstName(this.firstName);
        employee.setMiddleName(this.middleName);
        employee.setLastName(this.lastName);
        employee.setEmail(this.email);
        employee.setMobileNumber(this.mobileNumber);
        employee.setAddress(this.address);
        employee.setStartDate(this.startDate);
        employee.setFinishDate(this.finishDate);
        employee.setContract(this.contract);
        employee.setRole(this.role);
        employee.setHoursPerWeek(this.hoursPerWeek);
        employee.setAvatarUrl(this.avatarUrl);
        return employee;
    }
}