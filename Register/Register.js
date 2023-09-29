import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState,useRef } from "react";
import * as Animatable from "react-native-animatable";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import {senddatatobackendregisterapi} from "../Api/userapi";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {MaterialIcons} from "@expo/vector-icons";




const Register = (props) => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setaddress]=useState("");

  const [seepasword,setseepassword]=useState(false);
  const [seeconfirmpassword,setseeconfirmpassword]=useState(false);
  const [visible,setvisible]=useState('');
  const [confirmPasswordvisible,setconfirmPasswordvisible]=useState('');



  // error state for validations
  const [useralreadyexit,setuseralreadyexit]=useState('')
  const [errorfirstName, setErrorFirstName] = useState(false);
  const [errorlastname, setErrorLastName] = useState(false);
  const [erroremail, setErrorEmail] = useState(false);
  const [errormobileNo, setErrorMobileNo] = useState(false);
  const [errorpassword, setErrorpassword] = useState(false);
  const [errorconfirmPassword, setErrorConfirmPassword] = useState(false);
  const [erroraddress, setErroraddress]=useState(false);

const fname =/^[A-Za-z]+$/;
const mail=/[a-zA-Z0-9_]+@[a-zA-Z0-9._]+\.[a-zA-Z]{2,}$/;
const MoNO= /^\d{10}$/;
const pass= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;


