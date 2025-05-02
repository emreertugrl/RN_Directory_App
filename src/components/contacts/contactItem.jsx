import {Text, StyleSheet, Pressable} from 'react-native';
import Colors from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {CONTACTDETAIL} from '../../utils/routes';

const ContactItem = ({item}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate(CONTACTDETAIL, {item: item})}
      style={styles.container}>
      <Text style={styles.name}>
        {item.name} {item.surname}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: Colors.GRAY,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ContactItem;
