function openTab(tabName) {
    let tabs = document.querySelectorAll(".tab-content");
   
    tabs.forEach(funtion(tab) {
        tabs.style.display = "none";
    });
    document.getElementById(tabName).style.display = "block";
}


