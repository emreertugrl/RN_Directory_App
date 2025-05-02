import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Colors from '../../theme/colors';
import {
  ArrowRight2,
  CloseCircle,
  People,
  Profile2User,
  TickCircle,
  Trash,
} from 'iconsax-react-nativejs';
import {useState} from 'react';
import {deleteGroup, updateGroup} from '../../service/dataBase';

const GroupItem = ({item, showEdit, onUpdate, closeShowEdit}) => {
  const [trash, setTrash] = useState(false);
  const [editText, setEditText] = useState(item.title);
  return (
    <View style={styles.container}>
      {showEdit && (
        <TouchableOpacity
          onPress={() => setTrash(!trash)}
          style={{padding: 5, justifyContent: 'center', alignItems: 'center'}}>
          <CloseCircle size={24} color={Colors.RED} variant="Bold" />
        </TouchableOpacity>
      )}
      <View style={{padding: 5}}>
        {item.title == 'Tümü' ? (
          <People size={32} color={Colors.BLUE} />
        ) : (
          <Profile2User size={28} color={Colors.BLUE} />
        )}
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 5,
          marginHorizontal: 5,
          borderColor: Colors.GRAY,
          borderBottomWidth: 0.5,
          marginBottom: 5,
        }}>
        <View
          style={{
            justifyContent: 'center',
            marginLeft: 10,
            flex: 1,
          }}>
          {showEdit ? (
            <TextInput defaultValue={editText} onChangeText={setEditText} />
          ) : (
            <Text style={{fontSize: 16, fontWeight: '500'}}>{item?.title}</Text>
          )}
        </View>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: Colors.GRAY}}>
            3
          </Text>
          <ArrowRight2 size={24} color={Colors.BLUE} />
        </View>
      </View>
      {showEdit && trash ? (
        <TouchableOpacity
          onPress={async () => {
            await deleteGroup(item.id);
            onUpdate();
            closeShowEdit();
          }}
          style={{padding: 5, justifyContent: 'center', alignItems: 'center'}}>
          <Trash size={24} color={Colors.RED} variant="Bold" />
        </TouchableOpacity>
      ) : (
        showEdit &&
        editText && (
          <TouchableOpacity
            onPress={async () => {
              await updateGroup(item.id, editText);
              onUpdate();
              closeShowEdit();
            }}
            style={{
              padding: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TickCircle size={24} color={Colors.GREEN} variant="Bold" />
          </TouchableOpacity>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    borderRadius: 10,
    padding: 5,
    marginVertical: 2,
  },
});

export default GroupItem;
