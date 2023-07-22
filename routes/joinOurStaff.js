const router = require('express').Router();

var db = require('../db');

router.get('/', (req, res) => {

        return res.render('joinOurStaff', {
            title: 'joinOurStaff',
            css:'joinOurStaff'           

        })
});

router.post('/', async(req, res) =>{

const FirstName = req.body.FirstName;
const LastName = req.body.LastName;
const Username = req.body.Username;
const Email = req.body.Email;
const Password = req.body.Password;
const ConfirmPassword = req.body.ConfirmPassword;
const Gender = req.body.Gender;
const CVLink = req.body.CVLink;

        var sql_query=`INSERT INTO instructors  VALUES ("${FirstName}","${LastName}","${Username}", null , null ,"${Password}" ,"${Email}" , 0,"${Gender}", "${CVLink}" , 0);`
      
        var sql_query1 = `SELECT Password from students         where Username = "${Username}";`
        var sql_query2 = `SELECT Password from it_adminstrators where Username = "${Username}";`
        var sql_query3 = `SELECT Password from owners           where Username = "${Username}";`
        var sql_query4 = `SELECT Password from instructors      where Username = "${Username}";`
        

        try{

            var executed1 = await Join(sql_query1);
            var executed2 = await Join(sql_query2);
            var executed3 = await Join(sql_query3);
            var executed4 = await Join(sql_query4);


            if (executed1.length == 0 && executed2.length == 0 && executed3.length == 0 && executed4.length == 0  )
        {

            var executed = await Join(sql_query);
            
            if (executed) 
            {
                return res.render('Account_Settings', {
                    title: 'Profile/' + Username,
                    css: 'Account_Settings',
                    message: req.flash('message')
                });
            }
        }
        else
        {
            return res.render('joinOurStaff', {
                title: 'joinOurStaff',
                css:'joinOurStaff' ,     
                message: "Choose another UserName"
            });

        }
           
        }
        catch(e)
    { 
     
            return res.render('joinOurStaff', {
                title: 'joinOurStaff',
                css:'joinOurStaff' ,     
                message: "Choose another UserName"
            });
        }    
        }
    
    );
    const Join = (query) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                    db.query(query,(error, rows) => {
                        if(!error)
                          {                           
                            resolve(rows);
                             
                          }
                        else
                         {reject(new Error(error));}
                   })     
            }, 10);
        });
    };

module.exports = router;