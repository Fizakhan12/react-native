import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, Title } from 'react-native-paper';
import { GestureHandlerRootView, NativeViewGestureHandler } from 'react-native-gesture-handler';
// import Icon from 'react-native-vector-icons/';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogIn } from 'react-native-feather';


const DrawerList = [
    {icon:'home-outline', label:'Home',navigateTo:'Home'},
    {icon:'account-multiple', label:'Profile',navigateTo:'Profile'},
    {icon:'account-group', label:'User',navigateTo:'User'},
    {icon:'login', label:'SignIn',navigateTo:'SignIn'}
];
const DrawerLayout = ({icon,label,navigateTo}) => {
    const navigation = useNavigation();
    return(
        <DrawerItem 
        icon={({color,size}) => (<Icon name={icon} color={color} size={size} />)}
        label={label}
        onPress={() => {
            navigation.navigate(navigateTo);
        }}
    />
        
    )
}
const DrawerData = props => {
    return DrawerList.map((el,i)=>{
        return(
            <DrawerLayout 
            key={i}
            icon={el.icon}
            label={el.label}
            navigateTo={el.navigateTo}/>
            // <Text>hi</Text>
        )
    })
    
}

const DrawerContent = (props) => {
    const navigation = useNavigation();
    function signOut(){
 
        AsyncStorage.setItem("isLoggedIn",""); 
        AsyncStorage.setItem("token",''); 
        navigation.navigate("Login");
    

    }
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <TouchableOpacity activeOpacity={0.8}>
                        <View style={styles.userInfoSection}>
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <Avatar.Image source={{ uri: "data:image/jpeg;base64,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" }}
                                    size={50}
                                    style={{ marginTop: 5 }} />
                                <View style={{ marginLeft: 10, flexDirection: 'column' }}>
                                    <Title style={styles.title}>Fiza Khan</Title>
                                    <Text numberOfLines={1}>
                                        mailto:fizakhan@gmail.com
                                    </Text>
                                </View>
                            </View>
                        </View>


                    </TouchableOpacity>
                    <View>
                        <DrawerData />
                    </View>
                </View>
            </DrawerContentScrollView>
            <View>
<DrawerItem 
icon={({color,size}) => {
    <Icon name="exit-to-app" color={color} size={size}/>
}}
label="Sign Out" onPress={()=>signOut()}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent:{
        flex:1
    },
    userInfoSection:{
        paddingLeft:20
    },
    title:{
        fontSize:16,
        marginTop:3,
        fontWeight:'bold'
    },
    caption:{
        fontSize:13,
        lineHeight:14
    }
})

export default DrawerContent;