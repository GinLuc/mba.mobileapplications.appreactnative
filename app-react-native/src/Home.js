import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Alert, RefreshControl } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { FlatList, BorderlessButton, GestureHandlerRootView, Swipeable  } from 'react-native-gesture-handler';



import RolesPage from './Roles';
import { userService } from './services/user.service';


const Drawer = createDrawerNavigator();



function HomeScreen({navigation}) {

  const [users, setUsers] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(true);



  const fetchUsers = () => {
    userService.getList()
      .then((list) => {
        setUsers(list);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error(error);
        navigation.goBack();
      });
  }
  
  React.useEffect(() => fetchUsers(), []);

  function removeUser(userId) {
    
    userService.remove(userId)
        .then(() => {
          console.log(`Usuário deletado ${userId}`); 
          fetchUsers()
        })
        .catch(error => Alert.alert(error));
  }
  
  function DeleteButton({userId}) {
    return (
        <View style={styles.deleteContainer}>
            <BorderlessButton onPress={() => removeUser(userId)} style={styles.deleteButton}>
                <View accessible>
                  <Text style={{color: 'white'}}>Deletar</Text>
                </View>
            </BorderlessButton>
        </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários Cadastrados</Text>
      <StatusBar style="auto" />
      <FlatList
          data={users}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchUsers} />
          }
          renderItem={({ item }) => (
            <GestureHandlerRootView>
              <Swipeable renderRightActions={() => <DeleteButton userId={item.id} />}>
                <View style={styles.itemView} onTouchEnd={() => {navigation.navigate('UserUpdate', { userId: item.id })} }>
                  <Text>{item.id}. {item.name} ({item.username}) </Text>
                </View>
              </Swipeable>
            </GestureHandlerRootView>
          )}
      />
      <View style={styles.horizontalbuttons}>
        <Button title='Adicionar' onPress={() => {navigation.navigate("UserSignUp")}} />
        <Button title="Sair" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  )
}

export default function HomePage({route}) {

  const username = route.params.username
  
  return (
      <Drawer.Navigator>
          <Drawer.Screen name='HomeScreen' component={HomeScreen} options={{title: `Usuários Cadastrados`, headerTitle: `Usuário ${username}`}}/>
          <Drawer.Screen name="Roles" component={RolesPage} options={{title: `Roles`}} />
      </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'rgb(59,108,212)',
    fontSize: 42,
    fontWeight: '100',
    textAlign: 'center',
  },
  title: {
    color: 'rgb(59,108,212)',
    marginTop: 16,
    paddingVertical: 8,
    fontSize: 45,
    fontWeight: '100',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  horizontalbuttons: {
      marginTop: 60,
      width: Dimensions.get('screen').width - 200,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 30
  },
  itemView: {
    padding: 10,
    borderColor: 'gray',
    borderBottomWidth: 1,
    width: Dimensions.get('screen').width,
  },
  deleteContainer: {
      alignItems: 'center',
      flexDirection: "row",
      justifyContent: 'center',
  },
  deleteButton: {
      padding: 10,
      height: '100%',
      alignItems: 'center',
      backgroundColor: 'red',
      justifyContent: "center",
  },
})