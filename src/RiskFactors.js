import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function RiskFactorsScreen({route, navigation}) {
    const [data, setData] = useState(null);
    const {Durl, disease_name, token, url } = route.params;
  
    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.post(`${Durl}/risk_factors`, { disease_name }, {
                headers: { Authorization: `Bearer ${token}` },
              });
              console.log(response.data)
              setData(response.data)
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          fetchData();
    }, []);
  
    return (
      <View style={styles.container}>
        <View style={styles.background} />
        <Text>RISK FACTORS</Text>
        <Text>{Durl}</Text>
        <Text>{disease_name}</Text>
        <Text>{data}</Text>
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
  
  export default RiskFactorsScreen;
  