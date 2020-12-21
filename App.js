import React, {useEffect} from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {enableScreens} from 'react-native-screens'
import {NavigationContainer} from "@react-navigation/native"
import * as SplashScreen from 'expo-splash-screen'
import { Asset } from 'expo-asset'

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

  return (
    <NavigationContainer
      ref={routerRef}
      onReady={onRouterReady}
    >
      <SafeAreaProvider>
        <Router/>
      </SafeAreaProvider>
    </NavigationContainer>
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
  ];

  const cacheImages = images.map(image => {
    return Asset.fromModule(image).downloadAsync();
  });
  return Promise.all(cacheImages);
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
