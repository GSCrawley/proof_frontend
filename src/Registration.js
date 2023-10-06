import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

function RegistrationScreen({ route, navigation }) {
    const [firstNameInput, setFirstNameInput] = useState('');
    const [lastNameInput, setLastNameInput] = useState('');
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [DOBInput, setDOBInput] = useState('');
    const [locationInput, setLocationInput] = useState('')
    const { url } = route.params;
  
    const handleRegistration = async () => {
        const firstName = firstNameInput;
        const lastName = lastNameInput;
        const username = usernameInput;
        const password = passwordInput;
        const email = emailInput;
        const DOB = DOBInput;
        const location = locationInput;
        const { url } = route.params;


        const response = await axios.post(`${url}/register`,{
            first_name: firstName,
            last_name: lastName,
            username: username,
            password: password,
            email: email,
            DOB: DOB,
            location: location,
        },{
            headers: {
                'Content-Type': 'application/json',
            }
        })
        console.log(response.data)
        navigation.navigate('Login', {url});
    };
    console.log(url)
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Registration Screen</Text>
        <Text>{url}</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstNameInput}
          onChangeText={setFirstNameInput}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastNameInput}
          onChangeText={setLastNameInput}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={usernameInput}
          onChangeText={setUsernameInput}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={passwordInput}
          onChangeText={setPasswordInput}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={emailInput}
          onChangeText={setEmailInput}
          // secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="DOB"
          value={DOBInput}
          onChangeText={setDOBInput}
          // secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={locationInput}
          onChangeText={setLocationInput}
          // secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegistration}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }

  export default RegistrationScreen

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: '#c4c4c4',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: '#1976d2',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    link: {
      color: '#1976d2',
      fontSize: 16,
    },
  });