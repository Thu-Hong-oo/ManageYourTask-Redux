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
  setName,
  fetchTodosRequest,
  addTodo,
  deleteTodo,
} from '../redux/actions';

const AssetExample = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.name);
  const todos = useSelector((state) => state.todos);
  const error = useSelector((state) => state.error);
  const [search, setSearch] = useState('');

  React.useEffect(() => {
    dispatch(fetchTodosRequest()); // Lấy dữ liệu khi component mount
  }, [dispatch]);

   const handleDeleteTodo = (id) => {
      dispatch(deleteTodo(id));
  };
//   const handleDeleteTodo = (id) => {
//     Alert.alert(
//       'Xác nhận xóa',
//       'Bạn có chắc chắn muốn xóa mục này?',
//       [
//         {
//           text: 'Hủy',
//           onPress: () => console.log('Đã hủy xóa'),
//           style: 'cancel',
//         },
//         {
//           text: 'Xóa',
//           onPress: () => dispatch(deleteTodo(id)), // Gọi action xóa todo
//         },
//       ],
//       { cancelable: false }
//     );
// n

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
          data={todos}
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
  add: { flex: 1 ,marginTop:20},
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
