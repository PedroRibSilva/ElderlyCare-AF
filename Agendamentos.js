import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, TextInput, ScrollView, StyleSheet, SafeAreaView, Alert, Image, Modal, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { addDoc, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

LocaleConfig.locales['pt'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan.','Fev.','Mar','Abr','Mai','Jun','Jul.','Ago','Set.','Out.','Nov.','Dez.'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['Dom.','Seg.','Ter.','Qua.','Qui.','Sex.','Sáb.'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt';

export default function Agendamento({ navigation}) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reminderName, setReminderName] = useState('');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchReminders(user.uid);
      } else {
        setCurrentUser(null);
        setReminders([]);
      }
    });

    return unsubscribe;
  }, []);

  const fetchReminders = async (uid) => {
    const q = query(collection(db, 'appointments'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    const fetchedReminders = [];
    querySnapshot.forEach((doc) => {
      fetchedReminders.push({ id: doc.id, ...doc.data() });
    });
    setReminders(fetchedReminders);
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setTimePickerVisibility(true);  
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (time) => {
    setSelectedTime(`${('0' + time.getHours()).slice(-2)}:${('0' + time.getMinutes()).slice(-2)}`);
    setShowModal(true); 
    hideTimePicker();
  };

  const handleSalvarHorario = async () => {
    try {
      if (!selectedDate || !selectedTime || !reminderName) {
        throw new Error('Preencha todos os campos.');
      }
  
      if (!auth.currentUser) {
        throw new Error('Nenhum usuário logado.');
      }
  
      const appointmentData = {
        date: selectedDate,
        time: selectedTime,
        name: reminderName,
        uid: auth.currentUser.uid,
      };
  
      console.log("Dados do agendamento:", appointmentData);
  
      const appointmentRef = await addDoc(collection(db, 'appointments'), appointmentData);
      const newReminder = { id: appointmentRef.id, ...appointmentData };
      
      setReminders([...reminders, newReminder]);
      Alert.alert('Sucesso', 'Horário salvo com sucesso!');
      setSelectedDate('');
      setSelectedTime('');
      setReminderName('');
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao salvar horário:", error);
      Alert.alert('Erro', 'Erro ao salvar horário: ' + error.message);
    }
  };

  const handleDeleteReminder = async (id) => {
    try {
      await deleteDoc(doc(db, 'appointments', id));
      setReminders(reminders.filter(reminder => reminder.id !== id));
      Alert.alert('Sucesso', 'Lembrete excluído com sucesso!');
    } catch (error) {
      console.error("Erro ao excluir lembrete:", error);
      Alert.alert('Erro', 'Erro ao excluir lembrete: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09374C" />
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
          <Image source={require('./figs/tracos.png')} style={styles.menuIcon} />
            </TouchableOpacity>
        <Text style={styles.greeting}>Agendamento</Text> 
      </View>
    <SafeAreaView style={styles.container}>
      <Calendar
        style={styles.calendar}
        onDayPress={handleDayPress}
        markedDates={getMarkedDates()}
        locale="pt"
      />
      <ScrollView style={styles.remindersContainer}>
        {reminders.map((reminder) => (
          <View key={reminder.id} style={styles.reminder}>
            <Text style={styles.reminderName}>{reminder.name}</Text>
            <Text>{`Data: ${new Date(reminder.date).toLocaleDateString('pt-BR')}`}</Text>
            <Text>{`Hora: ${reminder.time}`}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteReminder(reminder.id)}>
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Lembrete</Text>
            <Text>Data: {selectedDate}</Text>
            <Text>Hora: {selectedTime || "Selecione o horário"}</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome do Lembrete"
              value={reminderName}
              onChangeText={setReminderName}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSalvarHorario}>
              <Text style={styles.buttonText}>Salvar Lembrete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowModal(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </Modal>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={hideTimePicker}
        is24Hour={true}
        headerTextIOS="Escolha o horário"
      />
    </SafeAreaView>
    </View>
  );

  function getMarkedDates() {
    const markedDatesObj = {};
    reminders.forEach(reminder => {
      markedDatesObj[reminder.date] = { marked: true };
    });
    return markedDatesObj;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  calendar: {
    marginBottom: 10,
  },
  remindersContainer: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff',
  },
  reminder: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  reminderName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#28a745',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
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
    width: 30,
    height: 30,
  },
  greeting: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 16, 
  },
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
});
