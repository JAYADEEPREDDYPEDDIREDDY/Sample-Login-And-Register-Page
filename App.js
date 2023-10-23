import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import LoginScreen from './Login';
import RegisterScreen from './Register';


export default function App() {
  const [loginVisible, setLoginVisible] = React.useState(false);
  const [registerVisible, setRegisterVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      {loginVisible ? (
        <LoginScreen />
      ) : registerVisible ? (
        <RegisterScreen />
      ) : (
        <View>
          <Button title="Login" onPress={() => setLoginVisible(true)} />
          <Button title="Register" onPress={() => setRegisterVisible(true)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
