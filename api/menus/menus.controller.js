const pool=require("../../config/database");
module.exports={
    addmenu: (req,res)=>{
        pool.query(
            `insert into menus(category_id,product_id,product_name, price, quantity, describetext, discount	) 
                      values(?,?,?,?,?,?,?)`,
            [
                req.body.category_id,
                req.body.product_id,
                req.body.product_name,
                req.body.price,
                req.body.quantity,
                req.body.describetext,
                req.body.discount
             
            ],
            (error, results, fields) => {
              if (error) {
               return res.send(error);
              }
            return res.send(results);
            }
          );
        
    }
,
    getmaneus:(req,res)=>{
        pool.query(
            `select id,category_id,product_id,product_name,price,quantity,describetext,discount from menus`,
            [],
            (error, results, fields) => {
              if (error) {
                return res.send(error);
              }
              return res.send(results);
            }
          );
    },
    getmaneusbyid:(req,res)=>{
        pool.query(
            `select id,category_id,product_id,product_name,price,quantity,describetext,discount from menus where id = ?`,
            [req.params.id],
            (error, results, fields) => {
              if (error) {
                return res.send(error);
              }
              return res.send(results);
            }
          );

    }
}