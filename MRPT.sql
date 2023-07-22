CREATE DATABASE MRPT;
USE MRPT;
create table IF NOT exists Owners
(
Fname varchar(50) not null,
Lname varchar(50) not null,
primary key (Username),
profile_Pic varchar(1024),
Password varchar(50),
Email varchar(50),
Username varchar(50) not null,
Gender varchar(6)
-- only one owner ---
);

--  --
create table IF NOT exists IT_Adminstrators
(
Fname varchar(50) not null,
Lname varchar(50) not null,
Username varchar(50) not null,
Profile_Pic varchar(1024),
Owner_Username varchar(50),
Password varchar(50) default 12345,
Email varchar(50),
Gender varchar(6),
primary key (Username),
Foreign key (Owner_Username) references Owners (Username) on update cascade
);

-- --
create table IF NOT exists Programs
(
PName varchar(100) not null ,
Cost float,
Level varchar(50),
Duration int,
Program_info TEXT,
Program_image varchar(1024),
IT_Username varchar(50) ,
primary key (PName),
foreign key (IT_Username) references IT_Adminstrators(Username) on update cascade on delete set null
);
-- --
create table IF NOT exists Categories
(
CName varchar(100) not null,
IT_Username varchar(50) ,
Category_image varchar(1024),
primary key (CName),
foreign key (IT_Username) references IT_Adminstrators(Username) on update cascade on delete set null
);


create table if Not exists Instructors
(
Fname varchar(50) not null,
Lname varchar(50) not null,
Username varchar(50) not null,
IT_Username varchar(50) ,
Profile_Pic varchar(1024),
Password varchar(50) default 12345,
Email varchar(50),
Total_Income float,
Gender varchar(6),
CV_Link varchar(500) not null,
Statuss int ,  
primary key (Username),

Foreign key (IT_Username) references IT_Adminstrators(Username) on update cascade on delete set null
);
-- -- 
-- --
create table IF NOT exists Courses
(
Course_ID int not null,
Course_Name varchar(100) not null,
Instructors_Username varchar(50),
Category_Name varchar(100),
Programe_Name varchar(100),
Cost float,
Duration int,
Course_image varchar(1024),
Course_info MEDIUMTEXT,
Course_small_info TINYTEXT,
Primary key (Course_ID),
foreign key (Category_Name) references Categories(CName) on update cascade on delete set null,
foreign key (Programe_Name) references Programs(PName)  on update cascade on delete set null,
foreign key (Instructors_Username) references Instructors (UserName) on update cascade on delete cascade
);

-- --
create table if not exists Teaches
(
Instructor_Username varchar(50),
Course_ID int,
primary key (Instructor_Username,Course_ID),
rate float,
foreign key (Instructor_Username) references Instructors(Username) on update cascade on delete cascade,
foreign key (Course_ID) references Courses(Course_ID) on update cascade on delete cascade
);
-- --
create table if not exists Students
(
Fname varchar(50) not null,
Lname varchar(50) not null,
Username varchar(50) not null,
Password varchar(50),
Email varchar(50),
Profile_Pic varchar(1024),
Gender varchar(6),
primary key (Username)

);

create table if not exists Quizzes
(
Course_ID int,
Quiz_ID   int,
Date date,
Max_Grade int,
primary key (Quiz_ID),
foreign key (Course_ID) references Courses(Course_ID) on update cascade on delete cascade

);

create table if not exists Taken_Quizzes
(
Course_ID int,
Quiz_ID   int,
Student_Username varchar(50),
Grade float,
primary key (Quiz_ID,Course_ID,Student_Username),

foreign key (Course_ID) references Courses(Course_ID) on update cascade on delete cascade,
foreign key (Quiz_ID  ) references Quizzes (Quiz_ID)  on update cascade on delete cascade,
foreign key (Student_Username) references Students (Username) on update cascade on delete cascade

);

CREATE TABLE IF NOT EXISTS Videos(
Video_number INT NOT NULL,
Course_ID INT NOT NULL, 
Video_Link TEXT NOT NULL,
Video_Name TEXT NOT NULL,
PRIMARY KEY (Video_number, Course_ID)
);


CREATE TABLE IF NOT EXISTS Watch_Videos(
Video_number INT,
Course_ID INT, 
Student_Username varchar(50),
FOREIGN KEY (Course_ID) REFERENCES Courses (Course_ID) ,
FOREIGN KEY (Video_number) REFERENCES Videos (Video_number) ,
FOREIGN KEY (Student_Username) REFERENCES Students (Username) 
);

