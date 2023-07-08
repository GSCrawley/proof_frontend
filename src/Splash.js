import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const [data, setData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:6000/');
      setData(result.data.url);
    };
    fetchData();
  }, []);

  const navigateToLogin = () => {
    navigation.navigate('Login', { url: data });
  };
  const navigateToProviderLogin = () => {
    navigation.navigate('ProviderLogin', { url: data });
  };

  return (
    <View style={styles.container}>
      <View style={styles.background} />
      {data ? (
        <View style={styles.content}>
          <Text>{data}</Text>
          <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
            <Text style={styles.buttonText}>Patient Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={navigateToProviderLogin}>
            <Text style={styles.buttonText}>Care Provider Login</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF', // Set your desired background color here
  },
  content: {
    alignItems: 'center',
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
});

export default SplashScreen;
