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
import COLOR from '../components/COLOR';
import { useRecoilState, useRecoilValue } from 'recoil';
import { todoListState, nameAtom, editTaskAtom } from '../recoil/toDoAtom';
import { fetchTodosSelector } from '../recoil/toDoSelecter';
import { deleteTodo, fetchTodos } from '../recoil/toDoAPI';

const AssetExample = ({ navigation }) => {
  const [name] = useRecoilState(nameAtom);
  const [editTask, setEditTask] = useRecoilState(editTaskAtom);
  const [todos, setTodos] = useRecoilState(todoListState);
  const fetchedTodos = useRecoilValue(fetchTodosSelector); // Lấy todos từ selector
  // Cập nhật todos atom khi fetchedTodos thay đổi
  useEffect(() => {
    setTodos(fetchedTodos); // Cập nhật todos atom
  }, [fetchedTodos, setTodos]);

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id); // Call API to delete the task
    setTodos((oldTodos) => oldTodos.filter((todo) => todo.id !== id)); // Update state
  };

  const handleEdit = (item) => {
    setEditTask(item); // Lưu tác vụ đang chỉnh sửa vào Recoil
    navigation.navigate('Screen03'); 
  };
  const [search, setSearch] = useState('');
  const filteredTodos = todos.filter((todo) =>
    todo.task.toLowerCase().includes(search.toLowerCase())
  );

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
        <Pressable onPress={() => handleEdit(item)}>
          <Icon name="edit" color="red" />
        </Pressable>
        <Pressable onPress={() => handleDeleteTodo(item.id)}>
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
            style={{ width: '80%', paddingVertical: 3, marginLeft: 5 }}
          />
        </View>
      </View>

      {/* Task List */}
      <View style={styles.list}>
        <FlatList
          data={filteredTodos} // Sử dụng danh sách được lọc
          renderItem={renderTask}
          keyExtractor={(item) => item.id.toString()}
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
  add: { flex: 1, marginTop: 20 },
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
