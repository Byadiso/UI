
/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', ()=>{ 
            
  // const ordersMsg = document.getElementById('header-text');  
  const usersDiv= document.getElementById('userContainer');
 
   const  fetchingUsers = ( () => {
    fetch( "http://localhost:3000/api/v1/users")
    .then((res) => res.json())
    .then(pro => renderUsers(pro))    
 });
    
   
 function renderUsers(pro){
console.log(pro )

let Items = pro.user;
for ( var i= 0; i< Items.length; i++ ) {

  let userCont = document.createElement('div');
  userCont.classList.add('userDetails');
  userCont.innerHTML = 
   `<p id="phone"><strong>name:</strong> ${Items[i].firstname}</p>
    <p id="address"><strong>email:</strong>${Items[i].email}</p>
    <p id="owner"><strong>User ID:</strong> ${Items[i]._id}</p>`;  
  
  usersDiv.appendChild(userCont)

}

  

     }

fetchingUsers();  

})



               