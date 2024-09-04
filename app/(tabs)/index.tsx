import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition'

const index = () => {

const[message,setMessage] = useState<String>("No inputs")
const[btnColor,setBtnColor] = useState('deepskyblue')

const {state,startRecognizing,stopRecognizing,destroyRecognizing} = useVoiceRecognition();

return(
    <View style={styles.container}>
      <Text style={{fontSize:60,
        fontFamily:'Poppins',
        fontWeight:'700'
      }}>AURA SHOP</Text>
      <Text style={{fontSize:24,
        fontFamily:'Poppins',
        fontWeight:'300',
        marginBottom:100
      }}>Welcome to the ultimate shopping experiance</Text>

      <Pressable 
        onPressIn={()=>{
          setBtnColor('springgreen');
          startRecognizing();
        }}
        onPressOut={()=>{
          setBtnColor('deepskyblue')
          stopRecognizing();
        }}
         style={{
          width:'80%',
          height:'20%',
          backgroundColor:btnColor,
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          borderRadius:20
         }}
      >
        <Text style={{fontSize:32}}>HOLD TO TALK</Text>
      </Pressable>
      <Text style={{fontSize:22 ,marginTop:50}}>User :{message}</Text>
      <Text style={{fontSize:15 ,marginTop:50,padding:10}}>Debugger :{JSON.stringify(state.results,null,2)}</Text>
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
      fontFamily:'Poppins',
      backgroundColor: 'skyblue',
    },
    btn :{
      width:'60%',
      height:'20%'
    }

    


})
