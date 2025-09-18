import { View, Text, StyleSheet } from "react-native";
import { List } from "react-native-paper";
import { getAllEmployees } from "../database/dbHelpers";
import { useEffect, useState } from "react";
const EmployeeScreen = ({ navigation }) => {
  useEffect(() => {
    fetchEmployees();
  }, []);
  const [employees, setEmployees] = useState([]);
  const fetchEmployees = async () => {
    const data = await getAllEmployees();
    setEmployees(data);
  };

  return (
    <View style={styles.container}>
      {employees.map((employee) => (
        <List.Item
          key={employee.id}
          title={employee.name}
          left={(props) => <List.Icon {...props} icon="account" />}
          onPress={() =>
            navigation.navigate("Adjustments", { employeeId: employee.id })
          }
        />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 1,
    flexWrap: "wrap",
    maxWidth: "100%",
  },
});
export default EmployeeScreen;
