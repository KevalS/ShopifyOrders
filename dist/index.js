"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const json2csv_1 = __importDefault(require("json2csv"));
const flat_1 = require("flat");
const fields_1 = __importDefault(require("./fields"));
const axios_1 = __importDefault(require("axios"));
const orders_1 = require("./orders");
const constant_1 = __importDefault(require("./constant"));
var baseurl = "https://" + constant_1.default.apikey + ":" + constant_1.default.password + "@" + constant_1.default.shopname + ".myshopify.com";
var orders = [];
//get orders and store in csv
axios_1.default.get(baseurl + "/admin/orders.json").then(function (response) {
    if (response.status === 200) {
        var newList = [];
        for (var i = 0; i < response.data.orders.length; i++) {
            newList.push(flat_1.flatten(response.data.orders[i]));
        }
        orders = orders.concat(newList);
        orders.sort(function (a, b) {
            var c = new Date(a.created_at);
            var d = new Date(b.created_at);
            return c - d;
        });
        console.log("Received page :" + " - count: " + newList.length);
        console.log("orders len:" + orders.length);
        console.log();
        const opts = {
            fields: fields_1.default,
        };
        const csv = json2csv_1.default.parse(orders, opts);
        console.log("csv", csv);
        fs_1.default.writeFile("ShopifyOrders.csv", csv, function (err) {
            if (err)
                throw err;
            console.log("File saved");
        });
    }
});
//store orders
const orderService = new orders_1.Orders();
for (let i = 0; i < 4; i++) {
    console.log(orderService.getOrder());
    axios_1.default.post(baseurl + "/admin/orders.json", orderService.getOrder()).then(function (response) {
        if (response.status === 201) {
            console.log("Yay! order created....");
        }
    }).catch(err => {
        console.log("err is => ", err);
    });
}
//# sourceMappingURL=index.js.map