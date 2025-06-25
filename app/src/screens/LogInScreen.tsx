import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Input, Button, Text } from '@/components/ui';
import { supabase } from '../../utils/supabase';
import { useNavigation } from '@react-navigation/native';

const LogInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const validateForm = () => {
    if (!email) {
      setError('Please enter an email address.');
      return false;
    }
    if (!password) {
      setError('Please enter a password.');
      return false;
    }
    setError('');
    return true;
  };

  const handleLogIn = async () => {
    if (validateForm()) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (error) {
          setError(error.message);
        } else {
          console.log('Log in successful:', data);
          navigation.navigate('HomeScreen');
        }
      } catch (error: any) {
        setError(error.message);
      }
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Input
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button style={styles.button} onPress={handleLogIn}>
        Log In
      </Button>
      {Platform.OS === 'web' && (
        <Button
          style={styles.button}
          onPress={async () => {
            const { error } = await supabase.auth.signInWithOAuth({
              provider: 'google',
            });
            if (error) {
              setError(error.message);
            }
          }}
        >
          Log In with Google
        </Button>
      )}
       <Button
          style={styles.button}
          onPress={async () => {
            const { error } = await supabase.auth.signInWithOAuth({
              provider: 'google',
            });
            if (error) {
              setError(error.message);
            }
          }}
        >
          Log In with Google
        </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LogInScreen;