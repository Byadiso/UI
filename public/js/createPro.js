
/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', ()=> { 
  
    let urlPro = 'http://localhost:3000/api/v1/property';
              
    // for accessing only my form to create a property 
    const owner = document.querySelector('#owner');
    const price = document.querySelector('#price');
    const state = document.querySelector('#state');
    const city = document.querySelector('#city');
    const phone = document.querySelector('#phone');
    const adress = document.querySelector('#address');
    const url = document.querySelector('#url');
    const button = document.getElementById('#create_pro');
  
    
    button.addEventListener('click', (e) => { 
      e.preventDefault();
        fetch(`${urlPro}`, {
         method: 'POST',
         headers:{
           'Content-Type':'application/json'
          },
         body: JSON.stringify({         
           owner:owner.value,
           price:price.value,
           state:state.value,
           city:city.value,
           phone: phone.value,
           url:url.value,
           dateCreated: Date.now()
         })
       })
       .then(response =>response.json())
       .then(createdProperty =>{
        let storedData = localStorage.setItem('properties', JSON.stringify(createdProperty))
        window.location.href = '../pages/property.html'
       })
       .catch(err =>console.log(err));
      })
    })
  
  
  