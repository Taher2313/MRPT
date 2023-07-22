const router = require('express').Router();
 
var db = require('../db');

router.get('/', async(req, res) => {

   //    Courses_query="SELECT c.Course_Name, c.Course_ID , i.Username , i.Fname, i.Lname from courses as c  , instructors as i , teaches as t where t.Course_ID = c.Course_ID and t.Instructor_Username = i.Username;";
    
   Courses_query="SELECT c.Course_Name, c.Course_ID from courses as c;";
   const GetCoursess=await pay(Courses_query);
 
        return res.render('payment', {
            title: 'Payment',
            css:'payment',
            courses:GetCoursess,
            message:  req.flash('message') 
        }) 

}); 

router.post('/', async(req, res) =>{

    const CourseID = req.body.CourseID;
    const cardnum = req.body.cardnum;
    const Password = req.body.password;
    const expriedate = req.body.expriedate;
    const cvc = req.body.cvc;
   
    
    try{
        
        var validcard=`select * from cards where card_number ="${cardnum}" and card_Password ="${Password}" and expire_date ="${expriedate}" and cvc="${cvc}";`
        
        var executed1 = await pay(validcard);                     
        
        if (executed1.length == 1) 
        {
            var enoughmoney=`select Cost from courses where Course_ID="${CourseID}";`
            var executed2 = await pay(enoughmoney);   
            if ( executed2[0].Cost <=  executed1[0].money)
            {
              console.log(executed2);
              
              var enroll="insert into enroll_into_course VALUES ( " + CourseID + " ,'" + global_username + "' , null ,0 );"
              var executed3 = await pay(enroll);      
              
              var newmoney = executed1[0].money - executed2[0].Cost ;
              var getmoney = "update cards set money = " + newmoney + " where card_number = " + cardnum + ";"  
              var executed4 = await pay(getmoney);                
              var inst_money  = 0.8*  executed2[0].Cost;             
              var get_usernmae = `select i.Username from courses as c , instructors as i where c.Course_ID = "${CourseID}" and c.Instructors_Username = i.Username;`
              var executed5 = await pay(get_usernmae);                       
              var updatemoney  = "update instructors set Total_Income =  (Total_Income +  " + inst_money +  " ) where  Username  = '" + executed5[0].Username + "' ;"              
              var executed6 = await pay(updatemoney); 
              var checkexist = "select * from income_analysis where Course_ID = " +  CourseID  +   ";"
              var executed7 = await pay(checkexist); 
              if (executed7.length == 0)
              {
                var insertin_income = "insert into income_analysis values ( " + CourseID + " ,  1 , " + executed2[0].Cost + " , " + 0.2*  executed2[0].Cost  + " , " +  0.8*  executed2[0].Cost + " );" 
                var executed8 = await pay(insertin_income); 
              }
              else
              {

                var insertin_income2 = "update  income_analysis set Total_enrollement = Total_enrollement + 1 , Total_income = Total_income + " + executed2[0].Cost  + " ,  Net_profit = Net_profit +  " + 0.2*  executed2[0].Cost + " , Instructors_fees = Instructors_fees + " + 0.8*  executed2[0].Cost  + " where Course_ID = " +  CourseID + " ;" 
                var executed9 = await pay(insertin_income2); 


              }

              return res.render('Donate', {
                title: 'Donate',
                css:'Donate',
                message:  req.flash('message')
            })
             
             
          }
          else  
          { 

            Courses_query="SELECT c.Course_Name, c.Course_ID from courses as c;";
            const GetCoursess=await pay(Courses_query);
          
                 return res.render('payment', {
                     title: 'Payment',
                     css:'payment',
                     courses:GetCoursess,
                     message:  req.flash('message') 
                 }) 

          }

         }
        else
        {

            Courses_query="SELECT c.Course_Name, c.Course_ID from courses as c;";
            const GetCoursess=await pay(Courses_query);
          
                 return res.render('payment', {
                     title: 'Payment',
                     css:'payment',
                     courses:GetCoursess,
                     message:  req.flash('message') 
                 }) 

        }       

        }
        catch(e)
        { 
            Courses_query="SELECT c.Course_Name, c.Course_ID from courses as c;";
            const GetCoursess=await pay(Courses_query);
          
                 return res.render('payment', {
                     title: 'Payment',
                     css:'payment',
                     courses:GetCoursess,
                     message:  req.flash('message') 
                 }) 
            }
        }        
        );





        const pay = (query) => {
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
                }, 100);
            });
        };
    


module.exports = router;