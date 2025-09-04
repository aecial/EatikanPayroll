import { Button } from "react-native-paper";

const FilledButton = ({ icon, text, size }) => (
  <Button
    style={{ width: size, marginHorizontal: "auto" }}
    icon={icon}
    mode="contained"
    onPress={() => console.log("Pressed")}
  >
    {text}
  </Button>
);

export default FilledButton;
