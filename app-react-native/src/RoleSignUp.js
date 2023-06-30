import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Alert, Button} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { roleService } from './services/roles.service';

const Stack = createNativeStackNavigator();

function SignUpScreen ({navigation}) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function save() {
        if (!name || name.trim() === '') {
            Alert.alert('O Nome é obrigatório!');
            return;
        }
        if (!description || description.trim() === '') {
            Alert.alert('A Descrição é obrigatória!');
            return;
        }

        roleService.createRole(name, description).then(data => {
            if (data.id) {

                navigation.goBack();
            } else {
                Alert.alert(data.message);
            }
        }).catch(error => {
            console.error(error);
            navigation.navigate('Login');
        });

    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de Roles</Text>        
            <Text style={styles.label}>Nome:</Text>
            <TextInput style={styles.input} onChangeText={setName} />

            <Text style={styles.label}>Descrição:</Text>
            <TextInput style={styles.descriptionInput} onChangeText={setDescription} />
            
            <View style={styles.button}>
                <Button title="Salvar" onPress={save} />
                <Button title="Voltar" onPress={() => navigation.goBack()} />
            </View>
        </View> 
    )
}

export default function RolesPage() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='SignUp' component={SignUpScreen} options={{title: 'Cadastro de Roles', headerShown: false}}/>
    </Stack.Navigator>
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
        marginBottom: '20%'
    },
    input: {
        padding: 5,
        height: 40,
        fontSize: 22,
        borderWidth: 1,
        borderRadius: 4,
        width: Dimensions.get('screen').width - 40,
    },
    descriptionInput: {
        padding: 5,
        height: 80,
        fontSize: 22,
        borderWidth: 1,
        borderRadius: 4,
        width: Dimensions.get('screen').width - 40,
    },
    button: {
        marginTop: 60,
        width: Dimensions.get('screen').width - 200,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})