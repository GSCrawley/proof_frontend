import React from 'react';
import { useState } from 'react';
import {View, TextInput, Text, TouchableOpacity, StyleSheet} from 'react-native';
import axios from 'axios';

function PatientFormScreen({navigation}) {
    const [nameInput, setNameInput] = useState('');
    const [ageInput, setAgeInput] = useState('')
  
    const handlePatientFormSend = async () => {
        const name = nameInput
        const age = ageInput
        const response = await axios.post(`https://proof-flask-api.uw.r.appspot.com/patient/${age}`,{
            // name: name,
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

export default PatientFormScreen

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