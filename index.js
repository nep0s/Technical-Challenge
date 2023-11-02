const express = require('express')
const sequelize = require('./src/db')
const Transfer = require('./src/model')
const router = require('./src/routes')
const controller = require('./src/controller')


const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true}));


(async () =>{
  try {
    await sequelize.sync(
      {force: false}
    );
    app.listen(process.env.EXTERNAL_PORT || 3000);
    console.log(`Server started on port ${process.env.EXTERNAL_PORT || 3000}`)
  } catch (error) {
    console.error(error);
  }
})()

app.get('/', (req, res) => {
  res.send('Transfers Server')
})

app.get('/token', async (req, res) => {
  token = await controller.getToken()
  res.send(token)
})

app.get('/payment', async (req, res) => {
  await controller.getGeneralPaymentTransferInfo(req, res)
})

app.post('/payment', async (req, res) => {
  await controller.makePayment(req, res)
})

app.get('/local-payment', async (req, res) => {
  await controller.getLocalTransfer(req, res)
})