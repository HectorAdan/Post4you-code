
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import {
  SafeAreaView, View
} from 'react-native';
import { BottomNavigation, Text, Appbar, DefaultTheme  } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeRoute from './src/views/logged_in/HomeRoute';


const AddRoute = () => (
  <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
    <Text style={{fontSize:22}}>Add</Text>
  </View>
);

const ProfileRoute = () => (
  <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
    <Text style={{fontSize:22}}>Profile</Text>
  </View>
);

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'red',
    accent: '#f1c40f',
  },
};


function App () {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon:(props)=> <MaterialCommunityIcons {...props} name='fire' size={26} /> },
    { key: 'add', title: 'Add new', icon:(props)=> <MaterialCommunityIcons {...props} name='plus' size={26} />  },
    { key: 'profile', title: 'Profile', icon:(props)=> <MaterialCommunityIcons {...props} name='account' size={26} /> },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    add: AddRoute,
    profile: ProfileRoute,
  });

  return (
      <PaperProvider theme={theme}>
          <Appbar.Header  >
              <Appbar.Action icon="fire" onPress={() => { }} />
              <Appbar.Content title="Post4you" />
              <Appbar.Action icon="account-circle" onPress={() => { }} />
             
          </Appbar.Header>
          <BottomNavigation
            activeColor={"red"}
            navigationState ={{index, routes}}
            onIndexChange={setIndex}
            renderScene={renderScene}
            barStyle={{  backgroundColor: 'white' }}
          />
      </PaperProvider>
  );
};


export default App;
