import React from 'react';
import { useState, useEffect } from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import axios from 'axios';

function DiagnosisScreen({ route, navigation }) {
    const [text, setText] = useState('');
    // var [url, setURL] = useState('');
    const message = route.params.message;
    const [loading, setLoading] = useState(true);
    const { token } = route.params;
    var { url } = route.params;
    // console.log(message)

    const profileNav = () => {
        navigation.navigate('Profile', {token});
    };

    useEffect(() => {
      console.log("URL:", url)
      const fetchData = async () => {
        try{
          console.log(message)
          symptomsData = message;
          const response = await axios.post(`${url}/disease`, {symptomsData},
            {headers: {Authorization: `Bearer ${token}`}
          });
          console.log(response.data)
          setText(response.data)
        } catch (error) {
          if (error.request && connectionAttempts <= 5) {
            // Network error (request was made but no response received)
            const fetchURLerr = async () => {
              const result = await axios.get('http://localhost:6000/disease_server');
              url = result.data.url;
              connectionAttempts = connectionAttempts + 1
            };
            fetchURLerr();
            // console.error('Network error:', error.request);
            // Alert.alert('Error', 'Network error. Please check your connection.');
          } else {
            // Other errors
            console.error('Error:', error.message);
            Alert.alert('Error', 'An unexpected error occurred.');
          }
        };
      };
      fetchData();
    }, []);
    useEffect(() => {
        if (message) {
            setText(message);
            setLoading(false);
        }
    }, [message]);
    return (
      <ScrollView style={{left: "5%"}}>
        <View>
          <Button title="Profile" onPress={profileNav}></Button>
          {/* <Text>Diagnosis</Text> */}
          <View style={{backgroundColor:"white", borderWidth:"1", borderColor: "#ccc", padding: 10, borderRadius: 15, width: "90%", left: "5%"}}>
            <Text>{text}</Text>
          </View>
        </View>
      </ScrollView>
    )
  }

export default DiagnosisScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cbdcec',
    alignItems: 'center',
  },
  title:{
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      marginTop: 30,
  },
  subtitle:{
      fontWeight: 'bold',
  },

  body: {
      backgroundColor: 'white',
      width:'90%',
      margin:20,
      marginBottom:50,
      borderRadius:10

  },
  bot: {
      fontSize:16,
  },
  input: {
      borderWidth: 1,
      borderColor: 'black',
      width: '90%',
      height:60,
      marginBottom:10,
      borderRadius:10,
      backgroundColor:"white"
  },
  button:{
      backgroundColor:'#4d87bf',
      width: '90%',
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
});