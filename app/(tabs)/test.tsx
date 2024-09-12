import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Tts from 'react-native-tts';

const test = () => {

const talkNow = async() =>{
     console.log("Tts availability",Tts)
     Tts.speak("Hello welcome to aura . Your dream shopping app")
}

  return (
    <View style={styles.container}>
      <Text>This is a test server</Text>
      <Pressable
          onPress={()=>{
            talkNow();
          }}
      ><Text>Touch here</Text></Pressable>
    </View>
  )
}

export default test

const styles = StyleSheet.create({
    container:{
      display:'flex',
      flex:1,
      alignItems:'center',
      textAlign:'center',
      justifyContent:'center',
      fontFamily:'Oxanium',
    }
})