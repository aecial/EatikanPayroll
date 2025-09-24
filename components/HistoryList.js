import { View, StyleSheet, FlatList } from "react-native";
import { Text } from "react-native-paper";
import { useState, useEffect } from "react";
import HistoryRow from "../components/HistoryRow";
import { getWeeklyPayrollHistory } from "../database/dbHelpers";

const HistoryList = () => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    fetchHistory();
  }, []);
  const fetchHistory = async () => {
    const db = await getWeeklyPayrollHistory();
    setHistory(db);
    console.log("History Data:", db);
  };
  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.headlineText}>
        History
      </Text>
      <FlatList
        data={history}
        renderItem={({ item }) => (
          <HistoryRow
            name={item.employee_name}
            netPay={item.net_pay}
            weekStart={item.week_start}
            weekEnd={item.week_end}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default HistoryList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headlineText: {
    textAlign: "center",
    marginBottom: 20,
  },
});
