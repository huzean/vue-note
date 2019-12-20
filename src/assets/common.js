 class MoveHandle {
   constructor({el,index = 0} = opt){
     this.el = el
     this.index = index
     this.maxIndex  =  this.el.firstElementChild.children.length
     this.elwidth = el.offsetWidth
     this.EleHandle = new EleHandle(el.firstElementChild)
     this.handleEvent = this.handleEvent.bind(this)
     this.initEvent(this.el)
   }

   initEvent(el){
    addEvent(el,'touchstart',this.handleEvent)
    addEvent(el,'mousedown',this.handleEvent)
    addEvent(el,'touchmove',this.handleEvent)
    addEvent(el,'mousemove',this.handleEvent)
    addEvent(el,'touchend',this.handleEvent)
    addEvent(el,'mouseup',this.handleEvent)
    addEvent(this.el.firstElementChild,'transitionend',this.handleEvent)
   }

    _start(e){
      this.state = 1
      let point = e.touches ? e.touches[0] : e
      this.startX = point.pageX
      this.startY = point.pageY

    }
    _move(e){
      console.log('state',this.state)
      // if(this.state!==1){
      //   return
      // }
      this.state = 2
      let point = e.touches ? e.touches[0] : e
      this.deltaX = point.pageX - this.startX
      this.deltaY = point.pageY - this.startY
      this.direction = point.pageX > this.startX ? 'left' :'right'
      let offsetX = 0
      offsetX = -(this.index * this.elwidth) +this.deltaX
      this.EleHandle.moveEle(offsetX)


    }

    _end(e){

      let deltax = Math.abs(this.deltaX)
      console.log('deltax/this.elwidth >=0.2',deltax/this.elwidth >=0.2,this.direction)
      if(deltax/this.elwidth >=0.2){

        if(this.direction ==='left'){
          this.index =  this.index <=0 ? 0 :--this.index
        }else if(this.direction ==='right'){
          this.index = this.index >= this.maxIndex-1 ? this.maxIndex -1:this.index+1
        }
         this.EleHandle.calculateOffsetX(this.index)
      }else{
         this.EleHandle.calculateOffsetX(this.index)
      }

      this.state = 3

    }

    setIndex(index){
      index --
      if(index<=0){
        index= 0
      }
      if(index >= this.maxIndex){
        index = this.maxIndex - 1
      }
      this.EleHandle.calculateOffsetX(index)
    }

    handleEvent (e) {
    //  console.log(e ,this)
    switch (e.type) {
      case 'touchstart':
      case 'mousedown':
        this._start(e)
        break
      case 'touchmove':
      case 'mousemove':
        this._move(e)
        break
      case 'touchend':
      case 'mouseup':
      case 'touchcancel':
      case 'mousecancel':
        this._end(e)
        break
      case 'orientationchange':
      case 'resize':
        break
      case 'transitionend':
      case 'webkitTransitionEnd':
      case 'oTransitionEnd':
      case 'MSTransitionEnd':
        console.log('end')
        this.EleHandle.removeTranstion()
        break
      case 'click':
            // e.preventDefault()
            // e.stopPropagation()
        break
    }
  }

 }


function addEvent(el, type, fn, capture = false ) {
  el.addEventListener(type, fn, {passive: false, capture: !!capture})
}
function removeEvent(el, type, fn, capture = false) {
  el.removeEventListener(type, fn, {passive: false, capture: !!capture})
}

class EleHandle {
  constructor(el){
    this.el  = el
    this.transtionName  ='transtion-move'
    // this.setTranstion()
  }
  setTranstion(duration=0.4){

    this.loadCssCode(`.${this.transtionName}{
      transition:all ${duration}s ease
    }`);

    this.el.classList.add(this.transtionName)
  }

  moveEle(pointX){
    this.el.style.cssText = `transform:translateX(${pointX}px);`
  }

  removeTranstion(){
    this.el.classList.remove(this.transtionName)
  }

  loadCssCode(code){
    var style = document.createElement('style');
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.appendChild(document.createTextNode(code));
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
  }
  calculateOffsetX(index){
    const len =  this.el.children.length
    const parentWidth = this.el.parentNode.offsetWidth
    let offsetX  = index *parentWidth
    this.setTranstion()
    this.moveEle(-offsetX)

  }

}
export default MoveHandle
