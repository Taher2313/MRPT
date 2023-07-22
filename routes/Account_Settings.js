const router = require('express').Router();
var db = require('../db');


router.get('/', async(req, res) => {

        var sql="";
        if(global_type == 'instructor')
        {
            const query= "SELECT * FROM instructors where Username ='"+global_username+"'";
            sql =await getfromDB(query);
        }
        if(global_type == 'it_adminstrator')
        {
            const query= "SELECT * FROM it_adminstrators where Username ='"+global_username+"'";
            sql =await getfromDB(query);
        }
        if(global_type == 'owner')
        {
            const query= "SELECT * FROM owners where Username ='"+global_username+"'";
            sql =await getfromDB(query);
        } 
        if(global_type == 'student')
        {
            const query= "SELECT * FROM students where Username ='"+global_username+"'";
            sql =await getfromDB(query);
        } 

    
    return res.render('Account_Settings', { 
        title: 'Profile/' + global_username, 
        css: 'Account_Settings',
        Type: global_type, 
        Username: global_username,
        SQL: sql, 
        message: req.flash('message')
    }) 
});  

router.post('/', async(req, res) => { 

    var sql="";

    if(global_type === 'instructor')
    {
        const query= "SELECT * FROM instructors where Username ='"+global_username+"'";
        sql =await getfromDB(query);
    }
    if(global_type === 'it_adminstrator')
    {
        const query= "SELECT * FROM it_adminstrators where Username ='"+global_username+"'";
        sql =await getfromDB(query);
    }
    if(global_type === 'owner')
    {
        const query= "SELECT * FROM owners where Username ='"+global_username+"'";
        sql =await getfromDB(query);
    }
    if(global_type === 'student')
    {
        const query= "SELECT * FROM students where Username ='"+global_username+"'";
        sql =await getfromDB(query);

    } 
    var firstname= "" ;
    var lastname= "" ;
    var username= ""; 
    var email="";
    var pass="";   
    var confPass="";
    var uploaded_image= "";


    firstname= req.body.FirstName ;
    lastname= req.body.LastName ;
    username= req.body.Username;
    email=req.body.Email;
    pass=req.body.Password;
    confPass=req.body.ConfPassword;
    uploaded_image=req.files.uploaded_image;

    console.log(uploaded_image);
    console.log("hi");
    var img_name="";
    console.log(req.body);
    console.log(req.body.uploaded_image);
    if(uploaded_image)
    {
        var file=req.files.uploaded_image;
        img_name="/images/"+file.name;
        if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                    
            file.mv('./public/images/'+file.name, function(err) {
                if (err)
                { 
                    console.log("can't upload picture");
                    return res.status(500).send(err);
                }
                
            });
        } else {
            return res.render('add_any', {
                title: 'Add...',
                css: 'add_any',
                message:  "This format is not allowed , please upload file with '.png','.gif','.jpg'"
            })
        }
    }
    else
    {
        img_name="/images/author.jpg";
    }

    if(firstname == "") 
        firstname= sql[0].Fname;
    if(lastname == "")
        lastname= sql[0].Lname;
    if(username == "") 
        username= global_username;         

    if(email == "")
        email= sql[0].Email;

    if(pass == "")
        pass= sql[0].Password;
    else{
        if(confPass  == "")
            return res.render('Account_Settings', { 
                title: 'Profile/' + global_username, 
                css: 'Account_Settings',
                Type: global_type, 
                Username: global_username,
                SQL:sql,
                message: "You must confirm Password"
            })
        else if(pass != confPass)
            return res.render('Account_Settings', { 
                title: 'Profile/' + global_username, 
                css: 'Account_Settings',
                Type: global_type, 
                Username: global_username,
                SQL:sql,
                message: "Enter similar Password and confirm Password "
            })
    }

    
    // var allsql="";
    if(global_type == 'instructor')
    {
        var query= "UPDATE instructors set Fname ='" + firstname +"' where Username ='"+global_username+"'";
        await getfromDB(query);
        query= "UPDATE instructors set Lname ='" + lastname +"' where Username ='"+global_username+"'";
        await getfromDB(query);
        query= "UPDATE instructors set Profile_Pic ='" + img_name +"' where Username ='"+global_username+"'";
        await getfromDB(query);
        query= "UPDATE instructors set Username ='" + username +"' where Username ='"+global_username+"'";
        await getfromDB(query);
        query= "UPDATE instructors set Email ='" + email +"' where Username ='"+username+"'";
        await getfromDB(query);
        query= "UPDATE instructors set Password ='" + pass +"' where Username ='"+username+"'";
        await getfromDB(query);
        global_username=username;
        query= "SELECT * FROM instructors where Username ='"+username+"'";
        sql =await getfromDB(query);
    }
    if(global_type == 'it_adminstrator')
    {
        var query= "UPDATE it_adminstrators set Fname ='" + firstname +"' where Username ='"+global_username+"'";
        await getfromDB(query);
        query= "UPDATE it_adminstrators set Lname ='" + lastname +"' where Username ='"+global_username+"'";
        await getfromDB(query);
        query= "UPDATE it_adminstrators set Profile_Pic ='" + img_name +"' where Username ='"+global_username+"'";
        await getfromDB(query);
        query= "UPDATE it_adminstrators set Username ='" + username +"' where Username ='"+global_username+"'";
        await getfromDB(query);
        query= "UPDATE it_adminstrators set Email ='" + email +"' where Username ='"+username+"'";
        await getfromDB(query);
        query= "UPDATE it_adminstrators set Password ='" + pass +"' where Username ='"+username+"'";
        await getfromDB(query);
        global_username=username;
        query= "SELECT * FROM it_adminstrators where Username ='"+username+"'";
        sql =await getfromDB(query);
    }
    if(global_type == 'owner')
    {
        var query= "UPDATE owners set Fname ='" + firstname +"' where Username ='"+global_username+"'";
        await getfromDB(query);
        query= "UPDATE owners set Lname ='" + lastname +"' where Username ='"+global_username+"'";
        await getfromDB(query);
        query= "UPDATE owners set Username ='" + username +"' where Username ='"+global_username+"'";
        await getfromDB(query);
        query= "UPDATE owners set Profile_Pic ='" + img_name +"' where Username ='"+global_username+"'";
        await getfromDB(query);
        query= "UPDATE owners set Email ='" + email +"' where Username ='"+username+"'";
        await getfromDB(query);
        query= "UPDATE owners set Password ='" + pass +"' where Username ='"+username+"'";
        await getfromDB(query);
        global_username=username;
        query= "SELECT * FROM owners where Username ='"+username+"'";
            sql =await getfromDB(query);
    }
    if(global_type == 'student')
    {
        var query= "UPDATE students set Fname ='" + firstname +"' where Username ='"+global_username+"'";
        await getfromDB(query);
        query= "UPDATE students set Lname ='" + lastname +"' where Username ='"+global_username+"'";
        await getfromDB(query);
        query= "UPDATE students set Username ='" + username +"' where Username ='"+global_username+"'";
        await getfromDB(query);
        query= "UPDATE students set Profile_Pic ='" + img_name +"' where Username ='"+global_username+"'";
        await getfromDB(query);
        query= "UPDATE students set Email ='" + email +"' where Username ='"+username+"'";
        await getfromDB(query);
        query= "UPDATE students set Password ='" + pass +"' where Username ='"+username+"'";
        await getfromDB(query);
        global_username=username;
        query= "SELECT * FROM students where Username ='"+username+"'";
        sql =await getfromDB(query);
    }
    // console.log(allsql);
    return res.render('Account_Settings', { 
        title: 'Profile/' + global_username,  
        css: 'Account_Settings',
        Type: global_type, 
        Username: global_username,
        SQL: sql,
        message: "Changes are applied successfully"
    });
    
}); 

const getfromDB = (query) => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
                db.query(query,(error, rows) => {
                    if(!error)
                      {
                        resolve(rows);    
                      }
                    else
                     {reject(new Error(error));}
               })

        }, 100);
    });
};
 

module.exports = router;