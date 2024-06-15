let updateEmployee=false;
let isActive=true;
function initializeEmployees() {
    const storedEmployees = localStorage.getItem('employee_array');
    if (storedEmployees) {
        return JSON.parse(storedEmployees);
    } else {
        return [];
    }
}
let employee_array = initializeEmployees();
function saveEmployees() {
    localStorage.setItem('employee_array', JSON.stringify(employee_array));
}
document.addEventListener('DOMContentLoaded', function () {
    const editEmployeeData = JSON.parse(localStorage.getItem('selectedEmployeeDetails'));
    if (editEmployeeData) {
        updateEmployee=true;
        document.getElementById("firstName").value = editEmployeeData[0].split(" ")[0];
        document.getElementById("lastName").value = editEmployeeData[0].split(" ")[1];
        document.getElementById("email").value = editEmployeeData[1];
        document.getElementById("locationOfEmployee").value = editEmployeeData[2];
        document.getElementById("departmentOfEmployee").value = editEmployeeData[3];
        document.getElementById("jobTitle").value = editEmployeeData[4];
        document.getElementById("empNo").value = editEmployeeData[5];
        document.getElementById("joiningDate").value = editEmployeeData[7];
        document.getElementById("mobile").value = editEmployeeData[8];
        document.querySelector(".profile-edit-img").src=editEmployeeData[9];
        document.getElementById("dob").value=editEmployeeData[10];
        document.getElementById("assignManagerInput").value=editEmployeeData[11];
        document.getElementById("assignProjectInput").value=editEmployeeData[12];
        localStorage.removeItem('selectedEmployeeDetails'); 
    }
    const form = document.getElementById("add-employee-form");
    const submitButton = form.querySelector('button[type="submit"]');
    if (updateEmployee === true) {
        submitButton.innerText = "Update";
    }
    form.addEventListener("submit",addEmployee);

    const cancelButton=document.getElementById("cancel-button");
    cancelButton.addEventListener("click",cancelAction)

    document.getElementById("firstName").addEventListener('input', clearErrorMessage);
    document.getElementById("lastName").addEventListener('input', clearErrorMessage);
    document.getElementById("email").addEventListener('input', clearErrorMessage);
    document.getElementById("jobTitle").addEventListener('input', clearErrorMessage);
    document.getElementById("empNo").addEventListener('input', clearErrorMessage);
    document.getElementById("joiningDate").addEventListener('input', clearErrorMessage);
    document.getElementById("mobile").addEventListener('input', clearErrorMessage);

    document.getElementById("upload-button").addEventListener("click", function() {
        document.getElementById("profile-picture-input").click();
    });  
    document.getElementById("profile-picture-input").addEventListener("change", function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = function() {
            console.log("FileReader onload function executed");
            const img = document.querySelector('.profile-edit-img');
            console.log("Image element:", img);
            img.src = reader.result;
            console.log("Image source updated:", img.src);
        }
        if (file) {
            reader.readAsDataURL(file);
        }
    });
})
function displayErrorMessage(inputElement, message) {
    const parentDiv = inputElement.parentElement;
    let errorMessage = parentDiv.querySelector('.error-message');
    if(!errorMessage){
        errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        parentDiv.appendChild(errorMessage);
    }
    errorMessage.textContent = message;
}
function clearErrorMessage(event) {
    const inputElement = event.target;
    const parentDiv = inputElement.parentElement;
    const errorMessage = parentDiv.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}
