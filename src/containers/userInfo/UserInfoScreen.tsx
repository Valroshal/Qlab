import * as React from 'react'
import { Image, Modal, StyleSheet, Text, View } from "react-native"


const styles = StyleSheet.create({

})

interface Props {
  isOpen: boolean
  onClose: () => void
}

const UserInfoScreen:React.FC<Props> = ({isOpen, onClose}) => {

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isOpen}
    >
      <View>
        <Text>Modal</Text>
        {/*<View style={styles.headerContainer}>*/}
        {/*  <Text style={styles.header}>{product?.name}</Text>*/}
        {/*  {product?.favorite === true ?*/}
        {/*    <Image source={Star} style={styles.image} />*/}
        {/*    : null*/}
        {/*  }*/}
        {/*</View>*/}
        {/*<Text style={styles.description}>{product?.description}</Text>*/}
        {/*<Text style={styles.price}>Price: {product?.price}</Text>*/}
        {/*<Text style={styles.quantity}>In stock: {product?.quantity} items</Text>*/}
      </View>
    </Modal>
  )
}

export default UserInfoScreen
