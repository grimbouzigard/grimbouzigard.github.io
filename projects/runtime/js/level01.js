var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        
        function createSawBlade(x, y){
            var hitZoneSize = 25; //creates the size of the hitzone
            var damageFromObstacle = 10; //sets the damage of the obstacle
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creates the hitzone
            sawBladeHitZone.x = x; //x position of the hitzone
            sawBladeHitZone.y = y;//y position of the hitzone
            game.addGameItem(sawBladeHitZone); //add the hitzone
            
            var obstacleImage = draw.bitmap('img/sawblade.png'); //drawing the image and storing in 
            sawBladeHitZone.addChild(obstacleImage); //add image to the hitzone so we can see it
            obstacleImage.x = -25; //tweaks the image -25 pixels left
            obstacleImage.y = -25; //tweaks the image -25 pixels left
            sawBladeHitZone.rotationalVelocity = 25;
        }

        createSawBlade(400, 345);
        createSawBlade(600, 345);
        createSawBlade(800, 345);
       
        function createEnemy(x, y){
        var enemy = game.createGameItem('enemy',25); //creating the game item and storing it in the variable enemy
        var redSquare = draw.rect(50,50,'red'); //creates rectangle and stores as red square
        redSquare.x = -25;
        redSquare.y = -25;
        enemy.addChild(redSquare); //add the red square to the enemy game item

        enemy.x = 400;
        enemy.y = groundY-50;

        game.addGameItem(enemy); //adds enemy to the game
        enemy.velocityX = -1; // causes the enemy to move 1 pixel to the left
        
        enemy.rotationalVelocity = 25;

        enemy.onPlayerCollision = function() {
            console.log('The enemy has hit Halle');
            game.changeIntegrity(-10);
        };
        
        enemy.onProjectileCollision = function() {
            console.log('The enemy has hit Halle');
            game.changeIntegrity(5);
            game.increaseScore(10);
            enemy.fadeOut();
        };
    }
    createEnemy();
    createEnemy();
    createEnemy(20, 20);
        // DO NOT EDIT CODE BELOW HERE
}
    };

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
