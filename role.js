document.addEventListener('DOMContentLoaded', function () {
    const roles_array=JSON.parse(localStorage.getItem('roles_array'))||[];
    buildRole(roles_array);
});

function buildRole(roles_array){
    const parent_container=document.querySelector('.allRoles');
    parent_container.classList.add("allRoles");
    roles_array.forEach(function(role){
        const roleBoxDiv=document.createElement('div');
        roleBoxDiv.classList.add('roleBox');
        const roleNameEditImgSection=document.createElement('section');
        roleNameEditImgSection.classList.add('roleNameEditImg');
        const roleNameHeadDiv=document.createElement('div');
        roleNameHeadDiv.classList.add('roleNameHead');
        roleNameHeadDiv.textContent=role.roleName;
        roleNameEditImgSection.appendChild(roleNameHeadDiv);
        const editImagediv=document.createElement("div");
        editImagediv.classList.add('edit-img');
        const editImage=document.createElement('img');
        editImage.src='/Employee-images/Vertical Navbar/edit.svg';
        editImage.style.width="100%";
        editImage.style.height="100%";
        editImage.onclick = function (event) {
            editRole(event, role.id,roles_array);
        };
        editImagediv.appendChild(editImage);
        roleNameEditImgSection.appendChild(editImagediv);
        roleBoxDiv.appendChild(roleNameEditImgSection);

        const departmentSection = document.createElement('section');
        departmentSection.classList.add('roleDepartment');
        const departmentImgDiv = document.createElement('div');
        departmentImgDiv.style.width = '10%';
        const departmentImg = document.createElement('img');
        departmentImg.src = '/Employee-images/team_svgrepo.com.svg';
        departmentImg.style.width = '70%';
        departmentImg.style.height = '70%';
        departmentImgDiv.appendChild(departmentImg);
        const departmentTextDiv = document.createElement('div');
        departmentTextDiv.classList.add('department-text');
        departmentTextDiv.textContent = 'Department';
        const departmentNameDiv = document.createElement('div');
        departmentNameDiv.classList.add('departmentNameText');
        departmentNameDiv.textContent = role.department;
        departmentSection.appendChild(departmentImgDiv);
        departmentSection.appendChild(departmentTextDiv);
        departmentSection.appendChild(departmentNameDiv);
        roleBoxDiv.appendChild(departmentSection);

        const locationSection=document.createElement('section');
        locationSection.classList.add("roleLocation");
        const locationImgDiv=document.createElement('div');
        locationImgDiv.style.width="10%";
        const locationImg=document.createElement('img');
        locationImg.src='/Employee-images/location-pin-alt-1_svgrepo.com.svg';
        locationImg.style.width='70%';
        locationImg.style.height='70%';
        locationImgDiv.appendChild(locationImg);
        const locationTextDiv=document.createElement('div');
        locationTextDiv.classList.add('location-text');
        locationTextDiv.textContent='location';
        const locationNameDiv=document.createElement('div');
        locationNameDiv.classList.add('locationNameText');
        locationNameDiv.textContent=role.location;
        locationSection.appendChild(locationImgDiv);
        locationSection.appendChild(locationTextDiv);
        locationSection.appendChild(locationNameDiv);
        roleBoxDiv.appendChild(locationSection);

        const totalEmpSection=document.createElement('section');
        totalEmpSection.classList.add('total-emp');
        const totalEmpMat=document.createElement('div');
        totalEmpMat.classList.add('total-emp-mat');
        totalEmpMat.textContent='Total Employees';
        const totalEmpImgDiv=document.createElement('div');
        totalEmpImgDiv.classList.add('total-emp-img');
        const imageContainerDiv=document.createElement('div');
        imageContainerDiv.classList.add("image-container");
        const image1=document.createElement('img');
        const image2=document.createElement('img');
        const image3=document.createElement('img');
        const image4=document.createElement('img');
        image1.src="/Employee-images/admin.jpg";
        image2.src="/Employee-images/admin.jpg";
        image3.src="/Employee-images/admin.jpg";
        image4.src="/Employee-images/admin.jpg";
        imageContainerDiv.appendChild(image1);
        imageContainerDiv.appendChild(image2);
        imageContainerDiv.appendChild(image3);
        imageContainerDiv.appendChild(image4);
        const plusEmp=document.createElement('div');
        plusEmp.textContent="+45";
        plusEmp.classList.add('plus-text');
        imageContainerDiv.appendChild(plusEmp);
         totalEmpImgDiv.appendChild(imageContainerDiv);
        totalEmpSection.appendChild(totalEmpMat);
        totalEmpSection.appendChild(totalEmpImgDiv);
        roleBoxDiv.appendChild(totalEmpSection);

        const viewAllEmpSection=document.createElement('section');
        viewAllEmpSection.classList.add('view-all-emp');
        const viewAllEmpMat=document.createElement('span');
        viewAllEmpMat.classList.add('view-all-emp-mat');
        viewAllEmpMat.textContent='view all employees';
        const viewAllEmpImg=document.createElement('img');
        viewAllEmpImg.src='/Employee-images/Vector.svg';
        viewAllEmpImg.style.width="6%";
        viewAllEmpImg.style.height="6%";
        viewAllEmpSection.appendChild(viewAllEmpMat);
        viewAllEmpSection.appendChild(viewAllEmpImg);
        roleBoxDiv.appendChild(viewAllEmpSection);

        parent_container.appendChild(roleBoxDiv);

    });
}
function editRole(event,roleId,roles_array){
    event.preventDefault();
    const roleToBeEdited = roles_array.find(entry => entry.id === roleId);
    const selectedRow=[
        roleToBeEdited.id,
        roleToBeEdited.roleName,
        roleToBeEdited.department,
        roleToBeEdited.location
    ];
    localStorage.setItem('selectedRole',JSON.stringify(selectedRow));
    window.location.href="newRole.html";
}