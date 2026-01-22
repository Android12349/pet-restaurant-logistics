import * as fs from 'fs';
import * as path from 'path';
import type { Order, Client } from '../../types/orderData.ts';

export function parseOrderFile(fileName: string): { clients: Client[]; orders: Order[] } {
    const filePath = path.join(__dirname, '../../data', fileName);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);
    return {
        clients: data.clients as Client[],
        orders: data.order as Order[]
    };
}
