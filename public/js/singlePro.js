
/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', ()=>{ 
            
  // const ordersMsg = document.getElementById('header-text');  
  const mainSingleDiv = document.getElementById('singleProperty');

  
  
   const  fetchingSingle = (proId => {
    fetch( `http://localhost:3000/api/v1/property/${proId}`)
    .then((res) => res.json())
    .then(pro => {        
    renderSingle(pro);
   })    
 });
       
 function renderSingle(data){
console.log(data)
   const singlePro = data.Property;
   //for delete button

    const deleteBtn= document.createElement('BUTTON');
    deleteBtn.classList.add('btn-delete');
    deleteBtn.innerHTML = "Delete";
    deleteBtn.style.margin = "5px 2px 5px 2px";
    deleteBtn.addEventListener('click', ()=>{
            console.log('yes delete something');                         
            fetch( `http://localhost:3000/api/v1/property/${id}`, {
              method: 'DELETE',
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                // Authorization: `Bearer `
             }
            }).then(()=> location.reload()); 
     
});

    //for modify button
    const modifyBtn= document.createElement('BUTTON');
          modifyBtn.classList.add('btn-modify');
          modifyBtn.innerHTML = "Modify";
          modifyBtn.style.margin = "5px 2px 5px 2px";
          modifyBtn.addEventListener('click', ()=>{
                console.log('yes updates')



          });

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


