import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';

export default function Cadastro({ navigation }) {
  const [form, setForm] = useState({
    nomeCompleto: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (form.senha !== form.confirmarSenha) {
      alert('As senhas não correspondem!');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.senha);
      console.log(userCredential);
      alert('Cadastro efetuado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Falha no cadastro:', error.message);
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require('./assets/logo1.png')} style={styles.logo} />
        <Text style={styles.subtitle}>Conectando a sua saúde com a gente!</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          onChangeText={(value) => handleChange('nomeCompleto', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          onChangeText={(value) => handleChange('email', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          onChangeText={(value) => handleChange('senha', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar senha"
          secureTextEntry
          onChangeText={(value) => handleChange('confirmarSenha', value)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <Text style={styles.loginText}>
          Já tem uma conta?
          <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
            Fazer Login
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#09374C',
  },
  innerContainer: {
    padding: 40,
    backgroundColor: 'white',
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
    marginTop: 24,
  },
  loginLink: {
    color: 'orange',
  },
});
