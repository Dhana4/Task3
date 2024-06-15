document.addEventListener('DOMContentLoaded', function () {

    const employee_array = JSON.parse(localStorage.getItem("employee_array")) || [];
    buildTable(employee_array);

    document.querySelectorAll('#alphabets-bt div').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const letter = this.textContent;
            filterRowsByLetter(letter,employee_array,btn);
        });
    });
    document.getElementById('apply-btn').addEventListener('click', function () {
        filterRows(employee_array);
    });
    $('select').selectpicker();
    document.getElementById('reset').addEventListener('click', function () {
        resetFilters(employee_array);
    });

    document.querySelectorAll('#status, #location, #department').forEach(function (select) {
        select.addEventListener('change', function () {
            const anyOptionSelected = Array.from(select.selectedOptions).some(function (option) {
                return option.value !== '';
            });
            if (anyOptionSelected) {
                document.getElementById('apply-btn').style.display = 'block';
                document.getElementById('reset').style.display = 'block';
            } else {
                document.getElementById('apply-btn').style.display = 'none';
                document.getElementById('reset').style.display = 'none';
            }
        });
    });
    const deleteButton = document.getElementById('delete-bt');
    const checkboxes = document.querySelectorAll('#employee_table input[type="checkbox"]');
    document.getElementById('select-all').addEventListener('change', function () {
        const userCheckBox=document.getElementById("select-all");
        const checkboxes = document.querySelectorAll('#employee_table input[type="checkbox"]');
        if(userCheckBox.checked)
        {
            checkboxes.forEach(function (checkbox) {
            checkbox.checked=true;
            });
            deleteButton.style.backgroundColor='red';
            deleteButton.style.color='white';
        }
        else
        {
            checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
            });
            deleteButton.style.backgroundColor = '';
            deleteButton.style.color = '';
        }
    });
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            updateSelectAllCheckbox();
            const anyChecked = Array.from(checkboxes).some(function (checkbox) {
                return checkbox.checked;
            });
            if (anyChecked) {
                deleteButton.style.backgroundColor='red';
                deleteButton.style.color='white';
            } else {
                deleteButton.style.backgroundColor = ''; 
                deleteButton.style.color = ''; 
            }
        });
    });
    document.getElementById('delete-bt').addEventListener('click', function () {
        const table = document.getElementById('employee_table');
        const rows = table.rows;
        let employeesToDelete = [];
        for (let i = 0; i < rows.length; i++) { 
            const checkbox = rows[i].cells[0].querySelector('input[type="checkbox"]');
            if (checkbox.checked) {
                const empNo = checkbox.getAttribute('data-empNo');
                const employeeToDelete = employee_array.find(employee => employee.empNo === empNo);
                if (employeeToDelete) {
                    employeesToDelete.push(employeeToDelete);
                }
            }
        }
        if (employeesToDelete.length > 0 && confirm("Are you sure to delete the selected employees?")) {
            employee_array = employee_array.filter(employee => !employeesToDelete.includes(employee));
            
            localStorage.setItem("employee_array", JSON.stringify(employee_array));
            if (filtersActive) {
                filterRows(employee_array); 
            } else {
                buildTable(employee_array);
            }
            const selectAllCheckbox = document.getElementById('select-all');
            selectAllCheckbox.checked = false;
            deleteButton.style.backgroundColor = '';
            deleteButton.style.color = '';
        }
        
    });

    document.getElementById('export-but').addEventListener('click', function(){
        if(filtersActive==true){
            const filteredEmployees = applyFilters(employee_array);
            exportToExcel(filteredEmployees);
        }
        else{
            exportToExcel(employee_array);
        }
    });

    let UserNamesortOrder = 'asc'; 
    document.querySelector('#sort-username-btn').addEventListener('click', function () {
        sortTableRowsByUserName(UserNamesortOrder,employee_array);
        UserNamesortOrder = (UserNamesortOrder === 'asc') ? 'desc' : 'asc';
    });
    let locationSortOrder = 'asc'; 
    document.getElementById('sort-location-btn').addEventListener('click', function () {
        sortTableRowsByLocation(locationSortOrder,employee_array);
        locationSortOrder = (locationSortOrder === 'asc') ? 'desc' : 'asc';
    });

    let departmentSortOrder = 'asc'; 
    document.getElementById('sort-department-btn').addEventListener('click', function () {
        sortTableRowsByDepartment(departmentSortOrder,employee_array);
        departmentSortOrder = (departmentSortOrder === 'asc') ? 'desc' : 'asc';
    });

    let roleSortOrder = 'asc'; 
    document.getElementById('sort-role-btn').addEventListener('click', function () {
        sortTableRowsByRole(roleSortOrder,employee_array);
        roleSortOrder = (roleSortOrder === 'asc') ? 'desc' : 'asc';
    });

    let empNoSortOrder = 'asc'; 
    document.getElementById('sort-empNo-btn').addEventListener('click', function () {
        sortTableRowsByEmpNo(empNoSortOrder,employee_array);
        empNoSortOrder = (empNoSortOrder === 'asc') ? 'desc' : 'asc';
    });

    let joiningDateSortOrder = 'asc';
    document.getElementById('sort-joiningdate-btn').addEventListener('click', function () {
        sortTableRowsByJoiningDate(joiningDateSortOrder,employee_array);
        joiningDateSortOrder = (joiningDateSortOrder === 'asc') ? 'desc' : 'asc';
    });


})

