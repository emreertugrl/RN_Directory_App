import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Colors from '../../theme/colors';
import {Profile2User, TickCircle} from 'iconsax-react-nativejs';
import {useState} from 'react';
import {addNewGroups} from '../../service/dataBase';

const AddItemInput = ({onUpdate, closeShowAdd}) => {
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <View style={{padding: 5}}>
        <Profile2User size={28} color={Colors.BLUE} />
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <TextInput placeholder="Liste adını giriniz" onChangeText={setText} />
        </View>
      </View>
      {text.length > 3 && (
        <TouchableOpacity
          onPress={() => {
            addNewGroups(text);
            setText('');
            onUpdate();
            closeShowAdd();
          }}
          style={{padding: 5, justifyContent: 'center', alignItems: 'center'}}>
          <TickCircle size={24} color={Colors.GREEN} variant="Bold" />
        </TouchableOpacity>
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

export default AddItemInput;
