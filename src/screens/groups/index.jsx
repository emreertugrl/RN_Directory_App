import {View, Text, SafeAreaView, FlatList} from 'react-native';
import defaultScreenStyle from '../../styles/defaultScreenStyle';
import {Button} from '@ui-kitten/components';
import {useEffect, useState} from 'react';
import {createTable, getGroups} from '../../service/dataBase';
import GroupItem from '../../components/groups/groupItem';
import AddItemInput from '../../components/groups/addItemInput';

const Groups = () => {
  const [groupList, setGroupList] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const refreshGroups = () => {
    getGroups()
      .then(groups => setGroupList(groups))
      .catch(err => console.log('Yenileme hatası:', err));
  };
  useEffect(() => {
    createTable()
      .then(refreshGroups)
      .catch(err => console.log('Hata:', err));
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
        data={groupList}
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
