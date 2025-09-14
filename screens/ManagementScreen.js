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
import { useState } from "react";
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
  const [visible, setVisible] = useState(false);
  const [empName, setEmpName] = useState("");
  const [empRate, setEmpRate] = useState("");
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
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
  function addEmployee() {
    setEmpName("");
    setEmpRate("");
    hideModal();
  }
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={{ textAlign: "center" }}>
          Employees
        </Text>
        <ListIconItem title={employees[0].name} />
        <Divider theme={{ colors: { primary: "green" } }} />
        <ListIconItem title={employees[1].name} />

        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
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
              onPress={() => addEmployee()}
            />
          </Modal>
        </Portal>
        <FilledButton
          icon={"account-plus"}
          text={"Add Employee"}
          size={"90%"}
          onPress={showModal}
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
