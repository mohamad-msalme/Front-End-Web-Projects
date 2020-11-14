function init(){
      const btns = document.querySelectorAll('.show-modal,.close-modal,.overlay');
      document.addEventListener('keydown',function(e){
        if(e.key == 'Escape') showWindow()})
      for(let i = 0 ; i <= btns.length; i++ ) btns[i].addEventListener('click', showWindow);
      }
function showWindow(){
        const hiddenItems = document.querySelectorAll('.modal, .overlay');
        for( let i = 0 ; i <= hiddenItems.length; i++)
          hiddenItems[i].classList.toggle('hidden');
      }

window.onload = init;