function buildTable(employee_array) {
    const table = document.getElementById("employee_table");
    table.innerHTML = ''; 
    employee_array.forEach(function (employee) {
        const row = table.insertRow();
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.setAttribute('data-empNo', employee.empNo);
        row.insertCell(0).appendChild(checkbox);
        const profileCell = row.insertCell(1);
        profileCell.style.display = 'flex'; 
        profileCell.style.alignItems = 'center'; 
        profileCell.innerHTML = `
            <div>
                <img src="${employee.profilePic}" alt="Profile Pic" style="width: 40px; height: auto;border-radius: 50%;">
            </div>
            <div style="margin-left: 10px;">
                <p style="padding:0;margin:0">${employee.name}</p>
                <p style="padding:0;margin:0">${employee.email}</p>
            </div>
        `;
        row.insertCell(2).innerHTML = employee.location;
        row.insertCell(3).innerHTML = employee.department;
        row.insertCell(4).innerHTML = employee.role;
        row.insertCell(5).innerHTML = employee.empNo;
        const button = document.createElement('button')
        button.innerHTML = "Active";
        button.classList.add("active");
        row.insertCell(6).appendChild(button);
        row.insertCell(7).innerHTML = employee.joiningDate;
        const img = document.createElement('img');
        img.src = '/Employee-images/dots.png'; 
        img.alt = 'employee options';
        img.classList.add('ellipsis-icon');  
        img.onclick = function (event) {
            showOptions(event, employee.empNo);
        };
        row.insertCell(8).appendChild(img);
    });
    updateSelectAllCheckbox();
    attachCheckboxEventListener();
}
let activeLetter=null;
let filtersActive = false;
function filterRowsByLetter(letter,employee_array,btn) {
    if (activeLetter === letter) {
        activeLetter = null;
        btn.classList.remove('active-letter');
        document.getElementById('alphabets-img').classList.remove('active-filter');
        const userCheckBox=document.getElementById("select-all");
        userCheckBox.checked = false;
        filterRows(employee_array);
    } else {
        activeLetter = letter;
        document.querySelectorAll('#alphabets-bt div').forEach(function (button) {
            button.classList.remove('active-letter');
        });
        btn.classList.add('active-letter');
        document.getElementById('alphabets-img').classList.add('active-filter');
        filterRows(employee_array);
    }
}

function filterRows(employee_array) {
    const filteredEmployees = applyFilters(employee_array);
    if (filteredEmployees.length === 0) {
        document.getElementById('employee_table').innerHTML = '<tr><td colspan="9">No employee found</td></tr>';
    }
    else{
        buildTable(filteredEmployees);
    }
}
function applyFilters(employee_array){
    const selectedStatusOptions = document.getElementById("status").selectedOptions;
    const selectedStatus = Array.from(selectedStatusOptions).map(option => option.value);

    const selectedLocationOptions = document.getElementById('location').selectedOptions;
    const selectedLocation = Array.from(selectedLocationOptions).map(option => option.value);

    const selectedDepartmentOptions = document.getElementById('department').selectedOptions;
    const selectedDepartment = Array.from(selectedDepartmentOptions).map(option => option.value);

    const letter = document.querySelector('#alphabets-bt .active-letter');
    const filteredEmployees = employee_array.filter(employee => {
        const name = employee.name.toUpperCase();
        const startsWithLetter = !letter || name.startsWith(letter.textContent);
        const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(employee.status);
        const matchesLocation = selectedLocation.length === 0 || selectedLocation.includes(employee.location);
        const matchesDepartment = selectedDepartment.length === 0 || selectedDepartment.includes(employee.department);
        return startsWithLetter && matchesStatus && matchesLocation && matchesDepartment;
    });
    filtersActive = letter !== null || 
                selectedStatus.length > 0 || 
                selectedLocation.length > 0 || 
                selectedDepartment.length > 0; 
    
    return filteredEmployees;

}

