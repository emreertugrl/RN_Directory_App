import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({
  name: 'myDataBase',
  location: 'default',
});

// 👤 PERSONS tablosunu oluştur
const createPersonTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS persons (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(100),
          surname VARCHAR(100),
          phone VARCHAR(15),
          company VARCHAR(100),
          email VARCHAR(50),
          address VARCHAR(200),
          group_id INTEGER,
          FOREIGN KEY (group_id) REFERENCES groups(id)
        )`,
        [],
        () => resolve(console.log('tablo oluşturuldu')),
        (_, error) => reject(error),
      );
    });
  });
};

// 👤 PERSON ekle
const addPerson = ({
  name,
  surname,
  phone,
  company,
  email,
  address,
  group_id,
}) => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO persons 
        (name, surname, phone, company, email, address, group_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, surname, phone, company, email, address, group_id],
        (tx, res) => {
          console.log('Kişi eklendi:', res.insertId);
          resolve(res.insertId);
        },
        (_, error) => {
          console.log('Ekleme hatası:', error);
          reject(error);
        },
      );
    });
  });
};

// 👤 Tüm PERSON kayıtlarını getir
const getPersons = group_id => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM persons WHERE group_id = ?',
        [group_id],
        (tx, results) => {
          const data = [];
          const rows = results.rows;
          for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i));
          }
          resolve(data);
        },
        (_, error) => {
          console.log('getPersons hatası:', error);
          reject(error);
        },
      );
    });
  });
};

// 👤 Belirli bir PERSON sil
const deletePerson = id => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        'DELETE FROM persons WHERE id = ?',
        [id],
        (tx, res) => {
          console.log('Kişi silindi:', res.rowsAffected);
          resolve(res.rowsAffected);
        },
        (_, error) => {
          console.log('Silme hatası:', error);
          reject(error);
        },
      );
    });
  });
};

// 👤 PERSON güncelle
const updatePerson = (id, updatedFields) => {
  const {name, surname, phone, company, email, address, group_id} =
    updatedFields;
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        `UPDATE persons SET 
          name = ?, 
          surname = ?, 
          phone = ?, 
          company = ?, 
          email = ?, 
          address = ?, 
          group_id = ?
        WHERE id = ?`,
        [name, surname, phone, company, email, address, group_id, id],
        (tx, res) => {
          console.log('Kişi güncellendi:', res.rowsAffected);
          resolve(res.rowsAffected);
        },
        (_, error) => {
          console.log('Güncelleme hatası:', error);
          reject(error);
        },
      );
    });
  });
};

export {createPersonTable, addPerson, getPersons, deletePerson, updatePerson};
