import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Alert, Button} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { userService } from './services/user.service';

const Stack = createNativeStackNavigator();

function SignUpScreen ({navigation}) {

    const [name, setName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPass, setConfirmPass] = React.useState('');

    function save() {
        if (!name || name.trim() === '') {
            Alert.alert('O Nome é obrigatório!');
            return;
        }
        if (!username || username.trim() === '') {
            Alert.alert('O Login é obrigatório!');
            return;
        }
        if (!password || password.trim() === '') {
            Alert.alert('A Senha é obrigatório!');
            return;
        }
        if (password !== confirmPass) {
            Alert.alert('A Senha não confere!');
            return;
        }

        userService.create(name, username, password).then(data => {
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
            <Text style={styles.title}>Cadastro de Usuários</Text>        
            <Text style={styles.label}>Nome:</Text>
            <TextInput style={styles.input} onChangeText={setName} />

            <Text style={styles.label}>Login:</Text>
            <TextInput style={styles.input} onChangeText={setUsername} />
            
            <Text style={styles.label}>Senha:</Text>
            <TextInput style={styles.input} onChangeText={setPassword} secureTextEntry />

            <Text style={styles.label}>Confirmar Senha:</Text>
            <TextInput style={styles.input} onChangeText={setConfirmPass} secureTextEntry />

            <Text style={styles.label}>Roles: </Text>
            

            <View style={styles.button}>
                <Button title="Salvar" onPress={save} />
                <Button title="Voltar" onPress={() => navigation.goBack()} />
            </View>
        </View> 
    )
}

export default function UsersPage() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='SignUp' component={SignUpScreen} options={{title: 'Cadastro de Usuários', headerShown: false}}/>
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
    button: {
        marginTop: 60,
        width: Dimensions.get('screen').width - 200,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})