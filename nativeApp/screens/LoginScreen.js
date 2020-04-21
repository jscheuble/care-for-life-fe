import React, { useState } from 'react';
import {
  AsyncStorage,
  Alert,
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useOfflineMutation } from 'react-offix-hooks';
import { loginMutation } from '../Queries/queries';
import Card from '../components/Card';

const LoginScreen = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, state] = useOfflineMutation(loginMutation);

  const handleSubmit = async () => {
    await login({
      variables: {
        username: username,
        password: password,
      },
    })
      .then((res) => {
        // may need to update token grab from response
        const token = res.data.login.token;
        AsyncStorage.setItem('token', token);
      })
      .catch((error) => {
        Alert.alert(
          'Error logging in. Please check internet connection and credentials, then try again.'
        );
        console.log('Error logging in ', error);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Log in" onPress={handleSubmit} />
          <View style={styles.footer}>
            <Text>Don't have an account?</Text>
            <Button
              title="Register"
              onPress={() => props.navigation.replace('Register')}
            />
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
