# Task Management

### Here are some basic CRUD operation for **Task Management**.

**Like**, <br> 1) Create Task <br>2) Update Task <br>3) Get all Task <br>4) Get Pagination count of Task

### Set up

1. First clone it
2. After clone, run **`npm i`** for installing the package json
3. Run **`npm run create-table`** for Database creation
4. After all this, now run **`npm run dev`** for run the project

### For Guest Token Creation

Run **`npm run`** &nbsp; **guest-token** and it will print JWT Token on the console.<br>
To continue with hassle free login, you can create the Guest Token</br>
**NOTE:** &nbsp;Don't use Guest Token for <u>**signup**</u> and <u>**Login**</u> api<br>
<space>

### For Test Cases

Run **`npm run test`**

### API working structure:

1.  **Register yourself**

    **`ENDPOINT:`** &nbsp; /api/v1/signup

    **`METHOD:`** &nbsp; POST

    **`REQUEST`**

    ```
    {
        "name": "John",
        "email": "johndoe@email.com",
        "password": "IamJohn11@"
    }
    ```

    **`RESPONSE`**

    ```
    {
        "success": true,
        "message": "success",
        "data": {
            "id": 2,
            "name": "John",
            "email": "johndoe@email.com",
            "token": "eyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX53pU",
            "token_validity": "24 Hours"
        }
    }
    ```

    **`CURL:`**

           curl --location 'localhost:4000/api/v1/signup' \
         --header 'Content-Type: application/json' \
         --data-raw '{
             "name": "John",
             "email": "johndoe@email.com",
             "password": "IamJohn11@"
         }'

#####

2.  **Create Task**

    **`ENDPOINT:`** &nbsp; /api/v1/create-task

    **`METHOD:`** &nbsp; POST

    **`MANDATORY FIELDS:`** &nbsp; title

    **`REQUEST`**

    ```
      {
          "tasks": [
              {
                  "title": "task-1",
                  "description": "Description 1",
                  "scheduled_at": "2023-11-01"
              },
              {
                  "title": "task-2",
                  "description": "Description 2",
                  "scheduled_at": ""
              },
              {
                  "title": "task-3",
                  "description": "Description 3",
                  "scheduled_at": ""
              },
              {
                  "title": "task-4",
                  "description": "Description 4",
                  "scheduled_at": "2023-11-04"
              }
          ]
      }
    ```

    **`RESPONSE`**

    ```
      {
          "success": true,
          "message": "Task has been created successfully",
          "data": []
      }
    ```

    **`CURL:`**

         curl --location 'localhost:4000/api/v1/create-task' \
         --header 'Content-Type: application/json' \
         --header 'Authorization: Bearer eyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXvI' \
         --data '{
             "tasks": [
                 {
                     "title": "task-1",
                     "description": "Description 1",
                     "scheduled_at": "2023-11-01"
                 },
                 {
                     "title": "task-2",
                     "description": "Description 2",
                     "scheduled_at": ""
                 },
                 {
                     "title": "task-3",
                     "description": "Description 3",
                     "scheduled_at": ""
                 },
                 {
                     "title": "task-4",
                     "description": "Description 4",
                     "scheduled_at": "2023-11-04"
                 }
             ]
         }'

#####

