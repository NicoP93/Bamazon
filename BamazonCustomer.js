var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() { //shows current inventory on start
    connection.query('SELECT * FROM products', function(err, res) {
        if (err) throw err;
        console.table(res);
        
    })

    //////////////////////////
    inquirer
        .prompt({
            name: "buyOrExit",
            type: "list",
            message: "Would you like to [BUY] an item?",
            choices: ["BUY", "EXIT"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.buyOrExit === "BUY") {
                buyItem()
            } else {
                connection.end();
            }
        });
}

var buyItem = function(){

    // Prompt the user with a message
	inquirer.prompt([{
		name: "item",
		message: "Enter the ID of the item you wish to purchase.",

        // Make sure that they typed in a number and not a letter
		validate: function(value){
            if (isNaN(value) == false) {
                return true;
            }
            else {
            	return false;
            }
		}
	},{

        // After the first prompt, do another
        name: "userQuantity",
        message: "How many would you like to buy?",

        // And validate they typed in a number
        validate: function(value){
            if (isNaN(value) == false) {
                return true;
            }
            else {
                return false;
            }
        }
        // After the series of prompts
    }]).then(function(answers){

            // Set the userinput to currentItem and currentAmount
    		var currentItem = parseInt(answers.item);
            var currentAmount = parseInt(answers.userQuantity);

            //Read from database. If they requested too much, don't perform the transaction.
            //Otherwise fulfuill the request.
            connection.query('SELECT * FROM products WHERE ?',{
                item: answers.item
            },function(err, res){
                //If the amount requested is greater than the amount in stock.
                if (currentAmount > res[0].stock){
                    console.log("You cannot buy that many!");

                    // Back to prompt
                    start();
                }
                // Otherwise they may buy it
                else { 
                    console.log(res[0].stock);
                    console.log("You can buy it!");
                    // Calculate the new quantity to update in the database
                    var newQuantity = res[0].stock - currentAmount;
                    var totalCost = res[0].price*currentAmount;

                    // Update the quantity
                    connection.query('UPDATE products SET ? WHERE ?',[{
                        stock: newQuantity
                    },{
                        item: currentItem
                    }], function(err, res){
                        
                        console.log("You were charged $" + totalCost);

                        // Back to the prompt
                        inquirer.prompt([{
                            type:"list",
                            name: "askAgain",
                            message: "Do you want to [BUY] or [END]",
                            choices: ["BUY", "END"]
                        }]).then (function(answers){
                            if(answers.askAgain === "BUY"){
                                start();
                            } else {
                                connection.end();
                            }
                        })
                    });
                }
            })
	   })
} 