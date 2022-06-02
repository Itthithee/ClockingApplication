import { StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { RootStackScreenProps } from '../types';
import { View } from '../components/Themed';
import React from 'react';
import { Avatar, Button, Icon, Text } from '@ui-kitten/components';
import {ClockingContext} from '../store/ClockingStore'

export default function ConfirmClockingScreen({navigation}: RootStackScreenProps<'ConfirmClocking'>){
    const {clockingState} = React.useContext(ClockingContext);
    
    return(
        <View style={styles.container}>
            <Image source={clockingState.imageURI} style={styles.imageFrame}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
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
      flex: 0.4,
    },
  });