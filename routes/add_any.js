const router = require('express').Router();
const { clearCache } = require('ejs');
const e = require('express');
var db = require('../db');
var instructors;
var coupons_list;
router.get('/', async(req, res) => {
   
   try{
       instructors=await ApplyQuery('SELECT Username from instructors where statuss=1');
       console.log(instructors);
           // for coupons id 
       coupons_list=await ApplyQuery('SELECT Coupon_ID from Coupons ');
       console.log(coupons_list);

    }
    catch(e)
    {
        console.error(e);
        message="Failed to retrieve all instructors";
        return res.render('add_any', {
            title: 'Execute action.',
            css: 'add_any',
            message:  req.flash('message'),
            instructors:instructors,
            coupons_list:coupons_list
        })
    
    }


     return res.render('add_any', {
        title: 'Execute action',
        css: 'add_any',
        message:  req.flash('message'),
        instructors:instructors,
        coupons_list:coupons_list
     });
});

router.post('/',async(req,res)=>{
//-------------------------------------------------------- Add Courses -----------------------------------------------------

//********************************************************** 
var courseName= req.body.Course_Name;
var Instructor_username= req.body.Instructor_username;
var Cost= req.body.Cost;
var Duration= req.body.Duration;
var Category= req.body.Category;
var Course_small_info=req.body.Course_small_info;
var uploaded_image= req.body.uploaded_image;
var courseInformation=req.body.courseInformation;
var Course_link=req.body.Course_link

if(!courseName==""|| !Instructor_username=="" || !Cost=="" ||  !Duration=="" || !Category=="" || !Course_small_info=="" ||!uploaded_image=="" || !courseInformation=="" || !Course_link==""){
    
if (!courseName) {
    return res.render('add_any', {
        title: 'Execute action',
        css: 'add_any',
        message:  "Course must have a name",
        instructors:instructors,
        coupons_list:coupons_list
    })
}
var validInstructorQuery="select * from instructors where Username='"+Instructor_username+"'";
var sql_validInstructorQuery=await ApplyQuery(validInstructorQuery);

if (Instructor_username && sql_validInstructorQuery != 0) {
}
else{
    return res.render('add_any', {
        title: 'Execute action', 
        css: 'add_any',
        message:  "Enter valid instructor name",
        instructors:instructors,
        coupons_list:coupons_list
    })
}

if (!Cost) {
    return res.render('add_any', {
        title: 'Execute action',
        css: 'add_any',
        message:  "Course must have a price",
        instructors:instructors,
        coupons_list:coupons_list
    })
}
if (!Duration) {
    return res.render('add_any', {
        title: 'Execute action',
        css: 'add_any',
        message:  "Course must have a duration time",
        instructors:instructors,
        coupons_list:coupons_list
    })
}
var validCategoryQuery="select * from categories where CName='"+Category+"'";
sql_validInstructorQuery=await ApplyQuery(validCategoryQuery);

if (Category && sql_validInstructorQuery != 0) {
    console.log(sql_validInstructorQuery[0]);
}
else{
    return res.render('add_any', {
        title: 'Execute action', 
        css: 'add_any',
        message:  "Enter existing category name",
        instructors:instructors,
        coupons_list:coupons_list
    })
}

if (!Course_link) {
    return res.render('add_any', {
        title: 'Execute action',
        css: 'add_any',
        message:  "Course content must have a link",
        instructors:instructors,
        coupons_list:coupons_list
    })
}

if (!Course_small_info) {
    return res.render('add_any', {
        title: 'Execute action',
        css: 'add_any',
        message:  "Course must have a small attractive information",
        instructors:instructors,
        coupons_list:coupons_list
    })
}
if (!courseInformation) {
    return res.render('add_any', {
        title: 'Execute action',
        css: 'add_any',
        message:  "Course must have a brief information about course details",
        instructors:instructors,
        coupons_list:coupons_list
    })
}

var RandomCourseID= Math.floor((Math.random() * 1000000) + 1);
var sql_RandomCourseID= "select  Count(*) from courses where Course_ID="+RandomCourseID;
const applysql_RandomCourseID= await ApplyQuery(sql_RandomCourseID);

while(applysql_RandomCourseID[0] >=1 )
{
    RandomCourseID= Math.floor((Math.random() * 1000000) + 1);
    sql_RandomCourseID= "select  Count(*) from courses where Course_ID="+RandomCourseID;
    applysql_RandomCourseID=await ApplyQuery(sql_RandomCourseID);
}

var img_name="";
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
            title: 'Execute action',
            css: 'add_any',
            message:  "This format is not allowed , please upload file with '.png','.gif','.jpg'"
        })
    }
}
else
{
    img_name="/images/course_5.jpg";
}

