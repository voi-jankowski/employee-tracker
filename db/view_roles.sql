USE staff_db;
SELECT 
    role.title AS 'job title', 
    role.id AS 'role id', 
    department.name AS department, 
    role.salary AS salary
FROM role
JOIN department ON role.department_id = department.id;