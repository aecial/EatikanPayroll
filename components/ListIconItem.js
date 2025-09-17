import { Divider, List } from "react-native-paper";
import OutlinedButton from "../components/OutlinedButton";
import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { Modal, Portal, Button, Text, TextInput } from "react-native-paper";
import FilledButton from "./FilledButton";
import { updateEmployee, deleteEmployee } from "../database/dbHelpers";
const ListIconItem = ({ id, title, rate, fetchEmployees }) => {
  const [empName, setEmpName] = useState(title);
  const [empRate, setEmpRate] = useState(rate.toString());
  const [updateVisible, setUpdateVisible] = useState(false);
  const showUpdateModal = () => setUpdateVisible(true);
  const hideUpdateModal = () => setUpdateVisible(false);
  const [removeVisible, setRemoveVisible] = useState(false);
  const showRemoveModal = () => setRemoveVisible(true);
  const hideRemoveModal = () => setRemoveVisible(false);
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
  const handleUpdate = async () => {
    try {
      console.log("Pressed Update");
      await updateEmployee(id, empName, empRate);
      console.log("Employee successfully updated");
      hideUpdateModal();
      fetchEmployees();
    } catch (error) {
      console.error("Failed to update employee:", error);
    }
  };
  const handleRemove = async () => {
    try {
      console.log("Pressed Remove");
      await deleteEmployee(id);
      console.log("Employee successfully removed");
      hideRemoveModal();
      fetchEmployees();
    } catch (error) {
      console.error("Failed to remove employee:", error);
    }
  };

  return (
    <List.Item
      title={title}
      right={() => (
        <View style={styles.container}>
          <Portal>
            <Modal
              visible={updateVisible}
              onDismiss={hideUpdateModal}
              contentContainerStyle={containerStyle}
            >
              <Text variant="headlineMedium" style={{ textAlign: "center" }}>
                Update Employee #{id}
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
              <OutlinedButton
                icon={"cancel"}
                text={"Cancel"}
                size={"90%"}
                onPress={() => hideUpdateModal()}
              />
              <FilledButton
                icon={"content-save"}
                text={"Update"}
                size={"90%"}
                onPress={() => handleUpdate()}
              />
            </Modal>
          </Portal>
          <OutlinedButton
            icon={"account-edit"}
            text={"Update"}
            onPress={showUpdateModal}
          />
          <Portal>
            <Modal
              visible={removeVisible}
              onDismiss={hideRemoveModal}
              contentContainerStyle={containerStyle}
            >
              <Text variant="headlineMedium" style={{ textAlign: "center" }}>
                Delete Employee #{id} {title}?
              </Text>
              <OutlinedButton
                icon={"cancel"}
                text={"Cancel"}
                size={"90%"}
                onPress={() => hideRemoveModal()}
              />
              <FilledButton
                icon={"account-remove"}
                text={"Delete"}
                size={"90%"}
                onPress={() => handleRemove()}
              />
            </Modal>
          </Portal>
          <OutlinedButton
            icon={"head-remove"}
            text={"Remove"}
            onPress={showRemoveModal}
          />
        </View>
      )}
    />
  );
};

export default ListIconItem;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 1,
    flexWrap: "wrap",
    maxWidth: "100%",
  },
});
