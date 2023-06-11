import * as React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import TableWrapper from "../containers/table/TableWrapper";


const Stack = createStackNavigator()

const StackNavigator = () => {
  return(
    <Stack.Navigator initialRouteName={'TableWrapper'}>
      <Stack.Screen name='TableWrapper' component={TableWrapper} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

export default StackNavigator
