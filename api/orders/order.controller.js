const pool = require("../../config/database");
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
const auth = {
  auth: {
    api_key: process.env.API_KEY,
    domain: process.env.DOMAIN
  }
};
const transporter = nodemailer.createTransport(mailGun(auth));
module.exports = {
  addorder: (req, res) => {
    pool.query(`select quantity from orders where product_id=?`,
      [req.params.id],
      (error, results, fields) => {
      
        if (error) {
          return res.send('kkkkkkkkkkkk'+error);
        }
        else {
          if (results && results.length) {
            
            pool.query(`update orders set quantity=?,subtotal_price=? where product_id=?`,
              [
                results[0].quantity+1,
                results[0].quantity+1*results[0].product_price,
                req.params.id
              ],
              (error, results, fields) => {
                if (error) {
                  return res.send('loo'+error);
                }
                return res.send(results);
              }

            )
          }
          else {
            pool.query(
              `select product_id,product_name,price,quantity,describetext from menus where product_id = ?`,
              [req.params.id],
              (error, results, fields) => {
                if (error) {
                  return res.send('myyyyyyyyy'+error);
                }
                else {
                  
                  pool.query(
                    `insert into orders(product_id,product_name,product_price,quantity,description) 
                              values(?,?,?,?,?)`,
                    [
                      results[0].product_id,
                      results[0].product_name,
                      results[0].price,
                      results[0].quantity,
                      results[0].describetext
                    ],
                    (error, results, fields) => {
                      if (error) {
                        return res.send('hhhhh'+error);
                      }
                      return res.send(results);
                    }
                  );
                }
              }
            );
          }
        }
      }

    )


  },
  removeorder: (req, res) => {
    pool.query(
      `delete from orders where id = ?`,
      [req.params.id],
      (error, results, fields) => {
        if (error) {
          return res.send(error);
        }
        return res.send(results);
      }
    );
  },
  getorders: (req, res) => {
    pool.query(`select product_id,product_name, product_price, quantity,description from orders`,
      [],
      (error, results, fields) => {
        if (error) {
          return res.send("You have no orders");
        }
        else {
          return res.send(results);
        }
      }
    )
  },
  sendinvoice: (req, res) => {
    let mailOptions = {
      from: '<poster@sandbox60cc53f6a7db4587ac6601d182f70d7d.mailgun.org>',
      to: 'afzalhossain7533@gmail.com',
      subject: 'Nodemailer - Test',
      text: 'Wooohooo it works!!'
    };
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        return console.log(err);
      }
      return console.log(data);
    });

  },
  withnodemailer: (req, res) => {

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tenminuteversity@gmail.com',
        pass: 'cwexlmmtrcxxuwbg'
      }
    });
    var mailOptions = {
      from: 'tenminuteversity@gmail.com',
      to: 'afzalhossain7533@gmail.com',
      subject: 'Welcome',
      html: `<h1> hello </h1>
            </br>
            `
    };

    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(info);
      }
    });
  },
  truncate: (req,res)=>{
    pool.query(`TRUNCATE TABLE orders`,
    [],
    (error,results,fields)=>{
      if(error)
      return res.send(error);
      return res.send(results);
      
    })
  }
}