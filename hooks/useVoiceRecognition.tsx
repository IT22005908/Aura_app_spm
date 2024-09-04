import Voice,{SpeechErrorEvent,SpeechResultsEvent} from "@react-native-voice/voice"
import { useCallback, useEffect, useState } from "react";

interface IState{
    recognized: string;
    pitch:string;
    error:string;
    end:string;
    started:string;
    results:string[];
    partialResults:string[];
    isRecording:boolean;
}

export const useVoiceRecognition =()=>{
   const[state,setState] = useState<IState>({
    recognized:"",
    pitch:"",
    error:"",
    end:"",
    started:"",
    results:[],
    partialResults:[],
    isRecording:false
    })

   const resetState = useCallback(() =>{
     setState({
        recognized:"",
        pitch:"",
        error:"",
        end:"",
        started:"",
        results:[],
        partialResults:[],
        isRecording:false
    })
   },[setState])
   
   const startRecognizing = useCallback(async() =>{
    // erase somthing if we had before 
    resetState();
    try{
      console.log("Debugger started ",Voice);
       await Voice.start('en-US');
       
    }
    catch(error){
      console.error("Voice Recognition Error:", error);
      if (error instanceof Error) {
          console.error("Error Message:", error.message);
          console.error("Error Stack:", error.stack);
      } else {
          console.error("Unknown Error:", error);
      }
    }
  },[resetState])

  const stopRecognizing = useCallback(async() =>{
    try{
       await Voice.stop();
    }
    catch(error){
        console.error(error);
    }
  },[])

  const cancelRecognizing = useCallback(async() =>{  
    try{
       await Voice.cancel();
    }
    catch(error){
        console.error(error);
    }
  },[])

  const destroyRecognizing = useCallback(async() =>{
    
    try{
       await Voice.destroy();
    }
    catch(error){
        console.error(error);
    }
    resetState();
  },[resetState])


  useEffect(()=>{
    //when the start triggers 
    Voice.onSpeechStart = (e:any) =>{
        setState((prevState) =>({
            ...prevState,
            started:"recognizing started",
            isRecording:true
        }))
     }
     Voice.onSpeechRecognized =()=>{
       setState((prevState) =>({
           ...prevState,
           recognized:"speech recognized"
       }))
     }

     Voice.onSpeechEnd = (e:any) =>{
        setState((prevState) =>({
            ...prevState,
            end:"recognizing ended",
            isRecording:false
        }))
     }

     Voice.onSpeechError =(e:SpeechErrorEvent)=>{
        setState((prevState)=>({
            ...prevState,
            error:JSON.stringify(e.error)
        }))
     }
     
     Voice.onSpeechPartialResults =(e:SpeechResultsEvent)=>{
        setState((prevState)=>({
            ...prevState,
            partialResults:e.value!
        }))
     }
    

     Voice.onSpeechResults = (e:SpeechResultsEvent) =>{
        setState((prevState)=>({
            ...prevState,
            results:e.value!,
        }))
     }

     return()=>{
        Voice.destroy().then(Voice.removeAllListeners)
     }

  },[])





   return{
    state,
    setState,
    resetState,
    startRecognizing,
    stopRecognizing,
    cancelRecognizing,
    destroyRecognizing
   }
}