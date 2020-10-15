
/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', ()=>{ 
            
  // const ordersMsg = document.getElementById('header-text');  
  const mainSingleDiv = document.getElementById('singleProperty');
 
   const  fetchingSingle = ( () => {
    fetch( "http://localhost:3000/api/v1/property")
    .then((res) => res.json())
    .then(pro => renderSingle(pro))    
 });
    
   
 function renderSingle(pro){
console.log(pro )
   const singlePro = pro.Property;

   //for delete button

    const deleteBtn= document.createElement('BUTTON');
    deleteBtn.classList.add('btn-delete');
    deleteBtn.innerHTML = "Delete";
    deleteBtn.style.margin = "5px 2px 5px 2px";

    //for modify button
    const modifyBtn= document.createElement('BUTTON');
          modifyBtn.classList.add('btn-modify');
          modifyBtn.innerHTML = "Modify";
          modifyBtn.style.margin = "5px 2px 5px 2px"
          // modifyBtn.addEventListener('click', modifyMyProperty(id));

    //for image
        const img = document.createElement("img");  
        img.src = singlePro.url; 
        img.style.width= "770px";
        img.style.height= "570px";
        img.classList.add('imgCreated');

        mainSingleDiv.append(img);
        mainSingleDiv.append(deleteBtn);
        mainSingleDiv.append(modifyBtn);


  

     }

fetchingSingle();  

})



                const updateBtn = document.getElementById('submitUpdates');
                  updateBtn.addEventListener('click',(e)=>{
                    e.preventDefault();

                  //   fetch( `http://localhost:3000/api/v1/property/${_id}`, {
                  //   method: 'PUT',
                  //   headers: {
                  //       Accept: "application/json",
                  //       "Content-Type": "application/json",
                  //   },
                  //   body: JSON.stringify({
                  //     owner:this.value,
                  //     price:this.value,
                  //     state:this.value,
                  //     city:this.value,
                  //     phone: this.value,
                  //     url:this.value,
                  //     dateCreated:this.value
                    
                  // }).then(response =>  response.json())
                  // .then(dataUpdated => console.log(dataUpdated))
                  // .catch(err =>console.log(err))
                  // })
                  console.log('ues')
               })
                  
                
console.log('we are on updated page')