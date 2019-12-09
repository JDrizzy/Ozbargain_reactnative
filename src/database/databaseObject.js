import Database from './database';

export default class DatabaseObject {
  static async find(id) {
    const realm = await Database.instance();
    const record = realm.objects(this.name).filtered(`id = ${id}`);
    if (record.length === 1) return record[0];
    return null;
  }

  static async all() {
    const realm = await Database.instance();
    const records = realm.objects(this.name).sorted('id', true);
    if (records.length > 0) return records;
    return null;
  }

  static async count() {
    const realm = await Database.instance();
    const records = realm.objects(this.name);
    return records.length;
  }

  static async create(params = {}) {
    const realm = await Database.instance();
    const record = realm.objects(this.name).filtered(`id = ${params.id}`);
    if (record.length === 0)
      realm.write(() => {
        realm.create(this.name, params);
      });
  }
}
