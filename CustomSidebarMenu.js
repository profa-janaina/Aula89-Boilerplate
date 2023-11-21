import {React, useState, useEffect} from 'react';
import { StyleSheet, View, SafeAreaView, Image} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import {getDatabase, onValue, ref,update} from 'firebase/database';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export default function CustomSidebarMenu(props) {
    const[light_theme, setlight_theme] = useState(true); 

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
        
    //let props = props;

    return(
        <View
        style={{
          flex: 1,
          backgroundColor: light_theme ? "white" : "#15193c"
        }}
      >
        <Image
          source={require("../assets/logo.png")}
          style={styles.sideMenuProfileIcon}
        ></Image>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
    )
}

const styles = StyleSheet.create({
    sideMenuProfileIcon: {
      width: RFValue(140),
      height: RFValue(140),
      borderRadius: RFValue(70),
      alignSelf: "center",
      marginTop: RFValue(60),
      resizeMode: "contain"
    }
  });