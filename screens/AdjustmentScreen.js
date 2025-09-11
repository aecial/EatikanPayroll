import { View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";
import DayForm from "../components/DayForm";
import { Button } from "react-native-paper";
import {
  getCurrentWeekDays,
  getDaysOfTheWeek,
  getCurrentWeekPeriod,
} from "../utils/weekLogic";
const AdjustmentScreen = ({ route, navigation }) => {
  const weekDays = getCurrentWeekDays();
  const days = getDaysOfTheWeek();
  const { employeeName } = route.params;
  useEffect(() => {
    navigation.setOptions({ title: employeeName });
  }, [navigation, employeeName]);
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
      <Text style={styles.totalText}>Running Total: ₱1,250</Text>
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
