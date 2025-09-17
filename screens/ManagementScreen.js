import { View, StyleSheet } from "react-native";
import Divider from "react-native-paper/src/components/Divider";
import ListIconItem from "../components/ListIconItem";
import FilledButton from "../components/FilledButton";
import {
  Modal,
  Portal,
  Text,
  PaperProvider,
  TextInput,
} from "react-native-paper";
import { useState, useEffect } from "react";
import { getAllEmployees, addEmployee } from "../database/dbHelpers";
const ManagementScreen = () => {
  const [employees, setEmployees] = useState([]);
  const fetchEmployees = async () => {
    const data = await getAllEmployees();
    setEmployees(data);
  };
  useEffect(() => {
    fetchEmployees();
    console.log(employees);
  }, []);
  // const employees = [
  //   { id: 1, name: "Bea", position: "Cook", rate: 350 },
  //   { id: 2, name: "Neggy", position: "Helper", rate: 250 },
  // ];
  const [Addvisible, setAddVisible] = useState(false);
  const [empName, setEmpName] = useState("");
  const [empRate, setEmpRate] = useState("");
  const showAddModal = () => setAddVisible(true);
  const hideAddModal = () => setAddVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    width: "90%",
    borderRadius: 8,
    padding: 20,
    height: "50%",
    flexDirection: "column",
    gap: 8,
    marginHorizontal: "auto",
  };
  async function addEmployeeHandler() {
    try {
      await addEmployee(empName, empRate);
      console.log("Employee successfully added");
      await fetchEmployees();
      setEmpName("");
      setEmpRate("");
      hideAddModal();
    } catch (error) {
      console.error("Failed to add employee:", error);
    }
  }
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={{ textAlign: "center" }}>
          {employees.length} Employees
        </Text>
        {employees.map((emp) => (
          <View key={emp.id}>
            <ListIconItem
              id={emp.id}
              title={emp.name}
              rate={emp.rate}
              fetchEmployees={fetchEmployees}
            />
            <Divider theme={{ colors: { primary: "green" } }} />
          </View>
        ))}

        <Portal>
          <Modal
            visible={Addvisible}
            onDismiss={hideAddModal}
            contentContainerStyle={containerStyle}
          >
            <Text variant="headlineSmall" style={{ textAlign: "center" }}>
              Add Employee
            </Text>
            <TextInput
              label="Employee Name"
              value={empName}
              onChangeText={(text) => setEmpName(text)}
            />
            <TextInput
              label="Employee Rate"
              value={empRate}
              onChangeText={(text) => setEmpRate(text)}
              keyboardType="numeric"
              inputMode="numeric"
            />
            <FilledButton
              icon={"account-plus"}
              text={"Add Employee"}
              size={"90%"}
              onPress={() => addEmployeeHandler()}
            />
          </Modal>
        </Portal>
        <FilledButton
          icon={"account-plus"}
          text={"Add Employee"}
          size={"90%"}
          onPress={showAddModal}
        />
      </View>
    </PaperProvider>
  );
};

export default ManagementScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
});
