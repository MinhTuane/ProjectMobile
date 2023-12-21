import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import {VictoryAxis,VictoryBar,VictoryChart,VictoryTheme,VictoryLabel} from 'victory-native';
import firestore from'@react-native-firebase/firestore';
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { TouchableOpacity } from "react-native-gesture-handler";

const Product=({name,startDay,endDay,onpress})=>{
   const [data,setData] = useState([]);
   const[nameProduct,setNameProduct] = useState('');
   useEffect(()=>{
     getProduct();
   },[startDay,endDay])
    const getProduct=()=>{
      setData([]);  
      firestore().collection('chainManufacture').doc(name).collection('Product').where("date",">=",startDay).where("date","<",endDay).orderBy('date').get()
      .then(querySnapshot=>{
          querySnapshot.forEach(docSnapshot=>{
              setData(oldArray=>[...oldArray,docSnapshot.data()]);
              console.log(docSnapshot.data());
          })
      })
      firestore().collection('chainManufacture').doc(name).get()
      .then(docSnapshot=>{
        setNameProduct(docSnapshot.data().name);
      })
    }
    return(
        <TouchableOpacity style={styles.containList} onPress={onpress}>
            <VictoryChart
       
        theme={VictoryTheme.material}
        domainPadding={30}
      >
        <VictoryAxis
          tickFormat={(date)=>DateTime.fromISO(date).toLocaleString({day:'numeric',month:'short'})
  
          }
          tickLabelComponent={
            <VictoryLabel angle={-90} textAnchor="end"/>
          }
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (`${x }`)}
        />
        <VictoryBar
        style={{
          data: { fill: "#c43a31" }
        }}
        events={[{
          target: "data",
          eventHandlers: {
            onClick: () => {
              return [
                {
                  target: "data",
                  mutation: (props) => {
                    const fill = props.style && props.style.fill;
                    return fill === "black" ? null : { style: { fill: "black" } };
                  }
                }
              ];
            }
          }
        }]}
          data={data}
          x="date"
          y="quantity"
        />
      </VictoryChart>
      <Text style={styles.title}>{nameProduct}</Text>
        </TouchableOpacity>
    )
};
const styles= StyleSheet.create({
  title:{
    alignSelf:'center',
    fontSize:30,
    fontWeight:'bold',
    color:'red',
  },
  containList:{
    marginVertical:10,
    borderRadius:10,
    borderWidth:2,
    borderColor:'red',
},
})
export default Product;