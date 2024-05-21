import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';

const Iniciacao = ({ navigation }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        const newProgress = prevProgress + 1;

        if (newProgress >= 100) {
          clearInterval(interval);
          navigation.replace('Login');
        }

        return newProgress;
      });
    }, 10); 

    setTimeout(() => {
      clearInterval(interval);
      navigation.replace('Login');
    }, 3000); 

    return () => clearInterval(interval);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#09374C" barStyle="light-content" />
      <Image source={require('./assets/logo1.png')} style={styles.logo} />
      <View style={styles.loadingBarContainer}>
        <View style={[styles.loadingBar, { width: `${loadingProgress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  loadingBarContainer: {
    width: '80%',
    backgroundColor: '#000',
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  loadingBar: {
    height: '100%',
    backgroundColor: '#09374C',
  },
});

export default Iniciacao;

