import * as React from 'react'
import { Image, Modal, ScrollView, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { UserType } from "../../consts/types";
import Illu from '../../assets/images/illu.png'
import Close from '../../assets/images/close.png'
import Male from '../../assets/images/male.png'
import Female from '../../assets/images/female.png'
import Phone from '../../assets/images/phone.png'
import Email from '../../assets/images/mail.png'
import { Avatar } from "react-native-elements";

const styles = StyleSheet.create({
  image: {
    backgroundColor: '#FBF1DF',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 38,
    paddingHorizontal: 88,
  } as ViewStyle,
  container: {
    paddingHorizontal: 30,
  } as ViewStyle,
  headerText: {
    color: '#8F5F15',
    marginTop: 28,
    marginBottom: 21,
    fontSize: 32,
    fontWeight: '700',
  } as TextStyle,
  subheaderText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    color: '#000',
  } as TextStyle,
  gender: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 11.5,
    paddingLeft: 10,
    paddingRight: 16,
  } as ViewStyle,
  detailContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
  } as ViewStyle,
  detailSubcontainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FBF1DF',
    borderWidth: 1,
    borderColor: '#D6C9B5',
    borderRadius: 10,
    padding: 10,
    gap: 17,
  } as ViewStyle,
})

interface Props {
  isOpen: boolean
  onClose: () => void
  user: UserType
}

const UserInfoScreen:React.FC<Props> = ({isOpen, onClose, user}) => {

  console.log('user in modal', user);
  const pic = user.picture
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isOpen}
    >
      <ScrollView style={{marginBottom: 80}}>
        <Image source={Close} />
        <View style={styles.image}>
          <Image source={Illu} />
        </View>
        <View  style={styles.container}>
          <Text style={styles.headerText}>My Profile</Text>
          <View>
            <Text style={[styles.subheaderText, {marginBottom: 13}]}>Profile Picture</Text>
            <Avatar
              rounded
              source={{ uri: user.picture }}
              size="large"
            />
          </View>
          <View>
            <Text style={styles.subheaderText}>First Name</Text>
            <View style={styles.detailSubcontainer}>
              <Text style={{color: '#000'}}>{user.firstName}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.subheaderText}>Last Name</Text>
            <View style={styles.detailSubcontainer}>
              <Text style={{color: '#000'}}>{user.lastName}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.subheaderText}>Email</Text>
            <View style={styles.detailSubcontainer}>
              <Image source={Email} />
              <Text style={{color: '#000'}}>{user.email}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.subheaderText}>Phone</Text>
            <View style={styles.detailSubcontainer}>
              <Image source={Phone} />
              <Text style={{color: '#000'}}>{user.phone}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.subheaderText}>Gender</Text>
            <View style={styles.detailContainer}>
              <View style={[
                styles.gender,
                {backgroundColor: "#5385C0"},
                user.gender === 'male' ? {borderColor: '#000', borderWidth: 2} : {opacity: 0.33},
              ]}>
                <Image source={Male} />
                <Text>Male</Text>
              </View>
              <View style={[
                styles.gender,
                {backgroundColor: '#D856AC', marginLeft: 11},
                user.gender === 'female' ? {borderColor: '#000', borderWidth: 2} : {opacity: 0.33}
              ]}>
                <Image source={Female} />
                <Text>Female</Text>
              </View>
            </View>
          </View>
          <Text style={styles.subheaderText}>Location</Text>
        </View>
      </ScrollView>
    </Modal>
  )
}

export default UserInfoScreen