//I didn't insert `Programe_Name`,

var sql = "INSERT INTO `courses`(`Course_ID`,`Instructors_Username`,`Category_Name`, `Cost` ,`Duration`,`Course_Name`,`Course_info`,`Course_small_info`,`Course_image`) VALUES ('" + RandomCourseID + "','" + Instructor_username + "','" + Category + "'," + Cost + "," + Duration + ",'" + courseName + "','" + courseInformation + "','" + Course_small_info + "','" + img_name + "')";

await ApplyQuery(sql);

return res.render('add_any', {
    title: 'Execute action',
    css: 'add_any',
    message: "Course is added",
    instructors:instructors,
    coupons_list:coupons_list,
    message:  "Course is added"
})
// return res.render('Account_Settings', { 
//     title: 'Account_Settings',
//     css: 'Account_Settings',
//     message: "Course is added",
//     instructors:instructors,
//     coupons_list:coupons_list
// })
}
//-----------------------------------------------------Delete Course-------------------------------------------------------------------------
if(!req.body.Instructor_username_courseD ==""&&!req.body.courseD=="")
{
    try
    {
        var executed=await ApplyQuery("select Course_ID from enroll_into_course where Course_ID ='"+req.body.courseD +"'");
        console.log(executed.length);
        if(!executed.length)
        {
          try
            {
               await ApplyQuery("Delete from courses where Course_ID='"+req.body.courseD+"'and Instructors_Username='"+req.body.Instructor_username_courseD+"'");
              return res.render('add_any', {
                title: 'Execute action', 
                css: 'add_any',
                message: "Course deleted succssefully!!",
                instructors:instructors,
                coupons_list:coupons_list
              })
            }
          catch(e)
            {
              console.error(e);
              return res.render('add_any', {
                title: 'Execute action', 
                css: 'add_any',
                message: "Error happened while executing delete query!",
                instructors:instructors,
                coupons_list:coupons_list
            })
            }
        }
    }
    catch(e)
    {
        console.error(e);
        return res.render('add_any', {
            title: 'Execute action', 
            css: 'add_any',
            message: "Error happened while getting the course id from instructor username",
            instructors:instructors,
            coupons_list:coupons_list
        })
    }
}
//----------------------------------------------Add category ----------------------------------------------------------------------------

if(!req.body.Category_Name==""||!req.body.IT_username==""){
    var img_name="";
    if(req.files.cat_image)
    {
        var file=req.files.cat_image;
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
                title: 'Execute action',
                css: 'add_any',
                message:  "This format is not allowed , please upload file with '.png','.gif','.jpg'",
                instructors:instructors,
                coupons_list:coupons_list
            })
        }
    }
    else
    {
        img_name="/images/course_5.jpg";
    }
    var sql_query= "INSERT INTO Categories (CName, IT_Username ,Category_image) VALUES  ('" + req.body.Category_Name + "','" + req.body.IT_username +"','"+img_name+ "')";
    if(!isNaN(req.body.Category_Name))
    {return res.render('add_any', {
        title: 'Execute action', 
        css: 'add_any',
        message: "Invalid Category name!",
        instructors:instructors,
        coupons_list:coupons_list});
    }
    try
    {
        await ApplyQuery(sql_query);
        return res.render('add_any', {
            title: 'Execute action', 
            css: 'add_any',
            message: "Category added successfully !",
                instructors:instructors,
                coupons_list:coupons_list}
        );
    }
    catch(e)
    {
        console.error(e);
        return res.render('add_any', {
            title: 'Execute action', 
            css: 'add_any',
            message: "Faild to add this category!, Category Name may be taken or Username is incorrect!",
                    instructors:instructors,
                    coupons_list:coupons_list
        });
    }
}
//--------------------------------------------------------Delete Category ------------------------------------------------------------
if(!req.body.Category_NameD ==""){
    if(isNaN(req.body.Category_NameD))
        {var executed=await ApplyQuery("select CName from categories where CName='"+req.body.Category_NameD+"';");
        if(executed[0])
        { try
            {
                console.log(await ApplyQuery("Delete from categories where CName='"+req.body.Category_NameD+"';"));
                return res.render('add_any', {
                    title: 'Execute Action', 
                    css: 'add_any',
                    message: "Category deleted successfully!",
                    instructors:instructors,
                    coupons_list:coupons_list
                });
            }
            catch(e)
            {
                console.error(e);
                return res.render('add_any', {
                    title: 'Execute Action ', 
                    css: 'add_any',
                    message: "Faild to delete this category!",
                    instructors:instructors,
                    coupons_list:coupons_list
                });

            }
        }
        else
        {
            return res.render('add_any', {
                title: 'Add ', 
                css: 'add_any',
                message: "Inncorrect Category name!",
                instructors:instructors,
                coupons_list:coupons_list
            }); 
        }
    }
    else
    {
        return res.render('add_any', {
            title: 'Add ', 
            css: 'add_any',
            message: "Enter Valid Format for Category name!",
            instructors:instructors,
            coupons_list:coupons_list
        });  
    }
}
// ----------------------------------------------------------Add Program---------------------------------------------------------------
 if(!req.body.Program_Name==""||!req.body.IT_username_prog==""||!req.body.Cost_prog==""||!req.body.Duration_program==""|| !req.body.Level==""){
var img_name="";
if(req.files.Program_img)
{
    var file=req.files.Program_img;
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
            title: 'Execute action',
            css: 'add_any',
            message:  "This format is not allowed , please upload file with '.png','.gif','.jpg'",
                    instructors:instructors,
                    coupons_list:coupons_list
        })
    }
}
else
{
    img_name="/images/course_5.jpg";
}

