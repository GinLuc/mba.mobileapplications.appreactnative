import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Alert, Button} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { roleService } from './services/roles.service';

const Stack = createNativeStackNavigator();


export default function RoleUpdateScreen ({navigation, route}) {

    

    const [ id, setId ] = React.useState(0);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function fetchRole() {
        if (route.params) {
            const roleId  = route.params.roleId;
            if (roleId) {
                roleService.getRole(roleId).then(role => {
                    if (role) {
                        setId(role.id);
                        setName(role.name);
                        setDescription(role.description);
                    }
                });
            }
        }
    }
    
    React.useEffect(() => fetchRole(), []);

    async function save() {
        if (!name || name.trim() === '') {
            Alert.alert('O Nome é obrigatório!');
            return;
        }
        if (!description || description.trim() === '') {
            Alert.alert('A Descrição é obrigatória!');
            return;
        }
        console.log(`dados salvos: ${name}, ${description} no id ${id}`)
        roleService.updateRole( id, name, description )
            .then(saved => {
                navigation.goBack();
            })
            .catch(error => Alert.alert(error));
    }
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Alteração da Role "{name}"</Text>              
           
            <Text style={styles.label}>Descrição:</Text>
            <TextInput style={styles.descriptionInput} onChangeText={setDescription} />
            
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