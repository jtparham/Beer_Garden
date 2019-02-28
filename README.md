This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation
1. Download the zip file and extract its contents.
2. Load the "beer_databaes.sql" file into your mysql server
3. In the project directory, run "npm install"
3. In the project directory, run "npm start"<br>

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
*Make sure that you have a Mysql server running on port 3306 or the database will not connect.*
The page will reload if you make edits.<br>


## `Test Cases`

The test cases are designed to ensure that the filtering works as intended.

Test Case: Filter None
Prerequisite: All filters are empty
    1. All beers are displayed.

Test Case: Filter by Name
Prerequisite: Filter option should be set to "Contains" and all other filters are empty
    1. Type "Hocus Pocus" into the 'Name' filter. Only Hocus Pocus should appear.
    2. Type "hoc" into the 'Name' filter. All beers containing "hoc" will appear.

Test Case: Filter by ABV
Prerequisite: Filter option should be set to "Greater than or equal to" and all other filters are empty
    1. Type "6" into the 'A.B.V' filter. All beers with an A.B.V less than 6 will be removed from the grid. 

Test Case: Filter by Style
Prerequisite: Filter option should be set to "equals" and all other filters are empty
    1. Type "American-Style Stout" into the 'Style' filter. Only beers with the exact style "American-Style Stout" will appear
    ** As a note, the user can switch back to contains and just type "stout" into the style filter and they will get all beers with styles
    containing the word "stout". 