const router = require('express').Router();

var db = require('../db');

router.get('/', async (req, res) => {


        return res.render('signup', {
            title: 'signup',
            css:'login' 
        });
    

            
});    
 
router.post('/',async (req, res) => { 
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const SSN = req.body.SSN;
    const Username = req.body.Username;
    const Password = req.body.Password;
    const Email = req.body.Email;
    const Confirm_Password = req.body.Confirm_Password;  
    const Gender = req.body.Gender; 

    var sql_query=`INSERT INTO students  VALUES ("${FirstName}","${LastName}","${Username}","${Password}" ,"${Email}" , null ,"${Gender}");`

    var sql_query1 = `SELECT Password from students         where Username = "${Username}";`
    var sql_query2 = `SELECT Password from it_adminstrators where Username = "${Username}";`
    var sql_query3 = `SELECT Password from owners           where Username = "${Username}";`
    var sql_query4 = `SELECT Password from instructors      where Username = "${Username}";`


    try{ 
 

        var executed1 = await signup(sql_query1);
        var executed2 = await signup(sql_query2);
        var executed3 = await signup(sql_query3);
        var executed4 = await signup(sql_query4);

if (executed1.length == 0 && executed2.length == 0 && executed3.length == 0 && executed4.length == 0  )
        {

            var executed = await signup(sql_query);
            
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
            return res.render('signup', {
                title: 'signup',
                css:'signup',    
                message: "Choose another UserName"
            });

        }
    }
        catch(e)
        {  
            return res.render('signup', {
                title: 'signup',
                css:'signup',    
                message: "Choose another UserName"
            });
    }    
}
);
const signup = (query) => {
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