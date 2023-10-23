import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import LoginScreen from './Login';
import axios from 'axios';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [loginVisible,setloginVisible]= useState(true);
  const handleRegister = async () => {
    try {
        
        const response = await axios.post('http://192.168.111.25:3001/register', {
          email: email,
          password: password,
        });
  
        if (response.status === 200) {
          
         setIsRegistered(true)
        } else {
          // Login failed, show an error message
          alert('Registeration failed. Please check your credentials.');
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
            <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
      <Button title='login' onPress={() => setloginVisible(false)}/>
      {isRegistered && <Text style={styles.successMessage}>Registration successful!</Text>}
            </View>
         ):(<LoginScreen/>)}
      
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
  successMessage: {
    color: 'green',
    marginTop: 10,
  },
});

export default RegisterScreen;
