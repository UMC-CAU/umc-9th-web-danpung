"use strict";
const planInput = document.getElementById("todo-box__input");
const todoSection = document.getElementById("list-box__todo");
const doneSection = document.getElementById("list-box__done");
const addButton = document.getElementById("todo-box__button");
planInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        const newPlanText = planInput.value.trim();
        if (newPlanText === "")
            return;
        const existingPlans = todoSection.querySelectorAll("p");
        for (let plan of existingPlans) {
            if (plan.textContent === newPlanText) {
                planInput.value = "";
                return;
            }
        }
        const newPlanItem = document.createElement("div");
        newPlanItem.classList.add("plan-item");
        const planText = document.createElement("p");
        planText.textContent = newPlanText;
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "완료";
        completeBtn.classList.add("complete-btn");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "삭제";
        deleteBtn.classList.add("delete-btn");
        completeBtn.addEventListener("click", () => {
            todoSection.removeChild(newPlanItem);
            doneSection.appendChild(newPlanItem);
            completeBtn.remove();
            newPlanItem.appendChild(deleteBtn);
        });
        deleteBtn.addEventListener("click", () => {
            doneSection.removeChild(newPlanItem);
            deleteBtn.remove();
        });
        newPlanItem.appendChild(planText);
        newPlanItem.appendChild(completeBtn);
        todoSection.appendChild(newPlanItem);
        planInput.value = "";
    }
});
addButton.addEventListener("click", () => {
    const newPlanText = planInput.value.trim();
    if (newPlanText === "")
        return;
    const existingPlans = todoSection.querySelectorAll("p");
    for (let plan of existingPlans) {
        if (plan.textContent === newPlanText) {
            planInput.value = "";
            return;
        }
    }
    const newPlanItem = document.createElement("div");
    newPlanItem.classList.add("plan-item");
    const planText = document.createElement("p");
    planText.textContent = newPlanText;
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "완료";
    completeBtn.classList.add("complete-btn");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.classList.add("delete-btn");
    completeBtn.addEventListener("click", () => {
        todoSection.removeChild(newPlanItem);
        doneSection.appendChild(newPlanItem);
        completeBtn.remove();
        newPlanItem.appendChild(deleteBtn);
    });
    deleteBtn.addEventListener("click", () => {
        doneSection.removeChild(newPlanItem);
        deleteBtn.remove();
    });
    newPlanItem.appendChild(planText);
    newPlanItem.appendChild(completeBtn);
    todoSection.appendChild(newPlanItem);
    planInput.value = "";
});
