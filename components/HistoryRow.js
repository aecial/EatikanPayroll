import { View } from "react-native";
import React from "react";
import { List, Text } from "react-native-paper";
import dayjs from "dayjs";
export default function HistoryRow({
  employeeId,
  name,
  netPay,
  weekKey,
  weekStart,
  weekEnd,
  navigation,
}) {
  const formattedNetPay = new Intl.NumberFormat("en-US").format(netPay);
  const formattedDate = `${dayjs(weekStart).format("MMM D")} - ${dayjs(
    weekEnd
  ).format("MMM D")}`;
  return (
    <View>
      <List.Item
        title={name}
        description={`Net Pay: ${formattedNetPay}`}
        left={(props) => <List.Icon {...props} icon="cash" />}
        right={(props) => (
          <Text variant="bodySmall" style={{ opacity: 0.6 }}>
            {formattedDate}
          </Text>
        )}
        onPress={() => {
          console.log("Pressed History Row:", {
            employeeId,
            weekKey,
          });
          navigation.navigate("HistoryDetails", {
            employeeId,
            name,
            weekKey,
            formattedDate,
          });
        }}
      />
    </View>
  );
}
