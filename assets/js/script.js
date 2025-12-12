const header=document.querySelector("header");
const menuBar=document.querySelector(".menubar")
const menuBtn=menuBar.querySelector(".menu-btn");
const main=document.querySelector("main");
const mainLogo= menuBar.querySelector(".logo");
const bottomLogo=header.querySelector(".header-bottom-img-container img");


let menuOpen = true;
function applyLayout() {
  if(menuOpen){
    header.classList.remove("collapsed");
    bottomLogo.src="./assets/images/svm-logo-dark.webp"
  }
  else{
    header.classList.add("collapsed");
    setTimeout(()=>{
      bottomLogo.src="./assets/images/mack-logo.png"
    },500)

  }
}

menuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  applyLayout();
   setTimeout(updateNavScroll, 600);
});

function updateNavScroll() {
    const nav = document.querySelector("header nav");

    if (nav.scrollHeight > nav.clientHeight) {
        nav.classList.add("with-scrollbar");
        nav.classList.remove("no-scrollbar");
    } else {
        nav.classList.remove("with-scrollbar");
        nav.classList.add("no-scrollbar");
    }
}
window.addEventListener("resize", updateNavScroll);
window.addEventListener('resize', applyLayout);

applyLayout();
updateNavScroll();


//Form Page Validation

const auditForm=document.querySelector(".audit-form-wrapper .audit-form")

const selectInputs=auditForm.querySelectorAll(".custom-select");
selectInputs.forEach(select=>{
  const selectedItem=select.querySelector(".selected-item")
  const options=select.querySelectorAll("li");
  const realInput = select.querySelector(".real-value");
  select.addEventListener('click',()=>{
    select.classList.toggle("active");
    selectedItem.querySelector("img").classList.toggle("active");
    options.forEach(option=>{
      option.addEventListener("click",()=>{
        options.forEach(opt=>{
          opt.classList.remove("active");
        })
        option.classList.add("active");
        const selectVal=option.getAttribute("data-value");
        selectedItem.childNodes[0].textContent=selectVal;
        realInput.value=selectVal;
        const inputWrapper=realInput.closest(".input-wrapper")
        if(realInput.value==""){
          inputWrapper.classList.add("error");
        }
        else{
           inputWrapper.classList.remove("error");
        }
      })
    })
  })
   
})
document.addEventListener("click", (e) => {
  selectInputs.forEach(select=>{
    if (!select.contains(e.target)) {
    select.classList.remove("active");
    const selectedItem=select.querySelector(".selected-item")
    selectedItem.querySelector("img").classList.remove("active");
    }
  })
});


//Date Picker
const dateInputs = document.querySelectorAll(".audit-form-container input[type='date']");

dateInputs.forEach(dateInput => {
  dateInput.addEventListener("change", function() {
    const val = this.value;
    if (!val) return;

    const [y, m, d] = val.split("-");
    this.nextElementSibling.textContent = `${d}/${m}/${y}`;
  });
});

const dateTexts=auditForm.querySelectorAll(".date-text");

const calendarDays = document.querySelectorAll(".custom-date-day");

calendarDays.forEach(dayBtn => {
  dayBtn.addEventListener("click", () => {
    
    let day = Number(dayBtn.dataset.day);
    let month = Number(dayBtn.dataset.month);
    let year = Number(dayBtn.dataset.year);

    let selectedDate = new Date(year, month - 1, day);

  });
});

function padZero(num){
  if(num > 9){
    return num;
  }
  else{
    return "0"+num;
  }
}
let flag=0;
let selectedMonth;
let selectedDatee;
let selectedYear;
 const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
function createDatepicker(datePicker) {

  const monthNameEl = datePicker.querySelector(".month-name");
  const datesContainer = datePicker.querySelector(".dates");
  const prevBtn = datePicker.querySelector(".prev-month");
  const nextBtn = datePicker.querySelector(".next-month");
  const tags = datePicker.querySelectorAll(".tag");

  let today = new Date();

  let current = new Date(today);

  let selectedDate = null;

 

  function renderCalendar() {
    const year = current.getFullYear();
    const month = current.getMonth();

    monthNameEl.textContent = `${MONTHS[month]} ${year}`;
    datesContainer.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevLastDate = new Date(year, month, 0).getDate();

    let days = [];

    for (let i = firstDay; i > 0; i--) {
      days.push({
        day: prevLastDate - i + 1,
        faded: true,
        date: new Date(year, month - 1, prevLastDate - i + 1)
      });
    }

    for (let i = 1; i <= lastDate; i++) {
      days.push({
        day: i,
        faded: false,
        date: new Date(year, month, i)
      });
    }

    const nextDays = 42 - days.length;
    for (let i = 1; i <= nextDays; i++) {
      days.push({
        day: i,
        faded: true,
        date: new Date(year, month + 1, i)
      });
    }

    days.forEach((d, index) => {
      const btn = document.createElement("button");
      btn.classList.add("date");
      btn.type = "button";
      btn.textContent = d.day;
      
      if (d.faded) btn.classList.add("faded");
       if (d.date.toDateString() === today.toDateString() &&
        !btn.classList.contains("current-date") 
      ) {
       
        if(!btn.classList.contains("faded")){
           btn.classList.remove("current-day")
          btn.classList.add("current-date");

        }
        
      }
      if (d.date.toDateString() === today.toDateString() && selectedDate === null) {
        if(!btn.classList.contains("faded")){
          btn.classList.add("current-day");
        }
        
      }


      if (selectedDate && d.date.toDateString() === selectedDate.toDateString()) {
        if(!btn.classList.contains("faded")){
          btn.classList.add("current-day"); 
        }
      }
     
      btn.addEventListener("click", () => {
        const allButtons = datesContainer.querySelectorAll(".date");
        selectedDate = d.date;

        if (flag === 0) {
          allButtons.forEach(b => b.classList.remove("current-date"));

          allButtons.forEach((b, i) => {
            if (b.classList.contains("current-day")) {
              const btnDate = days[i].date;
              if (
                btnDate.getMonth() === current.getMonth() &&
                btnDate.getFullYear() === current.getFullYear()
              ) {
                b.classList.remove("current-day");
                b.classList.add("current-date");
              }
            }
          });

          flag = 1; 
        }

        allButtons.forEach(b => b.classList.remove("current-day"));
        btn.classList.add("current-day");

      
        datePicker.dataset.value = selectedDate.toISOString().split("T")[0];
        getSelectedDate(datePicker)
        validDateInput(datePicker)
      });

      datesContainer.appendChild(btn);
    });

  }

    prevBtn.addEventListener("click", () => {
      current.setMonth(current.getMonth() - 1);
      renderCalendar();
    });

    nextBtn.addEventListener("click", () => {
      current.setMonth(current.getMonth() + 1);
      renderCalendar();
    });

    tags.forEach(tag => {
      tag.addEventListener("click", () => {
        let type = tag.dataset.type;

        if (type === "today") selectedDate = new Date();
        if (type === "yesterday") selectedDate = new Date(Date.now() - 86400000);
        if (type === "tomorrow") selectedDate = new Date(Date.now() + 86400000);

          current = new Date(selectedDate);
          renderCalendar();
      });
    });
  renderCalendar();
}

