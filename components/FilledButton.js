import { Button } from "react-native-paper";

const FilledButton = ({ icon, text, size, onPress }) => (
  <Button
    style={{ width: size, marginHorizontal: "auto" }}
    icon={icon}
    mode="contained"
    onPress={onPress}
  >
    {text}
  </Button>
);

export default FilledButton;
