import DatabaseObject from './databaseObject';

export default class Item extends DatabaseObject {
  static get name() {
    return 'Item';
  }
}
