import React from 'react';
import { useState, useEffect } from 'react';
import {View, TextInput, Text, TouchableOpacity, ScrollView, StyleSheet, Keyboard} from 'react-native';
import axios from 'axios';

var riskFactorsLst = [];
function RiskFactorInputScreen({route, navigation}) {
  const [riskFactors, setRiskFactors] = useState([]);
  const [message, setMessage] = useState([]);
  const { token, patientID } = route.params;
  var { url } = route.params;
  const [rfurl, setURL] = useState([]);
  connectionAttempts = 0
  
  const emptyList = () => {
    symptomsLst = []
  }

  // Function to fetch the URL asynchronously
  useEffect(() => {
    const fetchURL = async () => {
      try {
        const response = await fetch('http://localhost:6000/risk_factors_server'); // Replace with your actual API URL
        const data = await response.json();
        setURL(data.url); // Once the data is fetched, update the 'url' state with the received URL
      } catch (error) {
        console.error('Error fetching URL:', error);
      }
    };
    fetchURL();
  }, []);

  const handleRiskFactorFormSend = async () => {
    const riskFactorsData = riskFactorsLst;
    try{
        const response = await axios.post(`${rfurl}/risk_factors_input`, {riskFactorsData, patientID},
        {headers: {Authorization: `Bearer ${token}`}
        });
        // setMessage(response.data);
        // console.log(response.data);
        // navigation.navigate('Diagnosis', {message: response.data, url: durl, token});
        navigation.navigate('PatientProfile', { token, url, inputValue: patientID });
        emptyList()
    } catch (error) {
        if (error.request && connectionAttempts <= 5) {
          // Network error (request was made but no response received)
          const fetchData = async () => {
            const result = await axios.get('http://localhost:6000/risk_factors_server');
            url = result.data.url;
            connectionAttempts = connectionAttempts + 1
            handleRiskFactorFormSend()
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

  const RiskFactorInputField = (props) => {
    const [riskFactor, setRiskFactors] = useState();

    const handleAddRiskFactor = (value) => {
      props.addRiskFactor(value)
      riskFactorsLst.push(value)
      console.log(riskFactorsLst)
      setRiskFactors(null);
    }
//   const symptomFunctionCombine = () => {
//     handleSymptomFormSend();
//     // emptyList();
//     navigation.navigate('Diagnosis', {message: message});
//   }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flax-start', right: "5%" }}>
        <TextInput style={styles.input} value={riskFactor} onChangeText={text => setRiskFactors(text)} placeholder='Write a risk factor'/>
        <TouchableOpacity style={styles.button} onPress={() => handleAddRiskFactor(riskFactor)}>
          <View>
              <Text style={styles.buttonText}>Add Risk Factor</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRiskFactorFormSend}>
          <View>
              <Text style={styles.buttonText}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const RiskFactorItem = (props) => {
    return(
      <View style={{marginTop: 10}}>
          <View>
              <Text>{props.index}</Text>
          </View>
          <View>
              <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>{props.riskFactor}</Text>
              <TouchableOpacity onPress={() => props.deleteRiskFactor()}>
                <Text>Delete</Text>
              </TouchableOpacity>
          </View>
      </View>
    )
  }

  const addRiskFactor = (riskFactor) => {
    if (riskFactor == null) return;
    setRiskFactors([...riskFactors, riskFactor]);
    Keyboard.dismiss();
  }

  const deleteRiskFactor = (deleteIndex) => {
    setRiskFactors(riskFactors.filter((value, index) => index != deleteIndex));
  }

  return (
    <ScrollView style={{left: "5%"}}>
        <View>
          {
            riskFactors.map((riskFactor, index) => {
              return (
                <View key={index} style={{backgroundColor:"white", borderWidth:"1", borderColor: "#ccc", padding: 10, borderRadius: 15, width: "90%"}}>
                  <RiskFactorItem index={index + 1} riskFactor={riskFactor} deleteRiskFactor={() => deleteRiskFactor(index)}/>
                </View>
              );
            })
          }
        </View>
        <RiskFactorInputField addRiskFactor={addRiskFactor}/>
    </ScrollView>
  );
}

export default RiskFactorInputScreen

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