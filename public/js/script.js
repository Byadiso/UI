/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', ()=>{ 
  
  const ordersMsg = document.getElementById('header-text');  
  const mainDiv = document.getElementById('myProperties');
 

  fetch('http://localhost:3000/api/v1/property').then((resp) => {
    resp.json().then((res) => {
      console.log(res);
        ordersMsg.className = 'err';
        ordersMsg.innerHTML = res.message;
        const yesoo= res.Property;


    for ( var i= 0; i< yesoo.length; i++ ){
   
    const  divprop= document.createElement("DIV");
    const displayOwner = document.createElement("P"); 
    displayOwner.id ='owner'; 
    displayOwner.innerHTML= `<strong>Owner:</strong> ${yesoo[i].owner}`;

    const displayPrice = document.createElement("P");
    displayPrice.id='price';
    displayPrice.innerHTML = `<strong>${yesoo[i].price} Rwf </strong>`;

     const displayCity = document.createElement("P");
    displayCity.id='city';
    displayCity.innerHTML = `<strong>   City:</strong>${yesoo[i].city}, <strong>${yesoo[i].price}$`;

    const displayPhone = document.createElement("P");
    displayPhone.id='phone';
    displayPhone.innerHTML = `<strong>Phone:</strong> ${yesoo[i].phone}`;

    const displayDateCreated = document.createElement("P"); 
    displayDateCreated.id = 'dateCreated0;'
    displayDateCreated.innerHTML = `<strong>Date Create:</strong> ${yesoo[i].dateCreated}`;

    const displayAddress = document.createElement("P");
    displayAddress.id = 'address'
    displayAddress.innerHTML = `<strong>Adress:</strong> ${yesoo[i].address}`;

    const displayState = document.createElement("P");
    displayState.id = 'state';
    displayState.innerHTML = `${yesoo[i].state}`;


// adding image property 
            const img = document.createElement('img'); 
            img.src = yesoo[i].url; 
            img.style.width= "270px";
            img.style.height= "170px";
            img.classList.add('imgCreated');
            // img.setAttribute('onclick','showDescription()');
          
       

            // for flipping divs

            const flipBoxInner =document.createElement('div');
            flipBoxInner.classList.add('flip-box-inner');

            const flipBoxFront =document.createElement('div');
            flipBoxFront.classList.add('flip-box-front');

            const flipBoxBack =document.createElement('div');
            flipBoxBack.classList.add('flip-box-back');
            flipBoxBack.appendChild(displayOwner);
            flipBoxBack.appendChild(displayPhone);
            flipBoxBack.appendChild(displayAddress);

            const flipBox = document.createElement('div');
            flipBox.classList.add('flip-box');

            //creting buy button

            const buyBtn= document.createElement('BUTTON');
            buyBtn.classList.add('btn-buying');
            buyBtn.innerHTML = "Buy With Us";
            buyBtn.style.margin = "5px 2px 5px 2px"


            flipBoxFront.appendChild(img);
           
            flipBoxInner.appendChild(flipBoxFront);
            flipBoxInner.appendChild(flipBoxBack);
           
            flipBox.appendChild(flipBoxInner);
            

            // img.appendChild(flipBoxInner);

// img.onclick = showBtns()



    //adding buttons
    // const deleteBn= document.createElement('BUTTON');
    // deleteBn.classList.add('btn-delete');
    // deleteBn.innerHTML = "Delete Your Property";
    // deleteBn.style.margin = "5px 2px 5px 2px"

    // const modifyBtn = document.createElement('BUTTON');
    // modifyBtn.classList.add('btn-modify');
    // modifyBtn.innerHTML = "Modify Your Property"
    // modifyBtn.style.margin =  "5px 2px 5px 2px"

    divprop.classList.add('column-grid-Property');
    
       


    // append my created object to divprop
            divprop.appendChild(flipBox); 
            // divprop.appendChild(displayOwner);
            divprop.appendChild(displayCity);
            divprop.appendChild(buyBtn)

            // divprop.appendChild(displayAddress);
            // divprop.appendChild(displayState);
            // divprop.appendChild(displayPrice);
            // divprop.appendChild(displayPhone);
            // divprop.appendChild(displayDateCreated);


// divprop.appendChild(deleteBn);
// divprop.appendChild(modifyBtn);

        mainDiv.append(divprop);                
         

             }
       
             
                 }
                 
             )},
            
        
        )

// here fo Box clickable
        // const StateCreated = document.getElementById('state')
        //         for(var j = 0; j < StateCreated.length; j ++){
        //           const  statePro = StateCreated[j]
        //           statePro .addEventListener('click',showDescription)
        //               }    
              
        // function showDescription(){
        //                 console.log('ve been clicked')
        //                 }
            
    })
