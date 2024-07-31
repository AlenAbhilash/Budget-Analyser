let username = localStorage.getItem('logined');
let user = JSON.parse(localStorage.getItem(username));
let dusername = user.username;
let email = user.email;
usernamedisplay.innerHTML = dusername ? `Welcome, ${dusername}, To Your Budget Analyzer Account` : "User not found";
emaildisplay.innerHTML = email ? `${email}` : "Email not found";

function addincome() {
    if (!user.incomebalance) {
        user.incomebalance = 0;
    }
    let incometypeValue = String(incometype.value).trim();
    let incomeamountValue = Number(incomeamount.value);
    if (incometypeValue === '') {
        alert("Enter a valid income type to add to your account");
        return;
    }
    if (incomeamountValue <= 0) {
        alert("Enter a valid amount to add to your account");
        return;
    }
    user.incomebalance += incomeamountValue;
    let dincomebalance = user.incomebalance;
    localStorage.setItem(username, JSON.stringify(user));
    let now = new Date();
    let day = String(now.getDate()).padStart(2, '0');
    let month = String(now.getMonth() + 1).padStart(2, '0');
    let year = now.getFullYear();
    let formattedDate = `${day}-${month}-${year}`;
    let hours = now.getHours();
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    let formattedTime = `${hours}:${minutes} ${period}`;
    let formattedDateTime = `${formattedDate} ${formattedTime}`;

    let incomeTableDisplay = JSON.parse(localStorage.getItem(`${username}_incomeTableDisplay`)) || [];
    incomeTableDisplay.push({
        incometype: incometypeValue,
        incomeamount: incomeamountValue,
        incomebalance: dincomebalance,
        incomeadddatetime: formattedDateTime
    });
    localStorage.setItem(`${username}_incomeTableDisplay`, JSON.stringify(incomeTableDisplay));
    alert(`Income Type Added: ${incometypeValue}`);
    alert(`Amount Added: Rs:${incomeamountValue}`);
    incometype.value = '';
    incomeamount.value = '';
    incomedisplayIncome();
}


function incomedisplayIncome() {
    totalbalance.innerHTML = user.incomebalance ? `Rs:${user.incomebalance}/` : `Add`;
    const incomeTableDisplay = JSON.parse(localStorage.getItem(`${username}_incomeTableDisplay`));
    const tableBody = document.getElementById('tbody1');
    tableBody.innerHTML = '';
    incomeTableDisplay.forEach(income => {
        const row = document.createElement('tr');
        row.className = 'bg-white border-b dark:bg-gray-800 dark:border-gray-700';
        row.innerHTML = `
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${income.incometype}</th>
            <td class="px-6 py-4">Rs:${income.incomeamount}</td>
            <td class="px-6 py-4">Rs:${income.incomebalance}</td>
            <td class="px-6 py-4">${income.incomeadddatetime}</td>
        `;
        tableBody.appendChild(row);
    });
}
incomedisplayIncome();

function Expense() {
    if (!user.Expensebalance) {
        user.Expensebalance = 0;
    }
    let ExpensetypeValue = String(Expensetype.value).trim();
    let ExpenseamountValue = Number(Expenseamount.value);
    if (ExpensetypeValue === '') {
        alert("Enter a valid expense type to add to your account");
        return;
    }
    if (ExpenseamountValue <= 0) {
        alert("Enter a valid amount to add to your account");
        return;
    }
    user.incomebalance -= ExpenseamountValue;
    user.Expensebalance += ExpenseamountValue;
    let dExpenseamount = user.Expensebalance;
    dExpensebalance.innerHTML = `Rs:${dExpenseamount}/`;
    localStorage.setItem(username, JSON.stringify(user));
    let now = new Date();
    let day = String(now.getDate()).padStart(2, '0');
    let month = String(now.getMonth() + 1).padStart(2, '0');
    let year = now.getFullYear();
    let formattedDate = `${day}-${month}-${year}`;
    let hours = now.getHours();
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    let formattedTime = `${hours}:${minutes} ${period}`;
    let formattedDateTime = `${formattedDate} ${formattedTime}`;

    let ExpenseTableDisplay = JSON.parse(localStorage.getItem(`${username}_ExpenseTableDisplay`)) || [];
    ExpenseTableDisplay.push({
        Expensetype: ExpensetypeValue,
        Expenseamount: ExpenseamountValue,
        Expensebalance: dExpenseamount,
        Expenseadddatetime: formattedDateTime
    });
    localStorage.setItem(`${username}_ExpenseTableDisplay`, JSON.stringify(ExpenseTableDisplay));
    alert(`Expense Type Added: ${ExpensetypeValue}`);
    alert(`Amount Added: Rs:${ExpenseamountValue}`);
    Expensetype.value = '';
    Expenseamount.value = '';
    expensedisplay()
    incomedisplayIncome()
    showChart()
}
function expensedisplay() {
    let dExpenseamount = user.Expensebalance;
    dExpensebalance.innerHTML = `Rs:${dExpenseamount}/`;
    const ExpenseTableDisplay = JSON.parse(localStorage.getItem(`${username}_ExpenseTableDisplay`));
    const tableBody = document.getElementById('tbody2');
    tableBody.innerHTML = '';
    ExpenseTableDisplay.forEach(expense => {
        const row = document.createElement('tr');
        row.className = 'bg-white border-b dark:bg-gray-800 dark:border-gray-700';
        row.innerHTML = `
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${expense.Expensetype}</th>
            <td class="px-6 py-4">Rs:${expense.Expenseamount}</td>
            <td class="px-6 py-4">Rs:${expense.Expensebalance}</td>
            <td class="px-6 py-4">${expense.Expenseadddatetime}</td>
        `;
        tableBody.appendChild(row);
    });
}
expensedisplay();
function showChart() {
    chartcontainer.style.display = "block";
    let income = user.incomebalance;
    let expense = user.Expensebalance;
    let total = income + expense;
    let incomePercentage = total ? (income / total) * 100 : 0;
    let expensePercentage = total ? (expense / total) * 100 : 0;
    const getChartOptions = () => {
        return {
            series: [incomePercentage, expensePercentage],
            colors: ["#1C64F2", "#16BDCA"],
            chart: {
                height: 420,
                width: "100%",
                type: "pie",
            },
            stroke: {
                colors: ["white"],
                lineCap: "",
            },
            plotOptions: {
                pie: {
                    labels: {
                        show: true,
                        formatter: function (val) {
                            return val.toFixed(1);
                        },
                    },
                    size: "100%",
                    dataLabels: {
                        offset: -25
                    }
                },
            },
            labels: ["Income", "Expense"],
            legend: {
                fontSize: '17px',
                fontFamily: "Inter, sans-serif",
                colors: ["white"],
                backgroundColor: "white",
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return value + "%"
                    },
                },
            },
            xaxis: {
                labels: {
                    formatter: function (value) {
                        return value + "%"
                    },
                },
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
            },
        }
    }

    if (document.getElementById("pie-chart") && typeof ApexCharts !== 'undefined') {
        const chart = new ApexCharts(document.getElementById("pie-chart"), getChartOptions());
        chart.render();
    }
}
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        let username = localStorage.getItem('logined');
        if (username) {
            localStorage.removeItem('logined');
        }
        window.location = './login.html'
    }
}
function deleteaccount() {
    if (confirm("Are you sure you want to delete your account and all data?")) {
        localStorage.clear();
        window.location = './index.html'
    }
}
