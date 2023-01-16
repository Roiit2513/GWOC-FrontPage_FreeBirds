
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if(entry.isIntersecting){
            entry.target.classList.add('op1');
        }
    });
});


const hiddenElements = document.querySelectorAll('.op0');
hiddenElements.forEach((e1) => observer.observe(e1));