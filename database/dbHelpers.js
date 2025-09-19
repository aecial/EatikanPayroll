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
      add_amount INTEGER DEFAULT 0,
      subtract_amount INTEGER DEFAULT 0,
      day_off INTEGER DEFAULT 0,
      FOREIGN KEY (employee_id) REFERENCES employees(id)
    );

    -- ✅ Make sure each employee can only have one adjustment per day
    CREATE UNIQUE INDEX IF NOT EXISTS idx_employee_date 
    ON adjustments(employee_id, date);
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
  addAmount,
  subtractAmount,
  dayOff
) => {
  const db = await getDb();
  return await db.runAsync(
    `INSERT INTO adjustments (employee_id, date, add_amount, subtract_amount, day_off) 
     VALUES (?, ?, ?, ?, ?)`,
    [employeeId, date, addAmount, subtractAmount, dayOff]
  );
};

// ✅ Upsert Adjustment
export const upsertAdjustment = async (
  employeeId,
  date,
  addAmount,
  subtractAmount,
  dayOff
) => {
  const db = await getDb();
  return await db.runAsync(
    `INSERT INTO adjustments (employee_id, date, add_amount, subtract_amount, day_off)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(employee_id, date) DO UPDATE SET
       add_amount = excluded.add_amount,
       subtract_amount = excluded.subtract_amount,
       day_off = excluded.day_off`,
    [employeeId, date, addAmount, subtractAmount, dayOff]
  );
};

// ✅ Save Weekly Adjustments
export const saveWeeklyAdjustments = async (employeeId, adjustmentsArray) => {
  const db = await getDb();

  try {
    await db.execAsync("BEGIN TRANSACTION");
    for (const adj of adjustmentsArray) {
      await db.runAsync(
        `INSERT INTO adjustments (employee_id, date, add_amount, subtract_amount, day_off)
         VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(employee_id, date) DO UPDATE SET
           add_amount = excluded.add_amount,
           subtract_amount = excluded.subtract_amount,
           day_off = excluded.day_off`,
        [employeeId, adj.date, adj.add, adj.subtract, adj.dayOff]
      );
    }
    await db.execAsync("COMMIT");
    return true;
  } catch (err) {
    await db.execAsync("ROLLBACK");
    throw err;
  }
};
export const getAllAdjustments = async (employeeId) => {
  const db = await getDb();
  return await db.getAllAsync(
    "SELECT * FROM adjustments WHERE employee_id = ?",
    [employeeId]
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
            SUM(a.add_amount) as total_add,
            SUM(a.subtract_amount) as total_subtract,
            SUM(a.day_off) as total_day_offs
     FROM employees e
     LEFT JOIN adjustments a ON e.id = a.employee_id
     WHERE e.id = ? AND a.date BETWEEN ? AND ?
     GROUP BY e.id`,
    [employeeId, startDate, endDate]
  );

  return result.length > 0 ? result[0] : null;
};