function resetFilters(employee_array) {
    const multiSelects = document.querySelectorAll('.selectpicker'); 
    multiSelects.forEach(select => {
        //select.selectedIndex = -1; 
        //select.dispatchEvent(new Event('change'));
       $(select).val([]); 
       $(select).selectpicker('refresh');
    });
    const userCheckBox=document.getElementById("select-all");
    userCheckBox.checked = false;
    filterRows(employee_array);
}
let exportInProgress = false;
function exportToExcel(employee_array) {
    if (exportInProgress) {
        return;
    }
    exportInProgress = true;
    let visibleRows = [];
    const headings = 'Name,Date of birth,Email,Mobile,Location,Department,Role,Emp No,Status,Joining Date,Manager,Project';

    visibleRows.push(headings);

    employee_array.forEach(function(employee) {
        const rowData = [
            employee.name,
            employee.DOB,
            employee.email,
            employee.mobile,
            employee.location,
            employee.department,
            employee.role,
            employee.empNo,
            employee.status,
            employee.joiningDate,
            employee.manager,
            employee.project
        ];
        visibleRows.push(rowData.join(','));
    });
    const data = visibleRows.join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(data));
    link.setAttribute('download', 'employee_data.csv');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    exportInProgress = false;
}
function showOptions(event,empNo) {
        const targetRow = event.target.closest('tr');
        const employeeArray = JSON.parse(localStorage.getItem('employee_array'));
        const employee = employeeArray.find(entry => entry.empNo === empNo);
        const dropdownMenu = document.createElement('div');
        dropdownMenu.classList.add('dropdown-menu');
        dropdownMenu.innerHTML = `
            <ul>
                <li><a href="#" class="view-details">View Details</a></li>
                <li><a href="#" class="edit">Edit</a></li>
                <li><a href="#" class="delete">Delete</a></li>
            </ul>
        `;
        targetRow.appendChild(dropdownMenu);
        dropdownMenu.classList.add('show');

        const boundingRect = event.target.getBoundingClientRect();
        dropdownMenu.style.top = boundingRect.bottom + 'px';
        dropdownMenu.style.left = boundingRect.right + 'px';

        document.addEventListener('click', function (event) {
            if (!event.target.matches('.ellipsis-icon')) {
                dropdownMenu.classList.remove('show');
            }
        });

        dropdownMenu.querySelector('.view-details').addEventListener('click', function (event) {
            const name = employee.name;
            const email = employee.email;
            const dob=employee.DOB;
            const location = employee.location;
            const department = employee.department;
            const role = employee.role;
            const empNo = employee.empNo;
            const joiningDate = employee.joiningDate;
            const mobile=employee.mobile;
            const status=employee.status;
            const manager=employee.manager;
            const project=employee.project;

            const detailsText = `
            <html>
            <head>
                <title>Employee Details</title>
            </head>
            <body>
                <h1>Employee Details</h1>
                <p>Employee Number: ${empNo}</p>
                <p>Name: ${name}</p>
                <p>Date of Birth: ${dob}</p>
                <p>Email: ${email}</p>
                <p>Location: ${location}</p>
                <p>Department: ${department}</p>
                <p>Role: ${role}</p>
                <p>Joining Date: ${joiningDate}</p>
                <p> Status: ${status}</p>
                <p>Mobile: ${mobile}</p>
                <p>Manager: ${manager}</p>
                <p>Project: ${project}</P>
            </body>
            </html>
            `;
            const newWindow = window.open();
            newWindow.document.write(detailsText);
            event.preventDefault();
        });
        

        dropdownMenu.querySelector('.edit').addEventListener('click', function (event) {
            const rowData = [
                employee.name,
                employee.email,
                employee.location,
                employee.department,
                employee.role,
                employee.empNo,
                employee.status,
                employee.joiningDate,
                employee.mobile,
                employee.profilePic,
                employee.DOB,
                employee.manager,
                employee.project
            ];
            localStorage.setItem('selectedEmployeeDetails', JSON.stringify(rowData)); 
            window.location.href = "addEmployee.html"; 
            event.preventDefault();
        });

        dropdownMenu.querySelector('.delete').addEventListener('click', function (event) {
            employeeArray=employeeArray.filter(employee => employee.empNo!==empNo)
            localStorage.setItem('employee_array', JSON.stringify(employeeArray));
            targetRow.remove();
            event.preventDefault();
        });
}


