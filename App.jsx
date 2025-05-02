import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/router/rootNavigator';
export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ApplicationProvider>
  );
}
