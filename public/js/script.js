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
    displayOwner.innerHTML= `<strong>Owner:</strong>${yesoo[i].owner}`;

    const displayPrice = document.createElement("P");
    displayPrice.id='price';
    displayPrice.innerHTML = `<strong>Price:</strong>${yesoo[i].price} Rwf`;

     const displayCity = document.createElement("P");
    displayCity.id='city';
    displayCity.innerHTML = `<strong>City:</strong>${yesoo[i].city}`;

    const displayPhone = document.createElement("P");
    displayPhone.id='phone';
    displayPhone.innerHTML = `<strong>Phone:</strong>${yesoo[i].phone}`;

    const displayDateCreated = document.createElement("P"); 
    displayDateCreated.id = 'dateCreated0;'
    displayDateCreated.innerHTML = `<strong>Date Create:</strong>${yesoo[i].dateCreated}`;

    const displayAddress = document.createElement("P");
    displayAddress.id = 'address'
    displayAddress.innerHTML = `<strong>Adress:</strong>${yesoo[i].address}`;

    const displayState = document.createElement("P");
    displayState.id = 'state';
    displayState.innerHTML = `<strong>State of the property:</strong>${yesoo[i].state}`;


// adding image property 
            const img = document.createElement('img'); 
            img.src = '../image/kigali.png'; 
            img.style.width= "300px";
            img.style.height= "200px";
            img.classList.add('imgCreated');
            img.setAttribute('onclick','showBtns()');
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
            divprop.appendChild(img); 
            divprop.appendChild(displayOwner);
            divprop.appendChild(displayCity);
            divprop.appendChild(displayAddress);
            divprop.appendChild(displayState);
            divprop.appendChild(displayPrice);
            divprop.appendChild(displayPhone);
            divprop.appendChild(displayDateCreated);


// divprop.appendChild(deleteBn);
// divprop.appendChild(modifyBtn);

        mainDiv.append(divprop);
                      }
 
                 }
             )}

        )
    })
