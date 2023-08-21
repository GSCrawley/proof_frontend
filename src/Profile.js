import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

function ProfileScreen({ route, navigation }) {
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [DOB, setDOB] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
  const { token, url } = route.params;
  const [data, setData] = useState(null);

  console.log('TOKEN: ', token);
  console.log(url);

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
        const response = await axios.get(`${url}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setName(response.data.first_name);
        setDOB(response.data.DOB);

        console.log("Hello")

      } catch (error) {
        console.log("Nooooooo")
        console.error(error);
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
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
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
          onPress={() => navigation.navigate('Symptoms', { token, url: data })}
        >
          <Text style={styles.buttonText}>Symptom Input Form</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ProfileScreen;

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
