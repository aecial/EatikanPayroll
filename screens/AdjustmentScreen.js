import { View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";
import DayForm from "../components/DayForm";
import { Button } from "react-native-paper";
const AdjustmentScreen = ({ route, navigation }) => {
  const { employeeName } = route.params;
  useEffect(() => {
    navigation.setOptions({ title: employeeName });
  }, [navigation, employeeName]);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return (
    <View style={styles.tableContainer}>
      {/* Table Header */}
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, styles.headerCell]}>Day</Text>
        <Text style={[styles.tableCell, styles.headerCell]}>Add</Text>
        <Text style={[styles.tableCell, styles.headerCell]}>Subtract</Text>
        <Text style={[styles.tableCell, styles.headerCell]}></Text>
      </View>
      {/* Table Rows */}
      {days.map((day) => (
        <DayForm key={day} day={day} />
      ))}
      <Button
        icon="content-save"
        mode="contained"
        buttonColor="green"
        style={{ marginTop: 16, width: "70%" }}
        onPress={() => console.log("Pressed")}
      >
        Press me
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
    backgroundColor: "#d1d1d1",
  },
});

export default AdjustmentScreen;
