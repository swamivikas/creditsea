
# credit sea dashboard connecting application from frontend

## Technologies used 
### 1. Typescript with Nodejs
### 2. PostgreSQL
### 3. Javascript

# To run locally 

## Download the repo and install all dependencies and setup your database credentials 

```

npm i

```
### to build 
```
npm run build
```
### to run 
```
npm run start
```




# I have created 5 API Endpoints including the data coming from Frontend now lets see how these endpoints are working 

## 1. get all loan request for a user
### it is a GET request and the call will be like this 
### http://localhost:3000/users/{user :id}/loan_requests
### i have attached postman request image 

![Screenshot 2024-09-15 114858](https://github.com/user-attachments/assets/b71e226f-a2d7-4d93-97c2-091539a6e938)



## 2. Create a New Loan Request for a User
### it is a POST request and the call will be like this 
### http://localhost:3000/users/{user :id}/loan_requests
### i have attached postman request image 

![Screenshot 2024-09-15 114843](https://github.com/user-attachments/assets/91dfd65c-28ce-4ced-8958-ff67b1663309)






## 3. Get All Loan Requests (Admin/Verifier)
### it is a GET request and the call will be like this 
### http://localhost:3000/loan_requests
### i have attached postman request image 



![Screenshot 2024-09-15 114958](https://github.com/user-attachments/assets/3ed8a733-11b8-44a8-b3fa-bc9ab5ac05f7)





## 4. Update the Status of a Loan Request (Admin/Verifier)
### it is a PUT request and the call will be like this 
### http://localhost:3000/loan_requests/{user : id}
### i have attached postman request image 


![Screenshot 2024-09-15 115307](https://github.com/user-attachments/assets/cc1582d7-0ac9-4946-a7a4-c8a79de19f16)






## 5. Get Loan Statistics (Admin Dashboard)
### it is a GET request and the call will be like this 
### http://localhost:3000/analytics/loans
### i have attached postman request image 



![Screenshot 2024-09-15 120327](https://github.com/user-attachments/assets/1cd63099-3c66-421c-a1ac-63e316d45b60)
