let IsSideBarOpen = true;
document.addEventListener('DOMContentLoaded',function(){
    const searchImgs = document.querySelectorAll('.search-imgs');
    searchImgs.forEach((image) => {
        return image.addEventListener('click',handleClick);
    })
})
function openSidebar(){
    const logo = document.getElementById("tezo-logo");
     const handle_icon = document.getElementById("tezo-side");
     handle_icon.style.margin = "100% 0 0 55%";
    logo.style.width="60%";
    logo.style.height="90%";
    logo.style.padding="11% 0 0 11%";
    logo.src = '/Employee-images/TezoLogo.png';
    const left_long_part= document.getElementById("left-long-part");
     const left_hidden_part=document.getElementById("left-hidden-part");
   
     left_long_part.style.display="block";
     left_hidden_part.style.display="none";
    const left_content=document.getElementById("left-content");
    const right_content=document.getElementById("right-content");
    left_content.style.width="20%";
    right_content.style.width="76%";
    rotateImage();           
}
let rotateImage = () => {
    const handle_icon = document.getElementById("tezo-side");
    if(IsSideBarOpen)
        handle_icon.style.rotate = '180deg';
    else
        handle_icon.style.rotate = '0deg';
}
function closeSidebar(){
     const logo = document.getElementById("tezo-logo");
     const handle_icon = document.getElementById("tezo-side");
     handle_icon.style.margin = "70% 0 0 10%";
     const left_long_part= document.getElementById("left-long-part");
     const left_hidden_part=document.getElementById("left-hidden-part");
     logo.src = '/Employee-images/tezo_icon.jpg';
     logo.style.width="4rem";
     logo.style.height="4rem";
     left_long_part.style.display="none";
     left_hidden_part.style.display="block";
    const left_content=document.getElementById("left-content");
    const right_content=document.getElementById("right-content");
    left_content.style.width="5%";
    right_content.style.width="91%";
    rotateImage();
};
const SideBar = ( ) => {
    if(IsSideBarOpen == false){
        openSidebar()
    }else{
        closeSidebar()
    }
    IsSideBarOpen = !IsSideBarOpen;
}
let statusTopbar = false;
function collapseDropdownTopbar() {
    const topbar_icon=document.getElementById("collapse-up-button");
    const topbar_menu = document.getElementById("topbar");
    if (statusTopbar == false) {
        topbar_menu.style.display = "block";
        topbar_icon.style.transform = "rotate(90deg)";
        statusTopbar = !statusTopbar;
    }
    else {
        topbar_icon.style.transform = "rotate(-90deg)";
        topbar_menu.style.display = "none";
        statusTopbar = !statusTopbar;
    }
}
function handleClick(event) {
    const image = event.target;
    image.classList.add('clicked');
    setTimeout(function() {
        image.classList.remove('clicked');
    }, 200);
}
