
/*import Pokemon from "./Screens/Pokemon";

export default function App() {
  return <Pokemon />;  
}
*/
// App.js

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Pokemon from './Screens/Pokemon';
import PokemonDetail from './Screens/PokemonDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="PokemonList" 
          component={Pokemon} 
  
        />
        <Stack.Screen 
          name="PokemonDetail" 
          component={PokemonDetail} 
          options={{
          title: 'Details',
          headerBackButtonDisplayMode: 'minimal',
          
       }}
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
