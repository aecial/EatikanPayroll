import { View, StyleSheet } from "react-native";
import Divider from "react-native-paper/src/components/Divider";
import ListIconItem from "../components/ListIconItem";
import { Text } from "react-native-paper";
import FilledButton from "../components/FilledButton";
const ManagementScreen = () => {
  const data = {
    id: 1,
    name: "Bea",
    position: "Cook",
    rate: 350,
    id: 2,
    name: "Neggy",
    position: "Helper",
    rate: 250,
  };

  const employees = [
    { id: 1, name: "Bea", position: "Cook", rate: 350 },
    { id: 2, name: "Neggy", position: "Helper", rate: 250 },
  ];

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={{ textAlign: "center" }}>
        Employees
      </Text>
      <ListIconItem title={employees[0].name} />
      <Divider theme={{ colors: { primary: "green" } }} />
      <ListIconItem title={employees[1].name} />

      <FilledButton icon={"account-plus"} text={"Add Employee"} size={"90%"} />
    </View>
  );
};

export default ManagementScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
});
