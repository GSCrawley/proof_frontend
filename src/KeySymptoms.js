import React, { useState, useEffect } from 'react';
import {View, Text, Button, Alert, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import axios from 'axios';


function KeySymptomsScreen({route, navigation}) {
  const { Durl, disease_name, token, url, patientID } = route.params;
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const isButtonPressed = (item) => selectedItems.includes(item);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${Durl}/key_symptoms`, { disease_name }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data)
        setData(response.data)
    //         setData(response.data)
    //         setRiskListData(response.data[0]);
    //         setPatientRiskList(response.data[1])
    //         console.log(riskListData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  console.log(Durl)
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Key Symptoms</Text>
        {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                isButtonPressed(item) ? styles.greenButton : null,
              ]}
            //   onPress={(event) => addRisk(event, item, url)}
            >
              <View>
                <Text style={styles.buttonText}>{item}</Text>
              </View>
            </TouchableOpacity>
        ))}
    </View>
  );
};

export default KeySymptomsScreen;

const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
    },
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
    button: {
      backgroundColor: '#4d87bf',
      width: 300,
      height: 60,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    greenButton: {
      backgroundColor: 'green',
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
});