const datepickers=auditForm.querySelectorAll(".datepicker");

datepickers.forEach(datePicker=>{
  createDatepicker(datePicker)
})

function getSelectedDate(datePicker){
   const monthNameEl=datePicker.querySelector(".month-name")
  const MonthArr=monthNameEl.textContent.split(" ")
    selectedMonth=Number(MONTHS.findIndex(m => m === MonthArr[0]))+1
    selectedMonth=padZero(selectedMonth)
      const dates=datePicker.querySelectorAll(".dates .date");
      dates.forEach(d=>{
      if(d.classList.contains("current-day")){
        selectedDatee=padZero(Number(d.textContent))
      }
    })
    selectedYear=Number(MonthArr[1])

    const parentEl=datePicker.parentElement;
    const dateInp=parentEl.querySelector(".date-input");
    dateInp.value=`${selectedDatee}/${selectedMonth}/${selectedYear}`;
    const dateText=parentEl.querySelector(".date-text");
    dateText.childNodes[0].textContent=`${selectedDatee}/${selectedMonth}/${selectedYear}`;
}

function  validDateInput(datePicker){
  const parentEl=datePicker.parentElement;
  const dateInp=parentEl.querySelector(".date-input");
  const inputWrapper = dateInp.parentElement;
  const errorElement = inputWrapper.querySelector(".error");
  if(dateInp.value==""){
    inputWrapper.classList.add("error");
  } else {
    inputWrapper.classList.remove("error");
  }
}


dateTexts.forEach(dateText => {
  dateText.addEventListener("click", () => {
    const parentContainer = dateText.parentElement;
    const datePicker = parentContainer.querySelector(".datepicker");

    datePicker.classList.toggle("active");

    datePicker._trigger = dateText;
  });
});

document.addEventListener("click", (e) => {
  document.querySelectorAll(".datepicker.active").forEach(dp => {
    const trigger = dp._trigger;

    if (!trigger.contains(e.target) && !dp.contains(e.target)) {
      dp.classList.remove("active");
    }
  });
});


//File Input Function

const fileWrapper=auditForm.querySelector(".file-wrapper")
const browseBtn=auditForm.querySelector(".input-group .browse-btn");

const fileInput=auditForm.querySelector(".attach-file");

const filePreview = fileWrapper.querySelector(".file-preview");
const fileInfo = filePreview.querySelector(".file-info");
const fileName=fileInfo.querySelector(".file-name");
const fileSize=fileInfo.querySelector(".file-size");
const fileNameTooltip=fileInfo.querySelector(".tooltip");
const removeBtn = filePreview.querySelector(".remove-file");


fileInput.accept = ".xlsx, .xls";
const loader=filePreview.querySelector(".loader")
const loaderLabel=filePreview.querySelector(".loader-label");
browseBtn.addEventListener("click", () => {
  fileInput.click();
});

let extractedData;

fileInput.addEventListener("change", handleFile);
let start = null;
async function handleFile(e) {
  const file = e.target.files[0];
  if (!file) return;

  const allowed = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel"
  ];

  const inputWrapper = fileInput.parentElement;

  if (!allowed.includes(file.type)) {
    fileInput.value = "";
    filePreview.classList.remove("active");
    inputWrapper.classList.add("error");
    const error = inputWrapper.querySelector(".error");
    error.textContent = "please attach the valid file";
    return;
  }

  filePreview.classList.add("active");

  loader.classList.remove("active");
  void loader.offsetWidth;
  loader.classList.add("active");

  start = null; 
  requestAnimationFrame(animate);
  inputWrapper.classList.remove("error");

  let formatted = formatSize(file.size);
  fileName.textContent = file.name;
  fileNameTooltip.textContent = file.name;
  fileSize.textContent = `(${formatted})`;

  function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }


  const duration = 1000; 

  function animate(timestamp) {
    if(!start) start = timestamp;

    let progress = Math.min((timestamp - start) / duration * 100, 100);

    loaderLabel.textContent = `${Math.floor(progress)}%`;

    if (progress < 100) {
      requestAnimationFrame(animate);
    }
  }

  removeBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  filePreview.classList.remove("active")
})


  const arrayBuffer = await file.arrayBuffer();
  const workbook = await JSZip.loadAsync(arrayBuffer);

  const sharedStringsXML = await workbook.file("xl/sharedStrings.xml")?.async("string");
  const sharedStrings = parseSharedStrings(sharedStringsXML);

  const sheetXML = await workbook.file("xl/worksheets/sheet1.xml")?.async("string");
  const rows = parseSheetAsJSON(sheetXML, sharedStrings);
  const filteredData=rows.filter(r=>r.Answer==-1)
  extractedData=filteredData
  // sessionStorage.setItem("excelData", JSON.stringify(filteredData));
}

//Fetch data from excel

function parseSharedStrings(xml) {
  if (!xml) return [];
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  return [...doc.getElementsByTagName("t")].map(t => t.textContent);
}

