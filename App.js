import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './src/Profile.js';
import PatientFormScreen from './src/PatientForm.js';
import SymptomFormScreen from './src/SymptomForm.js';
import DiagnosisScreen from './src/Diagnosis.js';
import LoginScreen from './src/Login.js';
import RegistrationScreen from './src/Registration.js';
import SplashScreen from './src/Splash.js';
import ProviderRegistrationScreen from './src/ProviderRegistration.js';
import ProviderLoginScreen from './src/ProviderLogin.js';
import ProviderProfileScreen from './src/ProviderProfile.js';
import PatientProfileScreen from './src/PatientProfile.js';
import CareProviderSymptomFormScreen from './src/CareProviderSymptomForm.js';
import ProviderDiagnosisScreen from './src/ProviderDiagnosis.js';
import DiseaseStatsScreen from './src/DiseaseStats.js';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ProviderLogin" component={ProviderLoginScreen} />
        <Stack.Screen name="ProviderRegistration" component={ProviderRegistrationScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ProviderProfile" component={ProviderProfileScreen} />
        <Stack.Screen name="PatientProfile" component={PatientProfileScreen} />
        <Stack.Screen name="Patient" component={PatientFormScreen} />
        <Stack.Screen name="Symptoms" component={SymptomFormScreen} />
        <Stack.Screen name="CareProviderSymptoms" component={CareProviderSymptomFormScreen} />
        <Stack.Screen name="Diagnosis" component={DiagnosisScreen} />
        <Stack.Screen name="ProviderDiagnosis" component={ProviderDiagnosisScreen} />
        <Stack.Screen name="DiseaseStats" component={DiseaseStatsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;