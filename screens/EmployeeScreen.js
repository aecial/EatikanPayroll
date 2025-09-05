import { View, Text, StyleSheet } from "react-native";
import { List } from "react-native-paper";
const EmployeeScreen = ({ navigation }) => {
  const employees = [
    { id: 1, name: "Bea", position: "Cook", rate: 350 },
    { id: 2, name: "Neggy", position: "Helper", rate: 250 },
  ];
  return (
    <View style={styles.container}>
      {employees.map((employee) => (
        <List.Item
          key={employee.id}
          title={employee.name}
          left={(props) => <List.Icon {...props} icon="account" />}
          onPress={() =>
            navigation.navigate("Adjustments", { employeeName: employee.name })
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
