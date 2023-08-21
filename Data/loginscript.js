  
        

          var owner = 'akshat2512';
          var repo = 'Docs';
          var tok= 'Z2hwX1VaODgxc0NjMFJVdjM1T0';
          var en='cybjFXaEVMTzNSY3hYbTFmNGpJbg==';
          localStorage.setItem('token',tok+en);
          var token = atob(tok+en);
          var header = { 'Accept' : 'application/vnd.github.v3+json','Authorization' : 'Bearer ' + token, 'Accept' : 'application/vnd.github.v3+json', 'X-GitHub-Api-Version' :'2022-11-28'};
          var url1 = `https://api.github.com/repos/${owner}/${repo}/contents/`;
          var headr = JSON.stringify(header);

          localStorage.setItem('owner',owner);
          localStorage.setItem('repo',repo);
          
          localStorage.setItem('header', headr);

           Login_Details();

           function Login_Details()
           {
            if(localStorage.getItem('input1')!=null && localStorage.getItem('input2')!=null)
           {
            window.open(url='Registry.html',target='_parent');
           }
        }
          function userValidation()
        {
            var name = document.getElementById('nm').value;
            var regex = /[a-zA-Z0-9`~!/.@#$%^&*()-_+=]{4,}/;
         
            if(!regex.test(name))
            {   
                document.getElementById('sp1').style.backgroundColor='red';
                document.getElementById('sp1').innerHTML = 'Enter Username (4 or more characters)';
                document.getElementById('sp2').innerHTML = '';
                return false;
            }
    
            else {
                document.getElementById('sp1').innerHTML = '';  
                document.getElementById('sp1').style.backgroundColor='green';
                return true;
            }
         return false;
        }

        function passValidation()
        {
  
            var password=document.getElementById('pwd').value;
            
             var regex1 = /[a-zA-Z0-9`~!/.@#$%^&*()-_+=]{8,}/;
            if(!regex1.test(password))
            {    
                document.getElementById('sp2').style.backgroundColor='red';
                document.getElementById('sp2').innerHTML = 'Enter Password (atleast 8 or more character)';
                document.getElementById('sp1').innerHTML = '';
                return false;
            }
            else 
            {
                document.getElementById('sp2').innerHTML = '';
                document.getElementById('sp2').style.backgroundColor='green';
                return true;
              
            }
            return false;

        }

     function Check_Details()
        {
          
           if(!userValidation() || !passValidation())
           {  return false; }
           

           var user = document.getElementById("nm").value;
            user = user.toLowerCase();
           var pass = document.getElementById("pwd").value;
            
    
          
       fetch(url1 + 'file.json', {
            cache: 'no-cache',
            method: 'GET',
            headers :  header ,
           
        }). then( response => response.json())
            . then( data =>  
                {   console.log(header);
                    console.log(data);
                    var content = data.content;
                    content = atob(content);
                    content = JSON.parse(content);
                    console.log(content);
                    
                    let length = Object.keys(content.username).length;
                        console.log(length);

                    
                        console.log(content.username[user]);
                         var x = content.username[user];
                        if(typeof x === "string")
                        {
                            fetch(url1 + `Users/${user}/UserData.json`, {
                            cache: 'no-cache',
                            method: 'GET',
                            headers :  header ,
                        
                        }). then( response => response.json())
                            . then( data =>  {
                                var p_cont=data.content;
                                 p_cont=atob(p_cont);
                                 p_cont=JSON.parse(p_cont);
                                 pwd=p_cont["profile"].Password;
                                
                                 if(pwd==pass)
                                 {
                                 console.log(`Logged In`);
                            // Store the input field values in localStorage
                           localStorage.setItem('input1', user);
                           localStorage.setItem('input2', pass);

                            window.open(url='Registry.html',target='_parent');
                            
                                 }
                                 else{
                                    document.getElementById('prompt').innerHTML='Password is incorrect!!'
                                 }
                                 document.getElementsByClassName('loader')[0].hidden=true;
                            });

                          
            
                        }
                        else
                        {
                           document.getElementById('prompt').innerHTML='This username does not exist!!<br> or Register a new Account';
                           document.getElementsByClassName('loader')[0].hidden=true;
                        }
                       
                })
         
             document.getElementsByClassName('loader')[0].hidden=false;
            }
         
