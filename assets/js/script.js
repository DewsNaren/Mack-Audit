const header=document.querySelector("header");
const menuBtn=document.querySelector(".menu-btn");
const main=document.querySelector("main");
let menuOpen = true;

function getLeftMargin() {
    let vw = document.documentElement.clientWidth;
    // return vw <= 1024 ? 178 :
    // vw <= 1400 ? 236 :
    // vw <= 1600 ? 278 : 333;
    return 333;
}

function applyLayout() {
    const leftMargin = getLeftMargin();
    main.style.marginLeft = menuOpen ? `${leftMargin}px` : "0";
    header.style.left = menuOpen ? "0" : "-100%";
}

menuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    applyLayout();
});

window.addEventListener('resize', applyLayout);

applyLayout();


const dateInputs = document.querySelectorAll(".audit-form-container input[type='date']");

dateInputs.forEach(dateInput => {
    dateInput.addEventListener("change", function() {
        const val = this.value;
        if (!val) return;

        const [y, m, d] = val.split("-");
        this.nextElementSibling.textContent = `${d}/${m}/${y}`;
    });
});


const browseBtn=document.querySelector(".audit-form-container .input-group .browse-btn");

browseBtn.addEventListener("click",()=>{
    const forVal=browseBtn.getAttribute("for");

    console.log(forVal)
})

const submitFormBtn=document.querySelector(".audit-form-outer-wrapper .audit-form-btn-container .submit-btn")
const cancelFormBtn=document.querySelector(".audit-form-outer-wrapper .audit-form-btn-container .cancel-btn")

const auditForm=document.querySelector(".audit-form-wrapper .audit-form")
const auditInputs=auditForm.querySelectorAll("input,select")

auditInputs.forEach(inp=>{
    console.log(inp)
})

function validateAuditForm(){
      let isValid = true;

  auditInputs.forEach((input) => {
    const value = input.value.trim();
    const inputWrapper = input.closest(".input-wrapper");
    if (!inputWrapper || input.type === "hidden") {
      return;
    }

    const errorElement = inputWrapper.querySelector(".error");
    // if (input.closest(".input-group").querySelector(".star")) {
      if (value === "") {
        isValid = false;
        // errorElement.innerText = 'This field is required';
        inputWrapper.classList.add("error");
      } else {
        // errorElement.innerText = 'no error';
        inputWrapper.classList.remove("error");
      }
    // }
  });

  return isValid;
}
submitFormBtn.addEventListener('click',(e)=>{
     e.preventDefault();
    if (validateAuditForm()) {
        const auditData  = getAuditData();
        console.log(auditData)
    }
})

function getAuditData() {
  const auditFormData = {};
  auditInputs.forEach((input) => {
    if (input.value.trim() !== "") {
      auditFormData[input.name] = input.value.trim();
    }
  });
  return auditFormData;
}