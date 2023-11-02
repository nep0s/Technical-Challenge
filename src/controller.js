const { where } = require('sequelize');
const Transfer = require('./model');


class TransferController {
  constructor() {
    this.email = 'smitjans@uc.cl',
    this.URLs = {
      getToken: {
        development: `https://dev.developers-test.currencybird.cl/token?email=${this.email}`,
        production: `https://prod.developers-test.currencybird.cl/token?email=${this.email}`,
      },
      makePayment: {
        development: `https://dev.developers-test.currencybird.cl/payment?email=${this.email}&transferCode=${this.email}`,
        production: `https://prod.developers-test.currencybird.cl/payment?email=${this.email}&transferCode=${this.email}`,
      },
      getPayment: {
        development: `https://dev.developers-test.currencybird.cl/getPayment?email=${this.email}&transferCode=${this.email}`,
        production: `https://prod.developers-test.currencybird.cl/payment?email=${this.email}&transferCode=${this.email}`,
      }
    }
  }

  async getToken() {
    try {
      const url = this.URLs['getToken'][process.env.NODE_ENV]
      const token = await fetch(url, {
        method: "GET",
      }).then(response => response.text())
      return token;
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async makePayment(req, res) {
    try {
      const token = await this.getToken();
      let transfer = await Transfer.findOne({
        where: {transferCode: req.body.transferCode}
      });
      if (transfer) {
        await this.repeatTransaction(req, res, transfer);
      }
      else {
        await this.createTransaction(req, res, token)
      }
      
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async repeatTransaction(req, res, transfer) {
    transfer.retries += 1;
    transfer.save();
    return res.status(201).json(transfer);
  }

  async createTransaction(req, res, token) {
    const transferData = {
      email: req.body.transferCode,
      transferCode: req.body.transferCode,
      amount: req.body.amount,
      retries: 0,
    }
    const response = await this.sendPayment(req, res, token);
    if (response.ok) {
      transfer = await Transfer.create(transferData);
      return res.status(201).json(response);
    }
    else {
      return res.json(response)
    }
  }

  async sendPayment(req, res, token) {
    try {
      const url = this.URLs['makePayment'][process.env.NODE_ENV]
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: {
          transferCode: req.body.transferCode,
          amount: req.body.amount,
        }
      }).then(response => response.json())
      return response;
    } catch (error) {
      return new Error(error)
    }
  }

  async getLocalTransfer(req, res) {
    try {
      const transfer = await Transfer.findOne({
        where: {transferCode: this.email}
      });
      if (transfer) {
        return res.status(200).json(transfer);
      }
      else {
        return res.status(404);
      }
      
    } catch (error) {
      return res.status(500).json(error);
    }
  }  

  async getGeneralPaymentTransferInfo(req, res) {
    try {
      const url = this.URLs['getPayment'][process.env.NODE_ENV];
      const info = await fetch(url, {
        method: "GET",
      })
      return res.json(await info.json())
    } catch (error) {
      return res.status(500).json(error);

    }
  }
}

transferController = new TransferController()
module.exports = transferController;