create table if not exists Coupons
(
Coupon_ID INT NOT NULL,
Owner_Username varchar(50),
SDate date,
EDate date,
discount_percentage int,
Category_Name varchar(100),
primary key (Coupon_ID),
foreign key (Owner_Username) references Owners(Username) on update cascade on delete cascade,
foreign key (Category_Name) references Categories(CName) on update cascade on delete cascade
);
-- --
create table if not exists Income_Analysis
(
Course_ID int,
Total_enrollement  int,
Total_income float,
Net_profit float,
Instructors_fees float,
primary key (Course_ID),
foreign key (Course_ID) references Courses(Course_ID) 

);
--
create table if not exists Enroll_into_course
(
Course_ID int,
Student_Username varchar(50),
Date date,
Finished int , 
primary key (Course_ID,Student_Username),
foreign key (Course_ID) references Courses(Course_ID) ,

foreign key (Student_Username) references Students(Username) 


);
--
create table if not exists Enroll_into_program
(
Pname varchar(100),
Student_Username varchar(50),
Date date,
primary key (Pname,Student_Username),
foreign key (Pname) references Programs(PName),
foreign key (Student_Username) references Students(Username)

);
-- 
create table if not exists Donors
(
Dname varchar(100) not null,
Email  varchar(100),
Date date,
Amount float,
primary key (Email,Date,Amount)
);
-- --
create table if not exists Included  -- courses in each program
(
Course_ID int ,
Pname varchar(100),
primary key (Course_ID,Pname),
foreign key (Course_ID) references Courses (Course_ID),
foreign key (Pname  ) references Programs(PName)
);

create table if not exists Cards  
(
card_number BIGINT(255)	 ,  -----------  16 digit
card_Password int ,         -----------  4 digit
expire_date int ,           -----------  4 digits
cvc int , 
money int ,                    -----------  3 digits
primary key (card_number)
);

INSERT into cards values( 1111111111111111 , 1111, 1212 , 111 , 500  );


/*Insert Records*/
-- Owners --
INSERT INTO Owners (Fname, Lname, Username) VALUES ("Will", "Smith", "willsmith");

-- IT Adminstrators --
INSERT INTO IT_Adminstrators  VALUES ("Medhat","kamal","Mkamal" ,"Kamal.jpg","willsmith","999879","medhat55@gmail.com","Male");


-- Categories -- 
INSERT INTO Categories (CName, IT_Username, Category_image) VALUES ("Data Science", "Mkamal","images/dataScience.png");
INSERT INTO Categories (CName, IT_Username, Category_image) VALUES ("IOT", "Mkamal","images/IOT.jpeg");
INSERT INTO Categories (CName, IT_Username, Category_image) VALUES ("Quantum", "Mkamal","images/quantum.jpg");
INSERT INTO Categories (CName, IT_Username, Category_image) VALUES ("Web Development", "Mkamal","images/Web_Dev.png");

-- Programs --
INSERT INTO Programs (PName,IT_Username,Cost, Level, Duration, Program_info, Program_image) VALUES ("AI", "Mkamal", 15000, "Beginner", 3, "Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon", "images/ML.jpeg");
INSERT INTO Programs (PName,IT_Username, Cost, Level, Duration, Program_info, Program_image) VALUES ("Web Development", "Mkamal", 15000, "Beginner", 3, "Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon", "images/Web_Dev.png");
                                    

-- instructors --
insert  into Instructors values ('Omar','Kamal','OmarA',"Mkamal","images/author.jpg",'123456',null,900, "Male" , "", 1);
insert  into Instructors values ('Emad','Atalah','EmadA',"Mkamal","images/author.jpg",null,null,1000, "Male", "", 1);
INSERT INTO Instructors VALUES ("Menna", "Ahmed", "mennaahmed","Mkamal", "images/author.jpg", null, null,null, "Female", "", 1);
INSERT INTO Instructors VALUES ("Reem", "Attalah", "reemattalah", "Mkamal", "images/author.jpg", null, null, null,"Female", "", 1);


