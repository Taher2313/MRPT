const router = require('express').Router();
var db = require('../db');


router.get('/', async (req, res) => {
    
        var categories= await GetfromDB('SELECT * FROM Categories');

        var coupons = await GetfromDB('SELECT * FROM Coupons');
        let currDate = new Date();
        coupons = coupons.filter(function(item){
            return (item.SDate < currDate || (item.EDate > currDate && item.SDate < currDate));
        });
        
        let coupons_query = "SELECT co.Coupon_ID,co.SDate, co.EDate,co.discount_percentage, ca.CName cat FROM Coupons as co JOIN Categories as ca ON co.Category_Name = ca.CName;";
    
        let cCoupons = await GetfromDB(coupons_query);
    

        cCoupons = cCoupons.filter(function(item){
            return ((item.EDate > currDate && item.SDate <= currDate));
        });
        var category_courses = [];
        for(let i =0; i<categories.length; i++){
            var sqlquery = "SELECT * FROM Courses WHERE Category_Name = '" + categories[i].CName + "';";
            var tmp_CourseContainer = await GetfromDB(sqlquery);

            if(tmp_CourseContainer!=[] )
            {
                category_courses.push(tmp_CourseContainer);
            }
        }



        return res.render('categories', {
            title: 'categories',
            css: 'categories',
            categories:categories,
            categories_courses:category_courses,
            coupons:coupons,
            courseCoupons:cCoupons
        })

});
const GetfromDB = (query)=>{
    return new Promise ((resolve, reject)=>{
        setTimeout(()=>{
            db.query(query, (err,rows) =>{
                if(!err){
                    resolve(rows);
                }
                else{
                    reject(new Error(err));
                }
            });
        },100);
    });
};


module.exports = router;