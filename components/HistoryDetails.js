import { View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";
const HistoryDetails = ({ route, navigation }) => {
  const { employeeId, name, weekKey, formattedDate } = route.params;
  useEffect(() => {
    if (employeeId) {
      navigation.setOptions({
        title: name,
        headerRight: () => (
          <View style={styles.headerRightContainer}>
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>
        ),
      });
    }
  }, [employeeId, navigation]);

  return (
    <View>
      <Text>Employee ID: {employeeId}</Text>
      <Text>Week Key: {weekKey}</Text>
      <Text>Week: {formattedDate}</Text>
    </View>
  );
};

export default HistoryDetails;
const styles = StyleSheet.create({
  headerRightContainer: {
    // Add some padding to move the date slightly away from the edge
    paddingRight: 15,
  },
  dateText: {
    fontSize: 14,
    color: "gray", // Use a slightly subdued color
  },
});
