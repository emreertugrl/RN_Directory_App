import {View, Text, SafeAreaView, FlatList} from 'react-native';
import dScreen from '../../styles/defaultScreenStyle';
import {Button} from '@ui-kitten/components';
import {Add, ArrowLeft2, UserCirlceAdd} from 'iconsax-react-nativejs';
import Colors from '../../theme/colors';
import {useEffect} from 'react';
import {getPersons} from '../../service/personDataBase';
import ContactItem from '../../components/contacts/contactItem';
import {ADDCONTACT} from '../../utils/routes';
import {useDispatch, useSelector} from 'react-redux';
import {setContacts} from '../../store/slice/contactsSlice';

const ContactList = ({route, navigation}) => {
  const {item} = route?.params || {};
  const backScreen = route?.name;
  const {contacts} = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    getPersons(item.id)
      .then(res => dispatch(setContacts(res)))
      .catch(err => console.log(err));
  }, []);

  return (
    <SafeAreaView style={dScreen.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          accessoryLeft={<ArrowLeft2 color={Colors.BLUE} />}
          onPress={() => navigation.goBack()}
          style={{}}
          appearance="ghost"
          size="medium">
          {backScreen}
        </Button>
        <Button
          onPress={() => navigation.navigate(ADDCONTACT, {group_id: item.id})}
          appearance="ghost"
          size="medium">
          <Add size={30} />
        </Button>
      </View>
      <Text style={{fontSize: 35, fontWeight: 'bold', marginVertical: 10}}>
        {item.title}
      </Text>
      <FlatList
        contentContainerStyle={{flex: contacts.length < 1 && 1}}
        data={contacts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ContactItem item={item} />}
        ListEmptyComponent={
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 25,
            }}>
            <UserCirlceAdd size={100} />
            <Text style={{fontSize: 30, fontWeight: '500'}}>
              Henüz kayıtlı kişi yok.
            </Text>
            <Button
              onPress={() =>
                navigation.navigate(ADDCONTACT, {group_id: item.id})
              }
              size="large"
              appearance="ghost">
              Kişi ekle
            </Button>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default ContactList;
