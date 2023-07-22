const router = require('express').Router();

const { query } = require('../db');

var db = require('../db');

// GET //

router.get('/', async(req, res) => {
    
sql_query = "SELECT Course_Name,Fname,Lname FROM Courses , Teaches , Instructors where (Courses.Course_ID = Teaches.Course_ID AND Teaches.Instructor_Username = Instructors.Username AND Teaches.rate=5) LIMIT 8 ;"
var topRated = await GetTopRated(sql_query);

console.log(topRated);

 var statistics = [];
sql_query = "SELECT * FROM Instructors;"
statistics["Instructors"] =await GetInstructors(sql_query);

sql_query = "SELECT * FROM Students;"
statistics["Students"] = await GetStudents(sql_query);

sql_query = "SELECT * FROM Courses;"
statistics["Courses"] = await GetCourses(sql_query);


res.render('home', {
title: 'home',
css: 'home', 
statistics:statistics,
top_5_Courses:topRated
})
 
});

// SQL functions

const GetTopRated = (query)=>{
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      db.query(query, (err, rows)=>{
        if(!err){
          console.log("Top rated courses with corresponding instructors retrieved");
          resolve(rows);
        }
        else{
          reject(new Error(err));
        }
      });
    }, 100);
  });
};


const GetInstructors = (query)=>{
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      db.query(query, (err, rows)=>{
        if(!err){
          console.log("Query Executed Sycessfully !");
          resolve(rows.length);
        }
        else{
          reject(new Error(err));
        }
      });
    }, 100);
  });
};

const GetCourses = (query)=>{
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      db.query(query, (err, rows)=>{
        if(!err){
          console.log("Post Viewed");
          resolve(rows.length);
        }
        else{
          reject(new Error(err));
        }
      });
    }, 100);
  });
};
const GetStudents = (query)=>{
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      db.query(query, (err, rows)=>{
        if(!err){
          console.log("Post Viewed");
          resolve(rows.length);
        }
        else{
          reject(new Error(err));
        }
      });
    }, 100);
  });
};

module.exports = router;