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

## Back-end Test Cases

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

## Front-end Test Cases
## Test Cases for CreateItem Component

| **Test Case**                     | **Description**                                                        | **Expected Result**                                                  | **Actual Result**                        | **Status** |
|----------------------------------|------------------------------------------------------------------------|-----------------------------------------------------------------------|------------------------------------------|------------|
| **Render Component**              | Ensure the `CreateItem` component is displayed correctly.                | The component should be visible with all input fields and the Create button. | Passed                                   | Pass       |
| **Check Initial Render**          | Verify the presence of input fields and the Create button.               | Input fields for Name, Price, Description, and Image URL, and the Create button should be visible. | Passed                                   | Pass       |
| **Test Name Input**               | Enter a valid name (e.g., "Test Item").                                 | The input field should accept and display the entered value.           | Passed                                   | Pass       |
| **Test Price Input**              | Enter a valid number (e.g., 100).                                       | The input field should accept and display the entered number.          | Passed                                   | Pass       |
| **Test Description Input**        | Enter a valid description (e.g., "This is a test item").               | The textarea should accept and display the entered description.       | Passed                                   | Pass       |
| **Test Image URL Input**          | Enter a valid image URL (e.g., "https://example.com/image.jpg").        | The input field should accept and display the entered URL.             | Passed                                   | Pass       |
| **Submit Form**                   | Click the Create button after entering valid data.                     | A network request should be made to the API endpoint.                  | Passed                                   | Pass       |
| **Check Network Request**         | Verify the request payload and response in the browser’s developer tools. | The request payload should match the form data, and the response should be checked. | Passed                                   | Pass       |
| **Check Success Message**         | Verify that a success message is displayed for a successful response.  | The message should indicate success (e.g., "Item created successfully"). | Passed                                   | Pass       |
| **Check Error Message**           | Verify that an error message is displayed for an unsuccessful response. | The message should indicate an error (e.g., "Error creating item").     | Passed                                   | Pass       |
| **Test Empty Fields**             | Submit the form with one or more fields left empty.                    | The form should handle missing values and show appropriate validation messages. | Passed                                   | Pass       |
| **Test Invalid Image URL**        | Enter an invalid image URL and submit the form.                         | The form should handle the invalid URL and show appropriate error messages or handle it gracefully. | Passed                                   | Pass       |

## Bonus Tasks

### Authentication
- **Note:** Authentication was not implemented for this project.

### Testing
- **Type:** Manual Testing
- **Details:** Test cases were executed manually to ensure the functionality of the `CreateItem` component, covering form inputs, submission, and validation.

### Deployment
- **Frontend (Vercel):** [https://junior-fullstack-exam.vercel.app/](https://junior-fullstack-exam.vercel.app/)
- **Backend (PythonAnywhere):** [https://jfsdexam.pythonanywhere.com/api/items](https://jfsdexam.pythonanywhere.com/api/items)




