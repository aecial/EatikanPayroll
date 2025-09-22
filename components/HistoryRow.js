import { View } from "react-native";
import React from "react";
import { List, Text } from "react-native-paper";
import dayjs from "dayjs";
export default function HistoryRow({ name, netPay, weekStart, weekEnd }) {
  const formattedNetPay = new Intl.NumberFormat("en-US").format(netPay);
  return (
    <View>
      <List.Item
        title={name}
        description={`Net Pay: ${formattedNetPay}`}
        left={(props) => <List.Icon {...props} icon="cash" />}
        right={(props) => (
          <Text variant="bodySmall" style={{ opacity: 0.6 }}>
            {`${dayjs(weekStart).format("MMM D")} - ${dayjs(weekEnd).format(
              "MMM D"
            )}`}
          </Text>
        )}
      />
    </View>
  );
}
