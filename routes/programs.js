
const { query } = require('express');
var db = require('../db');
const router = require('express').Router();


router.get('/', async(req, res) => {

        var Programs = await GetfromDB("SELECT * FROM Programs");
        let coupons_query = "SELECT DISTINCT Course_ID,cc.Coupon_ID,cc.SDate, cc.EDate, cc.discount_percentage  FROM Courses JOIN(SELECT co.*, ca.CName cat FROM Coupons as co JOIN Categories as ca ON co.Category_Name = ca.CName) as cc ON Courses.Category_Name = cc.cat";
    
        let Coupons = await GetfromDB(coupons_query);

        let currDate = new Date();
        Coupons = Coupons.filter(function(item){
            return ((item.EDate > currDate && item.SDate <= currDate));
        });

        var programCourses = [];
        for(let i = 0; i < Programs.length; i++){
            let sqlquery = "SELECT C.Course_Name, C.Course_image,C.Course_ID, C.Cost, I.Fname,I.Lname, I.Profile_Pic FROM Courses as C JOIN Instructors as I ON C.Instructors_Username = I.Username WHERE Programe_Name = '"+ Programs[i].PName + "';";
            let tmp_ProgramCourse = await GetfromDB(sqlquery);
            if(tmp_ProgramCourse!= []){
                programCourses.push(tmp_ProgramCourse);
            }
        }
        
        

        for(let i =0; i<programCourses.length;i++){
            programCourses[i]
        }
        return res.render('programs', {
            title: 'programs',
            css:'programs',
            programs:Programs,
            ProgramCourses:programCourses,
            pcCoupons: Coupons
        });

});
router.post('/',async(req,res)=>{


});




const GetfromDB = (query)=>{
    return new Promise ((resolve, reject)=>{
        setTimeout(()=>{
            db.query(query, (err, rows)=>{
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
