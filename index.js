
validateForm = () => {
    let password = document.loginForm.password.value.trim();
    let username = document.loginForm.username.value.trim(); 

    if(username === "" && password == ""){
        alert("All fields required.");
        loginForm.username.focus();
        return false;
    } else if(username === ""){
        alert("Please provide username.")
        loginForm.username.focus();
        return false;
    }else if(password === ""){
        alert("Please provide password.")
        loginForm.password.focus();
        return false;
    } else if(username.length < 4){
        alert("Username doesn't meet minimum characters. (4 characters)")
        loginForm.username.focus();
        return false;
    }else if(password.length < 8){
        alert("Password doesn't meet minimum characters. (8 characters)")
        loginForm.password.focus();
        return false;
    } else{
        alert("Login Successful!!!")
        return true;
    }
}

function toggle(source) {
    let checkboxes = document.getElementsByName("cbox");

    for (let i = 0, val = checkboxes.length; i < val; i++) {
        checkboxes[i].checked = source.checked;
    }
}

document.querySelector("#patientName").textContent = window.location.search.match(/(?<=username\=)\w+/)[0];

submitRegForm = () => {
    const contactNum = document.regForm.contactNum.value.trim();
    const numPattern = /^(09|639)\d{9}$/;
    if(!numPattern.test(contactNum)) {
        alert("Please input correct Philippine Mobile Number Format: \n'639123456789' or '09123456789'");
        document.regForm.contactNum.focus();
        return false;
    }
    let confirmation =  confirm("All inputs will be saved. \nThis action will redirect you back to the login page. \n\nDo you want to submit?");
    alert("Patient Registration Form Submitted. \n\nGoing back to login page.");
    return confirmation;
}

const medsBtn = document.querySelectorAll("input[name='medications']");
medsBtn.forEach(btn => {
    btn.addEventListener("change", () => {
        console.log(btn.value);
        if(btn.value==="yes"){
            document.querySelector("#medsText").disabled = false;
            document.querySelector("#medsText").required = true;
        }
        else{
            document.querySelector("#medsText").value = "";
            document.querySelector("#medsText").disabled = true;
            document.querySelector("#medsText").required = false;
        }
    }
    )
});






