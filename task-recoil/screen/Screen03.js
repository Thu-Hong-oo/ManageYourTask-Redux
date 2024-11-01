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
import { useRecoilState } from 'recoil';
import { todoListState, nameAtom, editTaskAtom } from '../recoil/toDoAtom';
import { updateTodo, addTodo } from '../recoil/toDoAPI'; // Import API

export default function Screen03({ navigation, route }) {
  // const name = route?.params?.name || 'Guest';
  const [name] = useRecoilState(nameAtom);
  const [todos, setTodos] = useRecoilState(todoListState);
  const [editTask, setEditTask] = useRecoilState(editTaskAtom);
  const [job, setJob] = useState(editTask ? editTask.task : '');
  const title = editTask ? 'EDIT YOUR JOB' : 'ADD YOUR JOB';

  const handleFinish = async () => {
    if (job.trim()) {
      if (editTask) {
        // Nếu đang chỉnh sửa
        const updatedTask = { ...editTask, task: job };
        await updateTodo(editTask.id, updatedTask); // Gọi API để cập nhật
        setTodos((oldTodos) =>
          oldTodos.map((todo) => (todo.id === editTask.id ? updatedTask : todo))
        );
      } else {
        const newTask = { task: job }; // Tạo tác vụ mới
        const addedTask = await addTodo(newTask); // Gọi API để thêm tác vụ
        setTodos((oldTodos) => [...oldTodos, addedTask]);
      }
      setEditTask(null); // Xóa trạng thái chỉnh sửa sau khi hoàn thành
      navigation.navigate('Screen02'); // Quay lại Screen02
    }
  };

  useEffect(() => {
    // Cập nhật job khi editTask thay đổi
    if (editTask) {
      setJob(editTask.task);
    }
  }, [editTask]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Avatar
            rounded
            size="medium"
            source={require('../assets/Avatar.png')}
          />
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
            style={{ flex: 1, paddingVertical: 3 }}
          />
        </View>
        <Pressable onPress={handleFinish} style={styles.button}>
          <Text style={styles.buttonText}>Finish</Text>
        </Pressable>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/note.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
    width: '90%',
    borderWidth: 1,
    marginHorizontal: 30,

    justifyContent: 'center',
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