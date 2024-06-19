import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Linking, StatusBar } from 'react-native';

function InfoRow({ image, text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.infoRow}>
        <Image source={image} style={styles.infoIcon} />
        <Text style={styles.infoText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function Noticia({navigation}) {
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

  const openExternalLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09374C" />
      <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
            <Image source={require('./figs/tracos.png')} style={styles.menuIcon} />
          </TouchableOpacity>
        <Text style={styles.greeting}>Notícias</Text>
      </View>
      <Text style={styles.dateText}>Dia {day} do mês {month} de {year}</Text>

      <View style={styles.imageContainer}>
        <InfoRow
          image={require('./figs/idosa.jpg')}
          text="O drama dos idosos nas inundações do Rio Grande do Sul: 'Parecem deixados de lado'"
          onPress={() => openExternalLink('https://www.bbc.com/portuguese/articles/ce550yrv3v7o')}
        />
        <InfoRow
          image={require('./figs/cartao.jpg')}
          text="Confira como solicitar de forma simples o novo Cartão de Ônibus para Idosos!"
          onPress={() => openExternalLink('https://monitordomercado.com.br/noticias/93210-confira-como-solicitar-de-forma-simples-o-novo-cartao-de-onibus-para-idosos/#google_vignette')}
        />
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.infoRow} onPress={() => navigation.navigate('Telainicial')}>
            <Image source={require('./figs/painelaz.png')} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoRow} onPress={() => navigation.navigate('Exerc')}>
            <Image source={require('./figs/lamplaz.png')} style={styles.icon} />
        </TouchableOpacity>

        <Image source={require('./figs/newsb.png')} style={styles.icon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    backgroundColor: '#09374C',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: StatusBar.currentHeight, 
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
  },
  icon: {
    width: 65,
    height: 50,
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  infoRow: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoIcon: {
    width: 250, // Ajuste o tamanho da imagem aqui
    height: 150, // Ajuste o tamanho da imagem aqui
    marginBottom: 10,
  },
  infoText: {
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  greeting: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
});