function parseSheetAsJSON(sheetXML, sharedStrings = []) {
  if (!sheetXML) return [];

  const xmlDoc = new DOMParser().parseFromString(sheetXML, "text/xml");
  const rowElements = xmlDoc.getElementsByTagName("row");

  const rows = [];

  for (let row of rowElements) {
    const cells = [];
    for (let c of row.getElementsByTagName("c")) {
     
      const v = c.getElementsByTagName("v")[0];

      let value = v ? v.textContent : "";
      if (c.getAttribute("t") === "s") value = sharedStrings[Number(value)];
      cells.push(value);
    }
    rows.push(cells);
  }

  if (rows.length === 0) return [];

  const keys = rows[0];
  const json = [];

  for (let i = 1; i < rows.length; i++) {
    const obj = {};
    rows[i].forEach((cell, index) => {
      obj[keys[index] || `column${index + 1}`] = cell;
    });
    json.push(obj);
  }

  return json;

}

//Form Submission

const formWrapper=document.querySelector(".audit-form-outer-wrapper");
const chartWrapper=document.querySelector(".audit-chart-wrapper");


const submitFormBtn=document.querySelector(".audit-form-outer-wrapper .audit-form-btn-container .submit-btn")
const cancelFormBtn=document.querySelector(".audit-form-outer-wrapper .audit-form-btn-container .cancel-btn")


const auditInputs=auditForm.querySelectorAll("input,select")



function validateAuditForm(){
  let isValid = true;

  auditInputs.forEach((input) => {
    const value = input.value.trim();
    const inputWrapper = input.closest(".input-wrapper");
    if (!inputWrapper) {
      return;
    }

    const errorElement = inputWrapper.querySelector(".error");
      if (value === "") {
        isValid=false;
        inputWrapper.classList.add("error");
      } 
      else {
        inputWrapper.classList.remove("error");
      }
  });

  return isValid;
}
auditInputs.forEach(input=>{
  input.addEventListener('input',()=>{
    if (validateAuditForm()) {
      const inputWrapper=input.closest(".input-wrapper");
      inputWrapper.classList.remove("error");
    }
  })
})

auditInputs.forEach(inp=> {
  if(inp.id==="imo_number"){
      inp.addEventListener("input", () => {
    inp.value = inp.value.replace(/[^0-9]/g, "");
    });
  }
  if(inp.id==="size"){
      inp.addEventListener("input", () => {
    inp.value = inp.value.replace(/[^0-9]/g, "");
    })
  }
   
})
submitFormBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  if (validateAuditForm()) {
    const formData  = getAuditData();
    sessionStorage.setItem("auditData",JSON.stringify(formData));
    delFormData()
    formWrapper.classList.add("not-active");
    chartWrapper.classList.add("active");
    mainLogo.classList.add("active");

    const auditData=JSON.parse(sessionStorage.getItem("auditData"));
    displayFormData(auditData);
    sessionStorage.setItem("excelData",JSON.stringify(extractedData))
    displayExcelData(extractedData)
  }
})

cancelFormBtn.addEventListener("click",()=>{
  delFormData()
})

function delFormData(){
  auditForm.reset();
  auditInputs.forEach(input=>{
    const inputWrapper=input.closest(".input-wrapper");
    inputWrapper.classList.remove("error");
  })
  selectInputs.forEach(select=>{
    const selectedItem=select.querySelector(".selected-item")
    const options=select.querySelectorAll("li");
    options.forEach(opt=>{
      opt.classList.remove("active");
    })
    selectedItem.childNodes[0].textContent=selectedItem.dataset.select
  })
  datepickers.forEach(datePicker=>{
    createDatepicker(datePicker)
    getSelectedDate(datePicker);
  })
  dateTexts.forEach(dateText=>{
    dateText.childNodes[0].textContent="dd/mm/yyyy"
  })
  
  filePreview.classList.remove("active");
}


function getAuditData() {
  const auditFormData = {};
  auditInputs.forEach((input) => {
    if (input.value.trim() !== "") {
      auditFormData[input.name] = input.value.trim();
    }
  });
  return auditFormData;
}

//Chart Page
const closeChartBtn=document.querySelector(".chart-header-btn-container .close-chart-btn");

closeChartBtn.addEventListener('click',()=>{
  mainLogo.classList.remove("active")
    chartWrapper.classList.remove("active");
    formWrapper.classList.remove("not-active");
})

const tableHeaderHtml=`
  <thead>
    <tr>
      <th rowspan="2" class="col-header">Category</th>
      <th colspan="4" class="top-header">POTENTIAL RISKS FINDINGS COUNT</th>
    </tr>
    <tr>
      <th class="sub-header">Low</th>
      <th class="sub-header">Medium</th>
      <th class="sub-header">High</th>
      <th class="sub-header">Total</th>
    </tr>
  </thead>
  <tbody class="table-body">
  </tbody>`

const excelData=JSON.parse(sessionStorage.getItem("excelData"));
// displayExcelData(excelData)
function displayExcelData(data) {
  getCatTableData(data)
  getLocateTableData(data)
  getMainCategory(data)
  getFindingMain(data)
  getLocationChart(data)
}

  
function getCatTableData(data){
 let obj={};
  data.forEach(d=>{
    const  category=d.mainCategory;
    const risk=d.potentialRisk.toLowerCase()
    if(!obj[category]){
      obj[category]={low:0,medium:0,high:0}
    }
    if(risk==="low"){
      obj[category].low++;
    }
    if(risk==="medium"){
      obj[category].medium++;
    }
    if(risk==="high"){
      obj[category].high++;
    }
  })
  let low=0;
  let medium=0;
  let high=0;
  for(let key in obj){
    low+=obj[key].low;
    medium+=obj[key].medium;
    high+=obj[key].high;
  }
  obj["grand total"]={"low":low,"medium":medium,"high":high}
  const catArr=Object.entries(obj).map(([cat,risk])=>({
    "category":cat.toLowerCase(),
    "low":risk.low,
    "medium":risk.medium,
    "high":risk.high,
    "total":risk.low+risk.medium+risk.high
   }
  )
  )
  const last = catArr.pop(); 

  catArr.sort((a, b) => 
    a.category.toLowerCase().localeCompare(b.category.toLowerCase())
  );

  catArr.push(last);
  renderCatTable(catArr)
}


