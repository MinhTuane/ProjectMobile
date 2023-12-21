import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import firestore from '@react-native-firebase/firestore'



const Login = ({navigation}) => {
    const [account,setAccount] =useState('');
    const [password, setPassword] = useState('');
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    
    const [data,setData] = useState([]);
    const handleLogin=()=>{
      firestore().collection('Login').doc(account).get()
      .then(querySnapshot=>{
        setData(querySnapshot.data());
        console.log(data);
      });
      if(data.password==password){
        navigation.replace('Product')
      }else{
        Alert.alert('Wrong Email or Password');
        setPassword('');
      }
      

      
      
        
}
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput style={styles.textInput} value={account} placeholder="Email" onChangeText={(text)=>setAccount(text)} />
            <TextInput style={styles.textInput} value={password} right={
                <TextInput.Icon
                    icon={isPasswordSecure ? 'eye':'eye-off'}
                    onPress={() => setIsPasswordSecure(!isPasswordSecure)}
                />
            }
                onChangeText={text => setPassword(text)}
                placeholder="Password" secureTextEntry={isPasswordSecure} />
            <View style={styles.containSignin}>
                <TouchableOpacity style={styles.forgotPassord}>
                    <Text>Forgot password ?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.forgotPassord, styles.signIn]} onPress={()=>navigation.navigate('Signin')}>
                    <Text>Sign in</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={()=>handleLogin()}>
                <Text style={styles.textButton}>Login</Text>
            </TouchableOpacity>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        alignItems: 'center',
    },
    title: {
        fontSize: 55,
        fontWeight: 'bold',
        marginTop: 90,
        marginBottom: 20,
        color: '#89ECDA',
        textShadowColor: '#89ECDA',
        textShadowRadius: 10,
        textShadowOffset: { width: 1, height: -1 },
    },
    textInput: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#89ECDA',
        width: '90%',

        marginTop: 10,
        fontSize: 18,
        paddingHorizontal: 5,
    },
    forgotPassord: {
        marginVertical: 10,
        marginLeft: '10',

    },
    button: {
        backgroundColor: '#89ECDA',
        marginVertical: 10,
        padding: 10,
        width: 120,
        borderRadius: 10,
        shadowColor: '#333',
        shadowOffset: { width: 1, height: -1 },
        shadowRadius: 10,
        shadowOpacity: 20,
        alignItems: 'center',
    },
    signIn: {
        marginLeft: 150,
    },
    textButton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    containSignin: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'baseline',
        marginLeft: 10,
    },

});
export default Login;