const router = require('express').Router();

var db = require('../db');

router.get('/', (req, res) => {

        return res.render('Donate', {
            title: 'Donate',
            css:'Donate',
            message:  req.flash('message')
        })

});

router.post('/', async function(req, res, next) {

    console.log(req.body.Orgnization_name);
    if(req.body.Orgnization_name=="" ||  !isNaN(req.body.Orgnization_name))
    { 
        
    return res.render('Donate', {
        title: 'Donate',
        css:'Donate',
        js:'Donate',
        message: "Orgnization name must be a string"
    });}
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(req.body.Email=="" || !req.body.Email.match(mailformat))
    { 
        
        
      return res.render('Donate', {
        title: 'Donate',
        css:'Donate',
        js:'Donate',
        message: "You have entered an invalid email address!"
    });}
    if(req.body.amount=="" || isNaN(req.body.amount) )
    { 
       
    return res.render('Donate', {
        title: 'Donate',
        css:'Donate',
        js:'Donate',
        message: "Donation amount must be a numeric value "
    });}
    if(req.body.date=="" )
    { 
       
    return res.render('Donate', {
        title: 'Donate',
        css:'Donate',
        js:'Donate',
        message: "Please, Enter Valid Date"

    });}
    else{
    var sql_query=`INSERT INTO donors  VALUES ("${req.body.Orgnization_name}","${req.body.Email}" ,"${req.body.date}","${req.body.amount}");`
    try
    {var executed = await Donate(sql_query);
    if (executed)
    {
        return res.render('Donate', {
            title: 'Donate',
            css:'Donate',
            js:'Donate',
            message: "Succsessfully Donated!"
        });
    }
    }
    catch(e)
    {
         console.error(e);
        return res.render('Donate', {
            title: 'Donate',
            css:'Donate',
            js:'Donate',
            message: "failed!"
        });
    }
    
    }



});
const Donate = (query) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
                db.query(query,(error, rows) => {
                    if(!error)
                      {
                        console.log('Post viewed');
                        resolve(rows);
                      }
                    else
                     {reject(new Error(error));}
               })

        }, 100);
    });
};
module.exports = router;
