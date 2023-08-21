var strData;

      
function search()
{
var name = document.getElementById('sr').value;
name=name.toLowerCase();
name=name.replaceAll(" ","");
var regex = new RegExp("^"+name);

console.log(regex);
let n_arr=Object.keys(strData['Accounting Details']);
let length=n_arr.length;

for(let i=0;i<length;i++)
{    n_arr[i] = n_arr[i].replaceAll(" ","");
    if(regex.test(n_arr[i].toLowerCase()))
   {
     document.getElementsByClassName('rows')[i].hidden=false;
   } 
   else
   {
    document.getElementsByClassName('rows')[i].hidden=true;
   }
}

}



        function LoadData(arr)
        {    
            if (typeof arr === 'string')
            {  
            strData=JSON.parse(arr);
            loadtable();
            }
        }

        var reset=document.getElementById("table1").innerHTML;

        function loadtable()
        {   
             var content = strData['Accounting Details'];
             var name=Object.keys(content);
             var length1=name.length;
          
           
             var TotalLoan="0.00";
             var TotalRep="0.00";
           
            document.getElementById("table1").innerHTML=reset;
            table=document.getElementById("table1").innerHTML;
          
            for(let i=0; i < length1; i++)
            {   
              
                
                var loan=Object.values(content[name[i]].Loan);
               
            
                var repay= Object.values(content[name[i]].Repay);
           
                var len1 = loan.length;
                var Lsum = "0.00";
                var Rsum = "0.00";
                
                for(let j=0;j<len1;j++)
                {
                    Lsum = eval(Lsum+'+'+loan[j]);
                    Rsum = eval(Rsum+'+'+repay[j]);
                }
                TotalLoan=eval(TotalLoan+'+'+Lsum);
                TotalRep=eval(TotalRep+'+'+Rsum);

                table = table+`<tr class="rows">`;
                table = table+ '<td class="noborder"><input class="ckbox" onclick="check()" type = "checkbox"/></td>'
                table = table+ `<td onclick="opendata(${i})"><img src="${content[name[i]].Photo}" height="50" width="50" alt=""></td>`;
                table = table+ `<td onclick="opendata(${i})">`+name[i]+'</td>';
                table = table+ `<td onclick="opendata(${i})" class="Ln">`+Lsum+'</td>';
                table = table+ `<td onclick="opendata(${i})" class="Rp">`+Rsum+'</td>';
                table = table+ `<td onclick="opendata(${i})">`+eval(Lsum+'-'+Rsum)+'</td>';
                table = table+ '<td class="noborder"><button class="edit" type="button" onclick="edit('+i+')"><i class="material-icons">mode_edit</i></button>&nbsp&nbsp&nbsp&nbsp<button class="del" type="button" onclick="DeletePrompt('+i+')"><i class="material-icons">delete</i></div></button></td></tr>';

                
            }
           var TotalDue=TotalLoan-TotalRep;
            table=table+`<tr><td class='noborder'></td><td></td><td></td><td><i>Rs. ${TotalLoan}</i></td><td><i>Rs. ${TotalRep}</i></td><td><i>Rs. ${TotalDue}</i></td></tr>`;
            document.getElementById('table1').innerHTML=table;
        
                         
        }



     function DeletePrompt(e)
     {
       document.querySelectorAll("button").forEach(elem => { elem.disabled = true; });

      var content = strData['Accounting Details'];
      var name=Object.keys(content);
      var x=document.getElementsByClassName('prompt')[0];
      var y=document.getElementById('opdata');
      
      x.hidden=false;

      x.innerHTML=`<div style='white-space: nowrap; width: 600px'>This Action will delete all the data related to <br><i><b>${name[e]}</b></i> <br><br>Confirm<br><br> <button onclick='deleteData(${e})'>Delete</button>&nbsp&nbsp&nbsp&nbsp&nbsp<button onclick='RemovePrompt()'>Cancel</button><br> </div>`;
     
     }
   
     function deleteData(e)
     {
     
            var content = strData['Accounting Details'];
    
            var name=Object.keys(content);
      
           
             delete content[name[e]];
            
             strData['Accounting Details']=content;
            
             window.parent.putData(strData);
             document.getElementById('sr').value="";
             document.getElementsByClassName('prompt')[0].hidden=true;
             loadtable();
             document.querySelectorAll(".ckbox").forEach(elem => { elem.checked=false;});
     }

     function RemovePrompt()
    {
      document.querySelectorAll("button").forEach(elem => { elem.disabled = false; });
      document.getElementsByClassName('prompt')[0].hidden=true;
      document.querySelectorAll(".ckbox").forEach(elem => { elem.checked=false;});
      document.querySelector('#btn1').disabled=true;
    }
    
    function selectall()
    {
      document.querySelectorAll(".ckbox").forEach(elem => { elem.checked=true;});
      document.getElementsByClassName('noborder')[0].innerHTML = '<input class="ckbox" type = "checkbox" onclick="deselectall();" checked>'
      check();
    }

    function deselectall()
    {
      document.querySelectorAll(".ckbox").forEach(elem => { elem.checked=false;});
      document.getElementsByClassName('noborder')[0].innerHTML = '<input class="ckbox" type = "checkbox" onclick="selectall();" >';
      check();
    }
    
    function check(){
      var flag=0;
      document.querySelectorAll(".ckbox").forEach(e => {if(e.checked==true){
                       flag=1;
      }})
      if(flag==1)
      {
        document.getElementById('btn1').disabled=false;
      }
      else
      {
        document.getElementById('btn1').disabled=true;
      }
      

    }
   
    function deleteselectsprompt()
    {
      document.querySelectorAll("button").forEach(elem => { elem.disabled = true; });
     
      var content = strData['Accounting Details'];
      var name=Object.keys(content);
      var nm=[];
      var y= document.querySelectorAll(".ckbox");
      var length=y.length;
      var names='';
      for(let i=1;i<length;i++)
      {
        if(y[i].checked==true){
         nm.push(name[i-1]);
      
      }
      for(let i=0;i<nm.length;i++)
      {
        if(i==0){
         names=nm[i];
        }
        else if(i<nm.length-1)
        {
          names=names+", "+nm[i];
        }
        else{
          names=names+" & "+nm[i];
        }
      
      }
      
      
      var x=document.getElementsByClassName('prompt')[0];
      x.hidden=false;
    
      x.innerHTML=`<div style='white-space: nowrap; width: 600px'>This Action will delete all the data related to <br><i><b>${names}</b></i> <br><br>Confirm<br><br> <button onclick='deleteAll()'>Delete</button>&nbsp&nbsp&nbsp&nbsp&nbsp<button onclick='RemovePrompt()'>Cancel</button><br> </div>`;
 
    }
  }
     function deleteAll()
     {
      var content = strData['Accounting Details'];
    
      var name=Object.keys(content);
  
      var y= document.querySelectorAll(".ckbox");
      var length=y.length;
      for(let i=1;i<length;i++)
      {
        if(y[i].checked==true){            
        delete content[name[i-1]];
        }
      }
     strData['Accounting Details']=content;
     window.parent.putData(strData);
     document.getElementById('sr').value="";
     document.getElementsByClassName('prompt')[0].hidden=true;
     loadtable();
     document.querySelectorAll(".ckbox").forEach(elem => { elem.checked=false;});
     
     }

    function opendata(e)
    { 
      var content = strData['Accounting Details'];
      var name=Object.keys(content);
  
      var Loan=document.getElementsByClassName('Ln')[e].innerHTML;
      var Repay=document.getElementsByClassName('Rp')[e].innerHTML;
      let date = new Date();
      let currentDate = date.toLocaleDateString();
      let currentTime = date.toLocaleTimeString();
      

      var jsnLoans=content[name[e]].Loan;
      var jsnReps=content[name[e]].Repay;
    
      var dateofloans=Object.keys(jsnLoans);
     
      var tb=`<table cellpadding='4' border=1><tr><th><b>Date</b></th><th><b>Loans<b></th><th><b>Repays<b></th></tr>`;
      for(let i=dateofloans.length-1;i>=0;i--)
      {
        tb=tb+`<tr><td>${dateofloans[i]}</td><td>${jsnLoans[dateofloans[i]]}</td><td>${jsnReps[dateofloans[i]]}</td></tr>`; 
      }
      tb=tb+'</table>';
      var x=document.getElementById('opdata');
      x.hidden=false;
      data=`<button onclick="document.getElementById('opdata').hidden=true;document.getElementById('opdata').innerHTML=''"><-Back</button><br><br><br><br>`;
      data=data+`<div style='position:relative;'><img src="${content[name[e]].Photo}" height="200" width="200" alt="Error 404"><br><br>`;
      data=data+`<div style='position:absolute; top: 10px; left:230px; width: 230px'>Name : ${name[e]}<br><br>Age : ${content[name[e]].Age}<br><br>Gender : ${content[name[e]].Gender}<br><br>`;
      data=data+`Contact : ${content[name[e]].Contact} <a href="tel:${content[name[e]].Contact}"><i class="material-icons" style="font-size:36px">call</i></a><br><br>Address : " ${content[name[e]].Address} "</div><div style='white-space:nowrap;position:absolute; border: 1px solid;overflow:auto; height: 250px; top:-90px;left:460px'>${tb}</div>`;
      data=data+`<div style='white-space:nowrap;position:absolute; top:250px;'> Loan Amount = Rs. ${Loan} + <input id='addLn' value="0.00" type="number"><br><br>Repayed Amount = Rs. ${Repay} + <input id='addRp' value="0.00" type="number"><br><br>Due Amount = Rs. ${Loan-Repay}<br><br> <button id='sv'>Save</button></div>`;
      x.innerHTML=data;
    
      document.getElementById('sv').onclick = ()=>{
         
        var x=document.getElementById('addLn');
      var y=document.getElementById('addRp');

      var round1=Math.round(x.value);
      var round2=Math.round(y.value);
       if(x.value=="")
       {
        document.getElementById('addLn').value="0.00";
       }
       if(y.value=="")
       {
        document.getElementById('addRp').value="0.00";
       }

      if(round1!="0" || round2!="0")
      {
        var n_loan= jsnLoans;
        var n_rep=jsnReps;
          if(!n_loan[currentDate] && !n_rep[currentDate])
         {
          n_loan[currentDate]="0.00";
          n_rep[currentDate]="0.00";
         }
        
         n_loan[currentDate]=eval(n_loan[currentDate]+"+"+x.value);
        
         n_rep[currentDate]=eval(n_rep[currentDate]+"+"+y.value);
         console.log(n_loan, n_rep);
         x.value="0.00";
         y.value="0.00";
         jsnLoans=n_loan;
         jsnReps=n_rep;

         content[name[e]].Loan=jsnLoans;
         content[name[e]].Repay=jsnReps;
         strData['Accounting Details']=content;
         window.parent.putData(strData);
     document.getElementById('sr').value="";
     document.getElementsByClassName('prompt')[0].hidden=true;
     loadtable();
     opendata(e);
      }
      else{
        console.log('Stop');
      }
      }
               
      
      
    }


     function edit(e)
     {

      var content = strData['Accounting Details'];
    
      var name=Object.keys(content);
      var x=document.getElementById('opdata');
      x.hidden=false;

      data=`<button onclick="document.getElementById('opdata').hidden=true;document.getElementById('opdata').innerHTML=''"><-Back</button><br><br><br><br>`;
      data=data+`<div style='position:relative'><img src="${content[name[e]].Photo}" height="200" width="200" alt="Error 404"><br><br>`;
      data=data+`<div style='white-space:nowrap;position:absolute; top: 10px; left:230px'>Name = <input id='nm' type='text' value='${name[e]}'><br><br>Age = <input type='number' value='${content[name[e]].Age}'><br><br>Gender = Male: <input type='radio' name='Gender' value='Male'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Female: <input type='radio' name='Gender' value="Female"> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspOthers: <input type='radio' name='Gender' value="Others"> <br><br>`;
      data=data+`Contact = <input type='number' maxlength='13' value='${content[name[e]].Contact}'><br><br>Address = <textarea>"${content[name[e]].Address}"</textarea></div>`;
      x.innerHTML=data;
      var y= document.getElementsByName('Gender');
      if(content[name[e]].Gender=="Male")
       y[0].checked=true;
      else if(content[name[e]].Gender=="Female")
       y[1].checked=true;
      else
       y[2].checked=true;
       

     }

