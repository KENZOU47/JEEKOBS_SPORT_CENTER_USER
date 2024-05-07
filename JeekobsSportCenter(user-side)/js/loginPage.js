let signUpButton=document.getElementById("signUpBtn");
let signInButton=document.getElementById("signInBtn");
let signInForm=document.getElementById("signIn");
let signUpForm=document.getElementById("signUp");
signUpButton.addEventListener("click",function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
    signUpForm.style.transition="0.4s ease all"
    signInForm.style.transition="0.3s ease all"
})
signInButton.addEventListener("click",function(){
    signUpForm.style.display="none";
    signInForm.style.display="block";
    signUpForm.style.transform=" transition:0.4s"
    signInForm.style.transform=" transition:0.4s"
})

function signIn(){
    window.close("loginPage.html");
    window.open("jeekobsportCenter.html");

}
function signUp(){
    window.open("loginPage.html");
   

}