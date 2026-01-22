import { Administrator } from "./classes/Administrator";


const admin = new Administrator(2);
console.log(admin.acceptOrder("order1.json"));
