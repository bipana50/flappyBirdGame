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
