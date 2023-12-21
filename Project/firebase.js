import firestore from "@react-native-firebase/firestore";

const firbase=()=>{
    
    firestore()
.collection('chainManufacture')
.doc('Login')
.set({
    name:'Tuan',
    password:'123',
    email:'tuan@eiu.edu.vn'
})
.then(()=>{
    console.log("Add successful");
}
)
};
export default firbase;
