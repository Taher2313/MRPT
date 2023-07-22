const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");


window.onload = function() {
  container.classList.add("sign-up-mode");
};


sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

function check_pass() {
  const password = document.querySelector('input[name=Password]');
  const confirm = document.querySelector('input[name=Confirm_Password]');
  if (confirm.value === password.value) {
  confirm.setCustomValidity('');
  } else {
     confirm.setCustomValidity('Passwords do not match');
  }
 }