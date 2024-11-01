import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { useState, useEffect } from 'react';
import COLOR from '../components/COLOR';

const API_BASE_URL = 'https://67073081a0e04071d2295c97.mockapi.io/ToDoApp';

export default function AssetExample({ navigation, route }) {
  const [data, setData] = useState([]);
  const name = route?.params?.name || 'Guest';
  const [search, setSearch] = useState('');

  const filterData = data.filter((item) =>
    item.task.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch Tasks from API
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`);
      const tasks = await response.json();
      setData(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Add a new task
  useEffect(() => {
    if (route.params?.newJob) {
      const newTask = { task: route.params.newJob };
      addTask(newTask);
    }
  }, [route.params?.newJob]);

  // Add Task API Call
  const addTask = async (newTask) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      const addedTask = await response.json();
      setData((prevData) => [...prevData, addedTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Edit Task API Call
  const editTask = async (editedTask) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${editedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedTask),
      });
      if (response.ok) {
        const updatedTask = await response.json();
        setData((prevData) =>
          prevData.map((item) => (item.id === updatedTask.id ? updatedTask : item))
        );
      }
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  // Delete Task API Call with Confirmation
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setData((prevData) => prevData.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const confirmDeleteTask = (id) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => deleteTask(id) },
      ]
    );
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <View style={styles.taskContent}>
        <Pressable>
          <Icon name="checksquareo" color="green" type="antdesign" />
        </Pressable>
        <Text style={styles.taskText}>{item.task}</Text>
      </View>
      <View style={styles.taskActions}>
        <Pressable
          onPress={() => navigation.navigate('Screen03', { name, editTask: item })}
        >
          <Icon name="edit" color="red" />
        </Pressable>
        <Pressable onPress={() => confirmDeleteTask(item.id)}>
          <Icon name="delete" color="red" />
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" type="antdesign" />
        </Pressable>
        <View style={styles.userInfo}>
          <Avatar rounded size="medium" source={require('../assets/Avatar.png')} />
          <View>
            <Text style={styles.userName}>Hi {name}</Text>
            <Text>Have a great day ahead</Text>
          </View>
        </View>
      </View>

      {/* Search */}
      <View style={styles.containerSearch}>
        <View style={styles.search}>
          <Icon name="search" color="gray" />
          <TextInput
            placeholder="Search"
            placeholderTextColor="gray"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Task List */}
      <View style={styles.list}>
        <FlatList
          data={filterData}
          renderItem={renderTask}
          keyExtractor={(item) => item.id.toString()} // Use item.id for uniqueness
        />
      </View>

      {/* Add Task Button */}
      <View style={styles.add}>
        <Pressable onPress={() => navigation.navigate('Screen03', { name })}>
          <Icon name="add-circle" color={COLOR.button} size={40} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  add: { flex: 1 },
  list: { flex: 3 },
  search: {
    marginHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  containerSearch: { flex: 1 },
  header: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  userInfo: { flexDirection: 'row' },
  userName: { fontSize: 20, fontWeight: 'bold' },
  taskItem: {
    flexDirection: 'row',
    backgroundColor: COLOR.gray,
    borderRadius: 30,
    marginBottom: 5,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  taskContent: { flexDirection: 'row', marginLeft: 10 },
  taskText: { fontWeight: 'bold' },
  taskActions: { flexDirection: 'row' },
});
