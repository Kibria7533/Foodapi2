const route=require('express').Router();
const {addmenu,getmaneus,getmaneusbyid}=require('./menus.controller');

route.post("/add",addmenu);
route.get("/",getmaneus);
route.get('/:id',getmaneusbyid);
module.exports=route;