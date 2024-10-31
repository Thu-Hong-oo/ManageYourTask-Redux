import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
  Image,
} from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import COLOR from '../components/COLOR';

export default function Screen03({ navigation, route }) {
  const name = route?.params?.name || 'Guest';
  const editTask = route?.params?.editTask || null; // Nhận task nếu có
  const [job, setJob] = useState(editTask?.task || '');
  const title = editTask ? 'EDIT YOUR JOB' : 'ADD YOUR JOB';
  const handleFinish = () => {
    if (job.trim()) {
      if (editTask) {
      navigation.navigate('Screen02', { editedJob: { ...editTask, task: job } });
      } else {
        navigation.navigate('Screen02', { newJob: job });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Avatar rounded size="medium" source={require('../assets/Avatar.png')} />
          <View>
            <Text style={styles.greeting}>Hi {name}</Text>
            <Text>Have a great day ahead</Text>
          </View>
        </View>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" type="antdesign" />
        </Pressable>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.containerInput}>
          <Icon name="list" color="green" />
          <TextInput
            placeholder="Input your job"
            placeholderTextColor="gray"
            value={job}
            onChangeText={setJob}
            style={{ flex: 1 }}
          />
        </View>
        <Pressable onPress={handleFinish} style={styles.button}>
          <Text style={styles.buttonText}>Finish</Text>
        </Pressable>
      </View>

      <View style={styles.imageContainer}>
        <Image source={require('../assets/note.png')} style={styles.image} resizeMode="contain" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  headerContent: {
    flexDirection: 'row',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    flex: 2,
    width: '90%',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    width: '100%',
    borderWidth: 1,
    marginHorizontal: 20,
    marginLeft:20,
  },
  button: {
    marginTop: 50,
    backgroundColor: COLOR.button,
    paddingHorizontal: 50,
    paddingVertical: 5,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  imageContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
