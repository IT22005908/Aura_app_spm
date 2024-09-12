import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CameraView } from 'expo-camera'

const productIdentifier = () => {

  

  return (
    <View style={styles.container}>
      <Text>Product Identifier</Text>
      <CameraView
        facing='back'
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={({data})=>{
            console.log("scanned ",data)
        }}
      />
    </View>
  )
}

export default productIdentifier

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