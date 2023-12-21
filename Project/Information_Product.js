import firestore from '@react-native-firebase/firestore';
import { useEffect,useState } from 'react';
import Handle_infor from './HandleInfor';
import { FlatList, View , ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import {Text} from 'react-native-paper';



const Information_Product=({route})=>{
    const{data} = route.params;
    const{name} = data;
    console.log(name);
    const [nameProduct,setNameProduct] = useState('');
    const [quantity,setQuatity] = useState('');

    const [DirectMaterial,setDirectMaterial] = useState([]);

    const [MOH,setMOH] = useState([]);
    
    const [Labour,setLabour] = useState([]);
    
    useEffect(()=>{
        handleInfor();
    },[])
    const handleInfor=()=>{
        firestore().collection('chainManufacture').doc(name).get()
        .then(docSnapshot=>{
            setNameProduct(docSnapshot.data().name),
            setQuatity(docSnapshot.data().quantity)
        });
        firestore().collection('chainManufacture').doc(name).collection('DicrectMaterial').get()
        .then(querySnapshot=>{
            querySnapshot.forEach(docSnapshot=>{
                setDirectMaterial(oldArray=>[...oldArray,docSnapshot.data()])
            })
        })
        firestore().collection('chainManufacture').doc(name).collection('ManufactureOverhead').get()
        .then(querySnapshot=>{
            querySnapshot.forEach(docSnapshot=>{
                setMOH(oldArray=>[...oldArray,docSnapshot.data()])
            })
        })
        firestore().collection('chainManufacture').doc(name).collection('Labour').get()
        .then(querySnapshot=>{
            querySnapshot.forEach(docSnapshot=>{
                setLabour(oldArray=>[...oldArray,docSnapshot.data()])
            })
        })
    }
    const renderitem=({item})=>{
        const {name,quantity,price} =item;
        return<Handle_infor name={name} quantity={quantity} price={price}/>
    }
    const VirtualizedList = ({children}) => {
        return (
            <FlatList
                data={[]}
                keyExtractor={() => "key"}
                renderItem={null}
                ListHeaderComponent={
                    <>{children}</>
                }
            />
        )
    }
    return(
        <VirtualizedList>
        <ScrollView style={styles.totalcontainer}>
            <Text style={styles.titleProduct}>Name Product : {nameProduct}</Text>
            <Text style={styles.titleProduct}>Quantity : {quantity}</Text>
            <Text style={styles.title}>Direct</Text>
            <FlatList
            data={DirectMaterial}
            renderItem={renderitem}
            />
            <Text style={styles.title}>Manufacture Overhead</Text>
            <FlatList
            data={MOH}
            renderItem={renderitem}
            />
            <Text style={styles.title}>Labour</Text>
            <FlatList
            data={Labour}
            renderItem={({item})=>(
                <View style={styles.container}>
                    
                    <Text style={styles.textDecor}>Position : {item.position}</Text>
                    <Text style={styles.textDecor}>Quantity : {item.quantity}</Text>
                    <Text style={styles.textDecor}>Salary : {item.salary}</Text>
                </View>    
            )}
            />
        
        </ScrollView>
        </VirtualizedList>
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
    },
    totalcontainer:{
        margin:5,
        
    },
    title:{
        fontWeight:'bold',
        fontSize:25,
    },
    titleProduct:{
        fontWeight:'bold',
        fontSize:20,
    },
})
export default Information_Product;