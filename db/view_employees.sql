USE staff_db;
SELECT 
    e1.id AS 'employee id', 
    e1.first_name AS 'first name',
    e1.last_name AS 'last name',
    role.title AS 'job title', 
    department.name AS department, 
    role.salary AS salary,
    e2.first_name + ' ' + e2.last_name AS manager
FROM employee e1
JOIN employee e2 ON e1.manager_id = e2.id
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id;