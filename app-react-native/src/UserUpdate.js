import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Alert, Button} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { userService } from './services/user.service';

const Stack = createNativeStackNavigator();


export default function UpdateScreen ({navigation, route}) {

        const [ id, setId ] = React.useState(0);
        const [ name, setName ] = React.useState('');
        const [ username, setUsername ] = React.useState('');
        const [ password, setPassword ] = React.useState('');
        const [ confirmPassword, setConfirmPass ] = React.useState('');

        function fetchUser() {
            if (route.params) {
                const userId  = route.params.userId;
                if (userId) {
                    userService.get(userId).then(user => {
                        if (user) {
                            setId(user.id);
                            setName(user.name);
                            setUsername(user.username);
                        }
                    });
                }
            } 
        }
    
        React.useEffect(() => fetchUser(), []);

        async function save() {
            if (!username || !username.trim()) {
                Alert.alert('O login é obrigatório!');
                return;
            }
            if (!password || password.trim() === '') {
                Alert.alert('A Senha é obrigatório!');
                return;
            }
            if (password !== confirmPassword) {
                Alert.alert('A Senha não confere!');
                return;
            }

            userService.update( id, name, username, password )
                .then(saved => {
                    navigation.navigate('Roles');
                })
                .catch(error => Alert.alert(error));
        }
       

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Alteração do Usuário {username}</Text>        
            <Text style={styles.label}>Nome:</Text>
            <TextInput value={name} style={styles.input} onChangeText={setName} />
            
            <Text style={styles.label}>Login:</Text>
            <Text style={styles.defaultname}>{username}</Text>
            
            <Text style={styles.label}>Senha:</Text>
            <TextInput value={password} style={styles.input} onChangeText={setPassword} secureTextEntry />

            <Text style={styles.label}>Confirmar Senha:</Text>
            <TextInput value={confirmPassword} style={styles.input} onChangeText={setConfirmPass} secureTextEntry />

            <Text style={styles.label}>Roles: </Text>
            

            <View style={styles.button}>
                <Button title="Salvar" onPress={save} />
                <Button title="Voltar" onPress={() => navigation.goBack()} />
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
    defaultname: {
        padding: 5,
        height: 40,
        fontSize: 22,
        width: Dimensions.get('screen').width - 40,
        textAlign: 'center'
    },
    button: {
        marginTop: 60,
        width: Dimensions.get('screen').width - 200,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})