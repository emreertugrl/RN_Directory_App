import * as Yup from 'yup';

// Yup doğrulama şeması
const addContactValidationSchema = Yup.object().shape({
  name: Yup.string().required('İsim gerekli'),
  surname: Yup.string().required('Soyisim gerekli'),
  phone: Yup.string().required('Telefon numarası gerekli'),
  company: Yup.string().required('Şirket adı gerekli'),
  email: Yup.string()
    .email('Geçersiz e-posta adresi')
    .required('E-posta gerekli'),
  address: Yup.string().required('Adres gerekli'),
});

export default addContactValidationSchema;
