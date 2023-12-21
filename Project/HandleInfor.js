import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"

const Handle_infor=({name,quantity,price})=>{
    return(
        <View style={styles.container}>
            <Text style={styles.textDecor}>Name : {name}</Text>
            <Text style={styles.textDecor}>Quantity : {quantity}</Text>
            <Text style={styles.textDecor}>Price : {price}</Text>
        </View>
    )
};
const styles=StyleSheet.create({
    container:{
        borderRadius:20,
        borderWidth:2,
        borderColor:'lightgreen',
        padding:10,
        margin:10,
    },
    
    textDecor:{
        fontWeight:'bold',
        fontSize:15,
    }
})
export default Handle_infor;