
validateForm = () => {
    let password = document.loginForm.password.value.trim();
    let username = document.loginForm.username.value.trim();

    if (username === "" && password == "") {
        alert("All fields required.");
        loginForm.username.focus();
        return false;
    } else if (username === "") {
        alert("Please provide username.")
        loginForm.username.focus();
        return false;
    } else if (password === "") {
        alert("Please provide password.")
        loginForm.password.focus();
        return false;
    } else if (username.length < 4) {
        alert("Username doesn't meet minimum characters. (4 characters)")
        loginForm.username.focus();
        return false;
    } else if (password.length < 8) {
        alert("Password doesn't meet minimum characters. (8 characters)")
        loginForm.password.focus();
        return false;
    }  else {
        alert("Login Successful!!!");
        return true;
    }
}


document.querySelector("#patientName").textContent = window.location.search.match(/(?<=username\=)\w+/)[0];

if (window.location.search.match(/(?<=username\=)\w+/)[0] === "admin123" && 
    window.location.search.match(/(?<=password\=)\w+/)[0] === "administrator0123") {
    document.querySelector("#patientRegForm").innerHTML = ``;
    document.querySelector("#patientRegForm").innerHTML = `
        <div class="text-white d-flex justify-content-between align-items-center">
            <h3 class="display-6 fs-2 fw-bold">Patient Tabular Data</h3>
            <a href="./index.html" type="button" class="btn btn-info text-white fs-4 d-flex justify-content-center">Log
            Out</a>
        </div>
        <div class="text-white display-6 fs-5 fw-bold mb-5">Welcome, Administrator.</div>
        <div class="table-responsive">
            <table id="patientDataTbl" class="table table-primary table-striped">
                <tr class="text-center align-middle">
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>Birthdate</th>
                    <th>Contact Number</th>
                    <th>Gender</th>
                    <th>Medical History</th>
                    <th>Current Symptoms</th>
                    <th>Medications</th>
                </tr>
            </table>
        <div>
    `;

    let patientDataArray = [];
    patientDataArray = JSON.parse(localStorage.getItem("patientData"));
    console.log(patientDataArray);
    let patientDataTable = document.querySelector("#patientRegForm table");

    patientDataArray.forEach((pData,i) => { 
        let listRows = patientDataTable.insertRow(i+1);
        listRows.classList.add("align-middle");
        let j = 0;
        for(let property in pData){
            let listCols = listRows.insertCell(j);
            listCols.innerHTML = pData[property];
            j++;
        } 
    });  
    alert("Welcome Admin!");
}
// const name = localStorage.getItem('name');

// if(name){
//     console.log('Name exists');
// }else{
//     console.log('Name is not found');
// }
let pDTable = localStorage.getItem('patientData') ? JSON.parse(localStorage.getItem("patientData")) : [];

submitRegForm = () => {
    const contactNum = document.regForm.contactNum.value.trim();
    const numPattern = /^(09|639)\d{9}$/;

    if (!numPattern.test(contactNum)) {
        alert("Please input correct Philippine Mobile Number Format: \n'639123456789' or '09123456789'");
        document.regForm.contactNum.focus();
        return false;
    }

    let confirmation = confirm("All inputs will be saved. \nThis action will redirect you back to the login page. \n\nDo you want to submit?");


    if (confirmation) {
        const genderChosen = document.querySelectorAll("input[name='gender']:checked");
        const genderName = [...genderChosen].map(chosen => chosen.value).join("");

        const medHistoryChosen = document.querySelectorAll("input[name='cbox']:checked");
        const medHistory = [...medHistoryChosen].map(checked => checked.value);

        const currSymptomsChosen = document.getElementById("currentSymptoms");
        const currSymptoms = [...currSymptomsChosen].filter(option => option.selected).map(option => option
            .value);

        // const takingMeds = document.querySelectorAll("input[name='meds']:checked");
        // const meds = [...takingMeds].map(choice => choice.value).join("");
        const medicationInput = document.querySelector("input[name='medications']").value;

        // if (meds === "yes") medicationInput = document.querySelector("input[name='medications']").value;

        

        let patientData = {
            id: Date.now(),
            firstName: document.regForm.firstName.value,
            middleName: document.regForm.middleName.value,
            lastName: document.regForm.lastName.value,
            address: document.regForm.address.value,
            birthDate: document.regForm.birthDate.value,
            contactNum: document.regForm.contactNum.value,
            gender: genderName,
            medicalHistory: medHistory,
            currentSymptoms: currSymptoms,
            medications: medicationInput,
        };

        pDTable.push(patientData);

        localStorage.setItem("patientData", JSON.stringify(pDTable));
        console.table(pDTable);

        alert("Patient Registration Form Submitted. \n\nGoing back to login page.");
    }

    return confirmation;
}

const medsBtn = document.querySelectorAll("input[name='meds']");
medsBtn.forEach(btn => {
    btn.addEventListener("change", () => {
        console.log(btn.value);
        if (btn.value === "yes") {
            document.querySelector("#medsText").disabled = false;
            document.querySelector("#medsText").required = true;
        }
        else {
            document.querySelector("#medsText").value = "No current medications.";
            document.querySelector("#medsText").disabled = true;
            document.querySelector("#medsText").required = false;
        }
    }
    )
});


