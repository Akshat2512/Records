function formValidation()
{
   var j=document.getElementById('phn').value;
   var regx1=/^[+][0-9]{2}[0-9]{10}/;
   var regx2=/^[0-9]{10}/;
   
   if(regx1.test(j) || regx2.test(j))
   {
      return true;
   }

   else{
       prompt("Entered phone number is not valid")
      return false;
   }
}
var name,age,gender,contact,Addr,Loan;

 var strData;

function LoadData(content)
{
strData=JSON.parse(content);
}
var t;
let k=0;
function checkDetails()
{

clearInterval(t)
t=setInterval(() => {
     myfunction();
   k++;
},100)

}   

function myfunction()
{
var name = document.getElementById('nm').value;

name=name.toLowerCase();
var regex = new RegExp("^"+name);

console.log(regex);

let n_arr=Object.keys(strData['Accounting Details']);
let length=n_arr.length;


var x=document.getElementById('div2');
x.hidden=false;

document.getElementById('submit').disabled=false;
var y='';

for(let i=0;i<length;i++)
{    
   if(regex.test(n_arr[i].toLowerCase()))
{
    y=y+n_arr[i]+'<br>';
    x.style.backgroundColor='black';
    document.getElementById('submit').disabled=false;
   
   
}
var r=n_arr[i].toLowerCase();
r=r.replaceAll(" ","");
n=name.replaceAll(" ","");
if(r==n)
{  
   document.getElementById('submit').disabled=true;
   r='';
   n='';
}
}

x.innerHTML=y;
y='';

if(name=='')
{
   document.getElementById('submit').disabled=true;
}

if(k==40)
{ k=0;
   
   clearInterval(t);
   x.innerHTML='';
   x.hidden='true';
   
}


}




function UpdateAccData()
{  
   let SaveArr=localStorage.getItem('changes');
   SaveArr=JSON.parse(SaveArr);
    
  
   let date = new Date();
   let currentDate = (date.getDate())+'/'+(date.getMonth()+1)+'/'+(date.getFullYear());
   let currentTime = date.toLocaleTimeString();
   

var age = document.getElementById('age').value;
var gender = document.querySelector('input[name="Gender"]:checked').value;
var contact = document.getElementById('phn').value;
var addr = document.getElementById('addr').value;
var Loan = document.getElementById('Lamt').value;


var name = document.getElementById('nm').value;

let length=Object.keys(strData['Accounting Details']).length;

var content = `{\n"Age" : "${age}",\n"Gender" : "${gender}",\n"Photo" : "Profile/${gender}.jpeg",\n"Loan" :\n{\n"${currentDate}" : "${Loan}"\n},\n"Repay" :\n{\n"${currentDate}" : "0.00"\n},\n"Address" : "${addr}","Contact" : "${contact}"\n}`;
content = JSON.parse(content);

let prev=SaveArr.pop();

// console.log(content);
n_arr=strData['Accounting Details'];
temp=JSON.stringify(n_arr);
temp=JSON.parse(temp);
// console.log(n_arr);
SaveArr.push(temp);
// console.log(SaveArr);
n_arr[name]=content;
SaveArr.push(n_arr);
string=JSON.stringify(SaveArr);
localStorage.setItem('changes',string);
// console.log(n_arr);
n_arr=JSON.stringify(strData);
// console.log(n_arr);
localStorage.setItem('content',n_arr);


document.getElementById('age').value=0;
document.getElementById('other').checked=true;
document.getElementById('phn').value="+91";
document.getElementById('addr').value="";
document.getElementById('Lamt').value="0.00";
document.getElementById('nm').value='';
document.getElementById('submit').disabled=true;
   content = strData;
  

 
 window.parent.putData(content);


}


