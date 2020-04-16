
/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', ()=>{ 
            
          const ordersMsg = document.getElementById('header-text');  
          const mainDiv = document.getElementById('myProperties');
                  
      //funciton to fetch data
      function  fetchData() {
          fetch('http://localhost:3000/api/v1/property')
          .then((resp) =>resp.json())
          .then((data) => renderProperty(data))
        }


      // funciton to render my property
      function  renderProperty(data){
          console.log(data);
          ordersMsg.className = 'err';
          ordersMsg.innerHTML = data.message;
          const properties= data.Property;

          for ( var i= 0; i< properties.length; i++ ){
        
          let  divprop= document.createElement("DIV");
          let  displayOwner = document.createElement("P"); 
          displayOwner.id ='owner'; 
          displayOwner.innerHTML= `<strong>Owner:</strong> ${properties[i].owner}`;

          const displayPrice = document.createElement("P");
          displayPrice.id='price';
          displayPrice.innerHTML = `<strong>${properties[i].price} Rwf </strong>`;

          const displayCity = document.createElement("P");
          displayCity.id='city';
          displayCity.innerHTML = `<strong>   City:</strong>${properties[i].city}, <strong>${properties[i].price}$`;

          const displayPhone = document.createElement("P");
          displayPhone.id='phone';
          displayPhone.innerHTML = `<strong>Phone:</strong> ${properties[i].phone}`;

          const displayDateCreated = document.createElement("P"); 
          displayDateCreated.id = 'dateCreated0;'
          displayDateCreated.innerHTML = `<strong>Date Create:</strong> ${properties[i].dateCreated}`;

          const displayAddress = document.createElement("P");
          displayAddress.id = 'address'
          displayAddress.innerHTML = `<strong>Adress:</strong> ${properties[i].address}`;

          const displayState = document.createElement("P");
          displayState.id = 'state';
          displayState.innerHTML = `${properties[i].state}`;


          // adding image property 
          const img = document.createElement('img'); 
          img.src = properties[i].url; 
          img.style.width= "270px";
          img.style.height= "170px";
          img.classList.add('imgCreated');
      
   

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

          //creting delete Btn
          const deleteBtn= document.createElement('BUTTON');
          deleteBtn.classList.add('btn-delete');
          deleteBtn.innerHTML = "Delete";
          deleteBtn.style.margin = "5px 2px 5px 2px";
          deleteBtn.addEventListener('click', () => deleteMyProperty())
          

          //creting modifiy Btn
          // const modifyBtn= document.createElement('BUTTON');
          // modifyBtn.classList.add('btn-modify');
          // modifyBtn.innerHTML = "Modify";
          // modifyBtn.style.margin = "5px 2px 5px 2px"
          // modifyBtn.addEventListener('click', modifyMyProperty())

        // append img
          flipBoxFront.appendChild(img);

        // append my flip action
          flipBoxInner.appendChild(flipBoxFront);
          flipBoxInner.appendChild(flipBoxBack);

        // append the whole
          flipBox.appendChild(flipBoxInner);

          // adding a class to my divprop
          divprop.classList.add('column-grid-Property');

   
          // append my created object to divprop
          divprop.appendChild(flipBox); 
          // divprop.appendChild(displayOwner);
          divprop.appendChild(displayCity);
          // divprop.appendChild(modifyBtn);
          divprop.appendChild(deleteBtn);

          //to append my whole create section

           mainDiv.append(divprop); 
            
         }

       }


        // funciton to delete some data from my front end and back end 
      function deleteMyProperty(properties){
              let divprop = document.getElementsByClassName('column-grid-Property')[0]
              const url = `http://localhost:3000/api/v1/property/${properties}`;
              const reqObj = { method: 'DELETE' };
            fetch(url, reqObj)
            .then( divprop.remove())
            console.log('I am ready to remove this')  
           }
           
          //function to modify your content
    //   function modifyMyProperty(properties){
    //         let divprop = document.getElementsByClassName('column-grid-Property')[0]
    //         const url = `http://localhost:3000/api/v1/property/${properties}`;
    //         const reqObj = { method: 'PUT' };

    //       fetch(url, reqObj)
    //       .then( divprop.remove())
    //       window.open("../pages/update-property.html");

    //       console.log('I am ready to modify my property') 
    //       mainDiv.classList.add('hide');
       
    //     const box = document.createElement('DIV');  
    //     box.innerHTML = 'here we go with created things';
    //     box.classList.remove('hide')          
    //  }  
     
        fetchData();

})


      