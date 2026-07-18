const COPY = {
    times: ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"],
    successPrefix: "我们的约会："
};

const state = {
    month: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    selectedDate: null,
    selectedTime: null,
    selectedFood: null
};

const inviteView = document.getElementById("inviteView");
const plannerView = document.getElementById("plannerView");
const foodView = document.getElementById("foodView");
const completeView = document.getElementById("completeView");
const dateCard = document.querySelector(".date-card");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const previousMonth = document.getElementById("previousMonth");
const nextMonth = document.getElementById("nextMonth");
const monthLabel = document.getElementById("monthLabel");
const calendarGrid = document.getElementById("calendarGrid");
const timeGrid = document.getElementById("timeGrid");
const confirmButton = document.getElementById("confirmButton");
const foodGrid = document.getElementById("foodGrid");
const foodNextButton = document.getElementById("foodNextButton");
const confirmedDate = document.getElementById("confirmedDate");
const confirmedTime = document.getElementById("confirmedTime");
const confirmedFood = document.getElementById("confirmedFood");

function startOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function showView(view) {
    [inviteView, plannerView, foodView, completeView].forEach((item) => {
        item.hidden = item !== view;
    });
    dateCard.classList.toggle("is-planning", view === plannerView);
    dateCard.classList.toggle("is-food-choosing", view === foodView);
    window.scrollTo(0, 0);
}

function formatMonth(date) {
    return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "long" }).format(date);
}

function formatDate(date) {
    return new Intl.DateTimeFormat("zh-CN", {
        month: "long",
        day: "numeric",
        weekday: "long"
    }).format(date);
}

function formatCelebrationDate(date) {
    const weekday = new Intl.DateTimeFormat("zh-CN", { weekday: "long" }).format(date);
    return `${date.getMonth() + 1}月${date.getDate()}日，${weekday}`;
}

function formatCelebrationTime(time) {
    const [hour, minute] = time.split(":").map(Number);
    const period = hour < 12 ? "上午" : "下午";
    const displayHour = hour % 12 || 12;
    return `${period}${displayHour}:${String(minute).padStart(2, "0")}`;
}

function renderCalendar() {
    const year = state.month.getFullYear();
    const month = state.month.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const today = startOfDay(new Date());

    monthLabel.textContent = formatMonth(state.month);
    calendarGrid.replaceChildren();

    for (let index = 0; index < firstDay; index += 1) {
        const empty = document.createElement("span");
        empty.className = "calendar-empty";
        empty.setAttribute("aria-hidden", "true");
        calendarGrid.appendChild(empty);
    }

    for (let day = 1; day <= lastDate; day += 1) {
        const date = new Date(year, month, day);
        const button = document.createElement("button");
        button.className = "day-button";
        button.type = "button";
        button.textContent = String(day);
        button.disabled = date < today;
        button.setAttribute("aria-label", formatDate(date));

        const isSelected = state.selectedDate && date.getTime() === state.selectedDate.getTime();
        button.classList.toggle("is-selected", isSelected);
        button.setAttribute("aria-pressed", String(Boolean(isSelected)));
        button.addEventListener("click", () => {
            state.selectedDate = date;
            renderCalendar();
            updateConfirmation();
        });
        calendarGrid.appendChild(button);
    }

    previousMonth.disabled = new Date(year, month, 1) <= new Date(today.getFullYear(), today.getMonth(), 1);
}

function renderTimes() {
    timeGrid.replaceChildren();
    COPY.times.forEach((time) => {
        const button = document.createElement("button");
        const isSelected = state.selectedTime === time;
        button.className = "time-button";
        button.type = "button";
        button.textContent = time;
        button.classList.toggle("is-selected", isSelected);
        button.setAttribute("aria-pressed", String(isSelected));
        button.addEventListener("click", () => {
            state.selectedTime = time;
            renderTimes();
            updateConfirmation();
        });
        timeGrid.appendChild(button);
    });
}

function updateConfirmation() {
    confirmButton.disabled = !(state.selectedDate && state.selectedTime);
}

function updateFoodSelection() {
    foodGrid.querySelectorAll(".food-option").forEach((button) => {
        const isSelected = state.selectedFood && button.dataset.food === state.selectedFood.label;
        button.classList.toggle("is-selected", Boolean(isSelected));
        button.setAttribute("aria-pressed", String(Boolean(isSelected)));
    });
    foodNextButton.disabled = !state.selectedFood;
}

function moveNoButton() {
    const randomViewportOffset = (buttonSize, viewportSize, unit) => {
        const edge = Math.max(18, Math.min(48, viewportSize * 0.05));
        const lowerBound = (edge / viewportSize) * 100;
        const upperBound = Math.max(lowerBound, 100 - (buttonSize / viewportSize) * 100 - lowerBound);
        const offset = lowerBound + Math.random() * (upperBound - lowerBound);
        return `${offset}${unit}`;
    };

    noButton.classList.add("is-escaping");
    noButton.style.bottom = "auto";
    noButton.style.left = randomViewportOffset(noButton.offsetWidth, window.innerWidth, "vw");
    noButton.style.top = randomViewportOffset(noButton.offsetHeight, window.innerHeight, "vh");
}

function addPetals() {
    const container = document.querySelector(".petals");
    for (let index = 0; index < 14; index += 1) {
        const petal = document.createElement("span");
        petal.className = "petal";
        petal.textContent = index % 2 ? "✦" : "♥";
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDelay = `${Math.random() * -14}s`;
        petal.style.animationDuration = `${12 + Math.random() * 10}s`;
        container.appendChild(petal);
    }
}

yesButton.addEventListener("click", () => {
    noButton.classList.remove("is-escaping");
    noButton.removeAttribute("style");
    showView(plannerView);
    renderCalendar();
    renderTimes();
});

noButton.addEventListener("pointerenter", moveNoButton);
noButton.addEventListener("click", moveNoButton);

previousMonth.addEventListener("click", () => {
    state.month = new Date(state.month.getFullYear(), state.month.getMonth() - 1, 1);
    renderCalendar();
});

nextMonth.addEventListener("click", () => {
    state.month = new Date(state.month.getFullYear(), state.month.getMonth() + 1, 1);
    renderCalendar();
});

confirmButton.addEventListener("click", () => {
    showView(foodView);
    updateFoodSelection();
});

foodGrid.addEventListener("click", (event) => {
    const foodOption = event.target.closest(".food-option");
    if (!foodOption) return;

    state.selectedFood = {
        label: foodOption.dataset.food,
        emoji: foodOption.dataset.emoji
    };
    updateFoodSelection();
});

foodNextButton.addEventListener("click", () => {
    if (!state.selectedFood) return;
    confirmedDate.textContent = formatCelebrationDate(state.selectedDate);
    confirmedTime.textContent = formatCelebrationTime(state.selectedTime);
    confirmedFood.textContent = state.selectedFood.label;
    showView(completeView);
});

document.getElementById("restartButton").addEventListener("click", () => {
    state.selectedDate = null;
    state.selectedTime = null;
    state.selectedFood = null;
    showView(plannerView);
    renderCalendar();
    renderTimes();
    updateConfirmation();
    updateFoodSelection();
});

addPetals();