function getLocateTableData(data){
  console.log(data)
  let obj={};
  data.forEach(d=>{
    const  location=d.Location;
    const risk=d.potentialRisk.toLowerCase()
    if(!obj[location]){
      obj[location]={low:0,medium:0,high:0}
    }
    if(risk==="low"){
      obj[location].low++;
    }
    if(risk==="medium"){
      obj[location].medium++;
    }
    if(risk==="high"){
      obj[location].high++;
    }
  })
  let low=0;
  let medium=0;
  let high=0;
  for(let key in obj){
    low+=obj[key].low;
    medium+=obj[key].medium;
    high+=obj[key].high;
  }
  obj["Grand Total"]={"low":low,"medium":medium,"high":high}
  const locArr=Object.entries(obj).map(([loc,risk])=>({
    "location":loc.toLowerCase(),
    "low":risk.low,
    "medium":risk.medium,
    "high":risk.high,
    "total":risk.low+risk.medium+risk.high
   }
  )
  )
  const last = locArr.pop(); 

  locArr.sort((a, b) => 
    a.location.toLowerCase().localeCompare(b.location.toLowerCase())
  );

  locArr.push(last);
  renderLocateTable(locArr)
}

function getLocationChart(data){
  let obj={};
  data.forEach(d=>{
    const location=d.Location.toLowerCase();
    if(!obj[location]){
      obj[location]=0;
    }
    obj[location]++
  })
  const categories=[];
  for(let key in obj){
    categories.push(key)
  }
}

function getMainCategory(data){
  let mainObj={};
  let locObj={};
  let mainArr;
  let locArr;
  data.forEach(d=>{
    const  mainAcronym=d.mainAcronym;
    const locAcronym=d.locAcronym;
    const risk=d.potentialRisk.toLowerCase()
    if(mainAcronym){
      if(!mainObj[mainAcronym]){
        mainObj[mainAcronym]={low:0,medium:0,high:0}
      }
      if(risk==="low"){
        mainObj[mainAcronym].low++;
      }
      if(risk==="medium"){
        mainObj[mainAcronym].medium++;
      }
      if(risk==="high"){
        mainObj[mainAcronym].high++;
      }
      let low=0;
      let medium=0;
      let high=0;
      for(let key in mainObj){
        low+=mainObj[key].low;
        medium+=mainObj[key].medium;
        high+=mainObj[key].high;
      }
      mainArr=Object.entries(mainObj).map(([main,risk])=>({
        "name":main,
        "y":risk.low+risk.medium+risk.high,
        "x":risk.low*1+risk.medium*5+risk.high*10,
        "label":"Main",
        "color":"#457b9d",
         "z":(risk.low+risk.medium+risk.high)+(risk.low*1+risk.medium*5+risk.high*10),
      }))
    }
    if(locAcronym){
      if(!locObj[locAcronym]){
        locObj[locAcronym]={low:0,medium:0,high:0}
      }
      if(risk==="low"){
        locObj[locAcronym].low++;
      }
      if(risk==="medium"){
        locObj[locAcronym].medium++;
      }
      if(risk==="high"){
        locObj[locAcronym].high++;
      }
      let low=0;
      let medium=0;
      let high=0;
      for(let key in locObj){
        low+=locObj[key].low;
        medium+=locObj[key].medium;
        high+=locObj[key].high;
      }
      locArr=Object.entries(locObj).map(([loc,risk])=>({
        "name":loc,
        "x":risk.low+risk.medium+risk.high,
        "y":risk.low*1+risk.medium*5+risk.high*10,
        "label":"Location",
        "color":"#93e498",
        "z":(risk.low+risk.medium+risk.high)+(risk.low*1+risk.medium*5+risk.high*10)
      }))
    }
  })
  const bubbleData=[...mainArr,...locArr];
  renderMainChart(bubbleData)
}


function getFindingMain(data){
  let obj={};
  data.forEach(d=>{
    const mainCat=d.mainCategory.toLowerCase();
    const risk=d.potentialRisk.toLowerCase();
     if(!obj[mainCat]){
      obj[mainCat]={low:0,medium:0,high:0}
    }
    if(risk==="low"){
      obj[mainCat].low++;
    }
    if(risk==="medium"){
      obj[mainCat].medium++;
    }
    if(risk==="high"){
      obj[mainCat].high++;
    }
  })
  let low=0;
  let medium=0;
  let high=0;
  
  for(let key in obj){
    low+=obj[key].low;
    medium+=obj[key].medium;
    high+=obj[key].high;
  }

  const mainArr=Object.entries(obj).map(([cat,risk])=>(
    {
    "category":cat.toLowerCase(),
    "total":risk.low+risk.medium+risk.high,
   }))
  const findingMainLabels=[]
  const findingMainData = [];
  const findingColor=[];
   console.log(mainArr)
   mainArr.forEach(m=>{
    findingMainLabels.push(m.category)
    findingMainData.push(m.total)
    if(m.total){
      let color;
      const val=m.total;
      if(val< 20){
        color="#70ffb0"
      }
      else if(val > 19 && val < 50){
        color="#f8c06d";
      }
      else{
        color="#ff7884";
      }
      findingColor.push(color)
    }
   })
  renderfindingMain(findingMainLabels,findingMainData,findingColor)
}

