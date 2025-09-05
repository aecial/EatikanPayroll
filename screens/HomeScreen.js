import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import EmployeeScreen from "./EmployeeScreen";
import AdjustmentScreen from "./AdjustmentScreen";
const Stack = createStackNavigator();
const HomeScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Employees">
      <Stack.Screen name="Employees" component={EmployeeScreen} />
      <Stack.Screen name="Adjustments" component={AdjustmentScreen} />
    </Stack.Navigator>
  );
};

export default HomeScreen;
