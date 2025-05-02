import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {height, width} from '../../utils/constants';
import Colors from '../../theme/colors';

const ContactDetail = ({route}) => {
  const {item} = route.params;

  const fields = [
    {label: 'Telefon', key: 'phone'},
    {label: 'E-posta', key: 'email'},
    {label: 'Şirket', key: 'company'},
    {label: 'Adres', key: 'address'},
  ];
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {item?.name[0]}
            {item?.surname[0]}
          </Text>
        </View>
        <Text style={styles.nameText}>
          {item.name} {item.surname}
        </Text>
      </View>
      {fields.map(field =>
        item[field.key] ? (
          <View key={field.key} style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
            <Text>{item[field.key]}</Text>
          </View>
        ) : null,
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: height * 0.4,
    width: width,
    padding: 10,
    backgroundColor: Colors.GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    width: width * 0.6,
    height: width * 0.6,
    backgroundColor: '#a0a0a0',
    borderRadius: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 100,
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: 35,
    color: Colors.WHITE,
    fontWeight: 'bold',
    marginTop: 20,
  },
  fieldContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    borderBottomWidth: 0.5,
    borderColor: Colors.GRAY,
  },
  fieldLabel: {
    fontSize: 18,
    fontWeight: '500',
  },
});
export default ContactDetail;
