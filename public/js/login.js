

// CONSUME LOGIN ENDPOINT
const loginBtn = document.getElementById('loginBtn');
const userField = document.getElementById('email');
const firstname = document.getElementById('firstname');
const passwordField = document.getElementById('password');
const incorrect =  document.getElementById('incorrect');

const usernameErr = document.querySelector('div#usernameErr');
const emailErr = document.querySelector('div#emailErr');
const passwordErr = document.querySelector('div#passwordErr');
const password2Err = document.querySelector('div#password2Err');


loginBtn.onmouseover = () => {
  if (!userField.value || !passwordField.value || emailErr.innerHTML !== '' || passwordErr.innerHTML !== '' || password2Err.innerHTML !== '') {
   return loginBtn.style.opacity = 0.6;
  } else {
    loginBtn.style.opacity = 1;
  }
};

loginBtn.onclick = () => {
  const usernameEmail = userField.value;
  const password = passwordField.value;

  if (!usernameEmail.trim() || !password.trim()) {
    return password2Err.innerHTML = 'Please fill in all fields';
    
  }
  password2Err.innerHTML = '';
  if (emailErr.innerHTML !== '' || passwordErr.innerHTML !== '' || password2Err.innerHTML !== '') {
        // usernameErr.innerHTML = 'Please correct the errors in red below';
        return  password2Err.innerHTML = 'Please correct the errors in red below';
        
  } else {    
        usernameErr.innerHTML = '';
        const usernameEmail = document.getElementById('email').value;  
    
    fetch('http://localhost:3000/api/v1/login',{
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ usernameEmail, password }),
    } ).then(resp => resp.json().then((res) => {      
      if (res.success === false) {       
        console.log(res.message)
        return password2Err.innerHTML = res.message;
      } else {
        if (res.success === true) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('firstname', res.user.firstname);
        localStorage.setItem('lastname', res.user.lastname);
        localStorage.setItem('phone', res.user.phone);
        localStorage.setItem('email', res.user.email);
        localStorage.setItem('id', res.user.userid);

        password2Err.innerHTML = `<span style='color: greenyellow'>${res.message}</span>`;
        // if (res.user.role === 'admin') {
        //   localStorage.setItem(res.user.username, 'an');
        //   setTimeout(() => {
        //     window.location.href = 'admin';
        //   }, 100);
        //   return;
        // }
        // setTimeout(() => {
        //   window.location.href = 'userMenu';
        // }, 100);
      }
    }
    }).catch((err) => {
      password2Err.innerHTML = err.message
      return;
    }))
      .catch(((fetchErr) => {
        usernameErr.innerHTML = fetchErr;
      }));
  }
};


