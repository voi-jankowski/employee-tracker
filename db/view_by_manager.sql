SELECT employee.id, 
        employee.first_name AS 'first name', 
        employee.last_name AS 'last name',
        role.title AS 'job title',
        department.name AS department,
        role.salary

FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
WHERE manager_id = ?;