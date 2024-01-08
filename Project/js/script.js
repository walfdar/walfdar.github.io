"use strict";

const API_KEY = "64456a81-12dc-41be-b632-537e6fd2e201";

async function getRoutesData() {
  try {
    const res = await fetch(
      `https://edu.std-900.ist.mospolytech.ru/api/routes?api_key=${API_KEY}`
    );
    if (!res.ok) {
      throw new Error("У вас нет интернета");
    }
    const data = await res.json();
    renderData(data);
  } catch (err) {
    throw new Error("Что-то пошло не так");
  }
}

getRoutesData();

function createTableElementName(data) {
  let tableElementName = document.createElement("td");
  tableElementName.classList.add("table-element");
  tableElementName.innerHTML = data.name;
}

function createTableElementDesc(data) {
  let tableElementDesc = document.createElement("td");
  tableElementDesc.classList.add("table-element");
  tableElementDesc.innerHTML = data.description;
}

function createTableElementObject(data) {
  let tableElementObject = document.createElement("td");
  tableElementObject.classList.add("table-element");
  tableElementObject.innerHTML = data.mainObject;
}
function createTableElementButton() {
  let tableElement = document.createElement("td");
  let tableElementButton = document.createElement("button");
  tableElement.classList.add("table-element");
  tableElementButton.classList.add("fs-5");
  tableElementButton.classList.add("rounded-1");
  tableElementButton.textContent = "Выбрать";
  tableElement.append(tableElementButton);
}

function createTableRow(data) {
  let tableRow = document.createElement("tr");
  tableRow.classList.add("table-row");
  tableRow.append(createTableElementName(data));
  tableRow.append(createTableElementDesc(data));
  tableRow.append(createTableElementObject(data));
  tableRow.append(createTableElementButton());
  return tableRow;
}

function renderData(data) {
  let routesList = document.querySelector(".routes-list");
  routesList.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    routesList.append(createTableRow(data[i]));
  }
}
