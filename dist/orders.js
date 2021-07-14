"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const randomGenerator_1 = __importDefault(require("./randomGenerator"));
const name = randomGenerator_1.default.name.split(" ");
const firstName = name[0];
const lastName = name.length > 1 ? name[1] : "";
class Orders {
    getOrder() {
        const order = {
            "order": {
                "line_items": [
                    {
                        "variant_id": 40849385291945,
                        "quantity": 1
                    }
                ],
                "customer": {
                    "first_name": firstName,
                    "last_name": lastName,
                    "email": firstName + lastName + "@example.com"
                },
                "financial_status": "partially_paid"
            }
        };
        return order;
    }
}
exports.Orders = Orders;
//# sourceMappingURL=orders.js.map