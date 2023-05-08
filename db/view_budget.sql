SELECT SUM(role.salary) AS 'total budget'
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN employee manager ON manager.id = employee.manager_id
WHERE role.department_id = ?;