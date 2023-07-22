var db = require("../db");
const router = require("express").Router();


router.get('/:course_ID', async(req, res) => {
        
    let courseVideos = [];
    
    let sqlquery = "SELECT V.*, C.Course_Name FROM Courses as C JOIN Videos as V ON V.Course_ID = C.Course_ID WHERE V.Course_ID = "+req.params.course_ID;
    courseVideos = await GetfromDB(sqlquery);
    for(let i =0; i< courseVideos.length; i++){
            let tmp = courseVideos[i].Video_Link;
            tmp = tmp.replace(/watch\?v=/, "");
            tmp= tmp.replace(/\&.*/, "");
            tmp= tmp.replace("https://www.youtube.com/", "");
            courseVideos[i].Video_Link = tmp;
    } 

    let course_title = [];
    if(courseVideos!=[]){
        course_title = courseVideos[0].Course_Name;
    }
    
    return res.render('Course_Content', {
        title: req.params.course_Name,
        css:'Course_Content',
       videos:courseVideos,
       course_title:course_title
    })

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
