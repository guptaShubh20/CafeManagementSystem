create database CafeMgm2
use CafeMgm2

create table Users
(
UserId int primary key identity(1,1),
Name nvarchar(50) not null,
Username varchar(50) not null unique,
Mobile varchar(10) not null unique check(Mobile like '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'),
Email varchar(50) not null unique,
Address varchar(max),
PostCode varchar(50),
Password varchar(50) not null,
ImageUrl varchar(max),
)

select * from Users
create table Contact
(
ContactId int primary key identity(1,1) not null,
Name varchar(50) not null,
Email varchar(50) not null,
Subject varchar(200) not null,
Message varchar(max) not null,
CreatedDate datetime 
)

create table Categories
(
CategoryId int primary key identity(1,1) not null,
Name varchar(50) unique not null,
ImageUrl varchar(max),
CreatedDate datetime 
)

create table Products
(
ProductId int primary key identity(1,1),
Name varchar (50) unique not null,
Description varchar(100),
Price decimal(7,2) not null,
ImageUrl varchar(max),
CategoryId int foreign key references Categories(CategoryId) on delete cascade, --FK
)

create table Carts
(
CartId int primary key identity(1,1),
ProductId int foreign key references Products(ProductId) on delete cascade, --FK
Quantity int not null,
UserId int foreign Key references Users(UserId) on delete cascade --FK
)

create table Orders
(
OrderId int primary key identity(1,1),
Total_amount DECIMAL(10, 2),
UserId int foreign key references Users(UserId) on delete cascade null, --FK
Status varchar(50),
PaymentId int foreign key references Payment(PaymentId) on delete cascade, --FK
OrderDate datetime,

)

CREATE TABLE Order_items 
(
Order_item_id int primary key identity(1,1), 
Quantity int not null,
Price decimal(10, 2) not null, 
OrderId int foreign Key references Orders(OrderId) on delete cascade, --FK
ProductId int foreign Key references Products(ProductId) on delete cascade --FK 
)



create table Payment
(
PaymentId int primary key identity(1,1),
Name varchar(50) not null,
CardNo varchar(50),
ExpiryDate varchar(50),
CvvNo int,
Address varchar(max) not null,
PaymentMode varchar(50) not null
)
