# ExpressGuard - Delivery Customization App

This Shopify app contains delivery-customization extension that hides the Express Delivery if hazardous proudcts are added to cart. 

---

## Prerequisites

- We must run the **delivery customization mutation** before, then only the function logic can execute.  
- Once successfully installed and the mutation is executed, **Express (3 Business Days, Mon–Fri)** will appear as a delivery option if the customer has added products tagged with **Hazardous** (case-insensitive, e.g., `Hazardous` or `hazardous`) to their cart.

---

## Running the App

1. **Clone the repository** and install dependencies:

    ```bash
    npm install
    ```

2. Start the app (adjust command as needed):

    ```bash
    npm run dev
    ```

3. Ensure your app is authenticated and has access to the Shopify Admin API with permissions to create discounts.
   - ``` write_delivery_customizations ```

---

## Running the Discount Creation Mutation

You can create an automatic discount by sending the following GraphQL mutation:

### Mutation

```graphql
mutation {
  deliveryCustomizationCreate(deliveryCustomization: {
    functionId: "EXTENSION_FUNCTION_ID"
    title: "Add message to delivery options for state/province"
    enabled: true
  }) {
    deliveryCustomization {
      id
    }
    userErrors {
      message
    }
  }
}
```

