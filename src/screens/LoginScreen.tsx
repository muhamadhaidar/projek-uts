// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, Image } from 'react-native';
import { RootStackScreenProps } from '../navigation/types';
import { COLORS } from '../constants/colors';
import LinearGradient from 'react-native-linear-gradient'; 
import { useRaces } from '../contexts/RaceContext';

const LoginScreen = ({ navigation }: RootStackScreenProps<'Login'>) => {
  const [name, setName] = useState('');
  const { setUserName } = useRaces(); 

  const handleLogin = () => {
    if (name.trim().length === 0) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    setUserName(name.trim());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo} 
        />
        
        <Text style={styles.title}>Welcome to MotoGP Schedule</Text>
        
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor={COLORS.textSecondary}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        
        <TouchableOpacity style={styles.buttonWrapper} onPress={handleLogin}>
          <LinearGradient
            colors={['#fb0105ff', '#1303e9ff', '#edad09ff']} 
            locations={[0, 0.5, 1]}
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 1.5 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </LinearGradient>
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  logo: {
    width: 150,
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: COLORS.textPrimary, 
    marginTop: 0, 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.textSecondary, marginBottom: 8, marginLeft: 4 },
  input: {
    backgroundColor: COLORS.cardBackground,
    width: '100%',
    borderRadius: 12,
    padding: 18,
    fontSize: 16,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
  },
  buttonWrapper: { 
    marginTop: 16, 
    shadowColor: '#FF5252',
    shadowOffset: { width: 0, height: 10 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 15, 
    elevation: 10 
  },
  button: { 
    width: '100%', 
    padding: 20, 
    borderRadius: 16, 
    alignItems: 'center',
  },
  buttonText: { color: COLORS.textLight, fontSize: 16, fontWeight: 'bold' },
});

export default LoginScreen;