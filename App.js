
import React, { useEffect, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { BottomNavigation, DefaultTheme  } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './src/views/Home';
import AddPost from './src/views/AddPost';
import Profile from './src/views/Profile';
import SignUp from './src/views/SignUp';
import SignIn from './src/views/SignIn';
import AsyncStorage from '@react-native-async-storage/async-storage';


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'red',
    accent: '#f1c40f',
  },
};

const defaultRoutes = [
  { key: 'home', title: 'Home', icon:(props)=> <MaterialCommunityIcons {...props} name='fire' size={26} /> },
  { key: 'login', title: 'Log In', icon:(props)=> <MaterialCommunityIcons {...props} name='login-variant' size={26} /> },
  { key: 'signup', title: 'Sign Up', icon:(props)=> <MaterialCommunityIcons {...props} name='account-plus' size={26} /> }
 
]

function App () {
  const [index, setIndex] = React.useState(0);

  const [routes,setRoutes] = React.useState(defaultRoutes);
  const [userData, setUserData]= useState(null);
  const [updatePost, setUpdatePost] = useState(false);

  useEffect(()=>{
    handleCheckUserLogin()
  },[])

  const handleCheckUserLogin = async()=>{
    const user_data = await AsyncStorage.getItem("@userData")
    if(user_data){
      setUserData(JSON.parse(user_data))
      setRoutes([
        { key: 'home', title: 'Home', icon:(props)=> <MaterialCommunityIcons {...props} name='fire' size={26} /> },
        { key: 'add', title: 'Add new', icon:(props)=> <MaterialCommunityIcons {...props} name='plus' size={26} />  },
        { key: 'profile', title: 'Profile', icon:(props)=> <MaterialCommunityIcons {...props} name='account' size={26}  /> }
      ])
    }else{
      setRoutes(defaultRoutes)
      setUserData(null)
      
    }
  }

  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'home':
        return <Home jumpTo={jumpTo} userData={userData} updatePost={updatePost} setUpdatePost={setUpdatePost} />;
      case 'add':
        return <AddPost jumpTo={jumpTo} userData={userData} setUpdatePost={setUpdatePost} />;
      case 'profile':
        return <Profile jumpTo={jumpTo} userData={userData} resetSession={resetSession} setUpdatePost={setUpdatePost} />;
    }
  }

  const renderSceneOut = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'home':
        return <Home jumpTo={jumpTo} userData={userData}  />;
      case 'signup':
        return <SignUp jumpTo={jumpTo} userData={userData} />;
      case 'login':
        return <SignIn jumpTo={jumpTo} userData={userData} resetSession={resetSession} />;
    }
  }

  const resetSession =()=>{
    handleCheckUserLogin();
  }


  return (
      <PaperProvider theme={theme}>
        <BottomNavigation
          activeColor={"red"}
          navigationState ={{index, routes}}
          onIndexChange={setIndex}
          renderScene={userData ? renderScene : renderSceneOut }
          barStyle={{  backgroundColor: 'white' }}
        />
      </PaperProvider>
  )
}

export default App;