function getWeightedMain(data){
  let obj={};
  data.forEach(d=>{
    const mainCat=d.mainCategory.toLowerCase();
    const risk=d.potentialRisk.toLowerCase();
     if(!obj[mainCat]){
      obj[mainCat]={low:0,medium:0,high:0}
    }
    if(risk==="low"){
      obj[mainCat].low++;
    }
    if(risk==="medium"){
      obj[mainCat].medium++;
    }
    if(risk==="high"){
      obj[mainCat].high++;
    }
  })
  let low=0;
  let medium=0;
  let high=0;
  
  for(let key in obj){
    low+=obj[key].low;
    medium+=obj[key].medium;
    high+=obj[key].high;
  }

  const mainArr=Object.entries(obj).map(([cat,risk])=>(
    {
    "category":cat.toLowerCase(),
    "total":risk.low *1 +risk.medium *5 +risk.high * 10,
   }))
  const weightedMainLabels=[]
  const weightedMainData = [];
  const weightedColor=[];
   mainArr.forEach(m=>{
    weightedMainLabels.push(m.category)
    weightedMainData.push(m.total)
    if(m.total){
      let color;
      const val=m.total;
      if(val< 20){
        color="#00af50"
      }
      else if(val > 19 && val < 50){
        color="#ff9f1d";
      }
      else{
        color="#e73845";
      }
      weightedColor.push(color)
    }
   })
  renderWeightedMain(weightedMainLabels,weightedMainData,weightedColor)
}

function renderCatTable(catArr){
  const catTable= document.querySelector(".audit-chart-wrapper .chart-category-table-wrapper .category-table");
  catTable.innerHTML="";
  catTable.innerHTML=tableHeaderHtml
  const tbody=catTable.querySelector(".table-body");
  catArr.forEach(data=>{
    let tr=document.createElement("tr")
    tr.innerHTML=`<td>${data.category}</td>
                    <td>${data.low !==0 ? data.low:"-"}</td>
                    <td>${data.medium !==0 ? data.medium:"-"}</td>
                    <td>${data.high !==0 ? data.high:"-"}</td>
                    <td>${data.total !==0 ? data.total:"-"}</td>`
    tbody.appendChild(tr)
  })

}

function renderLocateTable(locArr){
  const locateTable= document.querySelector(".audit-chart-wrapper .chart-location-table-wrapper .location-table");
  locateTable.innerHTML="";
  locateTable.innerHTML=tableHeaderHtml
  const tbody=locateTable.querySelector(".table-body");
  locArr.forEach(data=>{
    let tr=document.createElement("tr")
    tr.innerHTML=`<td>${data.location}</td>
                    <td>${data.low !==0 ? data.low:"-"}</td>
                    <td>${data.medium !==0 ? data.medium:"-"}</td>
                    <td>${data.high !==0 ? data.high:"-"}</td>
                    <td>${data.total !==0 ? data.total:"-"}</td>`
    tbody.appendChild(tr)
    
  })
  const catTableBodyRow= document.querySelectorAll(".audit-chart-wrapper .chart-category-table-wrapper .category-table .table-body tr");
  const locateTableBodyRow= document.querySelectorAll(".audit-chart-wrapper .chart-location-table-wrapper .location-table .table-body tr");
  
  if(catTableBodyRow.length > locateTableBodyRow.length){
    const row= catTableBodyRow.length-locateTableBodyRow.length 
    const lastRow = locateTableBodyRow[locateTableBodyRow.length - 1];
    for(let i=0;i<row;i++){
      const tr=document.createElement("tr")
      tr.innerHTML=`
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>`
      tbody.insertBefore(tr, lastRow);
    }
  }
}

//Gauge Chart
const riskChartContainer=document.querySelector(".audit-chart-wrapper .risk-chart-wrapper #risk-chart-container");

function vwToPx(vw) {
  return (vw / 100) * window.innerWidth;
}

function getPlotBands() {
    const t = vwToPx(1.302);
    return [
        { from: 0, to: 50, color: '#fe0000', thickness: t },
        { from: 50, to: 75, color: '#fed700', thickness: t },
        { from: 75, to: 100, color: '#00af50', thickness: t }
    ];
}

function getGaugeSizes() {
    const w = window.innerWidth;

    let baseWidth = 6;  
    if (w <= 1200) baseWidth = 3;
    else if (w <= 1400) baseWidth = 4;
    else if (w <= 1600) baseWidth = 5;

    return {
        baseWidth: baseWidth,
        rearLength: w <= 1600 ? '-9%' : '-7%',
        pivotRadius: w <= 1600 ? 3 : 4
    };
}

let sizes = getGaugeSizes();

const riskChart = Highcharts.chart(riskChartContainer, {
    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        center: ['0%', '70%'],
        size: '100%',
        height: '95%'
    },
    credits: { enabled: false },
    title: { text: '' },
    pane: {
        startAngle: -90,
        endAngle: 89.9,
        background: null
    },
    yAxis: {
        min: 0,
        max: 100,
        tickWidth: 0,
        minorTickInterval: null,
        labels: { enabled: false },
        lineWidth: 0,
        plotBands: getPlotBands()
    },
    series: [{
        name: 'Speed',
        data: [80.4],
        tooltip: { enabled: false },
        dataLabels: {
            useHTML: true,
            format: '<div class="risk-label">{y}</div>',
            borderWidth: 0,
            color: '#333333',
            y: 0
        },
        dial: {
            radius: '80%',
            backgroundColor: '#333333',
            baseWidth: sizes.baseWidth,
            baseLength: '0%',
            rearLength: sizes.rearLength,
            borderWidth: 0,
            borderRadius: '50%'
        },
        pivot: {
            backgroundColor: '#333333',
            radius: sizes.pivotRadius,
            borderWidth: 0
        }
    }],
    accessibility:{
      enabled:false
    }
});

let lastSmall = window.innerWidth < 1600;

window.addEventListener("resize", () => {
    const nowSmall = window.innerWidth < 1600;
    if (nowSmall !== lastSmall) {
        lastSmall = nowSmall;
        const s = getGaugeSizes();
        riskChart.update({
            series: [{
                dial: {
                    baseWidth: s.baseWidth,
                    rearLength: s.rearLength
                },
                pivot: {
                    radius: s.pivotRadius
                }
            }]
        }, true, true);
    }
});


window.addEventListener('resize', () => {
    riskChart.update({
        yAxis: {
            plotBands: getPlotBands()
        }
    });
    riskChart.reflow();
});


