import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import api from './api'; // Importe a instância da sua API

function Login({ navigation }) {
  const [userMail, setUserMail] = useState('');
  const [userPass, setUserPass] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await api.post('/auth/login', {
        email: userMail,
        password: userPass,
      });

      const token = response.data.token;

      alert('Login Efetuado com Sucesso!');
      navigation.navigate('Telainicial');
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'Erro desconhecido';
      alert('Falha no login: ' + errorMessage);
      console.error('Falha no login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar} />
      <View style={styles.innerContainer}>
        <Image source={require('./assets/logo1.png')} style={styles.logo} />
        <Text style={styles.subtitle}>Conectando a sua saúde com a gente!</Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={userMail}
          onChangeText={(value) => setUserMail(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={userPass}
          onChangeText={(value) => setUserPass(value)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.loginText}>
          Não tem uma conta?
          <Text style={styles.loginLink} onPress={() => navigation.navigate('Cadastro')}>
            Criar agora!
          </Text>
        </Text>
      </View>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#09374C',
  },
  topBar: {
    height: 40,
    backgroundColor: '#09374C',
  },
  innerContainer: {
    padding: 39,
    backgroundColor: '#ffff',
    height: 650,
    borderRadius: 10,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#003143',
  },
  input: {
    height: 40,
    borderColor: 'orange',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#09374C',
    padding: 10,
    alignItems: 'center',
    marginBottom: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  loginText: {
    fontSize: 16,
    textAlign: 'center',
  },
  loginLink: {
    color: 'orange',
  },
});
