import { Divider, List } from "react-native-paper";
import OutlinedButton from "../components/OutlinedButton";
import { View, StyleSheet } from "react-native";

const ListIconItem = ({ title }) => (
  <List.Item
    title={title}
    right={(props) => (
      <View style={styles.container}>
        <OutlinedButton icon={"account-edit"} text={"Update"} />
        <OutlinedButton icon={"head-remove"} text={"Remove"} />
      </View>
    )}
  />
);

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
