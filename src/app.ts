import { Administrator } from "./classes/Administrator";
import { Kitchen } from "./classes/Kitchen";
import { Storage } from "./classes/Storage";
import { Waiter } from "./classes/Waiter";
import type { Dish } from "./types/dishData";
import { dishesFile, maxCapacity, orderFile } from "./constants";
import { dishesParser } from "./services/parsers/dishesParser";
import { fillStorage } from "./services/fillStorage";


export class App {
    private recipeBook: Dish[];
    private storage: Storage;
    private kitchen: Kitchen;
    private waiter: Waiter;
    private administrator: Administrator;

    constructor() {
        this.recipeBook = dishesParser(dishesFile);
        this.storage = new Storage();
        this.kitchen = new Kitchen(this.storage, this.recipeBook);
        this.waiter = new Waiter(this.kitchen, this.recipeBook);
        this.administrator = new Administrator(this.waiter, maxCapacity);
    }

    run(): void {
        fillStorage(this.storage);
        this.administrator.acceptOrder(orderFile);
    } 
}