3.  **Update Task**

    **`ENDPOINT:`** &nbsp; /api/v1/update-task

    **`METHOD:`** &nbsp; POST

    **`MANDATORY FIELDS:`** &nbsp; id

    **`REQUEST:`**

    ```
    {
        "id": 2,
        "title": "This is Long Task",
        "status": "completed_tasks",
        "scheduled_at": "2023-11-20 14:20:40",
        "description": "I will complete it at any cost2"
    }
    ```

    **`RESPONSE:`**

    ```
      {
          "success": true,
          "message": "Task has been updated successfully",
          "data": []
      }
    ```

    \*\*`CURL

         curl --location 'localhost:4000/api/v1/update-task' \
         --header 'Content-Type: application/json' \
         --header 'Authorization: Bearer eyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXvI' \
         --data '{
             "id": 2,
             "title": "This is Long Task",
             "status": "completed_tasks",
             "scheduled_at": "2023-11-20 14:20:40",
             "description": "I will complete it at any cost2"
         }'

#####

4.  **Get All Task**

    **`ENDPOINT:`** &nbsp; /api/v1/tasks

    **`METHOD:`** &nbsp; POST

    **`MANDATORY FIELDS:`** &nbsp; none

         This API will get all of the tasks according to the created by user.
         For Example, Suppose we have two User A and User B has created Four Tasks (TaskA, TaskB, TaskC & TaskD)
         `Task A` created by `User A`
         `Task B` created by `User A`
         `Task C` created by `User A`
         `Task D` created by `User B`
         then, it will show the tasks, according to the loggined user

    **NOTE:**

         1) In scheduled_at, created_at and updated_at we can pass date and date time. Format should be for only date YYYY-MM-DD and for the date time YYYY-MM-DD HH:MM:SS.
         2) For Pagination, by default limit set up to 5. If you haven't pass the total_item key in payload.

    ## FILTERS:

         filter by id
         filter by title
         filter by status (you can pass multiple status)
         filter by scheduled_at
         filter by created_at
         filter by updated_at

    **`REQUEST:`**

    ```
      {
          "id": 0,
          "title": "",
          "status": [
              "open_tasks",
              "completed_tasks"
          ],
          "scheduled_at": "",
          "created_at": "",
          "updated_at": "",
          "current_page": 1,
          "total_item": 3
      }
    ```

    **`RESPONSE:`**

    ```
      {
          "success": true,
          "message": "success",
          "data": [
              {
                  "id": 1,
                  "title": "task-1",
                  "status": "open_tasks",
                  "description": "Description 1",
                  "scheduled_at": "2023-11-01,00:00:00",
                  "created_at": "2023-09-27,10:06:28",
                  "updated_at": null
              },
              {
                  "id": 2,
                  "title": "This is Long Task",
                  "status": "completed_tasks",
                  "description": "I will complete it at any cost2",
                  "scheduled_at": "2023-11-20,14:20:40",
                  "created_at": "2023-09-27,10:06:28",
                  "updated_at": "2023-09-27,10:14:14"
              },
              {
                  "id": 3,
                  "title": "task-3",
                  "status": "open_tasks",
                  "description": "Description 3",
                  "scheduled_at": null,
                  "created_at": "2023-09-27,10:06:28",
                  "updated_at": null
              }
          ]
      }
    ```

    **`CURL:`**

         curl --location 'localhost:4000/api/v1/tasks' \
         --header 'Content-Type: application/json' \
         --header 'Authorization: Bearer eyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXvI' \
         --data '{
             "id": 0,
             "title": "",
             "status": [
                 "open_tasks",
                 "completed_tasks"
             ],
             "scheduled_at": "",
             "created_at": "",
             "updated_at": "",
             "current_page": 1,
             "total_item": 3
         }'

5.  **Task Pagination Count**

    **`ENDPOINT:`** &nbsp; /api/v1/tasks-pagination

    **`METHOD:`** &nbsp; POST

    **NOTE:**

        1) In status key, you can pass multiple status like, ["open_tasks", "completed_tasks", "inprogress_tasks"]
        2) This API will give you the whole count of status if you haven't passed the scheduled_at and if you passed the scheduled_at then you will get the status count according to that date.

    **`REQUEST:`**

    ```
      {
          "status": [
              "open_tasks",
              "completed_tasks",
              "inprogress_tasks"
          ],
          "scheduled_at": ""
      }
    ```

    **`RESPONSE:`**

    ```
      {
          "success": true,
          "message": "success",
          "data": {
              "open_tasks": 3,
              "inprogress_tasks": 0,
              "completed_tasks": 1
          }
      }
    ```

    **`CURL:`**

         curl --location 'localhost:4000/api/v1/tasks-pagination' \
         --header 'Content-Type: application/json' \
         --header 'Authorization: Bearer eyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXvI' \
         --data '{
             "status": [
                 "open_tasks",
                 "completed_tasks",
                 "inprogress_tasks"
             ],
             "scheduled_at": ""
         }'

####

7.  **Login (If JWT Token has expired)**

    **`ENDPOINT:`** &nbsp; /api/v1/login

    **`METHOD:`** &nbsp; POST

    **`MANDATORY FIELDS:`** &nbsp; email,&nbsp; password

    **`REQUEST:`**

    ```
    {
        "email": "johndoe@email.com",
        "password": "IamJohn11@"
    }
    ```

    **`RESPONSE:`**

    ```
    {
        "success": true,
        "message": "success",
        "data": {
            "id": 2,
            "name": "John",
            "email": "johndoe@email.com",
            "token": "eyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXvI",
            "token_validity": "24 Hours"
        }
    }
    ```

    **`CURL:`**

         curl --location 'localhost:4000/api/v1/login' \
         --header 'Content-Type: application/json' \
         --header 'Authorization: Bearer eyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXvI' \
         --data-raw '{
             "email": "johndoe@email.com",
             "password": "IamJohn11@"
         }'

### FOR ENV:

#### NOTE: If any changes to the variable name or adding extra variables in the `.env` &nbsp; file then, also change in the file `global.d.ts`

    SECRET_KEY: <pass the JWT Secret Key>;
    PORT: <pass the PORT number>;
    DB_HOST: <pass the MySql Database Hostname>;
    DB_USER: <pass the MySql Database Username>;
    DB_PASSWORD: <pass the MySql Database Password>;
    DB_NAME: <pass the MySql Database name>;
    DB_TABLE_NAME_1: <pass the table name for tasks>
    DB_TABLE_NAME_2: <pass the table name for users>
    API_ENDPOINT: <pass the api endpoint>
    GUEST_TOKEN:  <pass the guest token>
    GUEST_SECRET_NAME: <pass the guest secret name>
    GUEST_SECRET_EMAIL: <pass the guest email>
    GUEST_SECRET_PASSWORD: <pass the guest password>
