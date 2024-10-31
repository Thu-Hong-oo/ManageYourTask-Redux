import React, { useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import COLOR from '../components/COLOR';

import {
  fetchTasksStart,
  addTaskSuccess,
  editTaskSuccess,
  deleteTaskSuccess,
} from '../slices/taskSlide'; // Adjust this according to your actual slice path

const AssetExample = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.data); // Replace with the correct path to your tasks
  const name = route?.params?.name || 'Guest';
  const [search, setSearch] = useState('');

  // Fetch Tasks from API when the component mounts
  useEffect(() => {
    dispatch(fetchTasksStart()); // Dispatch action to fetch tasks
  }, [dispatch]);

  // Handle adding a new task
  useEffect(() => {
    if (route.params?.newJob) {
      const newTask = { task: route.params.newJob };
      dispatch(addTaskSuccess(newTask)); // Dispatch action to add the new task
    }
  }, [route.params?.newJob, dispatch]);

  // Handle editing a task
  useEffect(() => {
    if (route.params?.editedJob) {
      const editedTask = route.params.editedJob;
      dispatch(editTaskSuccess(editedTask)); // Dispatch action to edit the task
    }
  }, [route.params?.editedJob, dispatch]);

  // Filter data based on search input
  const filterData = tasks.filter((item) =>
    item.task.toLowerCase().includes(search.toLowerCase())
  );

  // Confirm and delete task
  const confirmDeleteTask = (id) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => dispatch(deleteTaskSuccess(id)) }, // Dispatch action to delete the task
      ]
    );
  };

  // Render each task item
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
          onPress={() =>
            navigation.navigate('Screen03', { name, editTask: item })
          }>
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
          <Avatar
            rounded
            size="medium"
            source={require('../assets/Avatar.png')}
          />
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
          keyExtractor={(item) => item.id} // Use id as key
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
};

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

export default AssetExample;
