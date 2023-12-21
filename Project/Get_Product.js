import { useEffect, useState } from "react"
import firestore from '@react-native-firebase/firestore';
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import Product from "./Product";
import { SelectList } from "react-native-dropdown-select-list";
import { SafeAreaView } from "react-native-safe-area-context";
import 'react-native-gesture-handler';

const Get_Product = ({navigation}) => {
    
    const [idDoc, setIdDoc] = useState([]);
    
    const [start,setStart] = useState('1900-01-01');
    const [end,setEnd] = useState((new Date().getFullYear+1)+'-01-01');


    const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const [getMonth, setMonth] = useState('01');
    const year = [2023, 2022, 2021, 2020, 2019, 2018, 2017,
         2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008,
          2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999,
           1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990,
            1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981,
             1980, 1979, 1978, 1977, 1976, 1975, 1974, 1973, 1972,
              1971, 1970, 1969, 1968, 1967, 1966, 1965, 1964, 1963,
               1962, 1961, 1960, 1959, 1958, 1957, 1956, 1955, 1954,
                1953, 1952, 1951, 1950, 1949, 1948, 1947, 1946, 1945,
                 1944, 1943, 1942, 1941, 1940, 1939, 1938, 1937, 1936,
                  1935, 1934, 1933, 1932, 1931, 1930, 1929, 1928, 1927,
                   1926, 1925, 1924, 1923, 1922, 1921, 1920, 1919, 1918,
                    1917, 1916, 1915, 1914, 1913, 1912, 1911, 1910, 1909,
                     1908, 1907, 1906, 1905, 1904, 1903, 1902, 1901, 1900];
    const [getYear,setYear] = useState(new Date().getFullYear()+1);
    const handleFind=()=>{
        setStart(getYear+'-'+getMonth+'-01')
        setEnd(getYear+'-'+getMonth+'-31')
        
    };
    
    useEffect(()=>{
        setStart('1900-01-01');
        setEnd((new Date().getFullYear+1)+'-01-01');
        setMonth(new Date().getMonth+1);
        setYear(new Date().getFullYear());
        firbase();
        
    },[])
    const handleShowAll=()=>{
        setStart('1900-01-01');
        setEnd((new Date().getFullYear+1)+'-01-01');
        setMonth(new Date().getMonth+1);
        setYear(new Date().getFullYear());
    }
    const firbase = () => {
        setIdDoc([]);
        firestore().collection('chainManufacture').get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    console.log(documentSnapshot.id);
                    setIdDoc(oldArray => [...oldArray, {
                        name: documentSnapshot.id
                    }]);

                })
            })
        console.log(idDoc);

        }
    const renderItem = ({ item }) => {
        const { name } = item;
        return <Product name={name} startDay={start} endDay={end}
        onpress={()=>navigation.navigate('Information',({data:item}))}/>
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.select}>
                <Text style={styles.selectText}>Order by: Month :</Text>
                <SelectList data={month} setSelected={setMonth} placeholder={getMonth}
                    inputStyles={styles.inputStyles} boxStyles={{ width: 60, height: 45 }} />
                <Text style={styles.selectText}> Year : </Text>
                <SelectList data={year} setSelected={setYear} placeholder={getYear}
                    inputStyles={styles.inputStyles} boxStyles={{ width: 80, height: 45 }} />
                <TouchableOpacity style={styles.find} onPress={()=>handleFind()}>
                    <Text style={styles.textFind}>Find</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containSignin}>
                <TouchableOpacity onPress={()=>handleShowAll()}>
                    <Text style={styles.textFind}>Show All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('AddProduct')}>
                    <Text style={[styles.textFind,styles.add]}>Add Product</Text>
                </TouchableOpacity>
            </View>
                <FlatList
                data={idDoc}
                renderItem={renderItem} />
            
        </SafeAreaView>
    )
};
const styles= StyleSheet.create({
    select:{
        flexDirection:'row',
        justifyContent:'space-evenly',
    },
    selectText:{
        fontSize:18,
        fontWeight:'bold',
        marginTop:10,
    },
    inputStyles:{
        alignItems: 'center',
        fontWeight:'bold',
    },
    container :{
        flex:1,
        marginHorizontal:5,
        marginTop:5,
        marginBottom:0,
    },
    find:{
        marginHorizontal:13,
        borderWidth:1,
        borderRadius:5,
        padding:10,
        width:60,
        height:40,
        backgroundColor:'darkgrey',
    },
    textFind:{
        fontWeight:'bold',
        fontSize:16,
        color:'red'
    },
    add:{
        marginLeft:'60%', 
        marginVertical:5, 
    },
    containSignin: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignSelf: 'baseline',
        marginLeft: 10,
    },
})
export default Get_Product;