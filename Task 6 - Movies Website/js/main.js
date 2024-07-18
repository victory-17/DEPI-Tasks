class Sidebar {
  constructor(sidebar= '.color-box', toggleBtn='#color-box-switch', colorElems ='.color-option'){
      this.sidebar = sidebar
      this.toggleBtn = toggleBtn;
      this.sidebarWidth = $(this.sidebar).outerWidth();
      console.log(this.sidebarWidth)
      $(this.sidebar).css('right', `-${this.sidebarWidth}px`)
      this.widthToggleBtn =  $(this.toggleBtn).outerWidth();
      console.log(this.widthToggleBtn)
      $(this.toggleBtn).css('left', `-${this.widthToggleBtn}px`)
      this.colorElems = colorElems;
      this.root = document.documentElement
  }

  toggleSidebar = (duration=1500)=>{
      $(this.toggleBtn).click(()=>{
          $(this.toggleBtn).children().toggleClass('fa-spin')
          if($(this.sidebar).css('right') == '0px'){
              $(this.sidebar).animate({'right':`-${this.sidebarWidth}px`}, duration)
          }else{
              $(this.sidebar).animate({'right': 0}, duration)
          }
      })
  }

  pickColor = (mainColor='--main-color', border=true, borderWidth='1px', borderStyle='solid', borderColor='#ddd')=>{
      let borderCss = {
          borderWidth,
          borderColor,
          borderStyle 
      }
      if(border){
          $('.default').css(borderCss)
      }
      $(this.colorElems).click(function(){
          document.documentElement.style.setProperty(mainColor, $(this).css('background-color'))
          if(border){
              $(this).css(borderCss)
              $(this).parent().siblings().children().css('border', 'none')
          }
      })
  }
}

let sidebar = new Sidebar()
sidebar.toggleSidebar();
sidebar.pickColor();


// Handle loading and error cases for each endpoint (fetch initial data, search data)
$(document).ready(function(){
  console.log( $('#loading'))
  $('#loading').fadeOut(2000)
})
const imagePath = 'https://image.tmdb.org/t/p/w500/'
const moviesCategory = $('#moviesCategory')
const searchInput = document.querySelector('#searchInput');
const categoryTitle = document.querySelector('#categoryTitle')
const apiKey = '37a194ab674674d3542bdfa59c52f54f'

let searchTimeout;


