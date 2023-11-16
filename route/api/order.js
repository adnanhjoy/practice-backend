const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Order = require("../../models/Order");
const SSLCommerzPayment = require('sslcommerz-lts');
const Template = require('../../models/Template');

const store_id = 'theme6555ae611e489'
const store_passwd = 'theme6555ae611e489@ssl'
const is_live = false //true for live, false for sandbox

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));


// @route get api/order
// @desc GET all the orders
// @access Public
router.get("/", (req, res) => {
  const errors = {};

  Order.find()
    .then((order) => {
      if (!order) {
        errors.noorder = "There are no order";
        return res.status(404).json(errors);
      }

      res.json(order);
    })
    .catch((err) => res.status(404).json({ Orders: "There are no Orders" }));
})

router.post('/', async (req, res) => {
  try {
    const template = await Template.findOne({ _id: req.body?.amount?.id });
    const orders = await req.body;
    // console.log(template);
    const data = {
      total_amount: orders?.amount?.total,
      currency: 'BDT',
      tran_id: 'REF123', // use unique tran_id for each api call
      success_url: 'http://localhost:3030/success',
      fail_url: 'http://localhost:3030/fail',
      cancel_url: 'http://localhost:3030/cancel',
      ipn_url: 'http://localhost:3030/ipn',
      shipping_method: 'Courier',
      product_name: template?.title,
      product_category: template?.category,
      product_profile: 'general',
      cus_name: orders?.order?.name,
      cus_email: orders?.order?.email,
      cus_add1: orders?.order?.address,
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      ship_name: orders?.order?.name,
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: orders?.order?.zip,
      ship_country: 'Bangladesh',
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        res.redirect(GatewayPageURL)
        console.log('Redirecting to: ', GatewayPageURL)
    });
    console.log(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router;