
//        const fileInput = document.getElementById('myfile');
// fileInput.addEventListener('change', (event) => {
//   const file = fileInput.files[0];
//   const reader = new FileReader();
//   reader.readAsText(file);
//   reader.onload = (event) => {
//     console.log(event.target.result);
//   };
  

// });

var token= localStorage.getItem('token');
token = atob(token);
var owner = localStorage.getItem('owner');
var repo = localStorage.getItem('repo');
 var header = localStorage.getItem('header');
  header = JSON.parse(header);
function formValidation()
{
   
}
function checkpassword()
{
  var n_p=document.getElementById('npwd');
  var c_p=document.getElementById('cpwd');
  if(!passValidation())
  {
    return false;
  }
  function passValidation()
  {

      var password=document.getElementById('npwd').value;
      
       var regex1 = /[a-zA-Z0-9`~!/.@#$%^&*()-_+=]{4,}/;
      if(!regex1.test(password))
      {    
          document.getElementById('sp5').style.backgroundColor='red';
          document.getElementById('sp5').innerHTML = 'Enter Password (atleast 4 or more character)';

          return false;
      }
      else 
      {
          document.getElementById('sp5').innerHTML = '';
          return true;
        
      }
      return false;

  }
 
  if(n_p.value!=c_p.value)
  {
    document.getElementById('sp5').style.backgroundColor='red';
    document.getElementById('cusr').disabled=true;
  }
  else{

    document.getElementById('sp5').style.backgroundColor='green';
    document.getElementById('cusr').disabled=false;
  }
  
}

function CheckDetails()
{
var content;
var sha1;
var user = document.getElementById('un').value;
var user = user.toLowerCase();


fetch('https://api.github.com/repos/'+owner+'/'+repo+'/contents/file.json', {
            cache: 'no-cache',
            method: 'get',
            headers:  header 
            }). then(response => response.json())
            .then(async data => {
                content = data.content; 
                sha1 = data.sha;
                content = atob(content); 
                content = JSON.parse(content);
                let length = Object.keys(content.username).length;
                // console.log(content.username[user]);
                var x = content.username[user];
                if(typeof x === "string")
                {
                    document.getElementById('prompt').innerHTML= `This username (${user}) Already Exist`;
                    document.getElementsByClassName('loader')[0].hidden=true;
                    return false;
                }
                else
                {
                    var js = JSON.stringify(content);
                     js = JSON.parse(js);
                    js.username[user] = "";
                    console.log(js);
                    js = JSON.stringify(js);
                    js=btoa(js);
                     
                    CreateNewUser(sha1,user,js);
                }
                document.getElementsByClassName('loader')[0].hidden=true;
            });
                
            document.getElementsByClassName('loader')[0].hidden=false;
                }
      
      

function CreateNewUser(sha,user,js)
{   
   
   
    let date = new Date();

    let currentDate = (date.getDate())+'/'+(date.getMonth()+1)+'/'+(date.getFullYear());
     let currentTime = date.toLocaleTimeString();
      
    var sha2;
    var firstname = document.getElementById('fn').value;
    var lastname = document.getElementById('ln').value;
    var username = document.getElementById('un').value;
    var username = username.toLowerCase();
    var password = document.getElementById('npwd').value;
    var gender = document.querySelector('input[name="Gender"]:checked').value;
   
    var content = `{\n"profile" :\n{\n"Fname" : "${firstname}",\n"Lname" : "${lastname}",\n"Date" :\n{\n"date" : "${currentDate}",\n"time" : "${currentTime}"\n},\n"Gender" : "${gender}",\n"DP":\n{\n"imgSrc" : "Data/Profile/${gender}.jpeg",\n"DateofPic" :\n{\n"date" : "",\n"time" : ""\n}\n},\n"Password" : "${password}"\n},\n"Accounting Details" : {}\n}`;
     var content = btoa(content);
    //  console.log("Current Date: " + currentDate);
    //   console.log("Current Time: " + currentTime);
      fetch(`https://api.github.com/repos/${owner}/${repo}/contents/Users/${user}/UserData.json`, {
            cache: 'no-cache',
            method: 'get',
            headers:  header 
            }). then(response => response.json())
            .then(data => {
                // content = data.content; 
                sha2 = data.sha;
            fetch(`https://api.github.com/repos/${owner}/${repo}/contents/Users/${user}/UserData.json`, {
            cache: 'no-cache',
            method: 'PUT',
            headers:  header ,
            body: JSON.stringify({
                message: 'Created new User',
                content: content,
                sha: sha2
            })
            })
            .then(response => response.json())
            .then(data => {document.getElementById('prompt').innerHTML="You have created your new Account!!"
                            window.parent.moveframeleft();
                            window.parent.document.getElementById('ifr1').contentDocument.getElementById('prompt').innerHTML='Please Enter Your New Account Login Credentials Again!!'});
                            window.parent.document.getElementById('ifr1').contentDocument.getElementById('nm').value='';
                            window.parent.document.getElementById('ifr1').contentDocument.getElementById('pwd').value='';
            });



fetch(`https://api.github.com/repos/${owner}/${repo}/contents/file.json`, {
    cache: 'no-cache',
    method: 'PUT',
    headers :  header ,
    body: JSON.stringify({
    message: 'Updated Users Record',
    content: js,
    sha: sha
    })
}). then(response => response.json())
    . then(data =>  
        { 
            // console.log(data);
    
        })

}