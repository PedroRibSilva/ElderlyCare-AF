import * as React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

function Menu({ navigation }) {
    const options = [
        { label: 'Agendamento', screen: 'Agendamento' },
        { label: 'Exercícios e Dicas', screen: 'Exerc' },
        { label: 'Notícias', screen: 'Noticia' },
        { label: 'Sair da Conta', screen: 'Login' },
        { label: 'Fechar', screen: 'Telainicial' },
      ];

  const userName = 'Menu';

  return (
    <View style={styles.container}>
       <Image
        style={styles.userImage}
        source={require('./figs/Perfil.png')}
        />

      <Text style={styles.userName}>{userName}</Text>

     
      <View style={styles.optionsContainer}>
         {options.map(({ label, screen }) => (
          <TouchableOpacity
            key={label}
            style={styles.optionButton}
             onPress={() => navigation.navigate(screen)}
         >
          <Text style={styles.optionButtonText}>{label}</Text>
        </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#09374c',
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#ba6f4d',
  },
  optionsContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  optionButton: {
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: '#ba6f4d',
    paddingVertical: 12,
    borderRadius: 15,
    marginBottom: 8,
    alignItems: 'center',
  },
  optionButtonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default Menu;