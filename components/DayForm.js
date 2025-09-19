import { View, StyleSheet, TextInput } from "react-native";
import { Text } from "react-native-paper";
import { IconButton, MD3Colors } from "react-native-paper";
import { useState } from "react";
import { getTodayDate } from "../utils/weekLogic";

const DayForm = ({ day, date, adjustment, onChange }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.tableRow}>
      {getTodayDate() === date ? (
        <Text style={[styles.tableCell, { fontWeight: "bold", color: "red" }]}>
          {day}
        </Text>
      ) : (
        <Text style={styles.tableCell}>{day}</Text>
      )}

      <TextInput
        style={[styles.tableCell, styles.inputContainer]}
        keyboardType="numeric"
        value={String(adjustment.add || "")}
        onChangeText={(val) => onChange(date, "add", parseInt(val || 0))}
        editable={adjustment.dayOff !== 1}
      />

      <TextInput
        style={[styles.tableCell, styles.inputContainer]}
        keyboardType="numeric"
        value={String(adjustment.subtract || "")}
        onChangeText={(val) => onChange(date, "subtract", parseInt(val || 0))}
        editable={adjustment.dayOff !== 1}
      />

      <View style={{ flex: 1, alignItems: "center" }}>
        <IconButton
          icon="account-off"
          iconColor={adjustment.dayOff === 1 ? MD3Colors.error50 : "green"}
          size={20}
          onPress={() => {
            if (adjustment.dayOff === 1) {
              // turn OFF day off
              onChange(date, "dayOff", 0);
            } else {
              // turn ON day off → also reset add & subtract
              onChange(date, "dayOff", 1);
              onChange(date, "add", 0);
              onChange(date, "subtract", 0);
            }
          }}
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
