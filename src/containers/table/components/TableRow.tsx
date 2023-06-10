import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle } from "react-native";
import { UserType } from "../../../consts/types";
import React, { useRef, useState } from "react";
import UserInfoScreen from "../../userInfo/UserInfoScreen";
import RowEdit from "./RowEdit";
import Woman from '../../../assets/images/woman.png'

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 10
  } as ViewStyle,
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  } as ViewStyle,
})

interface Props {
  user: UserType
  onUpdateUser: (updatedUser: UserType) => void
  onDeleteUser: (id: string) => void

}
const TableRow:React.FC<Props> = ({user, onUpdateUser, onDeleteUser}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);

  const handleDeletePress = () => {
    onDeleteUser(user.uuid)
  }
  const handleUpdatePress = () => {
    const updatedUser: UserType = {
      ...user,
      firstName,
      lastName,
      phone,
      email,
    };

    onUpdateUser(updatedUser);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }

  return (

    <View
      style={styles.container}
      key={user.uuid}
    >
      <TouchableOpacity onPress={toggleModal}>
        <Text>Serial number {user.uuid}</Text>
      </TouchableOpacity>

      <RowEdit
        value={firstName}
        valueName={'First Name'}
        onSetValue={(e: string) => setFirstName(e)}
      />

      <RowEdit
        value={lastName}
        valueName={'Last Name'}
        onSetValue={(e: string) => setLastName(e)}
      />

      <RowEdit
        value={phone}
        valueName={'Phone'}
        onSetValue={(e: string) => setLastName(e)}
      />

      <RowEdit
        value={email}
        valueName={'Email'}
        onSetValue={(e: string) => setLastName(e)}
      />

      <View>
        <Text>Gender</Text>
        <Image source={}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Update" onPress={handleUpdatePress} />
        <Button title="Delete" onPress={handleDeletePress} />
      </View>
      <UserInfoScreen
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
      ></UserInfoScreen>
    </View>
  )
}

export default TableRow
