import * as fs from 'fs';
import * as path from 'path';
import type { Dish } from "../../types/dishData";

export function dishesParser(fileName: string): Dish[] {
    const filePath = path.join(__dirname, '../../data', fileName);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);
    return data as Dish[];
}
