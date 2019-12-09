import Realm from 'realm';
import {ItemSchema} from './schema';

export default class Database {
  static realm = null;

  static async instance() {
    if (Database.realm === null) {
      Database.realm = await Database.open();
    }
    return Database.realm;
  }

  static open() {
    return new Promise((resolve, reject) => {
      Realm.open({
        schema: [ItemSchema],
        schemaVersion: 1,
        readOnly: false,
        deleteRealmIfMigrationNeeded: false
      })
        .then(realm => {
          resolve(realm);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static close() {
    if (Database.realm !== null) {
      Database.realm.close();
      Database.realm = null;
    }
  }
}
