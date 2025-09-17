import { Button } from "react-native-paper";

const OutlinedButton = ({ icon, text, onPress, size }) => (
  <Button
    icon={icon}
    mode="outlined"
    onPress={onPress}
    style={{ width: size, marginHorizontal: "auto" }}
  >
    {text}
  </Button>
);

export default OutlinedButton;
