import customer from "./randomGenerator"

const name = customer.name.split(" ");
const firstName = name[0];
const lastName = name.length > 1 ? name[1] : "";

export class Orders {
    getOrder(){
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
              "email": firstName + lastName +"@example.com"
            },
            "financial_status": "partially_paid"
          }
        };
        return order;
    }
}

