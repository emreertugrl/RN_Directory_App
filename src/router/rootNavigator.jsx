import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContactList from '../screens/contacts';
import {ADDCONTACT, CONTACTDETAIL, CONTACTLIST, GROUPS} from '../utils/routes';
import ContactDetail from '../screens/contacts/contactDetail';
import AddContact from '../screens/contacts/addContact';
import Groups from '../screens/groups';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={GROUPS} component={Groups} />
      <Stack.Screen name={CONTACTLIST} component={ContactList} />
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name={CONTACTDETAIL}
        component={ContactDetail}
      />
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name={ADDCONTACT}
        component={AddContact}
      />
    </Stack.Navigator>
  );
}
