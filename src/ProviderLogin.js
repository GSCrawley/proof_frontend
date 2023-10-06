import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProviderLoginScreen({ route, navigation }) {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    var { url } = route.params;
    var connectionAttempts = 0;
    const handleLogin = async () => {
        try{
            const response = await axios.post(`${url}/provider-login`,{
            // const response = await axios.post(`http://localhost:6000/login`,{
                email: emailInput,
                password: passwordInput,
            });
            const token = response.data.access_token;
            navigation.navigate('ProviderProfile', {token, url});

          } catch (error) {
            if (error.response) {
              // Invalid login error (server responded with an error status code)
              const statusCode = error.response.status;
              if (statusCode === 401) {
                Alert.alert('Error', 'Invalid email or password');
              } else {
                Alert.alert('Error', 'An error occurred during login.');
              }
            } else if (error.request && connectionAttempts <= 5) {
              // Network error (request was made but no response received)
              const fetchData = async () => {
                const result = await axios.get('http://localhost:6000/');
                url = result.data.url;
                connectionAttempts = connectionAttempts + 1
                handleLogin()
              };
              fetchData();
              // console.error('Network error:', error.request);
              // Alert.alert('Error', 'Network error. Please check your connection.');
            } else {
              // Other errors
              console.error('Error:', error.message);
              Alert.alert('Error', 'An unexpected error occurred.');
            }
          }
    };
    console.log("URL", url)
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Provider Login Screen</Text>
        <Text>{url}</Text>
        <TextInput
          style={styles.input}
          placeholder="email"
          value={emailInput}
          onChangeText={setEmailInput}
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Registration', {url})}>
          <Text style={styles.link}>Don't have an account? Register here</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProviderRegistration', {url})}>
          <Text style={styles.link}>Care Provider Registration</Text>
        </TouchableOpacity>
      </View>
    );
  }

export default ProviderLoginScreen;

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
    button:{
      backgroundColor:'#4d87bf',
      width: 300,
      height:60,
      borderRadius:10,
      justifyContent:'center',
      alignItems:'center',
      marginBottom:10,
    },
    buttonText:{
      fontSize:18,
      fontWeight:'bold',
      color:'white',
    },
    link: {
      color: '#1976d2',
      fontSize: 16,
    },
  });