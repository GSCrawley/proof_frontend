import React from 'react';
import { useState, useEffect } from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';

function ProviderDiagnosisScreen({ route, navigation }) {
    const [text, setText] = useState('');
    const message = route.params.message;
    const [loading, setLoading] = useState(true);
    const { token, patientID } = route.params;
    var { url } = route.params;
    // var [diseaseListData, setDiseaseListData] = useState('');
    // console.log(diseaseListData)
    connectionAttempts = 0;
    const [diseaseListData, setDiseaseListData] = useState([]); // Updated this line


    const profileNav = () => {
        navigation.navigate('Profile', {token});
    };

    useEffect(() => {
      console.log("URL:", url)
      const fetchData = async () => {
        try{
          console.log(message)
          symptomsData = message;
          const response = await axios.post(`${url}/care_provider_disease`, {symptomsData, patientID},
            {headers: {Authorization: `Bearer ${token}`}
          });
          // console.log(response.data[0])
          // setText(response.data[0])
          setDiseaseListData(response.data);
          console.log(diseaseListData)
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

    const handleFormSend = (event, item) => {
        navigation.navigate('DiseaseStats', {token, Durl:url, item, message, patientID});
    }
    return (
      <View>
        <Text>{url}</Text>
        <Button title="Profile" onPress={profileNav}></Button>
        {/* <Text>Diagnosis</Text> */}
        {/* <View style={{backgroundColor:"white", borderWidth:"1", borderColor: "#ccc", padding: 10, borderRadius: 15, width: "90%", left: "5%"}}>
          <Text>{text}</Text>
        </View> */}
        <View>
          {diseaseListData.map((item, index) => (
            <TouchableOpacity key={index} style={styles.button} onPress={(event) => handleFormSend(event, item, url)}>
            <View>
                <Text style={styles.buttonText}>{item}</Text>
            </View>
          </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }

export default ProviderDiagnosisScreen

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
      padding: 10, 
      borderRadius: 15,
      width: "90%", 
      left: "5%"
  },
  buttonText:{
      fontSize:18,
      fontWeight:'bold',
      color:'white',
  },
});