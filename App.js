import React, {useState} from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {enableScreens} from 'react-native-screens'
import {NavigationContainer} from "@react-navigation/native"
import {Asset} from 'expo-asset'
import AppLoading from 'expo-app-loading'
import {loadAsync} from "expo-font"

import Router from "@routes/Router"
import {routerRef, isRouterReady} from "@routes/RouterService"
import {Provider} from "react-redux";
import {store} from "@storage/store";

enableScreens()
export default function App() {
  const [isReady, setIsReady] = useState(false)
  return !isReady ? (
    <AppLoading
      startAsync={prepareResources}
      onFinish={() => setIsReady(true)}
      onError={console.warn}
    />
  ) : (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer
          ref={routerRef}
          onReady={onRouterReady}
        >
          <Router/>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}

async function downloadAssets() {
  const images = [
    require('@assets/adaptive-icon.png'),
    require('@assets/icon.png'),
  ]

  const cacheImages = images.map(image => {
    return Asset.fromModule(image).downloadAsync()
  })
  return Promise.all(cacheImages)
}

async function loadFonts() {
  await loadAsync({
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
  })
}

async function prepareResources() {
  try {
    await downloadAssets()
    await loadFonts()
  } catch (e) {
  }
}

// Router callback
function onRouterReady() {
  isRouterReady.current = true
}

