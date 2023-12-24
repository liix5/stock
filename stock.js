//selectors
let input =document.querySelector('input')
let addbtn =document.querySelector('.add')
let stocks =document.querySelector('.stock-list')
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


// * i know the keys are exposed
//* but consedring its only a simple front end app with no private info i didnt make a backend 

let key = '34eca5a551mshdefdb670ce0b05ep18976bjsn526ca61a1c20'


let addStock = ()=>{
//* handel errors before fetching
  if (Number(input.value) > 9999) {
    error.innerText= 'the input should be four digits. ex.2222'
   
  } else if(input.value.indexOf(' ') >= 0){
    error.innerText='Invalid stock symbol: Whitespace is not allowed.'
  }
  else if(input.value.match(/[a-z]/g) ||input.value.match( /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
    error.innerText='Please use only numbers for the stock symbol ex.2222 '
  }
  else{


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
    q1name = result.earningsChart.quarterly[0]?.date;
    q1 = result.earningsChart.quarterly[0]?.actual.fmt;
    
  
    q2name = result.earningsChart.quarterly[1]?.date;
    q2 = result.earningsChart.quarterly[1]?.actual.fmt;
    
    q3name = result.earningsChart.quarterly[2]?.date;
    q3 = result.earningsChart.quarterly[2]?.actual.fmt;
  
    q4name = result.earningsChart.quarterly[3]?.date;
    q4 = result.earningsChart.quarterly[3]?.actual.fmt;
    
  
    process()
    error.innerText=' '
    
   })
   
   })
   .catch(err => {
    error.classList='err'
    const errormessage =String(err)  
    if(errormessage.includes('Unexpected token')){
    error.innerText= 'Stock symbol not found: Please verify and re-enter. '
    console.log(error.classList)
   }else if (key == '34eca5a551mshdefdb670ce0b05ep18976bjsn526ca61a1c20') {
    key = '6058d93136msh8c7ce63d86695bap17234cjsn3260034dfb5a'
    error.innerText= ' sorry, try again'
   } else if (key == '6058d93136msh8c7ce63d86695bap17234cjsn3260034dfb5a'){
    key = '34eca5a551mshdefdb670ce0b05ep18976bjsn526ca61a1c20'
    error.innerText= ' sorry, try again'
   } 
  
  })
  }

  };

 let process = ()=>{
  error.innerText=''
  let array = [`${symbol}-${comp}`,` ${q1name === undefined? 'not found': q1name} = ${q1=== undefined? 'not found': q1}`,` ${q2name === undefined? 'not found': q2name} = ${q2 === undefined? 'not found': q2}`,` ${q3name === undefined? 'not found': q3name} = ${q3 === undefined? 'not found': q3}`,` ${q4name === undefined? 'not found': q4name} = ${q4 === undefined? 'not found': q4}`, `price = ${price}`]
  
  //stock div
  const stockDiv = document.createElement('div')
  stockDiv.classList.add('stock')
  
  const newStock = document.createElement('tr')
  
  newStock.classList.add('stockitem')
 
  let infoarr=[]
 
  for (let i = 0; i < array.length; i++) {
     info = document.createElement('td')
    info.innerText=array[i]
    info.classList.add('td')
    newStock.appendChild(info)
    infoarr.push(info.innerHTML)
  }

  stockDiv.appendChild(newStock)
  //save to local 
  saveStock(infoarr)
  
  

  
  
  
  const trashbutton= document.createElement('button')
  trashbutton.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>'
  trashbutton.classList.add('delet');
  stockDiv.appendChild(trashbutton)
  
  stocks.appendChild(stockDiv)
  //clear input value
  input.value=""
 }

  let saveStock =(stock)=>{
    //check if you have saved data
    let stockData;
    
    if (localStorage.getItem('stockData')=== null)  {
      stockData=[];
      
    }else{
      stockData = JSON.parse(localStorage.getItem('stockData'));

    }
    stockData.push(stock)
    
    localStorage.setItem('stockData',JSON.stringify(stockData))
  }



  let getStock =()=>{
    //check if you have saved data
    let stockData;
    if (localStorage.getItem('stockData')=== null)  {
      stockData=[];
      
    }else{
      stockData = JSON.parse(localStorage.getItem('stockData'));

    }
   

    stockData.forEach(stock => {
      const stockdiv = document.createElement('div')
      stockdiv.classList.add('stock')

      for (let i = 0; i < stock.length; i++) {
        info = document.createElement('td')
       info.innerText=stock[i]
       info.classList.add('td')
       stockdiv.appendChild(info) 
     }
      //save to local 
      

      

      const trashbutton= document.createElement('button')
      trashbutton.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>'
      trashbutton.classList.add('delet');
      stockdiv.appendChild(trashbutton)

      stocks.appendChild(stockdiv)
    })
  }

  let removestorgar= (stock)=>{
    let stockData;
    if (localStorage.getItem('stockData')=== null)  {
      stockData=[];
      
    }else{
      stockData = JSON.parse(localStorage.getItem('stockData'));

    }
    const stockIndex= stock.children[0].innerText
    stockData.splice(stockData.indexOf(stockIndex), 1)
    localStorage.setItem('stockData',JSON.stringify(stockData))
   
  }

  document.addEventListener('keydown',(e)=>{
    if(e.key=='Enter'){
      addStock()
    }
  })
  

  
  let deletecheck =(e)=>{
    const item = e.target 
    if (item.classList[0]=== 'delet' ) {
      const stock = item.parentElement;
      stock.classList.toggle('fall')
      removestorgar(stock)
      stock.addEventListener('transitionend',()=>{
        stock.remove()
      })
      
    }
    }

addbtn.addEventListener('click',addStock)
stocks.addEventListener('click',deletecheck)
document.addEventListener('DOMContentLoaded',getStock);





