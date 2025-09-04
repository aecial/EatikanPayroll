import { Button } from "react-native-paper";

const OutlinedButton = ({ icon, text }) => (
  <Button icon={icon} mode="outlined" onPress={() => console.log("Pressed")}>
    {text}
  </Button>
);

export default OutlinedButton;
