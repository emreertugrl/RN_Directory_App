import {View, Text, SafeAreaView, FlatList} from 'react-native';
import defaultScreenStyle from '../../styles/defaultScreenStyle';
import {Button} from '@ui-kitten/components';
import {useEffect, useState} from 'react';
import {createTable, getGroups} from '../../service/dataBase';
import GroupItem from '../../components/groups/groupItem';
import AddItemInput from '../../components/groups/addItemInput';
import {createPersonTable} from '../../service/personDataBase';
import {useDispatch, useSelector} from 'react-redux';
import {setGroups} from '../../store/slice/groupsSlice';
import {setContacts} from '../../store/slice/contactsSlice';

const Groups = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const {groups} = useSelector(state => state.groups);
  const dispatch = useDispatch();
  const refreshGroups = () => {
    getGroups()
      .then(groups => dispatch(setGroups(groups)))
      .catch(err => console.log('Yenileme hatası:', err));
  };
  useEffect(() => {
    const initialize = async () => {
      try {
        await createTable();
        await createPersonTable().then(() =>
          getGroups().then(contacts => dispatch(setContacts(contacts))),
        ); // burada tabloyu oluşturuyoruz
        refreshGroups(); // sonra grupları çekiyoruz
      } catch (err) {
        console.log('Hata:', err);
      }
    };

    initialize();
  }, []);

  return (
    <SafeAreaView style={defaultScreenStyle.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          onPress={() => {
            setShowEdit(!showEdit);
            setShowAdd(false);
          }}
          appearance="ghost"
          size="medium">
          {showEdit ? 'Tamam' : 'Düzenle'}
        </Button>
        <Button
          onPress={() => {
            setShowAdd(!showAdd);
            setShowEdit(false);
          }}
          appearance="ghost"
          size="medium">
          {showAdd ? 'Vazgeç' : 'Listeye Ekle'}
        </Button>
      </View>
      <Text style={{fontSize: 35, fontWeight: 'bold', marginVertical: 10}}>
        Liste
      </Text>

      <FlatList
        data={groups}
        ListFooterComponent={
          showAdd && (
            <AddItemInput
              closeShowAdd={() => setShowAdd(false)}
              onUpdate={refreshGroups}
            />
          )
        }
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <GroupItem
            item={item}
            closeShowEdit={() => setShowEdit(false)}
            showEdit={showEdit}
            onUpdate={refreshGroups}
          />
        )}
        ListEmptyComponent={<Text>Henüz grup yok.</Text>}
      />
    </SafeAreaView>
  );
};

export default Groups;
