
function getAll(element, selector) {
  return Array.from(element.querySelectorAll(selector));
}

function getHourWorked() {
  return getAll(document.querySelectorAll('table')[0], 'tbody > tr:nth-last-child(2) td').slice(1).map(e => e.innerText);
}

function clearProject() {
  var projectTable = document.querySelectorAll('table')[1];
  getAll(projectTable, "td > input").forEach(e => e.value = "");
}

function getTableSnapshot(table) {
    return getAll(table, "td > input").map(e => e.value);
}

function getSnapshot() {
    var tables = document.querySelectorAll("table");
    return {
      "hours": getTableSnapshot(tables[0]),
      "projects": getTableSnapshot(tables[1])
    };
}

function saveSnapshot() {
  let snapshot = getSnapshot();
  localStorage.setItem("snapshot", JSON.stringify(snapshot));
}

function apply(snapshot) {
  var tables = document.querySelectorAll("table");
  getAll(tables[0], "td > input").forEach((e, index) => e.value = snapshot.hours[index]);
  getAll(tables[1], "td > input").forEach((e, index) => e.value = snapshot.projects[index]);
}

function applySnapshot() {
  let snapshot = localStorage.getItem("snapshot");
  apply(JSON.parse(snapshot));
}
