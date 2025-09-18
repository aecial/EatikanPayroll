import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import DayForm from "../components/DayForm";
import { Button } from "react-native-paper";
import {
  getCurrentWeekDays,
  getDaysOfTheWeek,
  getCurrentWeekPeriod,
} from "../utils/weekLogic";
import { getEmployee } from "../database/dbHelpers";
const AdjustmentScreen = ({ route, navigation }) => {
  const weekDays = getCurrentWeekDays();
  const days = getDaysOfTheWeek();
  const { employeeId } = route.params;
  const [employee, setEmployee] = useState({});
  const fetchEmployee = async (employeeId) => {
    try {
      const data = await getEmployee(employeeId);
      console.log("Fetched employee:", data);
      if (data) {
        setEmployee(data);
      }
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
        <DayForm key={day} day={day} date={weekDays[idx]} />
      ))}
      <Text style={styles.totalText}>Running Total: ₱{employee.rate}</Text>
      <Button
        icon="content-save"
        mode="contained"
        buttonColor="green"
        style={{ marginTop: 16, width: "70%" }}
        onPress={() => console.log("Pressed Save")}
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
