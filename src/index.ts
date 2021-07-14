import fs from "fs";
import json2csv from "json2csv";
import _ from "underscore";
import { flatten } from "flat";
import fields from "./fields";
import axios from "axios";
import { Orders } from "./orders";
import constant from "./constant";

var baseurl =
  "https://" + constant.apikey + ":" + constant.password + "@" + constant.shopname + ".myshopify.com";
var orders: any[] = [];

//get orders and store in csv
axios.get(baseurl + "/admin/orders.json").then(function (response) {
    if (response.status === 200) {
      var newList = [];
      for (var i = 0; i < response.data.orders.length; i++) {
        newList.push(flatten(response.data.orders[i]));
      }

      orders = orders.concat(newList);
      orders.sort(function(a, b) {
        var c: any = new Date(a.created_at);
        var d: any = new Date(b.created_at);
        return c - d;
    });
      console.log("Received page :" + " - count: " + newList.length);
      console.log("orders len:" + orders.length);
      console.log();

      const opts = {
        fields: fields,
      };
      const csv = json2csv.parse(orders, opts);

      console.log("csv", csv);

      fs.writeFile("ShopifyOrders.csv", csv, function (err) {
        if (err) throw err;
        console.log("File saved");
      });
    }
  }
);

//store orders
const orderService = new Orders();
for(let i = 0; i < 4; i++) {
  console.log(orderService.getOrder());
  axios.post(baseurl + "/admin/orders.json", orderService.getOrder()).then(
    function (response) {
      if (response.status === 201) {
        console.log("Yay! order created....");
      }
    }
  ).catch(err => {
    console.log("err is => ", err);
  })
}