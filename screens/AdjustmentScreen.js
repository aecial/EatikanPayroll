import { View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";
const AdjustmentScreen = ({ route, navigation }) => {
  const { employeeName } = route.params;
  useEffect(() => {
    navigation.setOptions({ title: employeeName });
  }, [navigation, employeeName]);
  return (
    <View style={styles.container}>
      <Text>AdjustmentScreen</Text>
      <Text>Employee Name: {employeeName}</Text>
    </View>
  );
};

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

export default AdjustmentScreen;
