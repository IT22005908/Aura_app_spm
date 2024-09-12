import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition'
import { sendVoiceData } from '@/utils/sendVoiceData';
import {useCameraPermissions} from 'expo-camera'
import { Link } from 'expo-router';
import Tts from 'react-native-tts';


const index = () => {

const[btnColor,setBtnColor] = useState('#965e0c')
const[btnPColor,setBtnPColor] = useState('#965e0c')
const {state,startRecognizing,stopRecognizing,destroyRecognizing} = useVoiceRecognition();

//getting permission for the camera app
const[permission,requestPermission] = useCameraPermissions();
const isPermissionGranted  = Boolean(permission?.granted);

useEffect(() => {
  console.log("State:", state);
  sendResults();
}, [state]);

const sendResults =()=>{
    console.log("Send results has been called",state.results[0]) 
    if(!state.results[0])
      return;
    sendVoiceData(state.results[0]).then(result => Tts.speak(result));
    
    
}

return(
    <View style={styles.container}>
      <Text style={{
        marginTop:100,
        fontSize:50,
        fontFamily:'Oxanium',
        color:"#ffffff"
      }}>AURA</Text>
      <Text style={{fontSize:24,
        fontFamily:'Oxinium Bold',
        marginBottom:25,
        color:"#ffffff",
        textAlign:"center"
      }}>Empowering Your Shopping Experience</Text>

      <Pressable 
        onPressIn={()=>{
          setBtnColor('springgreen');
          startRecognizing();
        }}
        onPressOut={()=>{
          setBtnColor('#965e0c');
          stopRecognizing();
          
          
        }}
         style={{
          width:'80%',
          height:'20%',
          backgroundColor:btnColor,
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          borderRadius:20,
          marginBottom:50
         }}
      >
        <Text style={{fontSize:32,color:"#ffffff"}}>HOLD TO TALK</Text>
      </Pressable>
      
      <Link href={"/productIdentifier"} asChild> 
      <Pressable 
        onPressIn={()=>{
          setBtnPColor('orangered')
          requestPermission();
        }}
        onPressOut={()=>{
          setBtnPColor('#965e0c')
        }}
         style={{
          width:'80%',
          height:'20%',
          backgroundColor:btnPColor,
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          borderRadius:20
         }}
      >
        <Text style={{fontSize:30,color:"#ffffff"}}>PRODUCT IDENTIFIER</Text>
      </Pressable>
      </Link>
      <Text style={{fontSize:15 ,marginTop:50,padding:10,color:"#ffffff"}}>Dev Debugger :{JSON.stringify(state.results,null,2)}</Text>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
    container:{
      display:'flex',
      flex:1,
      alignItems:'center',
      textAlign:'center',
      justifyContent:'center',
      fontFamily:'Oxanium',
      backgroundColor:"#10298A",
    },
    btn :{
      width:'60%',
      height:'20%'
    }

    


})
