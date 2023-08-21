var username= localStorage.getItem('input1');
var password = localStorage.getItem('input2');
var owner = localStorage.getItem('owner');
var repo = localStorage.getItem('repo');
var token=  localStorage.getItem('token');
var header=  localStorage.getItem('header');
 header = JSON.parse(header);

token = atob(token);
 var url1 = `https://api.github.com/repos/${owner}/${repo}/contents/Users/${username}/UserData.json`;


let width=window.innerWidth;
let height=window.innerHeight;
var ltf= document.getElementById('lt');
var mdf= document.getElementById('md');
var rtf=document.getElementById('rt');
var ifr2=document.getElementById('if2');
var ifr1 =document.getElementById('if1');


// Set the input field values
function display()
{
   
    for(let i=0;i<10;i++) 
    {
      table=table+'<tr>';
        for(let j=0;j<5;j++)
        {
           table=table+'<th>'+Name+'</th>';
        }
      
    }
} 

var k='';

ifr2.height = height+'px';
ltf.width=width*(20/100)+'px';
ifr1.width=width*(80/100)+'px';

rtf.width=0+'px';

//  ltf.style.paddingRight='200px';
let i=0;

function moveframeleft()
{
  
  clearInterval(k);
  k=setInterval(myfunction,10);

   function myfunction(){
     ifr2.width = width*(i/100)+'px';
     ifr1.width = (width*((80-i)/100))+'px';
     
     if(i==80)
     {
         clearInterval(k);
         i=0;
     }
      i=i+1;
    }
  
    
}

let j=80;


function moveframeright()
{
clearInterval(k);
k=setInterval(myfunction,10);

function myfunction(){
  ifr2.width = width*(j/100)+'px';
  ifr1.width = (width*((80-j)/100))+'px';

  
  
  if(j==0)
  {
      clearInterval(k);
      j=80;
  }
  j=j-1;
}
    
}

function EnterData()
{
moveframeleft();
document.getElementById('B1').disabled=true;
document.getElementById('B2').disabled=false;
var content=localStorage.getItem('content');
    
     ifr2.contentWindow.LoadData(content);
     localStorage.removeItem('content2');
     localStorage.removeItem('content1');

}

function DisplayData()
{
moveframeright();
document.getElementById('B1').disabled=false;
document.getElementById('B2').disabled=true;

var content=localStorage.getItem('content');
    
     ifr1.contentWindow.LoadData(content);
     ifr1.contentDocument.getElementById('sr').value="";
     ifr1.contentDocument.getElementById('opdata').hidden=true;
     ifr1.contentDocument.getElementsByClassName('prompt')[0].hidden=true;
}
 


ifr2.addEventListener('load',() =>{
 var button1 = ifr2.contentDocument.getElementById('bck');

 button1.addEventListener('click',()=>{
     DisplayData();
    
 });
 
});

document.getElementById('B3').onclick=() => 
  {localStorage.clear('input1');
  localStorage.clear('input2');
  localStorage.clear('owner');
  localStorage.clear('header');
  localStorage.clear('token');
  localStorage.clear('repo')
  window.open(url='../Main.html',target='_parent');}

 function loaddata()
{
  // var owner = localStorage.getItem('owner');
  // var token = localStorage.getItem('token');
  // var repo = localStorage.getItem('repo');
  // var url = localStorage.getItem('url');
   
  fetch(url1,{
    cache:'no-cache',
    method: 'GET',
    headers: header,
   
  }).then( response => response.json())
    .then(data => { 
     var content=atob(data.content);
  
      console.log('Data Loaded successfully');
       document.getElementById('B1').disabled=false;
       document.getElementById('B3').disabled=false;
       document.getElementById('loader').hidden=true;
       LoadData(content);
     
    })
    document.getElementById('loader').hidden=false;
  return false;
}

loaddata();



function LoadData(content){

 localStorage.setItem('content',content);

 localStorage.setItem('changes','[]');

 ifr1.contentWindow.LoadData(content);
 ifr2.contentWindow.LoadData(content);

}

function putData(cont)
{ 

  content = JSON.stringify(cont);
  content=content.replaceAll("{","{\n");
  content=content.replaceAll(":{",":\n{");
  content=content.replaceAll(",",",\n");
  content=content.replaceAll("}","\n}\n");
  content=content.replaceAll("}\n,","},")


  // console.log(content);

  fetch(url1,{
    cache:'no-cache',
    method: 'GET',
    headers: header,
  }).then(res => res.json())
  .then(data => {
    console.log('Data Loaded successfully');
    sha = data.sha;
    body = JSON.stringify({ message: "Accounts Detail Updated", content: btoa(content), sha: sha  })

    fetch(url1,{
    cache:'no-cache',
    method: 'PUT',
    headers: header,
    body: body,
   
  }).then( response => response.json())
    .then(data => { 
      // console.log(data);
      document.getElementById('loader').hidden=true;
      ifr1.contentDocument.querySelectorAll("button").forEach(elem => { elem.disabled = false; });
      ifr1.contentDocument.getElementById("btn1").disabled = true;
      LoadData(content)
      console.log('Data on server updated');
    })
   
  
  })
  
  document.getElementById('loader').hidden=false;

     }