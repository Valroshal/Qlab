import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle } from "react-native"
import { TypeUser } from "../../../consts/types"
import React, { useRef, useState } from "react"
import UserInfoScreen from "../../userInfo/UserInfoScreen"
import RowEdit from "./RowEdit"
import Woman from '../../../assets/images/woman.png'
import Man from '../../../assets/images/man.png'

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    margin: 10
  } as ViewStyle,
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5
  } as ViewStyle,
  genderContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center'
  } as ViewStyle,

})

interface Props {
  user: TypeUser
  onUpdateUser: (updatedUser: TypeUser) => void
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
    const updatedUser: TypeUser = {
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

      <View style={styles.genderContainer}>
        <Text>Gender</Text>
        <Image source={ user.gender === 'female' ? Woman: Man} style={{width: 30, height: 30}} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Update" onPress={handleUpdatePress} />
        <Button title="Delete" onPress={handleDeletePress} />
      </View>
      <UserInfoScreen
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        user={user}
      ></UserInfoScreen>
    </View>
  )
}

export default TableRow
