import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import { AppStack } from './src/components';
import { useState } from 'react';
import { GluestackUIProvider, config } from '@gluestack-ui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './src/redux/store';

function App(): JSX.Element {
  const [colorMode, setColorMode] = useState("dark");
  return (
    <>

      <SafeAreaProvider>
        <SafeAreaView style={{
          ...styles.container,
          backgroundColor: colorMode === "light" ? "#E5E5E5" : "#262626",
        }}>
          <Provider store={store}>
            <GluestackUIProvider config={config.theme}>
              <AppStack />
            </GluestackUIProvider>
          </Provider>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // overflow: "hidden",
    marginTop: Platform.OS === 'android' ? 24 : 0
  },
});

export default App;
