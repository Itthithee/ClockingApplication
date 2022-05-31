import { StyleSheet, ImageBackground, Image } from 'react-native';
import { RootStackScreenProps } from '../types';
import { View } from '../components/Themed';
import React from 'react';
import { Avatar, Button, Icon, Text } from '@ui-kitten/components';
import {ClockingContext} from '../store/ClockingStore'
// import {Svg} from 'expo';

const image = { uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"}
export default function PersonalInfoScreen({route,navigation}: RootStackScreenProps<'PersonalInfo'>){
    const {clockingState,clockingDispatch} = React.useContext(ClockingContext)
    const { userData } =  clockingState
    const CheckIcon = (props : any)=>(
        <Icon {...props} name="checkmark-circle-outline" />
    )
    return (
        <View style={styles.container}>
        <ImageBackground source={null} resizeMode="cover" style={styles.top}>
            <Image source={image} style={styles.avatar}/>
            <Text style={styles.title}>{`${userData.name}`}</Text>
            <View style={styles.infoContainer}>
                <View style={styles.subInfo}>
                    <Text category='s2' style={styles.textInfo}>0</Text>
                    <Text category='label' style={styles.textInfoLabel}>Hrs</Text>
                </View>
                <View style={styles.verticalLine}></View>
                <View style={styles.subInfo}>
                    <Text category='s2' style={styles.textInfo}>ผู้จัดการ</Text>
                    <Text category='label' style={styles.textInfoLabel}>Position</Text>
                </View>
            </View>
            <Button 
            status='basic'
            accessoryLeft={CheckIcon} 
            style={styles.clockButton}
            onPress={()=>navigation.push('Camera')}
            >
                Clock
            </Button>
            {/* <div class="custom-shape-divider-top-1653458896">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
                </svg>
            </div> */}
        </ImageBackground>
        <View></View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "5%",
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
    top: {
        flex: 0.45,
        backgroundColor: "#000000",
        justifyContent: "center",
        // borderWidth: 5,å
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        marginLeft: "auto",
        marginRight: "auto",
        //marginTop: "-%",
        borderRadius: 1000,
    },
    clockButton: {
        borderRadius: 10,
        marginLeft: "auto",
        marginRight: "auto",
        width: 200,
        marginTop: "5%",
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: '60%',
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "5%",
        height: 50,
        backgroundColor: 'rgba(255, 76, 76, 0.0)',
    },
    subInfo: {
        flex: 0.49,
        backgroundColor: 'rgba(255, 255, 255, 0.00)',
        justifyContent: 'center',
        
    },
    textInfo: {
        textAlign: 'center',
    },
    textInfoLabel: {
        textAlign: 'center',
        textAlignVertical: 'bottom',
        marginTop: 5,
    },
    verticalLine:{
        borderLeftWidth: 2,
        lineHeight:50,
        borderColor: '#fff'
    }
  });