This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

| **Test Case**                        | **Method** | **Endpoint**     | **Input Data**                                                                 | **Expected Output**                                                              | **Status Code** |
|--------------------------------------|------------|------------------|--------------------------------------------------------------------------------|----------------------------------------------------------------------------------|-----------------|
| 1. Read Items                        | GET        | `/api/items`     | None                                                                           | List of items or an empty list                                                   | 200             |
| 2. Create Item - Valid Input         | POST       | `/api/items`     | `{ "name": "Item 1", "description": "Description 1", "price": 10.0, "image": "image1.jpg" }` | `{"message": "Item created successfully"}`                                        | 201             |
| 3. Create Item - Missing Name        | POST       | `/api/items`     | `{ "description": "Description 1", "price": 10.0, "image": "image1.jpg" }`      | `{"message": "Invalid or missing 'name'"}`                                       | 400             |
| 4. Create Item - Negative Price      | POST       | `/api/items`     | `{ "name": "Item 2", "description": "Description 2", "price": -5.0, "image": "image2.jpg" }` | `{"message": "Invalid or missing 'price'"}`                                       | 400             |
| 5. Read Single Item - Valid ID       | GET        | `/api/items/1`   | None                                                                           | `{ "id": 1, "name": "Item 1", "description": "Description 1", "price": 10.0, "image": "image1.jpg" }` | 200             |
| 6. Read Single Item - Invalid ID     | GET        | `/api/items/999` | None                                                                           | `{"message": "Item not found"}`                                                   | 404             |
| 7. Update Item - Valid Input         | PUT        | `/api/items/1`   | `{ "name": "Updated Item", "description": "Updated Description", "price": 15.0, "image": "updated_image.jpg" }` | `{"message": "Item updated successfully"}`                                        | 200             |
| 8. Update Item - Missing Description | PUT        | `/api/items/1`   | `{ "name": "Updated Item", "price": 15.0, "image": "updated_image.jpg" }`       | `{"message": "Invalid or missing 'description'"}`                                | 400             |
| 9. Delete Item - Valid ID            | DELETE     | `/api/items/1`   | None                                                                           | `{"message": "Item deleted successfully"}`                                        | 200             |
| 10. Delete Item - Invalid ID         | DELETE     | `/api/items/999` | None                                                                           | `{"message": "Item deleted successfully"}` (even though the item doesn't exist)  | 200             |

