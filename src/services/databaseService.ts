import fs from 'fs';
import path from 'path';

export class DatabaseService {
  private static db: any;

  static init(filePath: string) {
    this.db = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  static getData() {
    return this.db;
  }

  static setData(data: any) {
    this.db = data;
  }

  static saveToDisk(filePath: string) {
    fs.writeFileSync(filePath, JSON.stringify(this.db), 'utf8');
  }
}

// DATABASE
// const PATH = path.join(process.cwd(), 'db.json');
const PATH = `${process.cwd()}/src/services/db.json`;
DatabaseService.init(PATH);
