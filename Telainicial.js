import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function InfoRow({ image, text, isEditable, onEdit, onChangeText }) {
  return (
    <View style={styles.infoRow}>
      <Image source={image} style={styles.infoIcon} />
      {isEditable ? (
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={onChangeText}
          keyboardType="numeric"
          onBlur={onEdit} 
        />
      ) : (
        <TouchableOpacity onPress={onEdit}>
          <Text>{text}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function Telainicial({ navigation }) {
  const [waterConsumed, setWaterConsumed] = useState("1550");
  const [isEditingWater, setIsEditingWater] = useState(false);
  const [inputValue, setInputValue] = useState(waterConsumed);

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; 
  const year = currentDate.getFullYear();

  const handleWaterEdit = () => {
    setIsEditingWater(true);
  };

  const handleWaterChange = (newValue) => {
    setInputValue(newValue);
  };

  const handleWaterSubmit = () => {
    setWaterConsumed(inputValue);
    setIsEditingWater(false);
  };

  const pessoaId = 'id_do_documento_da_pessoa'; 

  const API_KEY = 'cb31d3b272652eb231a7ef08b929a9d0';
  const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=Sorocaba&appid=${API_KEY}&units=metric`;

  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setTemperature(data.main.temp);
      } catch (error) {
        console.error('Erro ao obter a temperatura:', error);
      }
    };

    fetchTemperature();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09374C" />
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
          <Image source={require('./figs/tracos.png')} style={styles.menuIcon} />
            </TouchableOpacity>
        <Text style={styles.greeting}>Olá, Seja bem vindo(a)!</Text> 
      </View>
      <Text style={styles.dateText}>Dia {day} do mês {month} de {year}</Text>

      <InfoRow image={require('./figs/clima.png')} text={`Temperatura: ${temperature}C°`}  />

      <InfoRow
        image={require('./figs/copo.png')}
        text={`Água consumida hoje: ${waterConsumed}ml/3000ml`}
        isEditable={isEditingWater}
        onEdit={handleWaterEdit}
        onChangeText={handleWaterChange}
      />



      <View style={styles.bottomBar}>
        <Image source={require('./figs/painelb.jpg')} style={styles.iconbot} />

        <TouchableOpacity style={styles.iconbot} onPress={() => navigation.navigate('Exerc')}>
            <Image source={require('./figs/lamplaz.png')} style={styles.iconbot} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconbot} onPress={() => navigation.navigate('Noticia')}>
            <Image source={require('./figs/newsaz.png')} style={styles.iconbot} />
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0, 
  },
  topBar: {
    backgroundColor: '#09374C',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight, 
    marginBottom: 3, 
  },
  bottomBar: {
    backgroundColor: '#09374C',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    margin: 0, 
  },
  icon: {
    width: 75,
    height: 80,
  },
  iconbot: {
    width: 65,
    height: 60,
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 16, 

  },
  infoIcon: {
    width: 75,
    height: 80,
    marginRight: 10,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  greeting: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  dateText: {
    marginBottom: 16, 
  },
});