-- Courses -- 
INSERT INTO Courses (Course_ID, Course_Name, Instructors_Username, Category_Name, Programe_Name, Cost, Duration, Course_info, Course_small_info, Course_image) VALUES (1,"Probability", "reemattalah", "Data Science", "AI", 150, 1,"Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon","Learn with Us now!", "/images/course_5.jpg");
INSERT INTO Courses (Course_ID, Course_Name, Instructors_Username, Category_Name, Programe_Name, Cost, Duration, Course_info, Course_small_info, Course_image) VALUES (2,"Statistics", "reemattalah", "Data Science", "AI", 150, 1,"Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon", "Learn with Us now!", "/images/course_5.jpg");
INSERT INTO Courses (Course_ID, Course_Name, Instructors_Username, Category_Name, Programe_Name, Cost, Duration, Course_info, Course_small_info, Course_image) VALUES (3,"Data Analysis", "reemattalah", "Data Science", "AI", 150, 1,"Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon","Learn with Us now!", "/images/course_5.jpg");
INSERT INTO Courses (Course_ID, Course_Name, Instructors_Username, Category_Name, Programe_Name, Cost, Duration, Course_info, Course_small_info, Course_image) VALUES (4,"Machine Learning", "mennaahmed", "Data Science", "AI", 150, 1,"Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon","Learn with Us now!", "/images/course_5.jpg");
INSERT INTO Courses (Course_ID, Course_Name, Instructors_Username, Category_Name, Programe_Name, Cost, Duration, Course_info, Course_small_info, Course_image) VALUES (5,"HTML Basics", "mennaahmed", "Web Development", "Web Development", 150, 1,"Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon","Learn with Us now!", "/images/course_5.jpg");
INSERT INTO Courses (Course_ID, Course_Name, Instructors_Username, Category_Name, Programe_Name, Cost, Duration, Course_info, Course_small_info, Course_image) VALUES (6,"CSS Basics", "mennaahmed","Web Development", "Web Development", 150, 1,"Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon","Learn with Us now!", "/images/course_5.jpg");
INSERT INTO Courses (Course_ID, Course_Name, Instructors_Username, Category_Name, Programe_Name, Cost, Duration, Course_info, Course_small_info, Course_image) VALUES (7,"JavaScript Basics", "mennaahmed","Web Development", "Web Development", 150, 1,"Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon", "Learn with Us now!", "/images/course_5.jpg");
INSERT INTO Courses (Course_ID, Course_Name, Instructors_Username,Category_Name, Programe_Name, Cost, Duration, Course_info, Course_small_info, Course_image) VALUES (8,"PHP Basics", "mennaahmed","Web Development", "Web Development", 150, 1,"Our set he for firmament morning sixth subdue darkness creeping gathered divide our
                                    let god moving. Moving in fourth air night bring upon","Learn with Us now!", "/images/course_5.jpg");

-- Copouns -- 
INSERT INTO Coupons (Coupon_ID, SDate, EDate, discount_percentage, Category_Name) VALUES ("13548754","2021-01-05","2021-01-15",15, "Data Science");
INSERT INTO Coupons (Coupon_ID, SDate, EDate, discount_percentage, Category_Name) VALUES ("18786545","2021-01-07","2021-01-20",15, "IOT");
INSERT INTO Coupons (Coupon_ID, SDate, EDate, discount_percentage, Category_Name) VALUES ("13467875","2021-01-22","2021-02-05",15, "Quantum");


-- Teaches --
insert into Teaches values("reemattalah",3,"5");


-- videos --

INSERT INTO Videos VALUES (1, 1, "https://www.youtube.com/watch?v=uzkc-qNVoOk&list=PLC58778F28211FA19", "intro");
INSERT INTO Videos VALUES (2, 1, "https://www.youtube.com/watch?v=obZzOq_wSCg&list=PLC58778F28211FA19&index=2", "intro");
INSERT INTO Videos VALUES (3, 1, "https://www.youtube.com/watch?v=QE2uR6Z-NcU&list=PLC58778F28211FA19&index=3", "intro");
INSERT INTO Videos VALUES (4, 1, "https://www.youtube.com/watch?v=mLE-SlOZToc&list=PLC58778F28211FA19&index=4", "intro");
INSERT INTO Videos VALUES (5, 1, "https://www.youtube.com/watch?v=xSc4oLA9e8o&list=PLC58778F28211FA19&index=5", "intro");
INSERT INTO Videos VALUES (6, 1, "https://www.youtube.com/watch?v=mkyZ45KQYi4&list=PLC58778F28211FA19&index=6", "intro");
INSERT INTO Videos VALUES (1, 2, "https://www.youtube.com/watch?v=uhxtUt_-GyM&list=PL1328115D3D8A2566", "intro");
INSERT INTO Videos VALUES (2, 2, "https://www.youtube.com/watch?v=hsPCte_PcVA&list=PL1328115D3D8A2566&index=2", "intro");
INSERT INTO Videos VALUES (3, 2, "https://www.youtube.com/watch?v=6JFzI1DDyyk&list=PL1328115D3D8A2566&index=3", "intro");
INSERT INTO Videos VALUES (4, 2, "https://www.youtube.com/watch?v=Qf3RMGXR-h8&list=PL1328115D3D8A2566&index=4", "intro");
INSERT INTO Videos VALUES (5, 2, "https://www.youtube.com/watch?v=HvDqbzu0i0E&list=PL1328115D3D8A2566&index=5", "intro");
INSERT INTO Videos VALUES (6, 2, "https://www.youtube.com/watch?v=sRVGcYGjUk8&list=PL1328115D3D8A2566&index=6", "intro");


select * from students;