searchInput.addEventListener('input', function(){
  clearTimeout(searchTimeout);
  if(searchInput.value.length >= 3){ // user must enter at least 3 characters before sending a request.
    searchTimeout = setTimeout(async () => {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput.value}&page=1`);
      const searchData = await response.json();
      if(response.ok){
        if(searchData.results.length !== 0){
          categoryTitle.innerHTML = `<span class="fs-5 text-white">Showing results about:</span> "${searchInput.value}"`;
          display(searchData.results);
        } else {
          categoryTitle.innerHTML = `<span class="fs-5 text-white">Showing results about:</span> "${searchInput.value}"`;
          $(moviesCategory).html(
            `
            <div class="col-md-12 text-white text-center fs-2 py-5">
              Sorry, There's no result matching your search input :(
            </div>
            `
          );
        }
      } else {
          categoryTitle.innerHTML = `<span class="fs-5 text-white">Error fetching results. Please try again later.</span>`;
          $(moviesCategory).html('');
        }
      }, 500); // delay before sending the request (in milliseconds)
    } else {
      categoryTitle.innerHTML = `Now Playing`;
      getData('/movie/now_playing');
    }
});

$('#menu li span').click(function(){
  if($(this).attr('id') != undefined){
    getData($(this).attr('id'))
    categoryTitle.innerHTML = $(this).html()
  }
})

const getData = async category => {
  try {
    const res = await fetch(`https://api.themoviedb.org/3${category}?api_key=${apiKey}`)
    const data = await res.json();
    if(res.ok){
      display(data.results)
    }else{
      console.log('Something went wrong');
      displaySlider('', true);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    displaySlider('', true);
  }
}
getData('/movie/now_playing');


function display(json){
  let conatiner = '';
  console.log(json)
  for(let i=0; i<json.length; i++){
    conatiner += `
    <div class="col-md-4 bounceInUp">
        <div class="movieBox position-relative">
          <img src=${imagePath+json[i].poster_path} class='w-100' alt="">
          <div class="movieDetails position-absolute  d-flex flex-column justify-content-around">
          <img src=${imagePath+json[i].backdrop_path} class='w-100 h-100 position-absolute' /> 
                <div class="">
                    <h3 class="main-text text-center fw-bold mb-3 fs-5">${json[i].original_title}</h3>

                    <span class="me-3 fs-4"><span class="fw-bold main-text">Rating: </span>${json[i].vote_average}</span>
                    <br>
                    <span class="fs-4"><span class="fw-bold main-text">Release Date: </span>${json[i].release_date}</span>

                    <p class="mt-2 mt-md-4">${json[i].overview}</p>
                    
                  </div>
          </div>
        </div>
      </div>
    `
  }
  moviesCategory.html(
    conatiner
  )
}


$('#control-btn').click(function(){
    $('#menu li span').each(function(){
      if($(this).css('opacity') === '0'){
        setTimeout(()=>{
          $(this).css({
          opacity: '1',
          top: '50%',
          transform: 'translateY(-50%)'})
        }, 500)
        
      }else{
        $(this).css({
          opacity: '0',
          top: '300%',
        })
      }
    })
}) 

let toggleBtnWidth = $('#toggle-btn').outerWidth()
$('#toggle-btn').css('right', `-${toggleBtnWidth}px`)
let menuWidth = $('#menu').outerWidth()
$('#menu').css('left', `-${menuWidth}px`)
$('#control-btn').click(function(){
  if($('#menu').css('left') == '0px'){
      $('#menu').css('left', `-${menuWidth}px`)
      $(this).addClass('fa-bars')
      $(this).removeClass('fa-xmark')
  }else{
      $('#menu').css('left', 0);
      $(this).removeClass('fa-bars')
      $(this).addClass('fa-xmark')
  }
})

/*Contact input Validation*/
let praintAlert = (id, msg, show=true)=>{
  if(show){
    $(id).html(`
      <div class="alert alert-danger" role="alert">
        ${msg}
      </div>`
    );
  }else{
    $(id).html(``);
  }
}
let addValidationClass = (elem, valid=true)=>{
    if(valid){
      $(elem).removeClass('is-invalid')
      $(elem).addClass('is-valid')
    }else{
      $(elem).addClass('is-invalid')
      $(elem).removeClass('is-valid')
    }
}

/*Validate Username*/
const username = document.getElementById('username')
username.addEventListener('input', function(e){
  e.preventDefault();
  usernameValidation(this.value)
  removeDisabled()
})

let usernameValidation = (value)=>{
  let RegExp = /^[\w\s_\.@]{4,20}$/;
  if(value != undefined){
    if(!RegExp.test(value)){
      addValidationClass(username, false)
      if(value == '' || value.length == 0){
        praintAlert('#alertName', '', false)
      }
      else if(value.length <= 3){
        praintAlert('#alertName', 'Your name should be at least 3 characters')
      }else if(value.length > 20){
        praintAlert('#alertName', 'Your name should not more than 20 characters')
      }else if(value.match(/[\d]/) || value.match(/["@'$!%*#?&]/) || value.match(/[.]/) || value.match(/[0123456789]/)){
        praintAlert('#alertName', 'You cannot use special characters or numbers in the name')
      }
      return false;
    }else{
      addValidationClass(username)
      praintAlert('#alertName', '', false)
      return true
    }
  }else{
    return false
  }
  
}

/*Validate Email*/
const userEmail = document.getElementById('userEmail')
userEmail.addEventListener('input', function(e){
  e.preventDefault();
  userEmailValidation(userEmail.value)
  removeDisabled()
})

let userEmailValidation = (value)=>{
  let RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if( value != undefined){
      if(!RegExp.test(value)){
      addValidationClass(userEmail, false)
      if(value == '' || value.length == 0){
        praintAlert('#alertEmail', '', false)
      }
      else{
        praintAlert('#alertEmail', 'Please Enter a Valid Email')
      }
      return false
    }else{
      addValidationClass(userEmail)
      praintAlert('#alertEmail', '', false)
      return true
    }
  }else{
    return false
  }
  
} 

/*Validate Phone*/
const userPhone = document.getElementById('userPhone')
userPhone.addEventListener('input', function(e){
  e.preventDefault();
  userPhonelValidation(this.value)
  removeDisabled()
})

let userPhonelValidation = (value)=>{
  let RegExp = /^01[0125][0-9]{8}$/
  if(value != undefined){
    if(!RegExp.test(value.trim())){
      addValidationClass(userPhone, false)
      if(value == '' || value.length == 0){
        praintAlert('#alertPhone', '', false)
      }
      else{
        praintAlert('#alertPhone', 'Please Enter Correct Phone Number')
      }
      return false
    }else{
      addValidationClass(userPhone)
      praintAlert('#alertPhone', '', false)
      return true
    }
  }else{
    return false
  }
  
} 
/*Validate Age*/
const userAge = document.getElementById('userAge')
userAge.addEventListener('input', function(e){
  e.preventDefault();
  userAgelValidation(this.value)
  removeDisabled()
})

let userAgelValidation = (value)=>{
  let RegExp = /^([1-8][0-9]|90)$/
  if(value != undefined){
    if(!RegExp.test(value.trim())){
      addValidationClass(userAge, false)
      if(value == '' || value.length == 0){
        praintAlert('#alertAge', '', false)
      }
      else{
        praintAlert('#alertAge', 'Please Enter Correct Age')
      }
      return false
    }else{
      addValidationClass(userAge)
      praintAlert('#alertAge', '', false)
      return true
    }
  }else{
    return false
  }
} 
/*Validate Pass*/
const userPass = document.getElementById('userPass')
userPass.addEventListener('input', function(e){
  e.preventDefault();
  userPassValidation(this.value)
  removeDisabled()
})

let userPassValidation = (value)=>{
  let RegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
  if( value != undefined){
    if(!RegExp.test(value.trim())){
      addValidationClass(userPass, false)
      if(value == '' || value.length == 0){
        praintAlert('#alertPass', '', false)
      }else if(value.length < 8){
        praintAlert('#alertPass', 'Your password should be at least 8 characters')
      }
      else if(value.length > 20){
        praintAlert('#alertPass', 'Your password should not be more than 20 characters')
      }
      else{
        praintAlert('#alertPass', 'Your password should contain at least a number and a special character Like [!@#$%^&*], and letters')
      }
      return false
    }else{
      addValidationClass(userPass)
      praintAlert('#alertPass', '', false)
      return true
    }
  }else{
    return false
  }
  
} 
const userVPass = document.getElementById('userVPass')
userVPass.addEventListener('input', function(e){
  e.preventDefault();
  userPassMatch(this.value)
  removeDisabled()
})

let userPassMatch = (value)=>{
if(value != undefined){
  if(value != userPass.value){
    addValidationClass(userVPass, false)
    praintAlert('#alertVPass', 'Your password not match, please check your password above') 
    return false
  }else{
      addValidationClass(userVPass)
      praintAlert('#alertVPass', '', false)
      return true
  }
}else{
  return false
}
} 


let removeDisabled =()=>{
  if(usernameValidation(username.value) &&
    userEmailValidation(userEmail.value) &&
    userPhonelValidation(userPhone.value) &&
    userAgelValidation(userAge.value) &&
    userPassValidation(userPass.value) &&
    userPassMatch(userVPass.value)){
      console.log('it\'s ready')
      $('#submitBtn').attr('disabled', false)
    }else{
      $('#submitBtn').attr('disabled', true)
    }
}


$('#showPass').click(function(){
  if($(userPass).attr('type') === 'password'){
    $(userPass).attr('type', 'text')
    $(userVPass).attr('type', 'text')
    $(this).addClass('fa-eye-slash')
    $(this).removeClass('fa-eye')
  }else{
    $(userPass).attr('type', 'password')
    $(userVPass).attr('type', 'password')
    $(this).removeClass('fa-eye-slash')
    $(this).addClass('fa-eye')
  }

  
})
$(window).scroll(function(){
  if($(window).scrollTop() > 1000){
      $('#btn-up').fadeIn(500)
  }else{
      $('#btn-up').fadeOut(500)
  }
})
$('#btn-up').click(function(){
  $('html,body').animate({scrollTop: 0}, 1000);
})
$('#menu a').click(function(){
  $('body,html').animate({scrollTop: $($(this).attr('href')).offset().top}, 1000)
})



// Theme toggle
document.addEventListener("DOMContentLoaded", function () {
  const themeIcon = document.getElementById('theme-icon');
  const currentTheme = localStorage.getItem('theme') || 'dark';

  if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  }

  themeIcon.addEventListener('click', function () {
    document.body.classList.toggle('light-theme');
    if (document.body.classList.contains('light-theme')) {
      themeIcon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('theme', 'light');
    } else {
      themeIcon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('theme', 'dark');
    }
  });
});

