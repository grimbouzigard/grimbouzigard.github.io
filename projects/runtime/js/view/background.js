var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var tree;
        var buildings = [];


        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,canvasHeight,'black');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            
            
            for (var i = 0; i <= 100; i++){ //for loop that draws the stars
                var circle = draw.circle(2,'white','LightGray',2); //variable for the stars
                circle.x = canvasWidth*Math.random(); //controls the length randomly of the circles
                circle.y = groundY*Math.random(); // controls the height randomly of the circles
                background.addChild(circle); //adds the circle
            }
            
            var moon = draw.bitmap('img/moon.png'); //created a variable called moon. draw.bitmap stores it in the variable
            moon.x = 1200; //moves the moon left and right
            moon.y = 100; //moves the moon up and down
            moon.scaleX = 0.5; //scales the moon stretches the moon horizontal
            moon.scaleY = 0.5; //scales the moon stretches the moon vertical
            background.addChild(moon); //lets us see the moon on the screen

            
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            
           // for(var i = 0; i < 5; i++){
                //var buildingHeight = 300;//creates a variable that holds the height of the building
                //var building = draw.rect(75,buildingHeight,'LightGray','Black',1); // creates a variable for the building
                //building.x = 200*i; //positions the x of each building 200 pixels
               // building.y = groundY-buildingHeight; // stes the y of the building to ground level
               // background.addChild(building); // adds building to background
               // buildings.push(building); // pushes each individual to the array
          //  }
            
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/tree.png');
            tree.x = 0; //decides the x location
            tree.y = groundY - 480; //decides the y location of the tree
            tree.scaleX = 0.5;
            tree.scaleY = 0.5;
            background.addChild(tree); 
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 1;
            if(tree.x < -200) {
                tree.x = canvasWidth;
            }
            
            // TODO 5: Part 2 - Parallax
            for (var i = 0; i < buildings.length; i++){
                buildings[i].x = buildings[i].x - 0.5; //moves the x position to .5
                if(buildings[i].x < 0) { //checks to see if the x position is off the left side of so it resets
                    buildings[i].x = canvasWidth
                }
            }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
