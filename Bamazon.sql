DROP DATABASE IF EXISTS Bamazon;

CREATE DATABASE Bamazon;

USE Bamazon;

-- Create a table called 'products' which will contain the store inventory --
CREATE TABLE products (
	item INT NOT NULL AUTO_INCREMENT,
	product VARCHAR(30) NOT NULL,
	department VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock INTEGER(11) NOT NULL,
	 PRIMARY KEY (id)
);

-- Insert data into the 'products' table --
INSERT INTO products (product, department, price, stock)
VALUES  ('Dove Shampoo', 'Cosmetics', 5.75, 85),
		('Dove Conditioner', 'Cosmetics', 6.25, 90),
		('Hair Brush', 'Cosmetics', 5.25, 62),
		('Hotwheels car', 'Toys', 4, 234),
		('Rubber Ducky', 'Toys', 9, 100),
		('Slingshot', 'Toys', 8, 40),
		('Zweihänder', 'Weapons', 1200, 500),
		('Haunted Katana', 'Weapons', 1, 1),
		('That weird circle blade from Xena: Warrior Princess', 'Weapons', 439, 1),
		('Pot of Awakening', 'D&D items', 5000, 1);


SELECT * FROM products;
