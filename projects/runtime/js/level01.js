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
                { "type": "sawblade", "x": 400, "y": groundY - 50},
                { "type": "sawblade", "x": 1500, "y": groundY - 50 },
                { "type": "sawblade", "x": 2500, "y": groundY - 50},

                { "type": "enemy", "x": 500, "y": groundY - 50},
                { "type": "enemy", "x": 1900, "y": groundY - 50},
                { "type": "enemy", "x": 2800, "y": groundY - 50},

                { "type": "reward", "x": 1000, "y": groundY - 50},
                { "type": "reward", "x": 2000, "y": groundY - 50},
                { "type": "reward", "x": 3000, "y": groundY - 50},
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
            obstacleImage.scaleX = 0.08;
            obstacleImage.scaleY = 0.08;
            sawBladeHitZone.rotationalVelocity = 20;
        }

       
        function createEnemy(x, y){
        var enemy = game.createGameItem('enemy',25); //creating the game item and storing it in the variable enemy
        var redSquare = draw.bitmap('img/enemy.png'); //creates rectangle and stores as red square
        redSquare.x = -25;
        redSquare.y = -25;
        redSquare.scaleX = 0.1;
        redSquare.scaleY = 0.1;
        enemy.addChild(redSquare); //add the red square to the enemy game item

        enemy.x = x;
        enemy.y = y;

        game.addGameItem(enemy); //adds enemy to the game
        enemy.velocityX = -1; // causes the enemy to move 1 pixel to the left
        

        enemy.onPlayerCollision = function() {
            console.log('The enemy has hit Halle');
            game.changeIntegrity(-10);
        };
        
        enemy.onProjectileCollision = function() {
            console.log('The enemy has hit Halle');
            game.changeIntegrity(5);
            game.increaseScore(10);
            enemy.flyTo(10,10);
        };
    }
    

    for (var i = 0; i < levelData.gameItems.length; i++){
        var gameItem = levelData.gameItems[i];

        if (gameItem.type === "sawblade"){
            createSawBlade(gameItem.x, gameItem.y);
        }
        if (gameItem.type === "enemy"){
            createEnemy(gameItem.x, gameItem.y);
        }
        if (gameItem.type === "reward"){
            createReward(gameItem.x, gameItem.y);
        }
    }

    function createReward(x, y){
        var reward = game.createGameItem('reward',25); //creating the game item and storing it in the variable reward
        var blueSquare = draw.bitmap('img/reward.png'); //creates rectangle and stores as red square
        blueSquare.x = -25;
        blueSquare.y = -25;
        blueSquare.scaleX = 0.23;
        blueSquare.scaleY = 0.23
        ;
        reward.addChild(blueSquare); //add the red square to the reward game item

        reward.x = x;
        reward.y = y;

        game.addGameItem(reward); //adds reward to the game
        reward.velocityX = -1; // causes the reward to move 1 pixel to the left
        
        

        reward.onPlayerCollision = function() {
            console.log('The reward has hit Halle');
            game.changeIntegrity(10);
            reward.fadeOut();
        };
        
    }








        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
