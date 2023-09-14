import React, { useState, useEffect } from 'react';
import {View, Text, Button, Alert, StyleSheet, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';

function PatientProfileScreen({route, navigation}) {
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [DOB, setDOB] = useState('');
  const { token, inputValue } = route.params;
  var { url } = route.params;
  const [profilePicUrl, setProfilePicUrl] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
  var connectionAttempts = 0
  const [data, setData] = useState(null);

  console.log("TOKEN: ", token)
  console.log(url)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:6000/symptoms_server');
      setData(result.data.url);
      console.log("HA: ", result.data.url)
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchProtectedContent = async () => {
      try {
        const response = await axios.post(`${url}/patient-profile`, {
            patient_id: inputValue,
          }, {
            headers: { Authorization: `Bearer ${token}` },
          });          
        // setContent(response.data.message);
      
        setName(response.data.first_name)
        setDOB(response.data.DOB)
      } catch (error) {
        console.error(error);
        if (error.request && connectionAttempts <= 5) {
          // Network error (request was made but no response received)
          const fetchData = async () => {
            const result = await axios.get('http://localhost:6000/');
            url = result.data.url;
            connectionAttempts = connectionAttempts + 1
            fetchProtectedContent();
          };
          fetchData();
          // console.error('Network error:', error.request);
          // Alert.alert('Error', 'Network error. Please check your connection.');
        } else {
          // Other errors
          console.error('Error:', error.message);
          Alert.alert('Error', 'An unexpected error occurred.');
        }
        // Alert.alert('Error', 'Failed to fetch protected content');
      }
    };
    fetchProtectedContent();
  }, [token]);

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
    <View style={styles.container}>
      <Text>{url}</Text>
      <View style={styles.profileContainer}>
        <Image source={{ uri: profilePicUrl }} style={styles.profilePic} />
        <View style={styles.profileInfo}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{DOB}</Text>
          <Text style={styles.subtitle}>Other Identifying Info</Text>
        </View>
      </View>
      <View style={styles.history}>
        <Text style={styles.historyText}>Patient Event History</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CareProviderSymptoms', {token, 'url':data, inputValue})}
        >
          <Text style={styles.buttonText}>Symptom Input Form</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('RiskFactorsInput', {token, 'url':data, 'patientID': inputValue})}
        >
          <Text style={styles.buttonText}>Risk Factors Input Form</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}



export default PatientProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -50,
  },
  subtitle: {
    fontSize: 16,
  },
  history: {
    width: '100%',
    height: 400,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
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

{/* <Button
        title="Symptom Form"
        onPress={() => navigation.navigate('CareProviderSymptoms', {token, url, inputValue})}
      />
      <Button title="Logout" onPress={handleLogout} /> */}