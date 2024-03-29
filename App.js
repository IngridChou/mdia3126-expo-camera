import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Camera, CameraType } from 'expo-camera';


export default function App() {

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if(!permission) {
    //Camera permissions are still loading
    return <View />
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return(
      <View style={styles.container}>
        <Text style={{ textAlign: 'center'}}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission"/>
      </View>
      )
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraSize}>
        <Camera style={styles.camera} type={type}>
          <View styles={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toogleCameraType}>
              <Text styles={styles.text}>Flip camera</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  cameraSize: {
    width: 200,
    height: 200
  },
  camera: {
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  }
});
