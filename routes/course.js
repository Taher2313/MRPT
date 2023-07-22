const router = require('express').Router();
var db = require('../db');

   
router.get('/', async(req, res) => {



    Courses_query="SELECT C.*,I.Fname, I.Lname FROM Courses as C JOIN Instructors as I ON C.Instructors_Username = I.Username;";

    const GetCoursess=await getfromDB(Courses_query);
    
    let coupons_query = "SELECT DISTINCT Course_ID,cc.Coupon_ID,cc.SDate, cc.EDate, cc.discount_percentage  FROM Courses JOIN(SELECT co.*, ca.CName cat FROM Coupons as co JOIN Categories as ca ON co.Category_Name = ca.CName) as cc ON Courses.Category_Name = cc.cat";
    
    let Coupons = await getfromDB(coupons_query);

    let currDate = new Date();
    Coupons = Coupons.filter(function(item){
        return ((item.EDate > currDate && item.SDate <= currDate));
    });
    
    return res.render('course',{ 
        title: 'Courses', 
        css:'course',
        courses: GetCoursess,
        cCouponsID:Coupons
    })


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