function renderMainChart(bubbleData){
  console.log(bubbleData)
  const mainChartContainer = document.querySelector(".audit-chart-wrapper .main-chart-wrapper #main-chart-container");
  const mainChart=Highcharts.chart(mainChartContainer, {
    chart: {
        type: 'bubble',
        plotBorderWidth: 0,
    },
    legend: { enabled: false },
    title: { text: '' },
    subtitle: { text: '' },
    accessibility: {
        enabled:false
    },
    xAxis: {
      overflow: 'justify',
        gridLineWidth: 0,
        title: { 
          text: '<div class="main-x-title">Total Weighted Score</div>',
           y: 8 },
        labels: { 
          useHTML: true ,
         format: '<div class="main-x-label">{value}</div>', 
          
        },
        tickWidth: 0,
        lineWidth: 0,
    },
    yAxis: {
        title: {
          useHTML:true,
            text: '<div class="main-y-title">Total Findings</div>',
            x: -8 
          },
        labels: { 
          useHTML: true ,
          format: '<div class="main-y-label">{value}</div>', 
          
        },
        tickPixelInterval: vwToPx(3)
    },
    tooltip: {
        useHTML: true,
        outside: true,
        formatter: function () {
        return `
            <div class="bubble-tooltip">
                <div class="bubble-tooltip-title">${this.point.label}</div>

                <div class="bubble-tooltip-row">
                    <span class="tooltip-label">Weighted Score:</span>
                    <span class="tooltip-value">${this.point.x}</span>
                </div>

                <div class="bubble-tooltip-row">
                    <span class="tooltip-label">Findings:</span>
                    <span class="tooltip-value">${this.point.y}</span>
                </div>
            </div>
        `;
    },
        followPointer: true,
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                useHTML: true,
                format: '<div class="bubble-label">{point.name}</div>',
                jitter: {
                    x: 0.25,  
                    y: 0.25    
                }
            }
        },
        bubble: {
            marker: {
                fillOpacity: 1,
                lineWidth: 0,
                lineColor: "transparent"
            },
            states: {
                hover: { enabled: false, lineWidth: 0, borderWidth: 0 },
                inactive: { opacity: 1 }
            },
        }
    },
    series: [{
        data:bubbleData,
    }],
    credits: { enabled: false },

  });
  console.log(mainChart.series[0].data)
}


// window.addEventListener('resize', () => {
//  mainChart.update({
//     yAxis: {
//         tickPixelInterval: vwToPx(3)
//       }
//   });
//   mainChart.reflow();
// });


//Findings Container

function renderfindingMain(findingMainLabels,findingMainData,findingColor){
  const findingMainChartContainer=document.querySelector(".findings-outer-wrapper .findings-inner-wrapper .findings-chart-container #main-chart-container");
  const findingMainChart = Highcharts.chart(findingMainChartContainer, {
  chart: {
    polar: true,
    type: 'line',      
  },

  title: {
    text: ''
  },
  pane: {
    size: '64%'
  },
  xAxis: {
    categories: findingMainLabels,
    // tickmarkPlacement: 'on',
    lineWidth: 0,
    labels: {
      useHTML: true,
      style: {            
        color: '#666',
        pointerEvents: 'none'  
      },
      distance: 22,
      formatter: function () {
        if(this.value === this.axis.max){
          return '';
        }
        return `
        <div class="polar-label" style="pointer-events: none; z-index: 1;">
          <p class="color" style="color:${findingColor[this.pos]}">
          ${findingMainData[this.pos]}
          </p> 
          <p class="name">
          ${findingMainLabels[this.pos]}
         </p> 
         </div>`;
      },
    }
  },
  yAxis: {
    min: -60,
    max: 0,
    tickPositions:[-60, -50, -40, -30, -20, -10, 0],
    labels: {
      useHTML: true,
      formatter: function() {
        if(this.value === 0) {
          return ''; 
        }
        return `<span class="polar-y-label" style="pointer-events: none; z-index: 1;">${this.value}</span>`;
      },
      y: -11,
      x: -8,
      style: {
        pointerEvents: 'none'  
      }
    },
    gridLineInterpolation: 'circle',
    showLastLabel: true,
    endOnTick: false
  },
  tooltip: {
    useHTML: true,
    shared: false,
    outside:true,
    followPointer: true,
    formatter: function () {
      return `
        <div class="polar-tooltip">
            <div class="polar-tooltip-name">${this.key}</div>
            <div class="polar-tooltip-value">
                Score: <strong>${Math.abs(this.y)}</strong>
            </div>
        </div>
      `;
    },
  },
  legend: {
    enabled: false
  },
   plotOptions: {
    series: {
      states: {
        hover: {
          halo: {
            size: 0
          },
          lineWidthPlus: 0
        }
      }
    }
  },
  series: [{
    name: 'Management Score',
    data: findingMainData.map(val => -val),
    pointPlacement: 'on',
    color: '#44728a',
    lineWidth: 2,
    marker: {
      enabled: false,
      states: {
        hover: {
          enabled: true,
          lineWidth: 0, 
          lineColor: 'transparent',
          radius: 5, 
          
        }
      }
    }
  }],
  credits: {
    enabled: false
  },
  accessibility: {
    enabled: false
  },
});
  window.addEventListener('resize', () => {
    findingMainChart.reflow();
  });
}


const findingSubChartContainer = document.querySelector(".findings-outer-wrapper .findings-inner-wrapper .findings-chart-container #sub-chart-container");

