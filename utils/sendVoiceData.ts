export async function sendVoiceData(text:string):Promise<string>{

    console.log("Passing the data to the server",text)

    try{
       console.log("trying to send details",text);
      const res  = await fetch('http://10.0.2.2:3000/voicerecognition',{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({
           text
        })
        
      })
      if(res){
         let response = await res.text();
         console.log("Connected / Response ",response)
         return response;
      }
      else{
         return "Connection error please try again";
      }
    
    
    } catch(error){
    
      console.log(error);
      return "We are facing a server error we will soon fix this issue. Be patient and sorry for any inconveniance"
    }


}