function handleRegister(){
  if(
      fname.test(firstName) &&
      fname.test(lastname) &&
      mail.test(email) &&
      MoNO.test(mobileNo) &&
      pass.test(password) &&
      password == confirmPassword &&
      address.length>2
    ){
      register();
     } else{
      Alert.alert("All Fields are required ")
     }
}


  const register= async()=>{
   
                const data={
                  firstName,
                  lastname,
                  email,
                  mobileNo,
                  password,
                  confirmPassword,
                  address
                }
  
      let res = await senddatatobackendregisterapi(data);
      if(res.error){
        setuseralreadyexit(res.error);
      }
        else{
          if(res){
            alert('Sucessfuly Register');
            handleclearinput();
            props.navigation.navigate('Login')
            }
        }
        
  };

  //if regular expression is not true then this error will get

  const handlefirstname = (value)=>{
    setFirstName(value);
    setErrorFirstName(!fname.test(firstName.trim()))
  }
 
  const handlelastname = (value)=>{
    setLastName(value);
    setErrorLastName(!fname.test(lastname.trim()))
  }

  const handleEmail =(value)=>{
    setEmail(value.toLowerCase());
    setErrorEmail(!mail.test(email.toLowerCase()))
  }

  const handlemobileNo=(value)=>{
    setMobileNo(value);
    setErrorMobileNo(!MoNO.test(value.trim()))
  }
 
  const handlepassword=(value)=>{
    setpassword(value);
    setErrorpassword(!pass.test(password))
  }

  const handleconfirmPassword=(value)=>{
    setConfirmPassword(value);
    setErrorConfirmPassword(password !=value)
  }

  const handleaddress=(value)=>{
    setaddress(value);
    setErroraddress(address.length < 2);
  }


  const handleclearinput = () => {
      setFirstName(""),
      setLastName(""),
      setEmail(""),
      setMobileNo(""),
      setpassword(""),
      setConfirmPassword("");
      setaddress("");
      
      
// validation Error clear
      setuseralreadyexit("");
      setErrorFirstName(false);
      setErrorLastName(false);
      setErrorEmail(false);
      setErrorMobileNo(false);
      setErrorpassword(false);
      setErrorConfirmPassword(false);
      setErroraddress(false);

  };

  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();
  const ref_input7 = useRef();


  return (
    <View style={style.container}>
      <View style={style.headerbg}>
        <Animatable.Text animation="bounce" style={style.registertxt}>
          Register
        </Animatable.Text>
        <Animatable.View animation="fadeInUpBig" style={style.footerbg}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
              
            <View style={{ justifyContent: "center", alignItems: "center",marginBottom:responsiveHeight(40) }}>
              <View style={{flexDirection:'row',marginTop:responsiveHeight(3)}}>
              <Text style={{fontSize:responsiveFontSize(2)}}>Already Register?</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('Login')}>  
                            <Text style={{color:'red',fontSize:responsiveFontSize(2),paddingLeft:responsiveWidth(3)}}>Login</Text>
              </TouchableOpacity>
              </View>
             
              <View>
                <TextInput
                  placeholder="First Name"
                  value={firstName}
                  onChangeText={(value)=>{
                    handlefirstname(value)
                  }}
                  returnKeyType = {"next"}
                 // onChangeText={(text) => setFirstName(text)}
                  style={[style.inputboxstyle, style.inputtxtstyle]}
                  onSubmitEditing={() => ref_input2.current.focus()}

                />
                {errorfirstName ?(<Text style={{color:'red',width:responsiveWidth(55)}}>please enter valid First Name</Text>):null}

                <TextInput
                  placeholder="Last Name"
                  value={lastname}
                  onChangeText={(value)=>{
                    handlelastname(value)
                  }}  
                  returnKeyType = {"next"}              
                    style={[style.inputboxstyle, style.inputtxtstyle]}
                  onSubmitEditing={() => ref_input3.current.focus()}
                  ref={ref_input2}
                />
                {errorlastname ?(<Text style={{color:'red',width:responsiveWidth(55)}}>please enter valid last Name</Text>):null}

                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={(value)=>{
                    handleEmail(value)
                  }}  
                  onPressIn={()=> setuseralreadyexit(null)}
                  returnKeyType = {"next"}
                  keyboardType={"email-address"}
                  style={[style.inputboxstyle, style.inputtxtstyle]}
                  onSubmitEditing={() => ref_input4.current.focus()}
                  ref={ref_input3}
                />
               {erroremail ?(<Text style={{color:'red',width:responsiveWidth(55)}}>please enter valid email format</Text>):null}

                <TextInput
                  placeholder="Mobile Number"
                  value={mobileNo}
                  onChangeText={(value)=>{
                    handlemobileNo(value)
                  }}  
                  returnKeyType = {"next"}
                  style={[style.inputboxstyle, style.inputtxtstyle]}
                  onSubmitEditing={() => ref_input5.current.focus()}
                  ref={ref_input4}
                />
                {errormobileNo ?(<Text style={{color:'red',width:responsiveWidth(55)}}>Please enter valid mobile Number atleast 10 digits</Text>):null}

                <View style={{flexDirection:"row"}}>
                    <TextInput
                      placeholder="Password"
                      value={password}
                      onChangeText={(value)=>{
                        handlepassword(value)
                      }}  
                      secureTextEntry={!visible}
                      returnKeyType = {"next"}
                      style={[style.inputboxstyle, style.inputtxtstyle]}
                      onSubmitEditing={() => ref_input6.current.focus()}
                      ref={ref_input5}
                      />
                   <TouchableOpacity 
                          style={style.eyeposition}
                          onPress={()=>{
                            setvisible(!visible)
                            setseepassword(!seepasword)
                          }}>

                          <MaterialCommunityIcons 
                          name={seepasword === false ? 'eye-off-outline':'eye-outline'}
                          size={20}
                          color={'black'}
                          />
                    </TouchableOpacity>
                </View>

                {errorpassword ?(<Text style={{color:'red',width:responsiveWidth(55)}}>Password should contain atleast one
                 Upper case one Lower case one symbol and digits</Text>):null}
               
                <View style={{flexDirection:"row"}}>

                <TextInput
                  placeholder="Confirm password"
                  value={confirmPassword}
                  secureTextEntry={!confirmPasswordvisible}
                  returnKeyType = {"next"}
                  onChangeText={(value)=>{
                    handleconfirmPassword(value)
                  }}  
                  style={[style.inputboxstyle, style.inputtxtstyle]}
                  onSubmitEditing={() => ref_input7.current.focus()}
                   ref={ref_input6}
                   />
                     <TouchableOpacity 
                          style={style.eyeposition}
                          onPress={()=>{
                            setconfirmPasswordvisible(!confirmPasswordvisible)
                            setseeconfirmpassword(!seeconfirmpassword)
                          }}>

                          <MaterialCommunityIcons 
                          name={seeconfirmpassword === false ? 'eye-off-outline':'eye-outline'}
                          size={20}
                          color={'black'}
                          />
                    </TouchableOpacity>
                </View>
                {errorconfirmPassword ?(<Text style={{color:'red',width:responsiveWidth(50)}}>Password and confirm Password are not Matched</Text>):null}

                  <TextInput
                  placeholder="Address"
                  value={address}
                  onChangeText={(value)=>{
                    handleaddress(value)
                  }}  

                  style={[style.inputaddreessboxstyle, style.inputtxtstyle]}
                  ref={ref_input7}
                />
                {erroraddress ?(<Text style={{color:'red',width:responsiveWidth(55)}}>please enter valid Address</Text>):null}
              </View>
                <TouchableOpacity onPress={handleRegister}  style={style.submitbox}>
                  <Text style={style.submittxt}>Submit</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleclearinput}style={style.cancelbox}>
                  <Text style={style.submittxt}>Clear</Text>
                </TouchableOpacity>
                {useralreadyexit ? 
                <View style={style.invalidcrederriconstyle}>
                <View style={{flexDirection:'column',borderRightWidth:1,flex:1,justifyContent:'center',borderRightColor:'red',alignItems:'center'}}>
              <MaterialIcons name="warning" size={responsiveFontSize(3)} color={'red'} style={{paddingLeft:responsiveWidth(1),padding:responsiveWidth(1)}}/>
              <Text style={{color:"red",paddingBottom:responsiveWidth(1),paddingLeft:responsiveWidth(2)}}>Warning</Text>
              </View>
                <View style={style.invalidcrederr}>
                 <Text style={{color:'red',paddingLeft:responsiveWidth(1)}} >{useralreadyexit}</Text>

            </View>
            </View>
                :null}

            </View>
          </ScrollView>
        </Animatable.View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  headerbg: {
    flex: 1,
    paddingHorizontal: responsiveHeight(2),
  },
  footerbg: {
    flex: 4,
    backgroundColor: "white",
    borderTopLeftRadius: responsiveWidth(10),
    borderTopRightRadius: responsiveWidth(10),
    borderBottomRightRadius:responsiveWidth(10),
    borderBottomLeftRadius: responsiveWidth(10),
    // marginBottom: 30,
  },
  registertxt: {
    fontSize: responsiveFontSize(6),
    color: "white",
    fontWeight: "bold",
    marginLeft: responsiveWidth(10),
    marginTop: responsiveWidth(5),
    marginBottom: responsiveHeight(1),
  },
  inputboxstyle: {
    height: responsiveHeight(4),
    width: responsiveWidth(60),
    marginTop: responsiveHeight(3),
    borderRadius:responsiveWidth(3),
    borderWidth: responsiveWidth(0.4),
    borderColor: "skyblue",
  },
  inputtxtstyle: {
    fontSize: responsiveFontSize(2),
    paddingLeft: responsiveWidth(3),
  },
  inputaddreessboxstyle: {
    height: responsiveHeight(8),
    width: responsiveWidth(60),
    marginTop: responsiveHeight(3),
    borderRadius:responsiveWidth(5),
    borderWidth: responsiveWidth(0.4),
    borderColor: "skyblue",
  },
  submitbox: {
    height: responsiveHeight(5),
    width: responsiveWidth(40),
    borderRadius:responsiveWidth(5),
    marginTop: responsiveHeight(5),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#77d183",
  },
  submittxt: {
    fontSize: responsiveFontSize(2),
    color: "white",
    fontWeight: "bold",
    padding:responsiveWidth(1)
  },
  cancelbox: {
    height: responsiveHeight(5),
    width: responsiveWidth(40),
    borderRadius:responsiveWidth(5),
    marginTop: responsiveHeight(3),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#bf060c",
  },
  errormessagestyle:{
    color:'white',
    fontSize:responsiveFontSize(5),
    textAlign:'center',
    backgroundColor:"pink"
  },
  eyeposition:{
    right:responsiveWidth(8),
    top:responsiveWidth(8)
   },
   emailalreadyexit:{
    marginTop:responsiveHeight(5),
    color:'red',
    fontSize:responsiveFontSize(1.8),
  //  height:responsiveHeight(10),
   // width:responsiveWidth(40)
   },
   invalidcrederriconstyle:{
    flex:1,
    flexDirection:'row',
    marginTop:responsiveHeight(5),
    justifyContent:'center',
    alignItems:'center',
    borderColor:'red',
    borderWidth: responsiveWidth(0.4),
    height:responsiveHeight(10),
    width:responsiveWidth(60),
    borderRadius:responsiveWidth(5),
    marginBottom:responsiveHeight(10),
    backgroundColor:'#ededeb'
  },
  invalidcrederr:{
    color:'red',
    fontSize:responsiveFontSize(1.8),
    height:responsiveHeight(10),
    width:responsiveWidth(40),
    padding:responsiveWidth(1),
    paddingTop:responsiveWidth(5)
  },
});

export default Register;
