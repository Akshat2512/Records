let width=window.innerWidth;
            let height=window.innerHeight;

            var frame1= document.getElementById('ifr1');
            var frame2= document.getElementById('ifr2');

            frame1.height = height + 'px';
            frame1.width = width + 'px';
            frame2.height = height + 'px';

   
    frame1.addEventListener('load', () => {
      var button = frame1.contentDocument.getElementById('nusr');
      button.addEventListener('click', () => {
        
       moveframeright();
       frame2.src='Data/CreateUser.html';
     
      });
      
     
    });
    
    frame2.addEventListener('load', () => {

      var button =  frame2.contentDocument.getElementById('bck');
      button.addEventListener('click', () => {
           moveframeleft();
        });
    });

  

    let i=0;
    var k;
    function moveframeleft()
     {
        
        clearInterval(k);
        k=setInterval(myfunction,10);

         function myfunction(){
           frame1.width = width*(i/100)+'px';
           frame2.width = (width*((100-i)/100))+'px';
          
           if(i==100)
           {
               clearInterval(k);
               i=0;
           }
            i=i+1;
          }
        
          
     }

     let j=100;

    
     function moveframeright()
     {
      clearInterval(k);
      k=setInterval(myfunction,10);

      function myfunction(){
        frame1.width = width*(j/100)+'px';
        frame2.width = (width*((100-j)/100))+'px';
        
        
        if(j==0)
        {   
          var content = frame1.contentDocument.getElementById('nm').value;
          frame2.contentDocument.getElementById('un').value = content;
            clearInterval(k);
            j=100;
        }
        j=j-1;
      }
          
     }