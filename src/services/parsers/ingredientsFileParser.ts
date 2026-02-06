import * as fs from 'fs';
import * as path from 'path';

export function parseIngredients(fileName: string): string[] {
    const filePath = path.join(__dirname, "../../data", fileName)
    const data = fs.readFileSync(filePath, "utf-8");
    return data.split(/\r?\n/);
}