function updateSelectAllCheckbox() {
    const selectAllCheckbox = document.getElementById('select-all');
    const checkboxes = document.querySelectorAll('#employee_table input[type="checkbox"]');
    
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            if (!this.checked) {
                selectAllCheckbox.checked = false;
            } else {
                let allChecked = true;
                checkboxes.forEach(function (cb) {
                    if (!cb.checked) {
                        allChecked = false;
                    }
                });
                selectAllCheckbox.checked = allChecked;
            }
        });
    });
}

function sortTableRowsByUserName(order,employee_array) {
    const sortedArray = employee_array.slice();
    sortedArray.sort(function (a, b) {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (order === 'asc') {
            return nameA.localeCompare(nameB);
        } else {
            return nameB.localeCompare(nameA);
        }
    });
    filterRows(sortedArray);
}

function sortTableRowsByLocation(order,employee_array) {
    const sortedArray = employee_array.slice();
    sortedArray.sort(function (a, b) {
        const locationA = a.location.toLowerCase();
        const locationB = b.location.toLowerCase();
        if (order === 'asc') {
            return locationA.localeCompare(locationB);
        } else {
            return locationB.localeCompare(locationA);
        }
    });
    filterRows(sortedArray);
}

function sortTableRowsByDepartment(order,employee_array) {
    const sortedArray = employee_array.slice();
    sortedArray.sort(function (a, b) {
        const deptA = a.department.toLowerCase();
        const deptB = b.department.toLowerCase();
        if (order === 'asc') {
            return deptA.localeCompare(deptB);
        } else {
            return deptB.localeCompare(deptA);
        }
    });
    filterRows(sortedArray);
}

function sortTableRowsByRole(order,employee_array) {
    const sortedArray = employee_array.slice();
    sortedArray.sort(function (a, b) {
        const roleA = a.role.toLowerCase();
        const roleB = b.role.toLowerCase();
        if (order === 'asc') {
            return roleA.localeCompare(roleB);
        } else {
            return roleB.localeCompare(roleA);
        }
    });
    filterRows(sortedArray);
}

function sortTableRowsByEmpNo(order,employee_array) {
    const sortedArray = employee_array.slice();
    sortedArray.sort(function (a, b) {
        const empNoA = a.empNo.toLowerCase();
        const empNoB = b.empNo.toLowerCase();
        if (order === 'asc') {
            return empNoA.localeCompare(empNoB);
        } else {
            return empNoB.localeCompare(empNoA);
        }
    });
    filterRows(sortedArray);
}

function sortTableRowsByJoiningDate(order,employee_array) {
    const sortedArray = employee_array.slice();
    sortedArray.sort(function (a, b) {
        const dateA = new Date(a.joiningDate);
        const dateB = new Date(b.joiningDate);
        if (order === 'asc') {
            return dateA-dateB;
        } else {
            return dateB-dateA;
        }
    });
    filterRows(sortedArray);
}

function attachCheckboxEventListener() {
    const deleteButton = document.getElementById('delete-bt');
    const checkboxes = document.querySelectorAll('#employee_table input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            const anyChecked = Array.from(checkboxes).some(function (checkbox) {
                return checkbox.checked;
            });
            if (anyChecked) {
                deleteButton.style.backgroundColor = 'red';
                deleteButton.style.color = 'white';
            } else {
                deleteButton.style.backgroundColor = ''; 
                deleteButton.style.color = ''; 
            }
        });
    });
}



