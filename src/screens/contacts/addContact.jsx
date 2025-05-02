import {Text, View} from 'react-native';
import defaultScreenStyle from '../../styles/defaultScreenStyle';
import {Formik} from 'formik';
import addContactValidationSchema from '../../utils/addContachValidation';
import {Button, Input} from '@ui-kitten/components';
import {addPerson} from '../../service/personDataBase';

const AddContact = ({route}) => {
  const {group_id} = route?.params;

  return (
    <View style={defaultScreenStyle.container}>
      <Formik
        initialValues={{
          name: '',
          surname: '',
          phone: '',
          company: '',
          email: '',
          address: '',
          group_id: group_id,
        }}
        onSubmit={async values => {
          console.log(values);
          await addPerson(values)
            .then(result => {
              console.log(result);
            })
            .catch(err => {
              console.log(err);
            });
        }}
        validationSchema={addContactValidationSchema}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={{gap: 15}}>
            <Input
              label={'İsim'}
              placeholder="İsim Ekle"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              status={touched.name && errors.name ? 'danger' : 'basic'}
            />
            {touched.name && errors.name && (
              <Text style={{color: 'red'}}>{errors.name}</Text>
            )}

            <Input
              label={'Soyisim'}
              placeholder="Soyisim Ekle"
              onChangeText={handleChange('surname')}
              onBlur={handleBlur('surname')}
              value={values.surname}
              status={touched.surname && errors.surname ? 'danger' : 'basic'}
            />
            {touched.surname && errors.surname && (
              <Text style={{color: 'red'}}>{errors.surname}</Text>
            )}

            <Input
              label={'Telefon'}
              placeholder="Telefon Ekle"
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              status={touched.phone && errors.phone ? 'danger' : 'basic'}
            />
            {touched.phone && errors.phone && (
              <Text style={{color: 'red'}}>{errors.phone}</Text>
            )}

            <Input
              label={'Şirket'}
              placeholder="Şirket Ekle"
              onChangeText={handleChange('company')}
              onBlur={handleBlur('company')}
              value={values.company}
              status={touched.company && errors.company ? 'danger' : 'basic'}
            />
            {touched.company && errors.company && (
              <Text style={{color: 'red'}}>{errors.company}</Text>
            )}

            <Input
              label={'E-posta'}
              placeholder="E-posta Ekle"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              status={touched.email && errors.email ? 'danger' : 'basic'}
            />
            {touched.email && errors.email && (
              <Text style={{color: 'red'}}>{errors.email}</Text>
            )}

            <Input
              label={'Adres'}
              placeholder="Adres Ekle"
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
              status={touched.address && errors.address ? 'danger' : 'basic'}
            />
            {touched.address && errors.address && (
              <Text style={{color: 'red'}}>{errors.address}</Text>
            )}

            <Button onPress={handleSubmit}>Kaydet</Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AddContact;
