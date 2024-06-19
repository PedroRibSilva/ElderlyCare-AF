import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

function Cadastro({ navigation, api }) { // injetando api como dependência
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
      const response = await api.post('/users', {
        name: form.nomeCompleto,
        email: form.email,
        password: form.senha,
      });
      if (response.status === 201) {
        alert('Cadastro efetuado com sucesso!');
        navigation.navigate('Login');
      } else {
        alert('Erro ao cadastrar usuário');
      }
    } catch (error) {
      console.error('Falha no cadastro:', error.message);
      alert('Erro no cadastro: ' + error.message);
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


Cadastro.propTypes = {
  navigation: PropTypes.object.isRequired,
  api: PropTypes.object.isRequired,
};

export default Cadastro;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#09374C',
  },
  innerContainer: {
    width: '80%',
    alignItems: 'center',
    padding: 39,
    backgroundColor: '#ffff', 
    height: 650,
    borderRadius: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#09374C',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  loginText: {
    marginTop: 20,
    color: '#888',
  },
  loginLink: {
    color: '#1e90ff',
  },
});
