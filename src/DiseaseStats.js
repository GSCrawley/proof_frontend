import React, { useState, useEffect } from 'react';
import {View, Text, Button, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';

function DiseaseStatsScreen({route, navigation}) {
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [DOB, setDOB] = useState('');
  const { token, url, item, inputValue } = route.params;

  console.log("TOKEN: ", token)
  console.log(url)
  console.log(item)
  console.log(inputValue)

//   useEffect(() => {
//     const fetchProtectedContent = async () => {
//         try {
//             const response = await axios.post(`${url}/disease-stats`, {
//                 diseaseName: disease,
//                 }, {
//                 headers: { Authorization: `Bearer ${token}` },
//                 });          
//             // setContent(response.data.message);
//             setName(response.data.diseaseName)
//             } catch (error) {
//             console.error(error);
//             // Alert.alert('Error', 'Failed to fetch protected content');
//         }
//     };
//     fetchProtectedContent();
//   }, [token]);

  const diagnose = async () => {
    try {
        const response = await axios.post(`${url}/diagnose`, {
            disease_name: item,
            patient_id: inputValue
            }, {
            headers: { Authorization: `Bearer ${token}` },
            });          
        // setContent(response.data.message);
        setName(response.data.diseaseName)
        } catch (error) {
        console.error(error);
        // Alert.alert('Error', 'Failed to fetch protected content');
    }
  };

  const [message, setMessage] = useState(''); 
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8000/logout', {
          headers: { Authorization: `Bearer ${token}` },
        });
      // console.log(response)
      setMessage(response.data.message);
      // navigation.navigate('Symptoms', {token});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{inputValue}</Text>
      <Text>{item}</Text>
      <Text>Corrilating symptoms</Text>
      <Text>Stats</Text>

      <TouchableOpacity style={styles.button} onPress={diagnose}>
          <View>
              <Text style={styles.buttonText}>Diagnose</Text>
          </View>
        </TouchableOpacity>
      {/* <Button title="Logout" onPress={handleLogout} /> */}
    </View>
  );
}

export default DiseaseStatsScreen

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