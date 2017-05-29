function createAssignElement() {
  let a = document.createElement("a");
  a.classList.add("assign");
  a.classList.add("btn");
  a.classList.add("btn-info");
  a.classList.add("glyphicon");
  a.classList.add("glyphicon-ok");
  var td = document.createElement("td");
  td.appendChild(a);
  return td;
}

function addUI(projectRow) {
  // TODO make a new column just for the assign button
  let element = createAssignElement();
  projectRow.insertBefore(element, projectRow.firstChild);
  element.onclick = function() {
    cleanProject();
    let hourWorked = getHourWorked();
    getAll(projectRow, "td > input").forEach((input, index) => input.value = hourWorked[index]);
  }
}

function addColumn(table) {
  let th = document.createElement("th");
  let label = document.createElement("label");
  label.classList.add("assign-label");
  label.innerText = "Assign";
  th.appendChild(label);
  let header = table.querySelector("thead > tr");
  header.insertBefore(th, header.firstChild);

  let lastRow = getAll(table, "tbody tr").slice(-1).pop();
  lastRow.insertBefore(document.createElement("td"), lastRow.firstChild);
}

function initProjectDom() {
  let projectTable = document.querySelectorAll("table")[1];
  addColumn(projectTable);
  let projectRows = getAll(projectTable, "tbody tr").slice(0, -1);
  projectRows.forEach(addUI);
}

function initSnapshotDom() {
  let control = document.createElement("ul");
  control.classList.add("snapshot-control");
  document.querySelector("body").appendChild(control);
  let li = document.createElement("li");
  let button = document.createElement("a");
  li.appendChild(button);
  button.innerText = "Save Snapshot";
  button.classList.add("btn");
  button.classList.add("btn-primary");
  button.id = "save-snapshot";
  control.appendChild(li, button);
  button.onclick = saveSnapshot;

  li = document.createElement("li");
  button = document.createElement("a");
  li.appendChild(button);
  button.innerText = "Apply Snapshot";
  button.classList.add("btn");
  button.classList.add("btn-info");
  button.id = "apply-snapshot";
  control.appendChild(li, button);
  button.onclick = applySnapshot;
}

initProjectDom();
initSnapshotDom();
