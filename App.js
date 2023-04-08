import * as React from 'react';
import { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';

function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Patient Form"
        onPress={() => navigation.navigate('Patient')}
      />
    </View>
  );
}

///////////////////////////////////////////////////////////////////
function PatientFormScreen({navigation}) {
  const [nameInput, setNameInput] = useState('');
  const [ageInput, setAgeInput] = useState('')

  const handlePatientFormSend = async () => {
      const name = nameInput
      const age = ageInput
      const response = await axios.post(`http://localhost:8000/patient/${name}/${age}`,{
          name: name,
          age: age,
      },{
          headers: {
              'Content-Type': 'application/json',
          }
      })
      console.log(response.data)
  }

  const patientFunctionCombine = () => {
    handlePatientFormSend();
    navigation.navigate('Symptoms')
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Patient Screen</Text>
      <Text style={styles.title}>Dr. G</Text>

            <Text>Please Enter Name Below</Text>
            <TextInput 
                style={styles.input}
                value={nameInput}
                onChangeText = {name => setNameInput(name) }
                placeholder="Please enter name here..."
                backgroundColor="white"
            />
            <Text>Please Enter Age Below</Text>
            <TextInput 
                style={styles.input}
                value={ageInput}
                onChangeText = {age => setAgeInput(age) }
                placeholder="Please enter age here..."
                backgroundColor="white"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={patientFunctionCombine}
                // onPress={() => navigation.navigate('Symptoms')}
            >
                <Text style={styles.buttontext}>Send</Text>
            </TouchableOpacity>
    </View>
  );
}
// ///////////////////////////////////////////////////////////////////



// ///////////////////////////////////////////////////////////////////
var symptomsLst = [];
function SymptomFormScreen({navigation}) {
  const [symptoms, setSymptoms] = useState([]);
  
  const emptyList = () => {
    symptomsLst = []
  }

  const handleSymptomFormSend = async () => {
    const symptomsData = symptomsLst

    axios.post(`http://localhost:8000/symptoms`, {symptomsData})
  }

  const SymptomInputField = (props) => {
    const [symptom, setSymptom] = useState();

    const handleAddSymptom = (value) => {
      props.addSymptom(value)
      symptomsLst.push(value)
      console.log(symptomsLst)
      setSymptom(null);
    }
  const symptomFunctionCombine = () => {
    handleSymptomFormSend();
    // emptyList();
    navigation.navigate('Diagnosis');
  }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flax-start', right: "5%" }}>
        <TextInput style={styles.input} value={symptom} onChangeText={text => setSymptom(text)} placeholder='Write a symptom'/>
        <TouchableOpacity style={styles.button} onPress={() => handleAddSymptom(symptom)}>
          <View>
              <Text>Add Symptom/Sign</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={symptomFunctionCombine}>
          <View>
              <Text>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const SymptomItem = (props) => {
    return(
      <View style={{marginTop: 10}}>
          <View>
              <Text>{props.index}</Text>
          </View>
          <View>
              <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>{props.symptom}</Text>
              <TouchableOpacity onPress={() => props.deleteSymptom()}>
                <Text>Delete</Text>
              </TouchableOpacity>
          </View>
      </View>
    )
  }

  const addSymptom = (symptom) => {
    if (symptom == null) return;
    setSymptoms([...symptoms, symptom]);
    Keyboard.dismiss();
  }

  const deleteSymptom = (deleteIndex) => {
    setSymptoms(symptoms.filter((value, index) => index != deleteIndex));
  }

  return (
    <ScrollView style={{left: "5%"}}>
        <View>
          {
            symptoms.map((symptom, index) => {
              return (
                <View key={index} style={{backgroundColor:"white", borderWidth:"1", borderColor: "#ccc", padding: 10, borderRadius: 15, width: "90%"}}>
                  <SymptomItem index={index + 1} symptom={symptom} deleteSymptom={() => deleteSymptom(index)}/>
                </View>
              );
            })
          }
        </View>
        <SymptomInputField addSymptom={addSymptom}/>
    </ScrollView>
  );
}

// ///////////////////////////////////////////////////////////////////////////////////////
function DiagnosisScreen({ navigation }) {
  const [text, setText] = useState('');

  const handleGPTSend = async () => {
    try {
      const response = await axios.get('http://localhost:8000/home');
      setText(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <Button title="Get Diagnosis" onPress={handleGPTSend}></Button>
      {/* <FlatList 
          style={styles.body}
          renderItem={({item}) => (
            <View style={{flexDirection: 'row', padding:10}}>
              <Text>{item.text ? JSON.stringify(item.text) : 'Loading...'}</Text>
            </View>
          )}
      /> */}
      <Text>{text}</Text>
    </View>
  )
}

// ///////////////////////////////////////////////////////////////////////////////////////

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Patient" component={PatientFormScreen} />
        <Stack.Screen name="Symptoms" component={SymptomFormScreen} />
        <Stack.Screen name="Diagnosis" component={DiagnosisScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

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
      marginBottom:10
  },
  buttonText:{
      fontSize:25,
      fontWeight:'bold',
      color:'blue',
  },
});