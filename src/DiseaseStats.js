import React, { useState, useEffect } from 'react';
import {View, Text, Button, Alert, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import axios from 'axios';

function DiseaseStatsScreen({route, navigation}) {
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [DOB, setDOB] = useState('');
  const [url, setURL] = useState('');
  const [Durl, setDURL] = useState('http://localhost:8090'); // Make this dynamic
  const [Rurl, setRURL] = useState('');
  const [LLMResponse, setLLMResponse] = useState('');
  const { token, item, patientID, message } = route.params;
  const [pValue, setPvalue] = useState('');
  const [correlatingDiseases, setCorrelatingDiseases] = useState(['Loading...']);
  const [correlatingSymptoms, setCorrelatingSymptoms] = useState(['Loading...'])

  console.log("TOKEN: ", token)
  console.log(url)
  console.log(item)
  console.log(patientID)


  useEffect( () => {
    const fetchURL = async () => {
      try {
        const response = await fetch('http://localhost:6000/care_provider_server');
        const data = await response.json();
        setURL(data.url);
      } catch (error) {
        console.error('Error fetching URL:', error);
      }
    };
    fetchURL();

    const fetchDiseaseURL = async () => {
      try {
        const response = await fetch('http://localhost:6000/disease_server');
        const data = await response.json();
        setDURL(data.url);
      } catch (error) {
        console.error('Error fetching disease URL:', error);
      }
    };
    fetchDiseaseURL();

    const fetchRiskURL = async () => {
      try {
        const response = await fetch('http://localhost:6000/risk_factors_server');
        const data = await response.json();
        setRURL(data.url);
        console.log("RISK URL: ", Rurl)
      } catch (error) {
        console.error('Error fetching disease URL:', error);
      }
    };

    fetchRiskURL();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(`${Durl}/disease_stats`, { message, item }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCorrelatingDiseases(response.data[0]);
      setPvalue(response.data[1]);
      setCorrelatingSymptoms(response.data[2]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchMemo = async () => {
    try {
      const response = await axios.post(`${Durl}/disease_info`, { item }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLLMResponse(response.data);
    } catch (error) {
      console.error('Error fetching memo data:', error);
    }
  };

  useEffect(() => {
    const instigate = async () => {
      try {
        await fetchMemo();  // Now it waits for fetchData to complete before fetching memo
        await fetchData(); // Now it waits for fetchURL and fetchDiseaseURL to complete
      } catch (error) {
        console.error('Error during instigation:', error);
      }
    };
    instigate();
  }, []);


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
            patient_id: patientID
            }, {
            headers: { Authorization: `Bearer ${token}` },
            });          
        // setContent(response.data.message);
        setName(response.data.diseaseName)
        navigation.navigate('ProviderProfile', {token, url});
        } catch (error) {
        console.error(error);
        // Alert.alert('Error', 'Failed to fetch protected content');
    }
  };

  const navigateToRiskFactors = () => {
    navigation.navigate('RiskFactors', {Durl, disease_name: item, token, url, Rurl, patientID});
  };

  // const [message, setMessage] = useState(''); 
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
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{url}</Text>
        <Text>{Durl}</Text>
        <Text>{item}</Text>
        <Text>LLM RESPONSE: {LLMResponse}</Text>
        {/* <Text>{message}</Text> */}
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold' }}>Hypothesis</Text>
            <Text>    </Text>
            <Text style={{ fontWeight: 'bold' }}>P-Value</Text>
          </View>
          {correlatingDiseases.map((disease, index) => (
            <View key={index} style={{ flexDirection: 'row' }}>
              <Text>{disease}</Text>
              <Text>    </Text>
              <Text>{pValue[index]}...</Text>
            </View>
          ))}
        </View>

        <Text style={{ fontWeight: 'bold' }}>Correlating Symptoms</Text>
        <View>
          {correlatingSymptoms.map((symptom, index) => (
            <Text key={index}>{symptom}</Text>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={navigateToRiskFactors}>
          <View>
              <Text style={styles.buttonText}>Risk Factors</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={diagnose}>
          <View>
              <Text style={styles.buttonText}>Diagnose</Text>
          </View>
        </TouchableOpacity>
        {/* <Button title="Logout" onPress={handleLogout} /> */}
        
      </View>
    </ScrollView>
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