import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({
  name: 'myDataBase', //veri tabanına verilen isim
  location: 'default', // Burası önemli: Android'de default olarak ayarlanmalı
});

// SQLite table create for groups
// Burada tabloyu oluştururuz.
const createTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)',
        [],
        () => resolve(),
        (_, error) => reject(error),
      );
    });
  });
};

// SQLite get groups table
// Oluşan grup içindeki tabloları alırız
const getGroups = () => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM groups',
        [],
        (tx, results) => {
          const data = [];
          const rows = results.rows;
          for (let i = 0; i < rows.length; i++) {
            console.log(rows.item(i));
            data.push(rows.item(i));
          }
          resolve(data);
        },
        (tx, error) => {
          reject(error);
        },
      );
    });
  });
};

// SQLite add(post) groups table (insert)
// grup içine tablo ekleriz
const addNewGroups = title => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO groups (title) VALUES (?)',
        [title],
        (tx, res) => {
          console.log('Grup eklendi:', res.insertId);
          resolve(res.insertId);
        },
        (tx, error) => {
          console.log('Ekleme hatası:', error);
          reject(error);
        },
      );
    });
  });
};

// SQLite delete group by id
const deleteGroup = id => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        'DELETE FROM groups WHERE id = ?',
        [id],
        (tx, res) => {
          console.log('Grup silindi:', res.rowsAffected);
          resolve(res.rowsAffected);
        },
        (tx, error) => {
          console.log('Silme hatası:', error);
          reject(error);
        },
      );
    });
  });
};

// ✅ SQLite update group title by id
const updateGroup = (id, newTitle) => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        'UPDATE groups SET title = ? WHERE id = ?',
        [newTitle, id],
        (tx, res) => {
          console.log('Grup güncellendi:', res.rowsAffected);
          resolve(res.rowsAffected);
        },
        (tx, error) => {
          console.log('Güncelleme hatası:', error);
          reject(error);
        },
      );
    });
  });
};

export {createTable, getGroups, addNewGroups, deleteGroup, updateGroup};
