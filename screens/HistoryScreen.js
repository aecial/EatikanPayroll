import { createStackNavigator } from "@react-navigation/stack";
import HistoryList from "../components/HistoryList";
import HistoryDetails from "../components/HistoryDetails";
const Stack = createStackNavigator();
const HistoryScreen = () => {
  return (
    <Stack.Navigator initialRouteName="HistoryList">
      <Stack.Screen
        name="HistoryList"
        component={HistoryList}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="HistoryDetails" component={HistoryDetails} />
    </Stack.Navigator>
  );
};

export default HistoryScreen;
