import * as SQLite from "expo-sqlite";

let dbInstance = null;

// Function to get the single database instance
export const getDb = async () => {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync("payroll.db");
  }
  return dbInstance;
};

// ✅ Create tables
export const initDB = async () => {
  const db = await getDb();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      position TEXT,
      rate INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS adjustments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      employee_id INTEGER,
      date TEXT,
      add INTEGER DEFAULT 0,
      subtract INTEGER DEFAULT 0,
      day_off INTEGER DEFAULT 0,
      FOREIGN KEY (employee_id) REFERENCES employees(id)
    );
  `);
};

// ✅ Add Employee
export const addEmployee = async (name, rate) => {
  const db = await getDb();
  return await db.runAsync("INSERT INTO employees (name, rate) VALUES (?, ?)", [
    name,
    rate,
  ]);
};
//  Update Employee
export const updateEmployee = async (id, name, rate) => {
  const db = await getDb();
  const parsedRate = parseInt(rate, 10);
  if (isNaN(parsedRate)) {
    throw new Error("Rate must be a valid number");
  }
  return await db.runAsync(
    "UPDATE employees set name = ?, rate = ? WHERE id = ?",
    [name, parsedRate, id]
  );
};
// Delete Employee
export const deleteEmployee = async (id) => {
  const db = await getDb();
  return await db.runAsync("DELETE FROM employees WHERE id = ?", [id]);
};

// ✅ Add Adjustment
export const addAdjustment = async (
  employeeId,
  date,
  add,
  subtract,
  dayOff
) => {
  const db = await getDb();
  return await db.runAsync(
    `INSERT INTO adjustments (employee_id, date, add, subtract, day_off) 
     VALUES (?, ?, ?, ?, ?)`,
    [employeeId, date, add, subtract, dayOff]
  );
};
export const getAllEmployees = async () => {
  const db = await getDb();
  return await db.getAllAsync("SELECT * FROM employees");
};
export const getEmployee = async (id) => {
  const db = await getDb();
  return await db.getFirstAsync("SELECT * FROM employees WHERE id = ?", [id]);
};
// ✅ Mark Day Off (just a shortcut to addAdjustment with day_off = 1)
export const markDayOff = async (employeeId, date) => {
  const db = await getDb();
  return await db.runAsync(
    `INSERT INTO adjustments (employee_id, date, day_off) VALUES (?, ?, 1)`,
    [employeeId, date]
  );
};

// ✅ Get Weekly Payroll Summary
export const getWeeklyPayroll = async (employeeId, startDate, endDate) => {
  const db = await getDb();
  const result = await db.getAllAsync(
    `SELECT e.name, e.rate,
            SUM(a.add) as total_add,
            SUM(a.subtract) as total_subtract,
            SUM(a.day_off) as total_day_offs
     FROM employees e
     LEFT JOIN adjustments a ON e.id = a.employee_id
     WHERE e.id = ? AND a.date BETWEEN ? AND ?
     GROUP BY e.id`,
    [employeeId, startDate, endDate]
  );

  return result.length > 0 ? result[0] : null;
};
