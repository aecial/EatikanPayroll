import { View, StyleSheet, TextInput } from "react-native";
import { Text } from "react-native-paper";
import { IconButton, MD3Colors } from "react-native-paper";
import { useState } from "react";
import { getTodayDate } from "../utils/weekLogic";

const DayForm = ({ day, date }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.tableRow}>
      {getTodayDate() === date ? (
        <Text
          id={date}
          style={[styles.tableCell, { fontWeight: "bold", color: "red" }]}
        >
          {day}
        </Text>
      ) : (
        <Text id={date} style={styles.tableCell}>
          {day}
        </Text>
      )}
      <TextInput style={[styles.tableCell, styles.inputContainer]} />
      <TextInput style={[styles.tableCell, styles.inputContainer]} />
      <View style={(styles.tableCell, { alignItems: "center" })}>
        <IconButton
          icon="account-off"
          iconColor={MD3Colors.error50}
          size={20}
          style={{ selfAlign: "center" }}
          onPress={() => console.log("Pressed")}
        />
      </View>
    </View>
  );
};

export default DayForm;
const styles = StyleSheet.create({
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#bbb",
    gap: 2,
    backgroundColor: "#f5f5f5",
  },
  tableCell: {
    flex: 1,
    padding: 0,
    textAlign: "center",
  },
  inputContainer: {
    height: 25,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 4,
    padding: 4,
    textAlign: "center",
    alignSelf: "center",
  },
});