const findingSubChart = Highcharts.chart(findingSubChartContainer, {
    chart: { 
      type: 'column',
     },
    title: {
       text: '',
       align: 'left' 
      },
    xAxis: {
        categories: ['Certificate', 'Company Policy', 'Deck Equipment', 'Document'],
        labels: {
            useHTML: true,
             formatter: function () {
            return `<div class="label sub-x-label">
                ${this.value}
            </div>`;
             },
            style: { align: 'center',
               width: vwToPx(2.7), 
               minWidth: '30px' 
               
            }
        },
        lineWidth: 0
    },
    credits: { enabled: false },
    yAxis: {
        min: 0,
        max: 60,
        title: '',
        gridLineColor: '#d1d1d1',
        labels: { 
          useHTML: true, 
          formatter: function () {
            return `<div class="label sub-y-label">
                ${this.value}
            </div>`;
             },
          style: { 
            align: 'center' 
          } },
        tickPixelInterval: vwToPx(3)
    },
    legend: { enabled: false },
    plotOptions: {
        column: { stacking: 'normal', 
          borderWidth: 0,
           pointPadding: 0.16, 
           groupPadding: 0.22 ,
           borderRadius:0
          },
        series: {
            grouping: false,
            dataLabels: {
                enabled: true,
                useHTML: true,
                formatter: function () {
                    if (this.y === 0) return '';
                    return `<div class="label sub-label">${this.y}</div>`;
                }
            },
            states: {
               inactive: { 
                enabled: false 
              }, 
              hover: { 
                enabled: false 
              } 
            }
        }
    },
    accessibility: {
      enabled: false
    },
    tooltip:{
        outside: true,
    },
    series: [
        { name: 'Red', color: '#ff7884', data: [28, 39, 8, 12] },
        { name: 'Orange', color: '#f8c06d', data: [17, 0, 32, 22] },
        { name: 'Green', color: '#70ffb0', data: [9, 18, 17, 0] }
    ],
});

window.addEventListener('resize', () => {
    findingSubChart.update({
        yAxis: {
            tickPixelInterval: vwToPx(3)
        }
    });

    findingSubChart.reflow();
});


function renderFindindingLocation(categories,data){
  const findingsLocationChartContainer=document.querySelector(".findings-outer-wrapper .findings-inner-wrapper .findings-chart-container #location-chart-container");


const findingsLocationChart =Highcharts.chart( findingsLocationChartContainer, {
    chart: {
        type: 'column',
        marginBottom: 60,
    },

    title: {
        text: '',
    },

    xAxis: {
        categories: [
            "Accomodation",
            "CCR / Ship Office",
            "Engine Room",
            "Master's Office",
            "On Deck",
            "Steering Room",
            "Wheel House"
        ],
        labels: {
        useHTML: true,
        align: "center",
        formatter: function () {
            return `<div class="label location-x-label">
                ${this.value}
            </div>`;
        },
      },
        lineWidth: 0,

    },
    credits:{
      enabled:false,
    },
    yAxis: {
        min: 0,
        max:60,
        tickInterval: 10,  
        title: '',
        gridLineColor: '#d1d1d1',
        
         labels:{
          useHTML:true,
          formatter: function () {
            return `<div class="location-y-label">
                ${this.value}
            </div>`;
        },
        },

    },

    legend: {
        enabled: false
    },
    tooltip:{
        outside: true,
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            borderWidth: 0,
             pointPadding: 0.18,
            groupPadding: 0.15,
            borderRadius:0,
            states: {
                hover: {
                    enabled: false
                }
            }
        },
    
        series: {
            dataLabels: {
                enabled: true,
                useHTML:true,
                format: '<div class="label location-label">{y}</div>',
                style:{
                  color:"var(--input-val-color)",
                  
                },
            },
          },
        },
    series: [
        {
            name: 'Red',
            data: [{
              y:2, color:'#f8c06d'},
             {
              y:19, color:'#ff7884'},
              {
              y:11, color:'#70ffb0'},
              {
              y:18, color:'#ff7884'},
              {
              y:33, color:'#f8c06d'},
              {
              y:8, color:'#f8c06d'},
              {
              y:18, color:'#f8c06d'},
            
              ]
        },
  
    ],
    accessibility:{
      enabled:false
    }
});
}




// window.addEventListener('resize', () => {
//   findingsLocationChart.reflow();
// });

//Weighted Container

function renderWeightedMain(weightedMainLabels,weightedMainData,weightedColor){
  const weightedMainChartContainer=document.querySelector(".weighted-outer-wrapper .weighted-inner-wrapper .weighted-chart-container #main-chart-container")
  const weightedMainChart = Highcharts.chart(weightedMainChartContainer, {
  chart: {
    polar: true,
    type: 'line',      
  },

  title: {
    text: ''
  },
  pane: {
    size: '64%'
  },
  xAxis: {
    categories: weightedMainLabels,
    tickmarkPlacement: 'on',
    lineWidth: 0,
    labels: {
      useHTML: true,
      distance: 40,
      formatter: function () {
        if(this.value === this.axis.max){
          return '';
        }
        return `
        <div class="polar-label">
          <p class="color" style="color:${weightedColor[this.pos]}">
          ${weightedMainData[this.pos]}
          </p> 
          <p class="name">
          ${weightedMainLabels[this.pos]}
         </p> 
         </div>`;
      },
    }
  },
  yAxis: {
    min: -60,
    max: 0,
    tickPositions:[-60, -50, -40, -30, -20, -10, 0],
    labels: {
      useHTML: true,
      formatter: function() {
        if(this.value === 0) {
          return ''; 
        }
        return `<span class="polar-y-label" style="pointer-events: none; z-index: 1;">${this.value}</span>`;
      },
      y: -11,
      x: -8,
      style: {
        pointerEvents: 'none'  
      }
    },
    gridLineInterpolation: 'circle',
    showLastLabel: true,
    endOnTick: false
  },
  tooltip: {
    useHTML: true,
    shared: false,
    outside:true,
    followPointer: true,
    formatter: function () {
      return `
        <div class="polar-tooltip">
            <div class="polar-tooltip-name">${this.key}</div>
            <div class="polar-tooltip-value">
                Score: <strong>${Math.abs(this.y)}</strong>
            </div>
        </div>
      `;
    },
  },
  legend: {
    enabled: false
  },
   plotOptions: {
    series: {
      states: {
        hover: {
          halo: {
            size: 0
          },
          lineWidthPlus: 0
        }
      }
    }
  },
  series: [{
    name: 'Management Score',
    data: weightedMainData.map(val => -val),
    pointPlacement: 'on',
    color: '#44728a',
    lineWidth: 2,
    marker: {
      enabled: false,
      states: {
        hover: {
          enabled: true,
          lineWidth: 0, 
          lineColor: 'transparent',

          radius: 5, 
          
        }
      }
    }
  }],
  credits: {
    enabled: false
  },
  accessibility: {
    enabled: false
  },
});
}

