# kelp_assignment
##CSV to JSON API
This is a Node.js application that converts CSV files to JSON and uploads the data to a MongoDB database. The API uses Express.js for handling HTTP requests and csvtojson for converting CSV data to JSON.

##Installation
Clone the repository: git clone https://github.com/your-username/csv-to-json-api.git

Navigate to the project directory: cd csv-to-json-api

##Install dependencies: npm install

Create a .env file in the project root directory and set the following variables:

###env
Copy code
PORT=3000
MONGO_URI=mongodb://localhost:27017/myapp
CSV_FILE_PATH=data.csv
PORT is the port number that the server will listen on.
MONGO_URI is the URI for your MongoDB database.
CSV_FILE_PATH is the path to the CSV file that you want to upload.
Note: If you don't set these variables, the application will use the default values.

##Usage
Start the server: npm start

Send a POST request to the /upload endpoint with the CSV file in the request body. 
You can use any HTTP client to make the request. Here's an example using curl:
