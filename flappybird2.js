function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

function FlappyBird(){

    this.parentElem = document.querySelector('.game-container');
    this.gameFps = 100;
    this.frameInterval = 1000 / this.gameFps;
    this.backImg =[];
    this.left = 0;
    this.bird;
    this.Pipecounter = 200;
    this.score = 0;
    this.dontLetMoveUp = false;
    


    this.upPipes = [];
    this.downPipes = [];
    
    this.init = function(){
        this.createGame();
        this.backId = setInterval(this.moveBackground.bind(this), this.frameInterval);
        document.onkeydown = this.keyPressed.bind(this);
    }
    
    this.createGame = function createGame(){
        
        this.game = document.createElement('div');
        this.game.classList.add('game');
        this.parentElem.appendChild(this.game);

        this.container = document.createElement('div');
        this.container.classList.add('container');
        this.game.appendChild(this.container);
    
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('wrapper');
        this.container.appendChild(this.wrapper);
        
        for(var i=0; i< 3; i++){
        this.backImg[i] = document.createElement('img');
        this.backImg[i].classList.add('backImg');
        this.backImg[i].setAttribute('src', 'flappyBackground.png');
        this.wrapper.appendChild(this.backImg[i]);    
        }

        this.bird = new Bird(this.container)
        this.bird.init();

        this.scoreElem = document.createElement('div');
        this.scoreElem.classList.add('scoreElem');
        this.container.appendChild(this.scoreElem);

        this.scoreElem.innerHTML = 'SCORE : ';


        this.gameOverElem = document.createElement('div');
        this.gameOverElem.classList.add('gameOverElem');
        this.container.appendChild(this.gameOverElem);
        this.gameOverElem.innerHTML = 'GAME OVER';
        this.gameOverElem.style.display = 'none';

        this.restartElem = document.createElement('button');
        this.restartElem.classList.add('restartElem');
        this.container.appendChild(this.restartElem);
        this.restartElem.innerHTML = 'RESTART';
        this.restartElem.style.display = 'none';


    }

    this.moveBackground = function(){
        var counter = 0;
        //move background

        if(this.left === -840){
         this.left = 0;
         this.wrapper.style.left = this.left + 'px'; 
    
        }else{
        this.left -= 1; 
        this.wrapper.style.left = this.left + 'px'; }
        
        
        //move bird towards gravity

        if(this.bird.top >= 380){
         this.bird.top = 380;
         this.bird.draw();
         this.gameOver();
         this.bird.birdElem.style.transform = 'rotate(60deg)';

         clearInterval(this.backId);   
        }else{
         counter++;   
         this.bird.top = this.bird.top + 2 * counter ;
         this.bird.draw();   
        }

        //create pipe 
        this.Pipecounter--;
        
        this.initialHeight = getRandomInt(70,191); // max is exclusive

        if(this.Pipecounter === 0){
        var pipeObjUp = new Pipes(this.container, this.initialHeight , 'pipeUp.png', 'pipeUpElement');
        pipeObjUp.init();

        this.upPipes.push(pipeObjUp);

        var pipeObjDown = new Pipes(this.container, 260 - this.initialHeight , 'pipeDown.png', 'pipeDownElement');
        pipeObjDown.init();

        this.downPipes.push(pipeObjDown);

        this.Pipecounter = 300; 
        }

        //move pipe(up pipe)
        for(var i=0; i< this.upPipes.length; i++){
            
            this.upPipes[i].left -= 1;
            this.upPipes[i].draw();

            if(this.upPipes[i].left <= 0){
              
                this.upPipes[i].pipeElement.remove();
                this.upPipes.splice(i, 1);
                
                if(this.upPipes[i].left >= 100){
                    this.score++;
                    this.scoreElem.innerHTML = 'SCORE : ' + this.score ;


                 }

                
            }

         }


                 //move pipe(down pipe)

         for(var j=0; j< this.downPipes.length; j++){
            
            this.downPipes[j].left -= 1;
            this.downPipes[j].draw();

            if(this.downPipes[j].left <= 0){
              
                this.downPipes[j].pipeElement.remove();
                this.downPipes.splice(j, 1);
                
            }

         }


         //checkCollision(with top pipes)
        
         for(var i=0; i< this.upPipes.length; i++){
            
            if (this.upPipes[i].left < this.bird.left + this.bird.width &&
                this.upPipes[i].left + this.upPipes[i].width > this.bird.left &&
                this.upPipes[i].top < this.bird.top + this.bird.height &&
                this.upPipes[i].top + this.upPipes[i].height > this.bird.top) {
                 // collision detected!

                 this.dontLetMoveUp = true;
                 this.bird.birdElem.style.transform = 'rotate(60deg)';
             }
                
            }

         //checkCollision(with bottom pipes)

            for(var i=0; i< this.downPipes.length; i++){
            
                if (this.downPipes[i].left < this.bird.left + this.bird.width &&
                    this.downPipes[i].left + this.downPipes[i].width > this.bird.left &&
                    this.downPipes[i].top < this.bird.top + this.bird.height &&
                    this.downPipes[i].top + this.downPipes[i].height > this.bird.top) {
                     // collision detected!
    
                     this.dontLetMoveUp = true;
                 }
                    
                }

            }
    
    
    this.keyPressed = function(event){
        
        this.keycode = event.keyCode;
        if(this.keycode === 32){
            if(this.dontLetMoveUp === false){
            
            if(this.bird.top <= 0 ){
                this.bird.top = 0;
                this.bird.draw();
            }
            if(this.bird.top < 380){
                this.bird.top -= 60;
                this.bird.draw();
     
            }
        }
       }
    
    }

    this.gameOver = function(){
    this.gameOverElem.style.display = 'block';
    this.restartElem.style.display = 'block';

    this.restartElem.addEventListener('click',function(){
        this.gameOverElem.style.display = 'none';
        this.restartElem.style.display = 'none';
        
        location.reload();       

        console.log('clicked');
    }.bind(this));

    }
    
    }
    
    function Bird(containerElem){
        this.left = 100;
        this.top = 120;
        this.width = 40;
        this.height = 40;
        this.containerElem = containerElem;
        this.birdElem;
    
        this.init = function(){
            this.createBird();
            this.draw();
        }
     this.createBird = function(){
      
        this.birdElem = document.createElement('img');
        this.birdElem.classList.add('birdImg');
        this.birdElem.setAttribute('src', 'flapbird.png');
        this.containerElem.appendChild(this.birdElem);

        this.birdElem.style.transform = 'rotate(0deg)';
    
        }
      
      this.draw = function(){
    
        this.birdElem.style.left = this.left + 'px';
        this.birdElem.style.top = this.top + 'px';
        
      } 
    
    }
    
    function Pipes(containerElem ,height, source, className){
        this.width = 40;
        this.left = 420;
        this.top;
        this.pipeElement;
        this.containerElem = containerElem;
        this.height = height;
        this.className = className;
        this.source = source;
      
        this.init = function(){
            this.createPipes();
            this.draw();
        }

        this.createPipes = function(){
         this.pipeElement = document.createElement('img');
         this.pipeElement.classList.add(this.className);
         this.containerElem.appendChild(this.pipeElement);
         this.pipeElement.setAttribute('src' , this.source);
         
         this.pipeElement.style.height = this.height + 'px';

         if(this.className === 'pipeUpElement'){
             this.top = 0;
             this.pipeElement.style.top = this.top + 'px';

         }
         if(this.className === 'pipeDownElement'){ 
            this.top = 420 - this.height;
            this.pipeElement.style.top = this.top + 'px'; 
         }


        }

        this.draw = function(){
            this.pipeElement.style.left = this.left + 'px';
        }

    }
    
    
    new FlappyBird().init();
