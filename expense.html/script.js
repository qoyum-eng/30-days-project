    let expenses =
        JSON.parse(localStorage.getItem("expenses")) || [];
    let budget =
        Number(localStorage.getItem("budget")) || 0;
    document.getElementById("expenseDate").value =
        new Date().toISOString().split("T")[0];
    function addExpense() {
        const name =
            document.getElementById("expenseName").value.trim();
        const amount =
            Number(document.getElementById("expenseAmount").value);
        const category =
            document.getElementById("expenseCategory").value;
        const date =
            document.getElementById("expenseDate").value;
        if (name === "" || amount <= 0 || date === "") {
            alert("Please fill in all the information.");
            return;
        }
        const expense = {
            id: Date.now(),
            name: name,
            amount: amount,
            category: category,
            date: date
        };
        expenses.push(expense);
        saveExpenses();
        displayExpenses();
        updateSummary();
        updateChart();
        document.getElementById("expenseName").value = "";
        document.getElementById("expenseAmount").value = "";
    }
    function saveExpenses() {
        localStorage.setItem(
            "expenses",
            JSON.stringify(expenses)
        );
    }
    // Delete expense
    function deleteExpense(id) {
        expenses =
            expenses.filter(function(expense) {
                return expense.id !== id;
            });
        saveExpenses();
        displayExpenses();
        updateSummary();
        updateChart();
    }
    function editExpense(id) {
        const expense =
            expenses.find(function(item) {
                return item.id === id;
            });
        if (!expense) {
            return;
        }
        const newName =
            prompt("Change expense name:", expense.name);
        if (newName === null || newName.trim() === "") {
            return;
        }
        const newAmount =
            prompt("Change amount:", expense.amount);
        const amount =
            Number(newAmount);
        if (amount <= 0 || isNaN(amount)) {
            alert("Invalid amount.");
            return;
        }
        expense.name =
            newName.trim();
        expense.amount =
            amount;
        saveExpenses();
        displayExpenses();
        updateSummary();
        updateChart();
    }
    function displayExpenses() {
        const list =
            document.getElementById("expenseList");
        const search =
            document.getElementById("search").value.toLowerCase();
        const filter =
            document.getElementById("filterCategory").value;
        list.innerHTML = "";
        const filteredExpenses =
            expenses.filter(function(expense) {
                const matchesSearch =
                    expense.name.toLowerCase().includes(search);
                const matchesCategory =
                    filter === "All" ||
                    expense.category === filter;
                return matchesSearch && matchesCategory;
            });
        if (filteredExpenses.length === 0) {
            list.innerHTML =
                '<div class="empty">No expenses found.</div>';
            return;
        }
        filteredExpenses
            .slice()
            .reverse()
            .forEach(function(expense) {
                const item =
                    document.createElement("div");
                item.className = "expense";
                const info =
                    document.createElement("div");
                info.className = "expense-info";
                const name =
                    document.createElement("strong");
                name.textContent =
                    expense.name;
                const details =
                    document.createElement("small");
                details.textContent =
                    expense.date;
                const category =
                    document.createElement("span");
                category.className = "category";
                category.textContent =
                    expense.category;
                info.appendChild(name);
                info.appendChild(details);
                info.appendChild(document.createElement("br"));
                info.appendChild(category);
                const right =
                    document.createElement("div");
                const amount =
                    document.createElement("span");
                amount.className = "expense-amount";
                amount.textContent =
                    "₦" + expense.amount.toLocaleString();
                const actions =
                    document.createElement("span");
                actions.className = "actions";
                const edit =
                    document.createElement("button");
                edit.className = "edit-button";
                edit.textContent = "✏️ Edit";
                edit.onclick =
                    function() {
                        editExpense(expense.id);
                    };
                const del =
                    document.createElement("button");
                del.className = "delete-button";
                del.textContent = "🗑️ Delete";
                del.onclick =
                    function() {
                        deleteExpense(expense.id);
                    };
                actions.appendChild(edit);
                actions.appendChild(del);
                right.appendChild(amount);
                right.appendChild(actions);
                item.appendChild(info);
                item.appendChild(right);
                list.appendChild(item);
            });
    }
    function updateSummary() {
        let total = 0;
        expenses.forEach(function(expense) {
            total += expense.amount;
        });
        document.getElementById("total").textContent =
            "₦" + total.toLocaleString();
        document.getElementById("expenseCount").textContent =
            expenses.length;
        const average =
            expenses.length > 0
                ? total / expenses.length
                : 0;
        document.getElementById("average").textContent =
            "₦" + Math.round(average).toLocaleString();
        updateBudget(total);

    }

    // Set budget

    function setBudget() {

        const newBudget =

            Number(document.getElementById("budget").value);

        if (newBudget <= 0) {

            alert("Please enter a valid budget.");

            return;

        }

        budget = newBudget;

        localStorage.setItem(

            "budget",

            budget

        );

        updateBudget(

            getTotal()

        );

        document.getElementById("budget").value = "";

    }

    // Get total

    function getTotal() {

        let total = 0;

        expenses.forEach(function(expense) {

            total += expense.amount;

        });

        return total;

    }

    // Update budget

    function updateBudget(total) {

        const text =

            document.getElementById("budgetText");

        const progress =

            document.getElementById("progress");

        if (budget <= 0) {

            text.textContent =

                "No budget set.";

            progress.style.width =

                "0%";

            return;

        }

        const percentage =

            (total / budget) * 100;

        text.textContent =

            "₦" + total.toLocaleString() +

            " of ₦" + budget.toLocaleString() +

            " spent";

        progress.style.width =

            Math.min(percentage, 100) + "%";

        if (percentage >= 100) {

            progress.style.background =

                "#dc2626";

        } else if (percentage >= 80) {

            progress.style.background =

                "#f59e0b";

        } else {

            progress.style.background =

                "#16a34a";

        }

    }

    // Category chart

    function updateChart() {

        const chart =

            document.getElementById("categoryChart");

        chart.innerHTML = "";

        const categories = {};

        expenses.forEach(function(expense) {

            if (!categories[expense.category]) {

                categories[expense.category] = 0;

            }

            categories[expense.category] +=

                expense.amount;

        });

        const values =

            Object.values(categories);

        if (values.length === 0) {

            chart.innerHTML =

                '<div class="empty">Add expenses to see your spending report.</div>';

            return;

        }

        const maximum =

            Math.max(...values);

        Object.keys(categories).forEach(function(category) {

            const amount =

                categories[category];

            const row =

                document.createElement("div");

            row.className =

                "chart-row";

            const label =

                document.createElement("div");

            label.className =

                "chart-label";

            const categoryName =

                document.createElement("span");

            categoryName.textContent =

                category;

            const categoryAmount =

                document.createElement("span");

            categoryAmount.textContent =

                "₦" + amount.toLocaleString();

            label.appendChild(categoryName);

            label.appendChild(categoryAmount);

            const background =

                document.createElement("div");

            background.className =

                "bar-background";

            const bar =

                document.createElement("div");

            bar.className =

                "bar";

            bar.style.width =

                (amount / maximum * 100) + "%";

            background.appendChild(bar);

            row.appendChild(label);

            row.appendChild(background);

            chart.appendChild(row);

        });

    }

    // Dark mode

    function toggleDarkMode() {

        document.body.classList.toggle("dark");

        const dark =

            document.body.classList.contains("dark");

        localStorage.setItem(

            "darkMode",

            dark

        );

    }

    // Load dark mode

    if (

        localStorage.getItem("darkMode") === "true"

    ) {

        document.body.classList.add("dark");

    }

    // Load everything when page opens

    displayExpenses();

    updateSummary();

    updateChart();