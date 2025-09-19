import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import DayForm from "../components/DayForm";
import { Button } from "react-native-paper";
import {
  getCurrentWeekDays,
  getDaysOfTheWeek,
  getCurrentWeekPeriod,
} from "../utils/weekLogic";
import {
  getEmployee,
  saveWeeklyAdjustments,
  getAllAdjustments,
} from "../database/dbHelpers";
const AdjustmentScreen = ({ route, navigation }) => {
  const weekDays = getCurrentWeekDays();
  const days = getDaysOfTheWeek();
  const { employeeId } = route.params;
  const [employee, setEmployee] = useState({});
  const [adjustments, setAdjustments] = useState(
    weekDays.map((date, idx) => ({
      date,
      day: days[idx],
      add: 0,
      subtract: 0,
      dayOff: 0,
    }))
  );
  const updateAdjustment = (date, field, value) => {
    setAdjustments((prev) =>
      prev.map((adj) => (adj.date === date ? { ...adj, [field]: value } : adj))
    );
  };
  const calculateRunningTotal = () => {
    if (!employee?.rate) return 0;

    const basePay = employee.rate * 7; // base for whole week
    const totalAdd = adjustments.reduce((sum, a) => sum + (a.add || 0), 0);
    const totalSubtract = adjustments.reduce(
      (sum, a) => sum + (a.subtract || 0),
      0
    );
    const totalDayOffs = adjustments.reduce(
      (sum, a) => sum + (a.dayOff ? 1 : 0),
      0
    );

    // deduct 1 day's rate per day off
    const dayOffDeduction = totalDayOffs * employee.rate;

    return basePay + totalAdd - totalSubtract - dayOffDeduction;
  };
  const fetchEmployee = async (employeeId) => {
    try {
      const data = await getEmployee(employeeId);
      console.log("Fetched employee:", data);
      if (data) {
        setEmployee(data);
      }
      const adjustmentsData = await getAllAdjustments(employeeId);
      console.log("Fetched adjustments:", adjustmentsData);

      const merged = weekDays.map((date, idx) => {
        const found = adjustmentsData.find((a) => a.date === date);
        return {
          date,
          day: days[idx],
          add: found ? found.add_amount : 0,
          subtract: found ? found.subtract_amount : 0,
          dayOff: found ? found.day_off : 0,
        };
      });

      setAdjustments(merged);
    } catch (err) {
      console.error("Error fetching employee:", err);
    }
  };

  useEffect(() => {
    fetchEmployee(employeeId);
  }, [employeeId]);

  useEffect(() => {
    if (employee?.name) {
      navigation.setOptions({ title: employee.name });
    }
  }, [employee?.name, navigation]);

  return (
    <View style={styles.tableContainer}>
      <Text>Week Period:</Text>
      <Text style={{ fontWeight: "bold", marginBottom: 16 }}>
        {getCurrentWeekPeriod()[0]} - {getCurrentWeekPeriod()[1]}
      </Text>
      {/* Table Header */}
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, styles.headerCell]}>Day</Text>
        <Text style={[styles.tableCell, styles.headerCell]}>Add</Text>
        <Text style={[styles.tableCell, styles.headerCell]}>Subtract</Text>
        <Text style={[styles.tableCell, styles.headerCell]}></Text>
      </View>
      {/* Table Rows */}
      {days.map((day, idx) => (
        <DayForm
          key={day}
          day={day}
          date={weekDays[idx]}
          adjustment={adjustments[idx]}
          onChange={updateAdjustment}
        />
      ))}
      <Text style={styles.totalText}>
        Running Total: ₱{calculateRunningTotal()}
      </Text>
      <Button
        icon="content-save"
        mode="contained"
        buttonColor="green"
        style={{ marginTop: 16, width: "70%" }}
        onPress={async () => {
          try {
            await saveWeeklyAdjustments(employeeId, adjustments);
            alert("Adjustments saved!");
            navigation.goBack();
          } catch (err) {
            console.error("Error saving:", err);
            alert("Failed to save adjustments.");
          }
        }}
      >
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    flex: 1,
    maxWidth: "100%",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#e3e3e3",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#bbb",
    backgroundColor: "#f5f5f5",
  },
  tableCell: {
    flex: 1,
    padding: 8,
    textAlign: "center",
  },
  headerCell: {
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#723ac0ff",
  },
  totalText: {
    textAlign: "left",
    fontWeight: "bold",
    marginTop: 16,
  },
});

export default AdjustmentScreen;
