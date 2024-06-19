import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUserId = async (userId) => {
  try {
    await AsyncStorage.setItem('userId', userId);
  } catch (error) {
    console.error('Erro ao salvar ID do usuário', error);
  }
};

export const getUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    return userId;
  } catch (error) {
    console.error('Erro ao obter ID do usuário', error);
    return null;
  }
};

export const removeUserId = async () => {
  try {
    await AsyncStorage.removeItem('userId');
  } catch (error) {
    console.error('Erro ao remover ID do usuário', error);
  }
};

export const getCurrentUser = async () => {
  const userId = await getUserId();
  if (!userId) {
    return null;
  }
  return { id: userId };
};
