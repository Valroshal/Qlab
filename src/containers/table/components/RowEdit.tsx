import { StyleSheet, Text, TextInput, TouchableOpacity, ViewStyle } from "react-native";
import { useRef, useState } from "react";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    //flexDirection: "row",
    padding: 2,
  } as ViewStyle,
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 40,
  } as ViewStyle,
})

interface Props {
  value: any
  valueName: string
  onSetValue: (val: string) => void
}
const RowEdit: React.FC<Props> = ({valueName, value, onSetValue}) => {
  const [editing, setEditing] = useState(false);
  const [clicks, setClicks] = useState(0);
  const doubleClickTimer = useRef<any>(null);
  const handlePress = () => {
    setClicks(prevClicks => prevClicks + 1);

    if (clicks === 0) {
      // Start a timer to wait for the second click
      doubleClickTimer.current = setTimeout(() => {
        // Single click action
        console.log('Single click');
        setClicks(0);
      }, 300); // Adjust the duration as needed
    } else if (clicks === 1) {
      // Double click action
      console.log('Double click');
      setEditing(true)
      clearTimeout(doubleClickTimer.current!);
      setClicks(0);
    }
  };

  return(
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text>{valueName}:</Text>
      {editing ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onSetValue}
          onBlur={() => setEditing(false)}
        />
      ) : (
        <Text>{value}</Text>
      )}
    </TouchableOpacity>
  )
}

export default RowEdit
