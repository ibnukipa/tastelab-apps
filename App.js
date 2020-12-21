import React, {useEffect} from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {enableScreens} from 'react-native-screens'
import {NavigationContainer} from "@react-navigation/native"
import * as SplashScreen from 'expo-splash-screen'
import { Asset } from 'expo-asset'
import AppLoading from 'expo-app-loading'
import {useFonts} from "expo-font"

import Router from "@routes/Router"
import {routerRef, isRouterReady} from "@routes/RouterService"

enableScreens()
export default function App() {
  useEffect(() => {
    async function preventSplashHide() {
      await SplashScreen.preventAutoHideAsync()
    }

    preventSplashHide()
  }, [])

  const [isFontsLoaded] = useFonts({
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
  });

  return !isFontsLoaded ? <AppLoading /> : (
    <SafeAreaProvider>
      <NavigationContainer
        ref={routerRef}
        onReady={onRouterReady}
      >
        <Router/>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

// Put any code you need to prepare your app in these functions
async function performAPICalls() {
  //
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

// Router callback
function onRouterReady() {
  async function hideSplash() {
    await prepareResources()
    await SplashScreen.hideAsync()
  }

  hideSplash().then(() => {
    isRouterReady.current = true
  })
}

async function prepareResources() {
  try {
    await performAPICalls()
    await downloadAssets()
  } finally {
    try {
      await SplashScreen.hideAsync()
    } catch (e) {
      // if the splash screen already hidden
    }
  }
}
