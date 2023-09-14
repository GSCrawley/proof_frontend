import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function RiskFactorsScreen({ route, navigation }) {
  const [data, setData] = useState(null);
  const { Durl, disease_name, token, url, Rurl, patientID } = route.params;
  const [riskListData, setRiskListData] = useState([]);
  const [pressedButtons, setPressedButtons] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]); // Add selected items state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${Rurl}/risk_factors`, { disease_name }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data)
        setData(response.data)
        setRiskListData(response.data);
        console.log(riskListData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const addRisk = (event, item, url) => {
    setSelectedItems([...selectedItems, item]);
    console.log('Selected Items:', selectedItems);
  };
  const handleFormSend = async () => {
    try{
        const response = await axios.post(`${Rurl}/risk_factors_process`, {selectedItems, patientID, disease_name},
        {headers: {Authorization: `Bearer ${token}`}
        });
        // setMessage(response.data);
        console.log(response.data);
        // navigation.navigate('Diagnosis', {message: response.data, url: durl, token});
        setSelectedItems([]);
    } catch (error) {
        if (error.request && connectionAttempts <= 5) {
          // Network error (request was made but no response received)
          const fetchData = async () => {
            const result = await axios.get('http://localhost:6000/risk_factors_server');
            url = result.data.url;
            connectionAttempts = connectionAttempts + 1
            handleSymptomFormSend()
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
  };

  const isButtonPressed = (item) => selectedItems.includes(item);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.background} />
        <Text>{patientID}</Text>
        <Text>RISK FACTORS</Text>
        <Text>{Durl}</Text>
        <Text>{disease_name}</Text>
        <Text>{data}</Text>
        <View>
          {riskListData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                isButtonPressed(item) ? styles.greenButton : null,
              ]}
              onPress={(event) => addRisk(event, item, url)}
            >
              <View>
                <Text style={styles.buttonText}>{item}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.button} onPress={handleFormSend}>
          <View>
              <Text style={styles.buttonText}>Submit</Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

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

export default RiskFactorsScreen;
