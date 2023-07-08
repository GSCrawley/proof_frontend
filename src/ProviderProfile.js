import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

function ProviderProfileScreen({ route, navigation }) {
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { token } = route.params;
  var { url } = route.params;
  var connectionAttempts = 0;
  const [profilePicUrl, setProfilePicUrl] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    // Handle form submission logic here
    try {
      const response = await axios.post(
        `${url}/add-patient`,
        { input: inputValue },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigation.navigate('PatientProfile', { token, url, inputValue });
    } catch (error) {
      if (error.response) {
        // Invalid login error (server responded with an error status code)
        const statusCode = error.response.status;
        if (statusCode === 400) {
          Alert.alert('Error', 'Invalid ID');
        } else {
          Alert.alert('Error', 'An error occurred.');
        }
      } else if (error.request && connectionAttempts <= 5) {
        // Network error (request was made but no response received)
        const fetchData = async () => {
          const result = await axios.get('http://localhost:6000/');
          url = result.data.url;
          connectionAttempts = connectionAttempts + 1
          handleSubmit()
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
    setShowForm(false); // Hide the form after submission
  };
  

  useEffect(() => {
    const fetchProtectedContent = async () => {
      try {
        const response = await axios.get(`${url}/provider-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setName(response.data.name);
      } catch (error) {
        console.error(error);
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
      setMessage(response.data.message);
      // navigation.navigate('Symptoms', {token});
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
          <Text style={styles.subtitle}>Other Identifying Info</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
          <Text style={styles.buttonText}>Select Patient</Text>
        </TouchableOpacity>
        {showForm && (
          <View>
            <TextInput
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="Enter Patient ID"
            />
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ProviderProfileScreen;

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


{/* <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
<Text style={styles.buttonText}>Select Patient</Text>
</TouchableOpacity>
{showForm && (
<View>
  <TextInput
    value={inputValue}
    onChangeText={setInputValue}
    placeholder="Enter Patient ID"
  />
  <Button title="Submit" onPress={handleSubmit} />
</View>
)} */}