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
