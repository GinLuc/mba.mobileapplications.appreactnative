import React from 'react';
import { Button, Dimensions, TextInput, StyleSheet, Text, View, Alert } from "react-native";

import { authService } from './services/auth.service';

export default function LoginPage({navigation}) {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    function signIn() {
        authService.login(username, password).then(logged => {
            if (logged) {
                navigation.navigate('Home', {username: username});
            } else {
                Alert.alert('Login/senha inválido(a)!');
            }
        });
    }

    return (
        <View style={styles.container}> 
            <Text style={styles.title}>Login</Text>       
            <Text style={styles.label}>Login:</Text>
            <TextInput style={styles.input} onChangeText={setUsername} />
            
            <Text style={styles.label}>Senha:</Text>
            <TextInput style={styles.input} onChangeText={setPassword} secureTextEntry />

            <View style={styles.button}>
                <Button title="Entrar" onPress={signIn} />
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
        marginTop: 0,
        paddingVertical: 8,
        fontSize: 45,
        fontWeight: '100',
        textAlign: 'center',
        fontWeight: 'bold',
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
        marginTop: 40,
        width: Dimensions.get('screen').width - 40,
    },
})