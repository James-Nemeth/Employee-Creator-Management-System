package nology.io.employee_backend.employee;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmail(String email);

    List<Employee> findByContract(ContractType contract);

    List<Employee> findByRole(RoleType role);

    List<Employee> findByFinishDateBefore(LocalDate date);

    List<Employee> findByFinishDateAfterOrFinishDateIsNull(LocalDate date);

    List<Employee> findByContractAndFinishDateAfterOrFinishDateIsNull(ContractType contract, LocalDate date);
}