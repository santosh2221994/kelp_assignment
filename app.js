// This code is used to convert CSV file to JSON format using the csvtojson library
// The csvtojson library converts the CSV file to JSON and returns a promise
// The promise resolves into an array of JSON objects
// The results are then mapped into an array of Mongoose objects
// The array of Mongoose objects is then inserted into the database

const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose')
const csvtojson = require('csvtojson')
require('dotenv').config()

const kelpSchema = new mongoose.Schema({}, { strict: false })
const kelpUserModel = mongoose.model('kelp_User', kelpSchema)

const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log(err)
    throw err
  })

app.post('/upload', (req, res) => {
  csvtojson()
    .fromFile(process.env.CSV_FILE_PATH)
    .then((results) => {
      const k_user = results.map((data) => {
        return new kelpUserModel(data)
      })
      kelpUserModel
        .insertMany(k_user)
        .then((result) => {
          let ageDistribution = {
            '0-19': 0,
            '20-40': 0,
            '41-60': 0,
            '>61': 0,
          }
          result.forEach((data) => {
            if (data.age < 20) ageDistribution['0-19']++
            else if (data.age < 41) ageDistribution['20-40']++
            else if (data.age < 61) ageDistribution['41-60']++
            else ageDistribution['>61']++
          })
          res.status(200).send({
            message: 'Data uploaded successfully',
            ageDistribution: ageDistribution,
          })
        })
        .catch((err) => {
          res.status(500).send(`Error uploading data: ${err}`)
        })
    })
    .catch((err) => {
      res.status(500).send(`Error converting CSV to JSON: ${err}`)
    })
})

app.get('/serverTest', (req, res) => {
  res.send('Server test success at ' + new Date())
})

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})
