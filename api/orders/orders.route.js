const route=require('express').Router();
const {addorder,removeorder,getorders,sendinvoice,withnodemailer,truncate}=require('./order.controller');


route.post('/add/:id',addorder)
route.post('/remove/:id',removeorder)
route.get('/',getorders)
route.get('/truncate',truncate)
route.get('/placeorder',sendinvoice)
route.get('/withnodemailer',withnodemailer)
module.exports=route;