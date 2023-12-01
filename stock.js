//selectors
let input =document.querySelector('input')
let addbtn =document.querySelector('.add')
let todos =document.querySelector('.todo-list')
let error =document.querySelector('.err')



let info 

let comp;
let symbol;
let price;
let q1;
let q1name;
let q2;
let q2name;
let q3;
let q3name;
let q4;
let q4name;



//'6058d93136msh8c7ce63d86695bap17234cjsn3260034dfb5a'
//'34eca5a551mshdefdb670ce0b05ep18976bjsn526ca61a1c20'

let key = '34eca5a551mshdefdb670ce0b05ep18976bjsn526ca61a1c20'


let addtodo = ()=>{

  if (Number(input.value) > 9999) {
    error.innerText= 'the input should be four digits. ex.2222'
  }else{


  const url= `https://yahoo-finance127.p.rapidapi.com/price/${input.value}.SR`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': key,
      'X-RapidAPI-Host': 'yahoo-finance127.p.rapidapi.com'
    }
  };
  
  error.classList='loading'
  error.innerText = 'loading...'
  fetch(url, options)
   .then(response => response.json())
   .then(data =>{
    symbol = input.value
    comp = data.shortName
    price = data.regularMarketPrice.fmt
    console.log(price)
  
    
    
  
    const url2 = `https://yahoo-finance127.p.rapidapi.com/earnings/${input.value}.SR`
   const options2 = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': key,
      'X-RapidAPI-Host': 'yahoo-finance127.p.rapidapi.com'
    }
  }
  
  
  
  fetch(url2, options2)
   .then(final => final.json())
   .then(result =>{
    q1name = result.earningsChart.quarterly[0].date;
    q1 = result.earningsChart.quarterly[0].actual.fmt;
    
  
    q2name = result.earningsChart.quarterly[1].date;
    q2 = result.earningsChart.quarterly[1].actual.fmt;
    
    q3name = result.earningsChart.quarterly[2].date;
    q3 = result.earningsChart.quarterly[2].actual.fmt;
  
    q4name = result.earningsChart.quarterly[3].date;
    q4 = result.earningsChart.quarterly[3].actual.fmt;
    console.log(q4name)
  
    process()
    error.innerText=' '
    error.classList='err'
   
   })
   
   })
   .catch(err => {if (key == '34eca5a551mshdefdb670ce0b05ep18976bjsn526ca61a1c20') {
    key = '6058d93136msh8c7ce63d86695bap17234cjsn3260034dfb5a'
    error.innerText= ' sorry, try again'
    console.log('sorry')
   } else{
    key = '34eca5a551mshdefdb670ce0b05ep18976bjsn526ca61a1c20'
    error.innerText= ' sorry, try again'
    console.log('sorry')
   }
  
  })
  }

  };

 let process = ()=>{
  error.innerText=''
  let array = [`${symbol}-${comp}`,` ${q1name} = ${q1}`,` ${q2name} = ${q2}`,` ${q3name} = ${q3}`,` ${q4name} = ${q4}`, `price = ${price}`]
  
  //todo div
  const tododiv = document.createElement('div')
  tododiv.classList.add('todo')
  
  const newtodo = document.createElement('tr')
  
  newtodo.classList.add('todoitem')
 
  let infoarr=[]
 
  for (let i = 0; i < array.length; i++) {
     info = document.createElement('td')
    info.innerText=array[i]
    info.classList.add('td')
    newtodo.appendChild(info)
    infoarr.push(info.innerHTML)
  }

  tododiv.appendChild(newtodo)
  //save to local 
  savetodo(infoarr)
  console.log(infoarr)
  

  
  
  
  const trashbutton= document.createElement('button')
  trashbutton.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>'
  trashbutton.classList.add('delet');
  tododiv.appendChild(trashbutton)
  
  todos.appendChild(tododiv)
  //clear input value
  input.value=""
 }

  let savetodo =(todo)=>{
    //check if you have saved data
    let todoss;
    
    if (localStorage.getItem('todoss')=== null)  {
      todoss=[];
      
    }else{
      todoss = JSON.parse(localStorage.getItem('todoss'));

    }
    todoss.push(todo)
    console.log(todo[2])
    localStorage.setItem('todoss',JSON.stringify(todoss))
  }



  let gettodo =(todo)=>{
    //check if you have saved data
    let todoss;
    if (localStorage.getItem('todoss')=== null)  {
      todoss=[];
      
    }else{
      todoss = JSON.parse(localStorage.getItem('todoss'));

    }
   

    todoss.forEach(todo => {
      const tododiv = document.createElement('div')
      tododiv.classList.add('todo')

      for (let i = 0; i < todo.length; i++) {
        info = document.createElement('td')
       info.innerText=todo[i]
       info.classList.add('td')
       tododiv.appendChild(info) 
     }
      //save to local 
      

      

      const trashbutton= document.createElement('button')
      trashbutton.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>'
      trashbutton.classList.add('delet');
      tododiv.appendChild(trashbutton)

      todos.appendChild(tododiv)
    })
  }

  let removestorgar= (todo)=>{
    let todoss;
    if (localStorage.getItem('todoss')=== null)  {
      todoss=[];
      
    }else{
      todoss = JSON.parse(localStorage.getItem('todoss'));

    }
    const todoindex= todo.children[0].innerText
    todoss.splice(todoss.indexOf(todoindex), 1)
    localStorage.setItem('todoss',JSON.stringify(todoss))
   
  }

  document.addEventListener('keydown',(e)=>{
    if(e.key=='Enter'){
      addtodo()
    }
  })
  

  
  let deletecheck =(e)=>{
    const item = e.target 
    if (item.classList[0]=== 'delet' ) {
      const todo = item.parentElement;
      todo.classList.toggle('fall')
      removestorgar(todo)
      todo.addEventListener('transitionend',()=>{
        todo.remove()
      })
      
    }
    }

addbtn.addEventListener('click',addtodo)
todos.addEventListener('click',deletecheck)
document.addEventListener('DOMContentLoaded',gettodo);





