const reportButn = document.getElementById("report-butn");
const reportForm = document.getElementById("report-form");
const formSubmit = document.getElementById("form-submit");
const deliveryID = document.querySelector("#delivery-id");
const custName = document.querySelector("#cust-name");
const issues = document.querySelector("#issues");
const priority = document.querySelector("#priority");
const details = document.querySelector("#details")
const exceptionTable = document.querySelector(".table")
const closeButn = document.querySelector(".close-butn");
const issuesFilter = document.querySelector("#issues-filter")
const priorityFilter = document.querySelector("#priority-filter");
const totalCount = document.querySelector("#total-count")
const openCount = document.querySelector("#open-count")
const resolvedCount = document.querySelector("#resolved-count")

console.log(reportButn,reportForm);
console.log(typeof reportButn.addEventListener);

console.log(totalCount, openCount, resolvedCount);



reportButn.addEventListener("click",()=>{
    reportButn.style.display="none";
    reportForm.style.display="flex";
})

closeButn.addEventListener("click",()=>{
    reportButn.style.display="block";
    reportForm.style.display="none";
})


const applyFilter=()=>{
    console.log(issuesFilter,priorityFilter);
    const issueChoice = issuesFilter.value;
    const priorityChoice = priorityFilter.value;

    const rows = exceptionTable.querySelectorAll("tr")

    rows.forEach((row)=>{
        const issueMatch = issueChoice === "all" || row.dataset.issue === issueChoice;
        const priorityMatch = priorityChoice === "all" || row.dataset.priority === priorityChoice;

        const shouldHide = !(issueMatch && priorityMatch)
        row.classList.toggle("hidden",shouldHide)
    });  
}

issuesFilter.addEventListener("change",applyFilter)
priorityFilter.addEventListener("change",applyFilter)

const updateCount =()=>{
    const total = exceptionTable.querySelectorAll("tr").length;
    const labels = exceptionTable.querySelectorAll(".status") 
    let resolved = 0

    labels.forEach((label)=>{
        if(label.textContent === "resolved"){
            resolved++
        }
    })

    const open = total - resolved;

    totalCount.textContent=total;
    openCount.textContent= open;
    resolvedCount.textContent=resolved
}

reportForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log(deliveryID.value, custName.value, issues.value, priority.value, details.value);
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.innerHTML=`
        <div class="top">
            <div>
                <p>${deliveryID.value}</p>
                <p>${custName.value}</p>
            </div>
            <span class="status">open</span>
        </div>
        <p>${issues.value} -  <span>${priority.value}</span></p>
        <div class="actions">
            <button class="details-butn">details</button>
            <div class="buttons">
                <button class="resolve-butn"><span>resolve</span></button>
                <button class="delete-butn"><img src="delete-svgrepo-com.svg" alt=" delete"></button>
            </div>
        </div> 
        <div class="details-box" ></div> `;

        row.dataset.issue = issues.value
        row.dataset.priority = priority.value

        const detailsText = details.value

        reportForm.reset()

        const detailsButn = cell.querySelector(".details-butn")
        const detailsBox = cell.querySelector(".details-box")

        detailsButn.addEventListener("click",()=>{
            detailsBox.textContent= detailsText
            detailsBox.classList.toggle("show")

        })
        
        

        //DELETE BUTTON LOGIC

        const deleteButn = cell.querySelector(".delete-butn")

        console.log(deleteButn);

        deleteButn.addEventListener("click",()=>{
            row.remove()
            updateCount()
        })

        //RESOLVE-STATUS LOGIC

        const statusLabel = cell.querySelector(".status");
        const resolveButn = cell.querySelector(".resolve-butn");

        resolveButn.addEventListener("click",()=>{
            if(statusLabel.textContent === "open"){
                statusLabel.textContent="resolved";
                statusLabel.style = "background-color: grey; color:black; "
                resolveButn.textContent="reopen"
                resolveButn.style="background:transparent; color:black; border:1px solid; padding: 1px 5px; border-radius:20px;"
            }else if(statusLabel.textContent === "resolved"){
                statusLabel.textContent ="open";
                statusLabel.style = "background-color: pink; color:red; "
                resolveButn.textContent="resolve"
                 resolveButn.style="background:#43ce5663; color:green; padding: 1px 5px; border-radius:20px;"
            }

            updateCount()
        })


        row.appendChild(cell);
        exceptionTable.appendChild(row)

        updateCount()
})




