import { StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { RootStackScreenProps } from '../types';
import { View } from '../components/Themed';
import React from 'react';
import { Avatar, Button, Icon, Text } from '@ui-kitten/components';
import { Camera, } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import {ClockingContext} from '../store/ClockingStore'

export default function CameraScreen({route,navigation}: RootStackScreenProps<'Camera'>){
    const [hasPermission, setHasPermission]= React.useState<boolean|null>(null);
    const [type, setType] = React.useState(Camera.Constants.Type.front);
    const [faceData, setFaceData] = React.useState<FaceDetector.FaceFeature[]>([]);
    const [isBlink, setIsBlink] = React.useState<boolean>(false);
    const [isEyeClosed, setIsEyeClosed] = React.useState<boolean|null>(null);
    const [isEyeOpen, setIsEyeOpen] = React.useState<boolean|null>(null);
    const cameraRef = React.useRef<null|any>(null);
    const [imageURI, setImageURI] = React.useState<{}|null>(null);
    const {clockingDispatch} = React.useContext(ClockingContext);

    React.useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);

    React.useEffect(()=> {
      const eventListener = navigation.addListener('focus', () => {
        setImageURI(null);
        setIsBlink(false);
        setIsEyeClosed(false);
        setIsEyeOpen(false);
      });
      return eventListener
    })
    const handleFacesDetected = ({ faces }: {faces : FaceDetector.FaceFeature[]} ) => {
        setFaceData(faces)
        //console.log(faces);
    }
    React.useEffect(() =>{
        if(faceData.length < 1) return
        const face : FaceDetector.FaceFeature = faceData[faceData.length-1];
        if(face !== undefined && face.rightEyeOpenProbability!==undefined && face.leftEyeOpenProbability!==undefined){
            if(face.rightEyeOpenProbability < 0.1 && face.leftEyeOpenProbability < 0.1){
                setIsEyeClosed(true)
            }
            if(face.rightEyeOpenProbability > 0.8 && face.leftEyeOpenProbability > 0.8){
                setIsEyeOpen(true)
            }
            
        }
        if(isEyeClosed){
            if(isEyeOpen){
                setIsBlink(true)
            }
        }
    }, [faceData])
    React.useEffect(() => {
      takePicture();
    }, [isBlink]);

    const takePicture = async() => {
      if(!isBlink) return;
        new Promise((resolve)=>{
          setTimeout(resolve,500)
        }).then(async()=>{
          if(cameraRef!== null && cameraRef.current !== null){
            const data = await cameraRef.current.takePictureAsync();
            // console.log(data)
            if(data&&data.uri){
              setImageURI({uri: data.uri})
              clockingDispatch({type: 'TAKING_PHOTO', payload: {uri: data.uri}})
            }
            
          }
        }).then(()=>{
          navigation.push('ConfirmClocking')
        })
        
    }
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    if(imageURI) return(
      <View style={styles.container}>
        <Image source={imageURI} style={styles.imageFrame}/>
      </View>
    )
    else return (
      <View style={styles.container}>
        <Camera 
        ref={cameraRef}
        style={styles.camera} 
        type={Camera.Constants.Type.front}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.fast,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
            runClassifications: FaceDetector.FaceDetectorClassifications.all,
            minDetectionInterval: 100,
            tracking: true
        }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front  : Camera.Constants.Type.back );
              }}>
              <Text style={styles.text}> {isBlink? 'blinked' : 'not blink'} </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      margin: 20,
    },
    button: {
      flex: 0.1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
    imageFrame: {
      flex: 1,
    },
  });