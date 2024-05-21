import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, StatusBar, Picker } from 'react-native';
import PushNotification from 'react-native-push-notification';
import {database} from '@react-native-firebase/database';

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

export default function Remedio() {
  const [waterConsumed, setWaterConsumed] = useState("1550");
  const [isEditingWater, setIsEditingWater] = useState(false);
  const [inputValue, setInputValue] = useState(waterConsumed);
  const [reminders, setReminders] = useState([]);
  const [newReminderName, setNewReminderName] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');

  useEffect(() => {
    const onChildAdded = database()
      .ref('/reminders')
      .on('child_added', snapshot => {
        const { name, time } = snapshot.val();
        scheduleNotification(name, time);
      });

    return () => database().ref('/reminders').off('child_added', onChildAdded);
  }, []);

  const scheduleNotification = (name, time) => {
    const date = new Date(time);

    PushNotification.localNotificationSchedule({
      message: `Hora de tomar seu remédio: ${name}`,
      date,
      repeatType: 'day',
    });
  };

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

  const addReminder = () => {
    if (newReminderName.trim() !== '' && selectedHour !== '' && selectedMinute !== '') {
      const newReminder = `${newReminderName} - ${selectedHour}:${selectedMinute}`;
      setReminders([...reminders, newReminder]);
      setNewReminderName('');
      setSelectedHour('');
      setSelectedMinute('');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09374C" />
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => {/* código para abrir o menu lateral */}}>
          <Image source={require('./figs/tracos.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.greeting}>Lembretes de remédios</Text>
      </View>
      <Text>Sorocaba, 05 de maio de 2024</Text>

      {/* Área para criação de lembretes */}
      <View style={styles.reminderContainer}>
        <TextInput
          style={styles.reminderInput}
          value={newReminderName}
          onChangeText={setNewReminderName}
          placeholder="Nome do lembrete"
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedHour}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedHour(itemValue)}
          >
            <Picker.Item label="Hora" value="" />
            {[...Array(24).keys()].map(hour => (
              <Picker.Item key={hour} label={`${hour}`} value={`${hour}`} />
            ))}
          </Picker>
          <Picker
            selectedValue={selectedMinute}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedMinute(itemValue)}
          >
            <Picker.Item label="Minuto" value="" />
            {[...Array(60).keys()].map(minute => (
              <Picker.Item key={minute} label={`${minute}`} value={`${minute}`} />
            ))}
          </Picker>
        </View>
        <TouchableOpacity onPress={addReminder} style={styles.addButton}>
          <Text style={styles.addButtonText}>Criar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBar}>
        <Image source={require('./figs/painelaz.png')} style={styles.icon} />
        <Image source={require('./figs/lamplaz.png')} style={styles.icon} />
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoIcon: {
    width: 50,
    height: 60,
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
  reminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  reminderInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginRight: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  picker: {
    flex: 1,
  },
  addButton: {
    backgroundColor: '#09374C',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
  },
});

