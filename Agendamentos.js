import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, TextInput, ScrollView, StyleSheet, SafeAreaView, Alert, Image, Modal, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import api from './api'; // Importe a configuração da API ou módulo de serviço adequado


LocaleConfig.locales['pt'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan.','Fev.','Mar','Abr','Mai','Jun','Jul.','Ago','Set.','Out.','Nov.','Dez.'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['Dom.','Seg.','Ter.','Qua.','Qui.','Sex.','Sáb.'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt';

export default function Agendamento({ navigation }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reminderName, setReminderName] = useState('');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getCurrentUser();
        if (user) {
          setCurrentUser(user);
          fetchReminders(user.id);
        } else {
          setCurrentUser(null);
          setReminders([]);
        }
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        setCurrentUser(null);
        setReminders([]);
      }
    }

    fetchUser();
  }, []);

  const fetchReminders = async (userId) => {
    try {
      const response = await api.get(`/consultas?userId=${userId}`);
      setReminders(response.data);
    } catch (error) {
      console.error("Erro ao buscar lembretes:", error);
      Alert.alert('Erro', 'Erro ao buscar lembretes: ' + error.message);
    }
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

      if (!currentUser || !currentUser.id) {
        throw new Error('Nenhum usuário logado.');
      }

      const appointmentData = {
        data: selectedDate,
        hora: selectedTime,
        descricao: reminderName,
        userId: currentUser.id, // Usando o ID do usuário obtido do estado
      };

      console.log("Dados do agendamento:", appointmentData);

      const response = await api.post('/consultas', appointmentData);

      const newReminder = { id: response.data._id, ...appointmentData };

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
      await api.delete(`/consultas/${id}`);
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
              <Text style={styles.reminderName}>{reminder.descricao}</Text>
              <Text>{`Data: ${new Date(reminder.data).toLocaleDateString('pt-BR')}`}</Text>
              <Text>{`Hora: ${reminder.hora}`}</Text>
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
      markedDatesObj[reminder.data] = { marked: true };
    });
    return markedDatesObj;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F4C5C',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#09374C',
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  greeting: {
    fontSize: 20,
    color: '#fff',
  },
  calendar: {
    backgroundColor: '#fff',
  },
  remindersContainer: {
    flex: 1,
    padding: 16,
  },
  reminder: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  reminderName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    marginTop: 8,
    backgroundColor: '#ff0000',
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#09374C',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
