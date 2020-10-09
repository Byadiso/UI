
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


