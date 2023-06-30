import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FlatList, BorderlessButton, GestureHandlerRootView, Swipeable  } from 'react-native-gesture-handler';


import { roleService } from './services/roles.service';
const Stack = createNativeStackNavigator();

export default function RolesPage({navigation}) {

  const [roles, setRoles] = React.useState([]);

  function fetchRoles() {
    roleService.getRolesList()
      .then(list => setRoles(list))
      .catch(error => navigation.goBack());
  }

  React.useEffect(() => fetchRoles(), []);

  function removeRole(roleId) {
    roleService.remove(roleId)
        .then(fetchRoles())
        .catch(error => Alert.alert(error));
  }
  
  function DeleteButton({roleId}) {
    return (
      <View style={styles.deleteContainer}>
          <BorderlessButton onPress={() => removeRole(roleId)} style={styles.deleteButton}>
            <View accessible>
              <Text style={{color: 'white'}}>Deletar</Text>
            </View>
          </BorderlessButton>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Roles disponíveis</Text>
      <FlatList
          data={roles}
          refreshing={false}
          onRefresh={fetchRoles}
          renderItem={({ item }) => (
            <GestureHandlerRootView>
              <Swipeable renderRightActions={() => <DeleteButton roleId={item.id} />}>
                <View style={styles.itemView} onTouchEnd={() => {navigation.navigate('RoleUpdate', { roleId: item.id })} }>
                  <Text>{item.id}. {item.name} ({item.description}) </Text>
                </View>
              </Swipeable>
            </GestureHandlerRootView>
          )}
      />
      <View style={styles.horizontalbuttons}>
        <Button title='Adicionar' onPress={() => {navigation.navigate("RoleSignUp")}} />
        <Button title="Sair" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
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