const weightedSubChartContainer=document.querySelector(".weighted-outer-wrapper .weighted-inner-wrapper .weighted-chart-container #sub-chart-container");
const weightedSubChart=Highcharts.chart( weightedSubChartContainer, {
    chart: {
        type: 'column',
    },

    title: {
        text: '',
        align: 'left',
    },

    xAxis: {
        categories: ['Certificate', 'Company Policy', 'Deck Equipment', 'Document'],
        labels:{
          useHTML: true,
           formatter: function () {
            return `<div class="label sub-x-label">
                ${this.value}
            </div>`;
        },
          style: {
            align:'center',
            minWidth:'30px'
          }
        },
        lineWidth: 0,
    },
    credits:{
      enabled:false,
    },
     tooltip:{
        outside: true,
    },
    yAxis: {
        min: 0,
        max:60,
        title: '',
        gridLineColor: '#d1d1d1',
         labels:{
          useHTML:true,
          formatter: function () {
            return `<div class="label sub-y-label">
                ${this.value}
            </div>`
          },
          style:{
            align:'center'
          }
        },
        tickPixelInterval: vwToPx(3) 
    },

    legend: {
        enabled: false
    },

    plotOptions: {
        column: {
            stacking: 'normal',
            borderWidth: 0,
            pointPadding: 0.2,
            groupPadding: 0.15,
            borderRadius: 0,
        },
    
        series: {
            dataLabels: {
                enabled: true,
                useHTML:true,
                format: '<div class="label sub-label">{y}</div>',
            },
            states: {
               inactive: {
                enabled: false
              },
                hover: {
                    enabled: false
                }
            },
          },
        },
    series: [
        {
            name: 'Red',
            color: '#e73845',
            data: [28, 39, 8, 12]
        },
        {
            name: 'Orange',
            color: '#ff9f1d',
            data: [17, 32, 22,0]
        },
        {
            name: 'Green',
            color: '#00af50',
            data: [9, 18, 17 ]
        }
    ],
    accessibility:{
      enabled:false
    }
});
window.addEventListener('resize', () => {

    weightedSubChart.update({

        yAxis: {
            tickPixelInterval: vwToPx(3)
        }
    });

    weightedSubChart.reflow();
});
const weightedLocationChartContainer=document.querySelector(".weighted-outer-wrapper .weighted-inner-wrapper .weighted-chart-container #location-chart-container");

const weightedLocationChart=Highcharts.chart( weightedLocationChartContainer, {
    chart: {
        type: 'column',
        marginBottom: 60, 
    },

    title: {
        text: '',
    },

    xAxis: {
        categories: [
            "Accomodation",
            "CCR / Ship Office",
            "Engine Room",
            "Master's Office",
            "On Deck",
            "Steering Room",
            "Wheel House"
        ],
        labels: {
        useHTML: true,
        align: "center",
        formatter: function () {
            return `<div class="location-x-label">
                ${this.value}
            </div>`;
        },
      },
        lineWidth: 0,

    },
    credits:{
      enabled:false,
    },
     tooltip:{
        outside: true,
    },
    yAxis: {
        min: 0,
        max:60,
        tickInterval: 10,  
        title: '',
        gridLineColor: '#d1d1d1',
        labels: {
        useHTML: true,
        formatter: function () {
          return `<div class="location-y-label">
                  -${this.value}
                  </div>`;
      }

                  
      }

    },

    legend: {
        enabled: false
    },

    plotOptions: {
        column: {
            stacking: 'normal',
            borderWidth: 0,
            pointPadding: 0.16,
            groupPadding: 0.22,
            borderRadius: 0,
            states: {
                hover: {
                    enabled: false
                }
            }
        },
    
        series: {
            dataLabels: {
                enabled: true,
                useHTML:true,
                format: '<div class="label location-label">{y}</div>',
                style:{
                  color:"var(--input-val-color)"
                },
            },
          },
        },
    series: [
        {
            name: 'Red',
             data: [{
              y:2, color:'#f8c06d', dataLabels: { style: { color: 'var(--input-val-color)' } ,},
          },
             {
              y:19, color:'#e73845',dataLabels: { style: { color: '#f0f0f0ff' } ,},},
              {
              y:11, color:'#ff9f1d',dataLabels: { style: { color: 'var(--input-val-color)' } ,},},
              {
              y:18, color:'#e73845',dataLabels: { style: { color: '#f0f0f0ff' } ,},},
              {
              y:33, color:'#00af50',dataLabels: { style: { color: '#f0f0f0ff' } ,},},
              {
              y:8, color:'#e73845',dataLabels: { style: { color: '#f0f0f0ff' } ,},},
              {
              y:18, color:'#00af50',dataLabels: { style: { color: '#f0f0f0ff' } ,},},
            
              ]
        },
  
    ],
    accessibility:{
      enabled:false
    }
});
window.addEventListener('resize', () => {
    weightedLocationChart.reflow();
});



const chartHeader=chartWrapper.querySelector(".audit-chart-header-wrapper .chart-header");
const imoText=chartWrapper.querySelector(".imo-number")
const formContentTexts=chartWrapper.querySelectorAll(".audit-form-content-wrapper .audit-form-content-container .form-content-text")

function displayFormData(auditData){

    for(let key in auditData){
      if(key==="Vessel Name"){
        chartHeader.textContent=auditData["Vessel Name"]
      }
      else if(key==="IMO Number"){
        imoText.textContent=auditData["IMO Number"]
      }
      else{
        formContentTexts.forEach(text=>{
          const span=text.querySelector("span")
      
          const spanData=span.getAttribute("data-formVal");
        
          if(spanData==key){
            span.textContent=auditData[key]
          }
        })
      }
    }

}


const exportBtn= document.querySelector(".export-btn")

exportBtn.addEventListener('click',()=>{
  window.print()
})