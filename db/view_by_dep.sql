
SELECT employee.id, 
        employee.first_name AS 'first name', 
        employee.last_name AS 'last name',
        role.title AS 'job title',
        role.salary,
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager

FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN employee manager ON manager.id = employee.manager_id
WHERE role.department_id = ?;