import React, { useState } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Input, Button, Text } from 'components/ui';
import { supabase } from '../../utils/supabase';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const validateForm = () => {
    if (!email) {
      setError('Please enter an email address.');
      return false;
    }
    if (!password) {
      setError('Please enter a password.');
      return false;
    }
    if (!termsAccepted) {
      setError('Please accept the Terms of Service and Privacy Policy.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSignUp = async () => {
    if (validateForm()) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });

        if (error) {
          setError(error.message);
        } else {
          console.log('Sign up successful:', data);
          // TODO: Navigate to the next screen or show a success message
        }
      } catch (error: any) {
        setError(error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
      <View style={styles.termsContainer}>
        <TouchableOpacity onPress={() => setTermsAccepted(!termsAccepted)}>
          <View style={styles.checkbox}>
            {termsAccepted && <View style={styles.checkboxInner} />}
          </View>
        </TouchableOpacity>
        <Text>
          I agree to the <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </View>
      <Button style={styles.button} onPress={handleSignUp}>
        Sign Up
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
          Sign Up with Google
        </Button>
      )}
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

export default SignUpScreen;