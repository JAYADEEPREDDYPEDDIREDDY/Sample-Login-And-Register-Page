import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import axios from 'axios';
import RegisterScreen from './Register';
const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginVisible,setloginVisible]= useState(true);

  const handleLogin = async () => {
    try {
      // Replace 'your-api-endpoint' with the actual URL of your login API
      const response = await axios.post('http://192.168.111.25:3001/login', {
        email: username,
        password: password,
      });

      if (response.status === 200) {
        // Login successful, do something (e.g., set user state)
        setLoggedIn(true);
      } else {
        // Login failed, show an error message
         setLoggedIn(true);
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };


  return (
    <View style={styles.container}>
        {loginVisible ? (
            <View>
              <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title='register' onPress={() => setloginVisible(false)}/>
      {loggedIn && <Text>You are logged in!</Text>}
            </View>
        ):(
            <RegisterScreen/>
        )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default LoginScreen;