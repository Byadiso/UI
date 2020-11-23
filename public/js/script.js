      
          
          document.addEventListener('DOMContentLoaded', ()=>{ 
    
          
          const ordersMsg = document.getElementById('header-text');  
          const mainDiv = document.getElementById('myProperties');  
          let properties = []         
                  
          //funciton to fetch data       
        const listAll = () =>{
         return  fetch('http://localhost:3000/api/v1/property')
            .then((resp) =>resp.json())
            .then((data) => renderProperty(data))
          }

          // function to render my property
          function  renderProperty(dataPro){
            // save item in localStorage
              let storedData = localStorage.setItem('properties', JSON.stringify(dataPro));
              console.log(storedData);
              //render them 
              
              console.log(dataPro);
              ordersMsg.className = 'err';
              ordersMsg.innerHTML = dataPro.message;
               properties= dataPro.Property;                  
              for ( var i= 0; i< properties.length; i++ ){            
                let  divprop= document.createElement("DIV"); 
                // fr shor notation is hte best
                divprop.innerHTML =`
                <div class="flip-box" data-id= ${properties[i]._id}>
                  <div class="flip-box-inner">
                     <div class="flip-box-front">
                           <img src=${properties[i].url} class="imgCreated" style="width: 270px; height: 170px;">
                           
                      </div>
                      
                      <div class="flip-box-back">
                          <p id="phone"><strong>Phone:</strong> ${properties[i].phone}</p>
                          <p id="address"><strong>Adress:</strong> ${properties[i].address}</p>
                          <p id="dateCreated0;"><strong>Date Create:</strong> ${properties[i].dateCreated}</p>
                      </div>
                  </div>
                  <button class="btn-view">View</button>
                </div>`
                
                

               
        //         let  displayOwner = document.createElement("P"); 
        //         displayOwner.id ='owner'; 
        //         displayOwner.innerHTML= `<strong>Owner:</strong> ${properties[i].owner}`;

        //         const displayPrice = document.createElement("P");
        //         displayPrice.id='price';
        //         displayPrice.innerHTML = `<strong>${properties[i].price} Rwf </strong>`;

        //         const displayCity = document.createElement("P");
        //         displayCity.id='city';
        //         displayCity.innerHTML = `<strong>   City:</strong>${properties[i].city}, <strong>${properties[i].price}$`;

        //         const displayPhone = document.createElement("P");
        //         displayPhone.id='phone';
        //         displayPhone.innerHTML = `<strong>Phone:</strong> ${properties[i].phone}`;

        //         const displayDateCreated = document.createElement("P"); 
        //         displayDateCreated.id = 'dateCreated0;'
        //         displayDateCreated.innerHTML = `<strong>Date Create:</strong> ${properties[i].dateCreated}`;

        //         const displayAddress = document.createElement("P");
        //         displayAddress.id = 'address'
        //         displayAddress.innerHTML = `<strong>Adress:</strong> ${properties[i].address}`;

        //         const displayState = document.createElement("P");
        //         displayState.id = 'state';
        //         displayState.innerHTML = `${properties[i].state}`;

        //       // adding image property 
        //         const img = document.createElement('img'); 
        //         img.src = properties[i].url; 
        //         img.style.width= "270px";
        //         img.style.height= "170px";
        //         img.classList.add('imgCreated');       
   

        //       // for flipping divs

        //       const flipBoxInner =document.createElement('div');
        //       flipBoxInner.classList.add('flip-box-inner');

        //       const flipBoxFront =document.createElement('div');
        //       flipBoxFront.classList.add('flip-box-front');

        //       const flipBoxBack =document.createElement('div');
        //       flipBoxBack.classList.add('flip-box-back');
        //       flipBoxBack.appendChild(displayOwner);
        //       flipBoxBack.appendChild(displayPhone);
        //       flipBoxBack.appendChild(displayAddress);
        //       flipBoxBack.appendChild(displayDateCreated);

        //       const flipBox = document.createElement('div');
        //       flipBox.classList.add('flip-box');             



        //   // for accessing id 
        //  const id = `${properties[i]._id}`; 
        //   // console.log(id); 
        //   // const  deleteBtn = document.getElementsByClassName('btn-delete');        

        //    //creting view Btn
        //    const viewBtn= document.createElement('BUTTON');
        //    viewBtn.classList.add('btn-view');
        //    viewBtn.innerHTML = "view";
        //    viewBtn.style.margin = "5px 2px 5px 2px";
        //    viewBtn.addEventListener('click',  ()=> {           
        //     fetch( `http://localhost:3000/api/v1/property/${id}`, {
        //       method: 'GET', 
              
        //     }).then((res) =>{
        //       console.log(res);
        //       res.json()
        //     })
        //     .then(pro =>{
        //       location.href='../pages/singleProperty.html';
        //       mainDiv.remove();
        //       let oneItem = pro.Property;
        //       const singleDiv= document.getElementById('forSingleElement');
        //       let container = document.createElement('div');
        //       container.innerHTML = 
        //        `<div class="property-single">         
        //           <div>
        //           <img src=${oneItem.url} class="imgSingleCreated" style="width: 770px; height: 470px;">
        
        //           </div>
        //           <div>
        //                 <p id="phone"><strong>Phone:</strong> ${oneItem.phone}</p>
        //                 <p id="address"><strong>Adress:</strong>${oneItem.address}</p>
        //                 <p id="dateCreated0;"><strong>Date Create:</strong> ${oneItem.dateCreated}</p>
        //                 <p id="owner"><strong>Owner:</strong> ${oneItem.owner}</p>
        //                 <p id="city"><strong>   City:</strong>RUBAVU-KIGALI, <strong>${oneItem.price}$</strong></p>
                        
        //           </div>
        //       </div>`;              


        //       ordersMsg.innerHTML =  `Item Id: ${oneItem._id}`;
        //       //creating modifiy Btn
        //       const modifyBtn= document.createElement('BUTTON');
        //       modifyBtn.classList.add('btn-modify');
        //       modifyBtn.innerHTML = "Modify";
        //       modifyBtn.style.margin = "0px 20px 0px 20px";

        //       // creting delete Btn
        //       const deleteBtn= document.createElement('BUTTON');
        //       deleteBtn.classList.add('btn-delete');
        //       deleteBtn.innerHTML = "Delete";
        //       deleteBtn.style.margin = "0px 20px 0px 20px";


        //       //append everything
        //       container.appendChild(modifyBtn);
        //       container.appendChild(deleteBtn);
        //       singleDiv.append(container);
        //       console.log(pro)
        //       //<button class="btn-modify" style="margin: 5px 2px;">Modify</button>
        //       // <button class="btn-delete" style="margin: 5px 2px;">Delete</button>


        //       //for delete option
        //       deleteBtn.addEventListener('click', fetchDelete());

        //       // fetch delete function
        //        const fetchDelete = ()=>{                         
        //           fetch( `http://localhost:3000/api/v1/property/${id}`, {
        //             method: 'DELETE',
        //             headers: {
        //               Accept: "application/json",
        //               "Content-Type": "application/json",
        //               // Authorization: `Bearer `
        //            }
        //           }).then(()=> location.reload());     
               
        //         }

        //        // for modfying action

        //         modifyBtn.addEventListener('click',()=>{
        //           location.href='../pages/updated.html';
        //           displayAddress.innerHTML= oneItem.address;
        //           console.log(oneItem.address);
        //           const owner = document.getElementById('#owner').textContent;
        //             owner.value= `${oneItem.owner}`


        //           const updateBtn = document.getElementById('submitUpdates');
        //           updateBtn.addEventListener('click',(e)=>{
        //             e.preventDefault();
        //             console.log(oneItem.address);
        //             // const owner = document.getElementById('.owner');
        //             // owner.value= `${oneItem.owner}`
                     
        //             fetch(`http://localhost:3000/api/v1/property/${id}`, {
        //               method: 'PUT',
        //               body: JSON.stringify({
        //                 owner:displayOwner.value,
        //                 price:displayPrice,
        //                 state:displayState,
        //                 city:displayCity.value,
        //                 phone: displayPhone.value,
        //                 url:img.value,
        //                 dateCreated:displayDateCreated.value
        //               })
        //             }).then(response => {response.json()})
        //             .then(dataUpdated =>{ console.log(dataUpdated)})
        //             .catch(err =>console.log(err))
        //           });
        //           })
                 
        //           const containerPro = document.querySelector('.singleProperty');
        //           containerPro.innerHTML = pro.Property;
        //     });           
         
        //  });
         

        // // append img
        //   flipBoxFront.appendChild(img);

        // // append my flip action
        //   flipBoxInner.appendChild(flipBoxFront);
        //   flipBoxInner.appendChild(flipBoxBack);

        // // append the whole
        //   flipBox.appendChild(flipBoxInner);

          // adding a class to my divprop 
        divprop.setAttribute("class",'column-grid-Property')

   
          // // append my created object to divprop
          // divprop.appendChild(flipBox); 
          // divprop.appendChild(displayOwner);
          // divprop.appendChild(displayCity);

          // // for adding buttons
          // // divprop.appendChild(modifyBtn);
          // // divprop.appendChild(deleteBtn);
          // divprop.appendChild(viewBtn);
          

          // to append my whole create section    
          mainDiv.append(divprop);          
             
                   }   
                   
         const viewBtns = document.querySelectorAll('.btn-view');
         viewBtns.forEach(Btn => {
                  Btn.addEventListener('click', (e)=>{
                    // Storage()
                    let propId = e.target.parentElement.dataset.id;
                    localStorage.setItem('id', propId)
                    console.log(propId);
                    location.href='../pages/singleProperty.html';
                  })
  
                });
              }            
                   
              
              // listAll();

              // implementing logOut
                const logOutBtn = document.querySelector('.log-out');
                  logOutBtn.addEventListener('click', ()=>{
                    console.log('plz I am out')
                  localStorage.clear();
                  window.location.href = '../pages/login.html';
              })

              //implementing search bar

              const searchBar = document.getElementById('searchBar');
              searchBar.addEventListener('keyup',(e)=>{
                    const searchString = e.target.value.toLowerCase();
                   
                    const filtredPro = properties.filter((property) =>{
                     return (
                          property.owner.toLowerCase().includes(searchString) ||
                          property.state.toLowerCase().includes(searchString) ||
                          property.city.toLowerCase().includes(searchString)
                        )
                    })
                    console.log(filtredPro)
                    // listAll(filtredPro)
                    // listAll(filtredPro)
              })
               listAll();
      
          })
          
          
          
          
          
          
          
          
          
              
     

 