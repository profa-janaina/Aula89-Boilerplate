import {React, useState, useEffect} from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import ProfileScreen from "../screens/Profile";
import LogoutScreen from "../screens/LogoutScreen";
import CustomSidebarMenu from "../screens/CustomSidebarMenu"; 

import {getDatabase, onValue, ref,update} from 'firebase/database';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    const[light_theme, setlight_theme] = useState(true); 
    //const[props, setProps] = useState(props); 

    const fecthUser = async () =>  {   
        let theme;
        const datab = getDatabase();    
        
        var userId = auth.currentUser.uid;     
        
        const userUidRef = ref(datab, '/users/' + userId);
        
        onValue(userUidRef, (snapshot) => {
           const data = snapshot.val();
           theme = data.current_theme;
        });
         
         theme === 'light' ? setlight_theme(true) : setlight_theme(false);       
    }
  
    useEffect(() =>{
        fecthUser();
    }, [])
    
    let props = props;

    return(
        <Drawer.Navigator
        screenOptions={{
            drawerActiveTintColor: '#e91e63',
            drawerInactiveTintColor: light_theme ? '#000000' : '#ffffff',
            drawerItemStyle: {marginVertical: 5}, 
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
        >
            <Drawer.Screen name="Tela Inicial" component={StackNavigator} options={{unmountOnBlur: true}}/>
            <Drawer.Screen name="Perfil" component={ProfileScreen} options={{unmountOnBlur: true}}/>
            <Drawer.Screen name="Sair" component={LogoutScreen} options={{unmountOnBlur: true}}/>
        </Drawer.Navigator>
    );
};

