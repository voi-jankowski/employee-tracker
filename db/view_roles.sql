SELECT 
    role.id AS 'role id',
    role.title AS 'job title',  
    department.name AS department, 
    role.salary AS salary
FROM role
JOIN department ON role.department_id = department.id
ORDER BY role.id;