import * as fs from "fs";
import * as path from "path";

export function createResponseForClient(dishes: string[], clientId: string, orderNumber: number): void {
	const dishCounts: Record<string, number> = {};
	for (const dish of dishes) {
        dishCounts[dish] = (dishCounts[dish] || 0) + 1;
    }
	const response = Object.entries(dishCounts).map(([dish, count]) => ({ dish, count }));
	const responsesDir = path.join(__dirname, "../data/responses");
	const fileName = `response_for_order_${orderNumber}_for_${clientId}.json`;
	const filePath = path.join(responsesDir, fileName);
	fs.writeFileSync(filePath, JSON.stringify(response, null, 2), "utf-8");
}
