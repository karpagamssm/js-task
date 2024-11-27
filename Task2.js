
// Employee list with duplicates
const employees = [
  { id: 1, name: 'meow', department: 'HR', salary: 40000, bonusPercentage: 10 },
  { id: 2, name: 'pattu', department: 'Engineering', salary: 60000, bonusPercentage: 15, yearsOfExperience: 3 },
  { id: 3, name: 'kitty', department: 'Sales', salary: 50000, bonusPercentage: 10, salesAchieved: 150000 },
  { id: 1, name: 'meow', department: 'HR', salary: 40000, bonusPercentage: 10 }, // Duplicate
  { id: 4, name: 'do', department: 'Engineering', salary: 70000, bonusPercentage: 15, yearsOfExperience: 1 },
  { id: 5, name: 'kit', department: 'Sales', salary: 80000, bonusPercentage: 20, salesAchieved: 600000 },
  
];

// Bonus rules per department
const bonusRules = {
  HR: (employee) => (employee.salary < 50000 ? 0.10 * employee.salary : 0),
  Engineering: (employee) => (employee.yearsOfExperience > 2 ? 0.15 * employee.salary : 0),
  Sales: (employee) => {
    if (employee.salesAchieved < 100000) return 0.05 * employee.salary;
    else if (employee.salesAchieved >= 100000 && employee.salesAchieved <= 500000) return 0.10 * employee.salary;
    else return 0.20 * employee.salary;
  },
};

// Remove duplicates based on 'id'
const uniqueEmployees = Array.from(
  new Set(employees.map((employee) => employee.id))
).map((id) => employees.find((employee) => employee.id === id));

// Function to filter employees by department
function filterByDepartment(department) {
  return uniqueEmployees.filter((employee) => employee.department === department);
}

// Function to calculate bonus and total compensation
function calculateCompensation(employee) {
  let bonus = 0;

  // Apply department-specific bonus rules
  switch (employee.department) {
    case 'HR':
      bonus = bonusRules.HR(employee);
      break;
    case 'Engineering':
      bonus = bonusRules.Engineering(employee);
      break;
    case 'Sales':
      bonus = bonusRules.Sales(employee);
      break;
    default:
      bonus = (employee.bonusPercentage / 100) * employee.salary;
  }

  // Calculate total compensation
  employee.bonus = bonus;
  employee.totalCompensation = employee.salary + bonus;

  return employee;
}

// Function to generate the report for a specific department
function generateReport(department) {
  const filteredEmployees = filterByDepartment(department).map(calculateCompensation);

  // Group employees by department
  const report = {
    [department]: filteredEmployees.map(({ name, salary, bonus, totalCompensation }) => ({
      name,
      salary,
      bonus,
      totalCompensation,
    })),
  };

  return { report, updatedEmployees: filteredEmployees };
}

// Example: Generate report for the 'Engineering' department
const department = 'Engineering';
const { report, updatedEmployees } = generateReport(department);

console.log('Report:', report);
console.log('Updated Employees:', updatedEmployees);
