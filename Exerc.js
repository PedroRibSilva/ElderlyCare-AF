import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Linking, Image, StatusBar} from 'react-native';

const Exerc = ({navigation}) => {
  // Função para abrir o link do YouTube
  const openYouTubeVideo = () => {
    const videoUrl = 'https://www.youtube.com/watch?v=Dmol3aGr11s'; // Substitua pelo link correto
    Linking.openURL(videoUrl);
  };
  const openYouTubeVideo1 = () => {
    const videoUrl = 'https://www.youtube.com/watch?v=5Mmq-Mr05Oc'; // Substitua pelo link correto
    Linking.openURL(videoUrl);
  };
  const openYouTubeVideo2 = () => {
    const videoUrl = 'https://www.youtube.com/watch?v=NNPNA7Jdyck'; // Substitua pelo link correto
    Linking.openURL(videoUrl);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09374C" />
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
          <Image source={require('./figs/tracos.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.greeting}>Dicas de Exercícios</Text>
      </View>
            <TextInput
            style={styles.searchBar}
            placeholder="Pesquisar exercícios"
            
      />
      <View style={styles.videoContainer}>
        {/* Placeholder para outros vídeos de exercícios */}
        <TouchableOpacity onPress={openYouTubeVideo} style={styles.videoCard}>
        <Text> </Text>
          <Text style={styles.videoTitle}>4 exercícios essenciais para os idosos realizarem todos os dias!</Text>
          <Text style={styles.videoDescription}>PhysioBRAIN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={openYouTubeVideo1} style={styles.videoCard}>
        <Text> </Text>
          <Text style={styles.videoTitle}>EXERCÍCIOS PARA IDOSOS EM CASA | Treino COMPLETO para Terceira Idade | Vídeo 2</Text>
          <Text style={styles.videoDescription}>Aurélio Alfieri</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={openYouTubeVideo2} style={styles.videoCard}>
          <Text> </Text>
          <Text style={styles.videoTitle}>Exercícios físicos para idosos fazerem em casa </Text>
          <Text style={styles.videoDescription}>Acvida Cuidador de Idosos</Text>
        </TouchableOpacity>
        
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.infoRow} onPress={() => navigation.navigate('Telainicial')}>
            <Image source={require('./figs/painelaz.png')} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoRow} onPress={() => navigation.navigate('Exerc')}>
            <Image source={require('./figs/lampb.png')} style={styles.icon} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.infoRow} onPress={() => navigation.navigate('Noticia')}>
            <Image source={require('./figs/newsaz.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};



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
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight, 
    marginBottom: 3, 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    position: 'absolute', // Position above the top bar
    top: 60, // Align with the top edge
    color: 'white',
  },
    searchBar: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    position: 'absolute',
    top: 130, // Adjust as needed
  },
  videoContainer: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    width: '100%',
  },
  videoTitle: {
    fontSize: 20,
    marginBottom: 8,
  },
  videoDescription: {
    fontSize: 16,
    marginBottom: 8,
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
    menuIcon: {
    width: 24,
    height: 24,
    margin: 8,
  },
  icon: {
    width: 65,
    height: 50,
  },
  greeting: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
});

export default Exerc;