function addEmployee(event) {
    event.preventDefault();
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const emailInput = document.getElementById("email");
    const joiningDateInput = document.getElementById("joiningDate");
    const empNoInput = document.getElementById("empNo");
    const mobileInput = document.getElementById("mobile");

    const profilePic=document.querySelector('.profile-edit-img').src;
    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const DOB=document.getElementById('dob').value;
    const email = emailInput.value;
    const location = document.getElementById("locationOfEmployee").value;
    const department = document.getElementById("departmentOfEmployee").value;
    const jobTitle = document.getElementById("jobTitle").value;
    const empNo = empNoInput.value;
    const joiningDate = joiningDateInput.value;
    const mobile=mobileInput.value;
    const manager=document.getElementById('assignManagerInput').value;
    const project=document.getElementById('assignProjectInput').value;
    const fullName = firstName + " " + lastName;
    const EmployeeEntry = {
        profilePic:profilePic,
        name: fullName,
        DOB:DOB,
        email: email,
        location: location,
        department: department,
        role: jobTitle,
        empNo: empNo,
        status: isActive?"Active":"InActive",
        mobile:mobile,
        joiningDate: joiningDate,
        manager:manager,
        project:project
    }
    const namePattern = /^[A-Z]+$/i;
    const empNoPattern = /^[A-Z0-9]+$/i;
    const emailPattern =/^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    const mobilePattern=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    let isError=false;
    if (!empNo.trim()) {
        displayErrorMessage(empNoInput, 'Employee ID is required');
        isError=true;
    }
    if (!firstName.trim()) {
        displayErrorMessage(firstNameInput, 'First name is required');
        isError=true;
    }
    if (!lastName) {
        displayErrorMessage(lastNameInput, 'Last name is required');
        isError = true;
    }
    if (!email) {
        displayErrorMessage(emailInput, 'Email is required');
        isError = true;
    }
    if (!joiningDate) {
        displayErrorMessage(joiningDateInput, 'Joining date is required');
        isError = true;
    }
    if (empNo.trim() && !empNo.match(empNoPattern)) {
        displayErrorMessage(empNoInput, 'Employee ID should contain only alphanumeric characters');
        isError = true;
    }
    if (firstName.trim() && !firstName.match(namePattern)) {
        displayErrorMessage(firstNameInput, 'First name should contain only alphabets');
        isError = true;
    }

    if (lastName.trim() && !lastName.match(namePattern)) {
        displayErrorMessage(lastNameInput, 'Last name should contain only alphabets');
        isError = true;
    }

    if (email.trim() && !email.match(emailPattern)) {
        displayErrorMessage(emailInput, 'Invalid email format');
        isError = true;
    }
    if (mobile.trim() && !mobile.match(mobilePattern)) {
        displayErrorMessage(mobileInput, 'Invalid mobile number');
        isError = true;
    }
    if(isError===false){
        if(updateEmployee===true){
            for (let i = 0; i < employee_array.length; i++) {
                if (employee_array[i].email === EmployeeEntry.email) {
                    console.log("email matched")
                    employee_array.splice(i,1);
                    break;
                }
            };
            var updateMessage = document.getElementById("update-message");
            updateMessage.style.display = "block";
        }
        else
        {
            var successMessage = document.getElementById("success-message");
            successMessage.style.display = "block";
        }
        employee_array.push(EmployeeEntry);
        saveEmployees(); 
        setTimeout(function() {
            if(updateEmployee===true){
                updateMessage.style.display = "none";
            }
            else{
                successMessage.style.display = "none";
            }
            window.location.reload(); 
            window.location.href = "Employees.html";
        }, 1500); 
    }
}
function cancelAction(event)
{
    event.preventDefault();
    window.location.href = "Employees.html";
}
function filterOptions(inputId, optionsId) {
    let input, filter, ul, li, i;
        input = document.getElementById(inputId);
        filter = input.value.trim().toUpperCase();
        ul = document.getElementById(optionsId);
        li = ul.getElementsByTagName('li');
        if (filter.length === 0) {
            for (i = 0; i < li.length; i++) {
                li[i].classList.add('hidden');
            }
            return;
        }
        for (i = 0; i < li.length; i++) {
            if (li[i].getAttribute('data-value').toUpperCase().indexOf(filter) === 0) {
                li[i].classList.remove('hidden');
                li[i].addEventListener('click', function() {
                    input.value = this.getAttribute('data-value');
                    for (var j = 0; j < li.length; j++) {
                        li[j].classList.add('hidden');
                    }
                });
            } else {
                li[i].classList.add('hidden');
            }
        }
}