if(!isNaN(req.body.Program_Name))
{return res.render('add_any', {
    title: 'Execute action', 
    css: 'add_any',
    message: "Invalid Program name!",
    instructors:instructors,
    coupons_list:coupons_list}
)
;}
if(isNaN(req.body.Cost_prog))
{return res.render('add_any', {
    title: 'Execute action', 
    css: 'add_any',
    message: "Cost must be a numeric value!",
        instructors:instructors,
        coupons_list:coupons_list}
)
;}
if(isNaN(req.body.Duration_program))
{return res.render('add_any', {
    title: 'Execute action', 
    css: 'add_any',
    message: "Duration must be a numeric value!",
        instructors:instructors,
        coupons_list:coupons_list}
)
;}
if(!req.body.Level)
{return res.render('add_any', {
    title: 'Execute action', 
    css: 'add_any',
    message: "Enter Program Level!",
        instructors:instructors,
        coupons_list:coupons_list}
)
;}
var sql_query= "INSERT INTO Programs (PName,IT_Username, Cost, Level, Duration,Program_image,Program_info) VALUES ('" +req.body.Program_Name+"','"+req.body.IT_username_prog+"','"+req.body.Cost_prog+"','"+req.body.Level+"','"+req.body.Duration_program+"','"+img_name+"','"+req.body.program_info+"')";
try
{
    await ApplyQuery(sql_query);
    return res.render('add_any', {
        title: 'Execute action', 
        css: 'add_any',
        message: "Program added successfully !",
            instructors:instructors,
            coupons_list:coupons_list}
    );
}
catch(e)
{
    console.error(e);
    return res.render('add_any', {
        title: 'Execute action', 
        css: 'add_any',
        message: "Faild to add this Program!, Program Name may be taken or Username is incorrect!",
                instructors:instructors,
                coupons_list:coupons_list
    });
}
}
//---------------------------------------------------------- Update Program -------------------------------------------------------------
if(!req.body.Program_NameU==""||!req.body.Cost_progU==""||!req.body.Duration_programU==""|| !req.body.LevelU==""||!req.body.program_infoU=="")
{
    var img_name="";
    try
        {var executed=await ApplyQuery("select distinct Pname from enroll_into_program where Pname='"+req.body.Program_NameU+"';");
         
         console.log(executed.length);
        if(!executed.length)
        {    var executed2=await ApplyQuery("select PName from programs where PName='"+req.body.Program_NameU+"';");
            if(!isNaN(req.body.Program_NameU)||!executed2.length)
            {   return res.render('add_any', {
                    title: 'Execute action', 
                    css: 'add_any',
                    message: "Invalid Program name!",
                        instructors:instructors,
                        coupons_list:coupons_list}
                )
            ;}
            else{
                console.log(req.files.Program_imgU);
                if(req.files.Program_imgU)
                {
                    var file=req.files.Program_imgU;
                    img_name="/images/"+file.name;
                    if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                                
                        file.mv('./public/images/'+file.name, async function(err) {
                            if (err)
                            { 
                                console.log("can't upload picture");
                                return res.status(500).send(err);
                            }
                            else
                            {
                                try{
                                    await ApplyQuery("Update programs set Program_Image='"+img_name+"' where PName='"+req.body.Program_NameU+"'");
                                    console.log("image updated");
                                }
                                catch(e)
                                {
                                    console.error(e);
                                    return res.render('add_any', {
                                        title: 'Execute action',
                                        css: 'add_any',
                                        message:  "Failed to update the program image",
                                        instructors:instructors,
                                        coupons_list:coupons_list
                                    })
                                }
                            }
                            
                        });
        
                    } 
                    else {
                        return res.render('add_any', {
                            title: 'Execute action',
                            css: 'add_any',
                            message:  "This format is not allowed , please upload file with '.png','.gif','.jpg'",
                                    instructors:instructors,
                                    coupons_list:coupons_list
                        })
                    }
                }
                else
                {
                    img_name="/images/course_5.jpg";
                }
                //cost
                if(req.body.Cost_progU!="")
                { 
                        try{
                            await ApplyQuery("Update programs set Cost='"+req.body.Cost_progU+"' where PName='"+req.body.Program_NameU+"'");
                            console.log("cost updated");
                        }
                        catch(e)
                        {
                            console.error(e);
                            return res.render('add_any', {
                                title: 'Execute action',
                                css: 'add_any',
                                message:  "Failed to update the program cost",
                                instructors:instructors,
                                coupons_list:coupons_list
                            })
                        }
                }
                //duration
                if(req.body.Duration_programU!="")
                {

                        try{
                            await ApplyQuery("Update programs set Duration='"+req.body.Duration_programU+"' where PName='"+req.body.Program_NameU+"'");
                            console.log("duration updated");
                        }
                        catch(e)
                        {
                            console.error(e);
                            return res.render('add_any', {
                                title: 'Execute action',
                                css: 'add_any',
                                message:  "Failed to update the program duration",
                                instructors:instructors,
                                coupons_list:coupons_list
                            })
                        }  
                }
                if(req.body.LevelU)
                {   try{
                        await ApplyQuery("Update programs set Level='"+req.body.LevelU+"' where PName='"+req.body.Program_NameU+"'");
                        console.log("level updated");
                    }
                    catch(e)
                    {
                        console.error(e);
                        return res.render('add_any', {
                            title: 'Execute action',
                            css: 'add_any',
                            message:  "Failed to update the program level",
                            instructors:instructors,
                            coupons_list:coupons_list
                        })
                    }  
                }
                if(req.body.program_infoU)
                {   try{
                        await ApplyQuery("Update programs set Program_Info='"+req.body.program_infoU+"' where PName='"+req.body.Program_NameU+"'");
                        console.log("info updated");
                    }
                    catch(e)
                    {
                        console.error(e);
                        return res.render('add_any', {
                            title: 'Execute action',
                            css: 'add_any',
                            message:  "Failed to update the program info",
                            instructors:instructors,
                            coupons_list:coupons_list
                        })
                    }  
                }
                return res.render('add_any', {
                    title: 'Execute action',
                    css: 'add_any',
                    message:  "Program updated successfully",
                    instructors:instructors,
                    coupons_list:coupons_list
                })
        
            }
        }
        else
        {
            return res.render('add_any', {
                title: 'Execute action',
                css: 'add_any',
                message:  "We cannot update this program because it is currently in use",
                instructors:instructors,
                coupons_list:coupons_list
            })
        }
    }
    catch(e)
    {
        console.error(e);
        return res.render('add_any', {
            title: 'Execute action',
            css: 'add_any',
            message:  "Error while Executing the query",
            instructors:instructors,
            coupons_list:coupons_list
        })

    }

}
//----------------------------------------------------------Delete Program--------------------------------------------------------------------
if(!req.body.Program_NameD=="")
{
        var query="select distinct Pname from enroll_into_program where Pname='"+req.body.Program_NameD+"'";
        var executed=await ApplyQuery(query);
        console.log(executed);

        if(!executed.length)
        {
            if(!isNaN(req.body.Program_NameD))
            {   return res.render('add_any', {
                    title: 'Execute action', 
                    css: 'add_any',
                    message: "Invalid Program name!",
                        instructors:instructors,
                        coupons_list:coupons_list}
                )
            ;}
            else
            {
                try
                {
                    await ApplyQuery("Delete from programs where PName='"+req.body.Program_NameD+"';");
                    return res.render('add_any', {
                        title: 'Execute action', 
                        css: 'add_any',
                        message: "Program deleted!",
                            instructors:instructors,
                            coupons_list:coupons_list}
                    )
                }
                catch(e)
                {
                    console.log(e);
                    return res.render('add_any', {
                        title: 'Execute action', 
                        css: 'add_any',
                        message: "Failed to delete .. Error while executing the query!",
                            instructors:instructors,
                            coupons_list:coupons_list}
                    )

                }
            }
        }
        else
        {
             return res.render('add_any', {
                title: 'Execute action', 
                css: 'add_any',
                message: "Cannot delete the program because it is currently in use (some students are enrolled in )!",
                    instructors:instructors,
                    coupons_list:coupons_list}
            )
        }
};
// -------------------------------------------------------------- Add IT Administrator --------------------------------------------------------------------------
if(!req.body.IT_FName=="" || !req.body.IT_LName=="" || !req.body.IT_username=="" || !req.body.Owner_username=="")
{
    if (!req.body.IT_FName) {
        return res.render('add_any', {
            title: 'Execute action',
            css: 'add_any',
            message:  "You must enter IT First Name ",
                    instructors:instructors,
                    coupons_list:coupons_list
        })
    }
    if (!req.body.IT_LName) {
        return res.render('add_any', {
            title: 'Execute action',
            css: 'add_any',
            message:  "You must enter IT Last Name ",
                    instructors:instructors,
                    coupons_list:coupons_list
        })
    }
    var RandomUsername= Math.floor((Math.random() * 1000000) + 1);
    var sql_RandomUsername= "select  Count(*) from owners where Username="+RandomUsername;
    const applysql_RandomUsername= await ApplyQuery(sql_RandomUsername);

    while(applysql_RandomUsername[0] >=1 )
    {
        RandomUsername= Math.floor((Math.random() * 1000000) + 1);
        sql_RandomUsername= "select  Count(*) from owners where Username="+RandomUsername;
        applysql_RandomUsername=await ApplyQuery(sql_RandomUsername);
    }
    var username_funky=req.body.IT_FName+req.body.IT_LName+RandomUsername;

    var checkOwnerExists ="select * from owners where Username='"+req.body.Owner_username+"'";
    var sqlcheckOwnerExists=await ApplyQuery(checkOwnerExists);

    if (req.body.Owner_username && sqlcheckOwnerExists!= 0){}
    else {
        return res.render('add_any', {
            title: 'Execute action',
            css: 'add_any',
            message:  "You must enter your username in Owner username",
            instructors:instructors,
            coupons_list:coupons_list
        })
    }

    var addIT="insert into it_adminstrators (FName, LName, Username, Owner_Username) values ('"+req.body.IT_FName+"','"+req.body.IT_LName+"','"+username_funky+"','"+req.body.Owner_username+"');";
    
    await ApplyQuery(addIT);

    return res.render('add_any', {
        title: 'Execute action', 
        css: 'add_any',
        message: "IT Administrator is added successfully !",
        instructors:instructors,
        coupons_list:coupons_list}
    );
}
//-----------------------------------------------------------Delete IT --------------------------------------------------
if(!req.body.IT_Delete=="" )
{   if(isNaN(req.body.IT_Delete))
    {
        try
        {
            var executed=await ApplyQuery("Select Username from it_adminstrators where Username='"+req.body.IT_Delete+"';")
            console.log(executed.length);
            if(executed.length)
            {
                try
                {
                    var executed=await ApplyQuery("Delete from it_adminstrators where Username='"+req.body.IT_Delete+"';")
                    return res.render('add_any', {
                        title: 'Execute action',
                        css: 'add_any',
                        message: "IT is deleted successfully!",
                        instructors:instructors,
                        coupons_list:coupons_list
                    })

                }
                catch(e)
                {
                    console.error(e);
                    return res.render('add_any', {
                        title: 'Execute action',
                        css: 'add_any',
                        message: "Error while executing the query",
                        instructors:instructors,
                        coupons_list:coupons_list
                    })
                }
            }
            else
            {
                return res.render('add_any', {
                title: 'Execute action',
                css: 'add_any',
                message: "IT username isn't existed",
                instructors:instructors,
                coupons_list:coupons_list
            })
            
            }
        }
        catch(e)
        {
            console.error(e); 
            return res.render('add_any', {
                title: 'Execute action',
                css: 'add_any',
                message: "Error while executing the query",
                instructors:instructors,
                coupons_list:coupons_list
            })
        }
    }
    else
    {
        return res.render('add_any', {
            title: 'Execute action',
            css: 'add_any',
            message: "invalid fotmat for IT username",
            instructors:instructors,
            coupons_list:coupons_list
        })
    }
}
// ------------------------------------------------ ADD Coupons ----------------------------------------------------
if(!req.body.Owner_username2=="" || !req.body.percentage=="" || !req.body.start=="" || !req.body.end=="" ||!req.body.Category2=="" )
{
    //create random coupon id
    var RandomCoupon_ID= Math.floor((Math.random() * 1000000) + 1);
    var sql_RandomCoupon_ID= "select  Count(*) from coupons where Coupon_ID="+RandomCoupon_ID;
    const applysql_RandomCoupon_ID= await ApplyQuery(sql_RandomCoupon_ID);

    while(applysql_RandomCoupon_ID[0] >=1 )
    {
        RandomCoupon_ID= Math.floor((Math.random() * 1000000) + 1);
        sql_RandomCoupon_ID= "select  Count(*) from coupons where Coupon_ID="+RandomCoupon_ID;
        applysql_RandomCoupon_ID=await ApplyQuery(sql_RandomCoupon_ID);
    }

    //owner username
    var checkOwnerExists ="select * from owners where Username='"+req.body.Owner_username2+"'";
    var sqlcheckOwnerExists=await ApplyQuery(checkOwnerExists);

    if (req.body.Owner_username2 && sqlcheckOwnerExists!= 0){}
        else {
            return res.render('add_any', {
                title: 'Execute action',
                css: 'add_any',
                message:  "You must enter your username in Owner username",
                        instructors:instructors,
                        coupons_list:coupons_list
            })
        }
    //percentage between 0-100
    if (!req.body.percentage) {
        return res.render('add_any', {
            title: 'Execute action',
            css: 'add_any',
            message:  "You must enter coupon discount percentage ",
                    instructors:instructors,
                    coupons_list:coupons_list
        })
    }
    if(req.body.percentage < 0  || req.body.percentage > 100)
    {
        return res.render('add_any', {
            title: 'Execute action',
            css: 'add_any',
            message:  "Coupon discount percentage must be between 0-100",
                    instructors:instructors,
                    coupons_list:coupons_list
        })
    }

    if (!req.body.start) {
        return res.render('add_any', {
            title: 'Execute action',
            css: 'add_any',
            message:  "You must enter coupon discount start date",
                    instructors:instructors,
                    coupons_list:coupons_list
        })
    }
    if (!req.body.end) {
        return res.render('add_any', {
            title: 'Execute action',
            css: 'add_any',
            message:  "You must enter coupon discount end date",
                    instructors:instructors,
                    coupons_list:coupons_list
        })
    }
    //end date must be greater than start date
    if(req.body.start >= req.body.end)
    {
        return res.render('add_any', {
            title: 'Execute action',
            css: 'add_any',
            message:  "end date must be greater than start date",
                    instructors:instructors,
                    coupons_list:coupons_list
        })
    }
    var validCategoryQuery="select * from categories where CName='"+req.body.Category2+"'";
    sql_validInstructorQuery=await ApplyQuery(validCategoryQuery);

    if (req.body.Category2 && sql_validInstructorQuery != 0) {}
    else{
        return res.render('add_any', {
            title: 'Execute action', 
            css: 'add_any',
            message:  "Enter existing category name",
                    instructors:instructors,
                    coupons_list:coupons_list
        })
    }
    
    var addCoupon="insert into coupons (Coupon_ID, Owner_Username, SDate, EDate,discount_percentage, Category_Name) values ("+RandomCoupon_ID+",'"+req.body.Owner_username2+"','"+req.body.start+"','"+req.body.end+"',"+ req.body.percentage+",'"+req.body.Category2 +"');";
        
        await ApplyQuery(addCoupon);

        return res.render('add_any', {
            title: 'Execute action', 
            css: 'add_any',
            message: "Coupon is added successfully !",
                instructors:instructors,
                coupons_list:coupons_list}
        );
}
//------------------------------------------------------- Update Coupon -----------------------------------------------------------------------
if(!req.body.Coupon_id_update==""||!req.body.Owner_username_couponU=="" || !req.body.percentage_U=="" || !req.body.start_U=="" || !req.body.end_U=="" ||!req.body.Category_U=="" )
{
    coupons_list=await ApplyQuery('SELECT Coupon_ID from Coupons ');
    //loop over coupons to detect if coupoun duration ended or not so can take any action(upadte or delete)
    var coupons = await ApplyQuery("SELECT * FROM Coupons where Coupon_ID='"+req.body.Coupon_id_update+"'");
    let currDate = new Date();
    console.log(req.body);
    if(!(coupons.EDate>currDate))
    {
        //owner username
        var checkOwnerExists ="select * from owners where Username='"+req.body.Owner_username_couponU+"'";
        var sqlcheckOwnerExists=await ApplyQuery(checkOwnerExists);

        if (req.body.Owner_username_couponU && sqlcheckOwnerExists!= 0){}
            else {
                return res.render('add_any', {
                    title: 'Execute action',
                    css: 'add_any',
                    message:  "You must enter your username in Owner username",
                            instructors:instructors,
                            coupons_list:coupons_list
                })
            }
        //percentage between 0-100
        if (!req.body.percentage_U) {
            return res.render('add_any', {
                title: 'Execute action',
                css: 'add_any',
                message:  "You must enter coupon discount percentage ",
                        instructors:instructors,
                        coupons_list:coupons_list
            })
        }
        if(req.body.percentage_U < 0  || req.body.percentage_U > 100)
        {
            return res.render('add_any', {
                title: 'Execute action',
                css: 'add_any',
                message:  "Coupon discount percentage must be between 0-100",
                        instructors:instructors,
                        coupons_list:coupons_list
            })
        }
        //end date must be greater than start date
        if(req.body.start_U >= req.body.end_U)
        {
            return res.render('add_any', {
                title: 'Execute action',
                css: 'add_any',
                message:  "end date must be greater than start date",
                        instructors:instructors,
                        coupons_list:coupons_list
            })
        }
        var validCategoryQuery="select * from categories where CName='"+req.body.Category_U+"'";
        sql_validInstructorQuery=await ApplyQuery(validCategoryQuery);

        if (req.body.Category_U && sql_validInstructorQuery != 0) {}
        else{
            return res.render('add_any', {
                title: 'Execute action', 
                css: 'add_any',
                message:  "Enter existing category name",
                        instructors:instructors,
                        coupons_list:coupons_list
            })
        }
        
            var addCoupon="update coupons set  Owner_Username= '"+req.body.Owner_username_couponU  +"',SDate= '"+req.body.start_U  +"',EDate= '"+ req.body.end_U+"',discount_percentage = '"+ req.body.percentage_U +"',Category_Name = '"+ req.body.Category_U +"' where Coupon_ID='"+req.body.Coupon_id_update+"';"; 
            
            try{await ApplyQuery(addCoupon);
                return res.render('add_any', {
                    title: 'Execute action', 
                    css: 'add_any',
                    message: "Coupon is updated successfully !",
                        instructors:instructors,
                        coupons_list:coupons_list}
                );}
            catch(e){
                console.error(e);
                return res.render('add_any', {
                    title: 'Execute action', 
                    css: 'add_any',
                    message: "Faild to update coupon!",
                        instructors:instructors,
                        coupons_list:coupons_list}
                );
            }
            
    }
}
//--------------------------------------------------------------Delete Coupon--------------------------------------------------------------------------------------------
if(!req.body.Coupon_id_delete =="")
{
    coupons_list=await ApplyQuery('SELECT Coupon_ID from Coupons ');
    //loop over coupons to detect if coupoun duration ended or not so can take any action(upadte or delete)
    var coupons;
    var deleteCoupon="SELECT * FROM Coupons where Coupon_ID="+req.body.Coupon_id_delete+";";
    try{coupons = await ApplyQuery(deleteCoupon);}
    catch(e){
        console.error(e);
        return res.render('add_any', {
            title: 'Execute action', 
            css: 'add_any',
            message: "Cannot find such a coupon!",
            instructors:instructors,
            coupons_list:coupons_list
        }
        );
    }

    let currDate = new Date();
    if(coupons[0].EDate<currDate)
    {

        var addCoupon="Delete from coupons where Coupon_ID='"+req.body.Coupon_id_delete+"';"; 
            
        try{await ApplyQuery(addCoupon);
            return res.render('add_any', {
                title: 'Execute action.', 
                css: 'add_any',
                message: "Coupon is deleted successfully !",
                instructors:instructors,
                coupons_list:coupons_list
            }
            );}
        catch(e){
            console.error(e);
            return res.render('add_any', {
                title: 'Execute action', 
                css: 'add_any',
                message: "Faild to delete coupon!",
                instructors:instructors,
                coupons_list:coupons_list
            }
            );
        }
        
    }
    else{
        return res.render('add_any', {
            title: 'Execute action', 
            css: 'add_any',
            message: "Cannot delete this coupon because it is currently in use!",
            instructors:instructors,
            coupons_list:coupons_list
        });
    }
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------- Review Instructors --------------------------------------------------------------------------
var sql_query="SELECT Username from instructors where statuss= 1";
var instructors;
try {
    instructors=await ApplyQuery(sql_query);
    console.log(instructors.length);
    }
    catch(e)
    {
        console.error(e);
    }
if(instructors.length!=0)
{    
    for(var i=0 ; i< instructors.length ; i++)
    {   
        if(req.body[i]!="Select")
        {   
            if(req.body[i]=="Rejected")
            {          
                var sql_query="DELETE from instructors where Username='"+ instructors[i].Username+"'";
                    try{
                    var executed= await ApplyQuery(sql_query);
                    }
                    catch(e)
                    {
                        console.error(e);
                        return res.render('add_any', {
                            title: 'Execute action', 
                            css: 'add_any',
                            message: "FAILD with Schema error !",
                            instructors:instructors,
                            coupons_list:coupons_list
                        });
                    }
                
                    
            }
            else if(req.body[i]=="Accepted")
            {     
                var sql_query="Update instructors set Statuss='"+ 0+"' where Username='"+instructors[i].Username+"'";
                    try{
                        var executed= await ApplyQuery(sql_query);
                        }
                    catch(e)
                    {
                        console.error(e);
                        return res.render('add_any', {
                            title: 'Execute action', 
                            css: 'add_any',
                            message: "FAILD to add the instructor!",
                            instructors:instructors,
                            coupons_list:coupons_list
                        });
                    }

                }
            
        }

    }
    return res.render('add_any', {
        title: 'Execute action', 
        css: 'add_any',
        message: "Done .. instructors waiting list is empty now",
        instructors:instructors,
        coupons_list:coupons_list
    });
    
}
//------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------ Delete Instructor ----------------------------------------------------------------
if(req.body.Delet_instructor !="Select")
{  
   try{
       var executed=await ApplyQuery("Select Instructor_Username from teaches  where Instructor_Username='" +req.body.Delet_instructor+"';");
       if(!executed.length)
       {
           try{
               await ApplyQuery("Delete from Instructors where Username='"+req.body.Delet_instructor  +"';");
               return res.render('add_any', {
                title: 'Execute action', 
                css: 'add_any',
                message: "Instructor is deleted Successfully!",
                instructors:instructors,
                coupons_list:coupons_list
            });
           }
           catch(e)
           {console.error(e);
            return res.render('add_any', {
                title: 'Execute action', 
                css: 'add_any',
                message: "Failed to delete this instructor!",
                instructors:instructors,
                coupons_list:coupons_list
            });
           }
       }
       else
       {
        return res.render('add_any', {
            title: 'Execute action', 
            css: 'add_any',
            message: "Can not delete this instructor because he serve a course right now!",
            instructors:instructors,
            coupons_list:coupons_list
        })
       }
   }
   catch(e)
   {
       console.error(e);
       return res.render('add_any', {
        title: 'Execute action', 
        css: 'add_any',
        message: "Error while executing the query of deleting the instructor",
        instructors:instructors,
        coupons_list:coupons_list
    });
   }

}
//-----------------------------------------------------------------------------------------------------------------------------------
return res.render('add_any', {
    title: 'Execute action', 
    css: 'add_any',
    message: "No action selected!",
    instructors:instructors,
    coupons_list:coupons_list
})
});

  
const ApplyQuery = (query) => {
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

        }, 1000);
    });
};
const QUERY_LENGHT = (query) => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
                db.query(query,(error, rows) => {
                    if(!error) 
                        {
                        resolve(rows.PName);                                           
                        }
                    else
                        {reject(new Error(error));}
                })

        }, 1000);
    });
};
module.exports = router;