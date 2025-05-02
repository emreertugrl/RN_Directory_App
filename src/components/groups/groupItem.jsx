import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
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
import {useEffect, useState} from 'react';
import {deleteGroup, updateGroup} from '../../service/dataBase';
import {useNavigation} from '@react-navigation/native';
import {CONTACTLIST} from '../../utils/routes';
import {getPersons} from '../../service/personDataBase';
import {useSelector} from 'react-redux';

const GroupItem = ({item, showEdit, onUpdate, closeShowEdit}) => {
  const [trash, setTrash] = useState(false);
  const [editText, setEditText] = useState(item.title);
  const [persons, setPersons] = useState(0);
  const {contacts} = useSelector(state => state.contacts);
  console.log(contacts);

  const navigation = useNavigation();

  useEffect(() => {
    getPersons(item.id).then(res => {
      setPersons(res);
      console.log(res);
    });
  }, []);

  return (
    <Pressable
      onPress={() => navigation.navigate(CONTACTLIST, {item: item})}
      style={styles.container}>
      {showEdit && (
        <TouchableOpacity
          onPress={() => setTrash(!trash)}
          style={styles.iconButton}>
          <CloseCircle size={24} color={Colors.RED} variant="Bold" />
        </TouchableOpacity>
      )}
      <View style={styles.iconWrapper}>
        {item.title == 'Tümü' ? (
          <People size={32} color={Colors.BLUE} />
        ) : (
          <Profile2User size={28} color={Colors.BLUE} />
        )}
      </View>
      <View style={styles.contentWrapper}>
        <View style={styles.titleWrapper}>
          {showEdit ? (
            <TextInput
              defaultValue={editText}
              onChangeText={setEditText}
              style={styles.textInput}
            />
          ) : (
            <Text style={styles.titleText}>{item?.title}</Text>
          )}
        </View>
        <View style={styles.personCountWrapper}>
          <Text style={styles.personCountText}>{persons?.length}</Text>
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
          style={styles.iconButton}>
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
            style={styles.iconButton}>
            <TickCircle size={24} color={Colors.GREEN} variant="Bold" />
          </TouchableOpacity>
        )
      )}
    </Pressable>
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
  iconButton: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    padding: 5,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
    marginHorizontal: 5,
    borderColor: Colors.GRAY,
    borderBottomWidth: 0.5,
    marginBottom: 5,
  },
  titleWrapper: {
    justifyContent: 'center',
    marginLeft: 10,
    flex: 1,
  },
  textInput: {
    fontSize: 16,
    fontWeight: '500',
    padding: 0,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
  },
  personCountWrapper: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  personCountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.GRAY,
    marginRight: 5,
  },
});

export default GroupItem;
