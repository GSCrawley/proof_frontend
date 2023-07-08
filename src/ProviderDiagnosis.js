import React from 'react';
import { useState, useEffect } from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';

function ProviderDiagnosisScreen({ route, navigation }) {
    const [text, setText] = useState('');
    const message = route.params.message;
    const [loading, setLoading] = useState(true);
    const { token, url, inputValue } = route.params;
    const diseaseListData = JSON.parse(message[1])
    console.log(diseaseListData)


    const profileNav = () => {
        navigation.navigate('Profile', {token});
    };

    useEffect(() => {
        if (message) {
            setText(message);
            setLoading(false);
        }
    }, [message]);

    const handleFormSend = (event, item) => {
        navigation.navigate('DiseaseStats', {token, url, item, inputValue});
    }
    return (
      <View>
        <Button title="Profile" onPress={profileNav}></Button>
        {/* <Text>Diagnosis</Text> */}
        <View style={{backgroundColor:"white", borderWidth:"1", borderColor: "#ccc", padding: 10, borderRadius: 15, width: "90%", left: "5%"}}>
          <Text>{message[0]}</Text>
        </View>
        <View>
          {diseaseListData.map((item, index) => (
            <TouchableOpacity key={index} style={styles.button} onPress={(event) => handleFormSend(event, item)}>
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