import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme, View
} from "react-native"
import StackNavigator from './src/navigation/StackNavigator'
import { SafeAreaProvider } from "react-native-safe-area-context"

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <SafeAreaProvider style={{backgroundColor: '#fff'}}>
      <NavigationContainer>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
export default App
