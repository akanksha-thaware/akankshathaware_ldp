let table1items = 0, table2items = 0, table3items = 0, costofTable1 = 0, costofTable2 = 0, costofTable3 = 0;
let itemsandcount1 = [], itemsandcount2 = [], itemsandcount3 = [];
const column2 = document.getElementById("column2");
fetch("itemlist.json")
  .then((response) => response.json())
  .then((data) => {
    data.item.map((item, index) => {
      const div = document.createElement("div");
      div.innerHTML = `<div class="menucard" draggable="true" ondragstart="drag(event)" id="card${
        index + 1
      }">
      <div class="menu-card-content" draggable="false">
        <h4>${item.name}</h4>
        <p>${item.price}</p>
      </div>
      </div>`;
      column2.appendChild(div);
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}
function allowDrop(ev) {
  ev.preventDefault();
}
let modal1 = document.getElementById("myModal1");
let modal2 = document.getElementById("myModal2");
let modal3 = document.getElementById("myModal3");
const modalClick1 = (currentDiv) => {
  modal2.style.display = "none";
  modal3.style.display = "none";
  modal1.style.display = "block";
};
const modalClick2 = (currentDiv) => {
  modal1.style.display = "none";
  modal3.style.display = "none";
  modal2.style.display = "block";
};
const modalClick3 = (currentDiv) => {
  modal1.style.display = "none";
  modal2.style.display = "none";
  modal3.style.display = "block";
};

function drop1(ev) {
  ev.preventDefault();
  var droppedData = ev.dataTransfer.getData("text");
  const itemname =
    document.getElementById(droppedData).childNodes[1].childNodes[1].innerText;
  const itemcost =
    document.getElementById(droppedData).childNodes[1].childNodes[3].innerText;
  let currentTable = document.getElementById("container1");
  let totalitems = document.getElementById("table1items");
  let totalcost = document.getElementById("table1cost");
  costofTable1 += Number(itemcost);
  totalcost.innerText = String(costofTable1);
  totalitems.innerText = ++table1items;
  document.getElementById('billfortable1').innerText = costofTable1 //ADDED
  let existingRow = currentTable.querySelector(
    `tr[id="${itemname}_table1row"]`
  );
  if (!existingRow) {
    appendRow(itemname, itemcost, currentTable);
    const someitem = {
      name: itemname,
      cost: itemcost,
      quantity: 1,
    };
    itemsandcount1.push(someitem);
  } else {
    itemsandcount1.forEach((obj) => {
      if (obj.name == itemname) {
        obj.quantity = obj.quantity + 1;
        obj.cost = Number(obj.cost) + Number(itemcost);
      }
    });
  }
}
function appendRow(itemname, itemcost, table) {
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  cell1.innerHTML = row.rowIndex + 1;
  cell1.setAttribute("width", "65");
  //Column 2
  var cell2 = row.insertCell(1);
  cell2.innerHTML = `${itemname}`;
  cell2.setAttribute("width", "386");
  //Column 3
  var cell3 = row.insertCell(2);
  cell3.innerHTML = `${itemcost}`;
  cell3.setAttribute("width", "40");
  // column 4
  var cell3 = row.insertCell(3);
  var element3 = document.createElement("input");
  element3.type = "number";
  element3.setAttribute("min", "1")
  element3.addEventListener("change", function (event) {
    // update the values of the table1
    let totalitems = document.getElementById("table1items");
    let totalcost = document.getElementById("table1cost");
    let updatedquantity = Number(event.target.value);
    console.log(updatedquantity)
    itemsandcount1.forEach((obj) => {
      if (obj.name == itemname) {
        let previousquantity = obj.quantity;
        let previouscost = Number(obj.cost);
        let updatedtotalcost =
          updatedquantity * (previouscost / previousquantity);
        obj.quantity = updatedquantity;
        console.log(updatedquantity)
        obj.cost = updatedtotalcost;
        let totalitems = document.getElementById("table1items");
        let totalcost = document.getElementById("table1cost");
        let previoustotalcost = Number(totalcost.innerText); 
        let previoustotalitems = Number(totalitems.innerText); 
        let updatedtotalitems =
          previoustotalitems - previousquantity + updatedquantity;
        let updatedtotal = previoustotalcost - previouscost + updatedtotalcost;
        totalcost.innerText = `${updatedtotal}`;
        totalitems.innerText = `${updatedtotalitems}`;
        document.getElementById('billfortable1').innerHTML = updatedtotal
        table1items = updatedtotalitems;
        console.log(table1items)
        costofTable1 = updatedtotal;
        this.parentNode.parentNode.cells[2].innerText = updatedtotalcost;
      }
    });
  });
  cell3.appendChild(element3);
  // column 5
  var cell4 = row.insertCell(4);
  cell4.setAttribute("width", "20");
  cell4.innerHTML = '<i class="material-icons">&#xe872;</i>';
  cell4.addEventListener("click", function () {
    var row = this.parentNode;
    table.deleteRow(row.rowIndex);
    // update serial numbers
    var rows = table.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
      rows[i].getElementsByTagName("td")[0].innerHTML = i + 1; //
    }
    // update the values of the table1
    let totalitems = document.getElementById("table1items");
    let totalcost = document.getElementById("table1cost");

    // loop through itemsandcount1
    itemsandcount1.forEach((obj) => {
      if (obj.name == itemname) {
        const quantity = obj.quantity;
        let totalremovedcost = Number(obj.cost);
        let previoustotalcost = Number(totalcost.innerText);
        let previoustotalitems = Number(totalitems.innerText);
        let newtotalitems = previoustotalitems - quantity;
        let newtotalcost = previoustotalcost - totalremovedcost;
        totalcost.innerText = `${newtotalcost}`;
        totalitems.innerText = `${newtotalitems}`;
        table1items = newtotalitems;
        costofTable1 = newtotalcost;
        document.getElementById('billfortable1').innerHTML = newtotalcost // ADDED
      }
    });
    const result = itemsandcount1.filter((item) => item.name != itemname);
    itemsandcount1 = result;
  });
  //finally set unique id of the row
  row.setAttribute("id", `${itemname}_table1row`);
}
// search for menu
const menuSearchFunction = () => {
  var input, filter, ul, li, i, txtValue;
  // get the search input id
  input = document.getElementById("searchmenuid");
  filter = input.value.toUpperCase();
  // get the id of the menu column
  ul = document.getElementById("column2");
  // below line gets all the cards from this column
  li = ul.getElementsByClassName("menucard");
  for (i = 0; i < li.length; i++) {
    let content =
      li[i].getElementsByClassName("menu-card-content")[0].childNodes[1]
        .innerText;
    console.log(content);
    if (content.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
};
// search for tables
const tableSearchFunction = () => {
  var input, filter, ul, li, i, txtValue;
  input = document.getElementById("searchtableid");
  filter = input.value.toUpperCase();
  ul = document.getElementById("column1");
  li = ul.getElementsByClassName("tablecard");
  for (i = 0; i < li.length; i++) {
    let content =
      li[i].getElementsByClassName("table-card-content")[0].childNodes[1]
        .innerText;
    console.log(content);
    if (content.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
};

const close1 = () => {
  modal1.style.display = "none";
};
const close2 = () => {
  modal2.style.display = "none";
};
const close3 = () => {
  modal3.style.display = "none";
};
const generateBill = (table) => {
  let result = 0;
  if (table == "table1") {
    itemsandcount1.forEach((obj) => {
      result += Number(obj.cost);
    });
    alert("The bill is: " + result);
  }
  if (table == "table2") {
    itemsandcount2.forEach((obj) => {
      result += Number(obj.cost);
    });
    alert("The bill is: " + result);
  }
  if (table == "table3") {
    itemsandcount3.forEach((obj) => {
      result += Number(obj.cost);
    });
    alert("The bill is: " + result);
  }
};

function drop2(ev) {
  ev.preventDefault();
  var droppedData = ev.dataTransfer.getData("text");
  const itemname =
    document.getElementById(droppedData).childNodes[1].childNodes[1].innerText;
  const itemcost =
    document.getElementById(droppedData).childNodes[1].childNodes[3].innerText;
  let currentTable = document.getElementById("container2");
  let totalitems = document.getElementById("table2items");
  let totalcost = document.getElementById("table2cost");
  costofTable2 += Number(itemcost);
  totalcost.innerText = String(costofTable2);
  totalitems.innerText = ++table2items;
  document.getElementById('billfortable2').innerText = costofTable2 //ADDED
  let existingRow = currentTable.querySelector(
    `tr[id="${itemname}_table2row"]`
  );
  if (!existingRow) {
    appendRow2(itemname, itemcost, currentTable);
    const someitem = {
      name: itemname,
      cost: itemcost,
      quantity: 1,
    };
    itemsandcount2.push(someitem);
  } else {
    itemsandcount2.forEach((obj) => {
      if (obj.name == itemname) {
        obj.quantity = obj.quantity + 1;
        obj.cost = Number(obj.cost) + Number(itemcost);
      }
    });
  }
}
function appendRow2(itemname, itemcost, table) {
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  cell1.innerHTML = row.rowIndex + 1;
  cell1.setAttribute("width", "65");
  var cell2 = row.insertCell(1);
  cell2.innerHTML = `${itemname}`;
  cell2.setAttribute("width", "386");
  var cell3 = row.insertCell(2);
  cell3.innerHTML = `${itemcost}`;
  cell3.setAttribute("width", "40");
  var cell3 = row.insertCell(3);
  var element3 = document.createElement("input");
  element3.type = "number";
  element3.setAttribute("min", "1")
  element3.addEventListener("change", function (event) {
    let totalitems = document.getElementById("table2items");
    let totalcost = document.getElementById("table2cost");
    let updatedquantity = Number(event.target.value);
    itemsandcount2.forEach((obj) => {
      if (obj.name == itemname) {
        let previousquantity = obj.quantity;
        let previouscost = Number(obj.cost);
        let updatedtotalcost =
          updatedquantity * (previouscost / previousquantity);
        obj.quantity = updatedquantity;
        obj.cost = updatedtotalcost;
        let totalitems = document.getElementById("table2items");
        let totalcost = document.getElementById("table2cost");
        let previoustotalcost = Number(totalcost.innerText); 
        let previoustotalitems = Number(totalitems.innerText); 
        let updatedtotalitems =
          previoustotalitems - previousquantity + updatedquantity;
        let updatedtotal = previoustotalcost - previouscost + updatedtotalcost;
        totalcost.innerText = `${updatedtotal}`;
        totalitems.innerText = `${updatedtotalitems}`;
        table2items = updatedtotalitems;
        costofTable2 = updatedtotal;
        document.getElementById('billfortable2').innerHTML = updatedtotal 
        this.parentNode.parentNode.cells[2].innerText = updatedtotalcost;
      }
    });
  });
  cell3.appendChild(element3);
  var cell4 = row.insertCell(4);
  cell4.innerHTML = '<i class="material-icons">&#xe872;</i>';
  cell4.setAttribute("width", "20");
  cell4.addEventListener("click", function () {
    var row = this.parentNode;
    table.deleteRow(row.rowIndex);
    // update serial numbers
    var rows = table.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
      rows[i].getElementsByTagName("td")[0].innerHTML = i + 1; //
    }
    let totalitems = document.getElementById("table2items");
    let totalcost = document.getElementById("table2cost");
    itemsandcount2.forEach((obj) => {
      if (obj.name == itemname) {
        const quantity = obj.quantity;
        let totalremovedcost = Number(obj.cost);
        let previoustotalcost = Number(totalcost.innerText);
        let previoustotalitems = Number(totalitems.innerText);
        let newtotalitems = previoustotalitems - quantity;
        let newtotalcost = previoustotalcost - totalremovedcost;
        totalcost.innerText = `${newtotalcost}`;
        totalitems.innerText = `${newtotalitems}`;
        table2items = newtotalitems;
        costofTable2 = newtotalcost;
        document.getElementById('billfortable2').innerHTML = newtotalcost // ADDED
      }
    });
    const result = itemsandcount2.filter((item) => item.name != itemname);
    itemsandcount2 = result;
  });
  //finally set unique id of the row
  row.setAttribute("id", `${itemname}_table2row`);
}

function drop3(ev) {
  ev.preventDefault();
  var droppedData = ev.dataTransfer.getData("text");
  const itemname =
    document.getElementById(droppedData).childNodes[1].childNodes[1].innerText;
  const itemcost =
    document.getElementById(droppedData).childNodes[1].childNodes[3].innerText;
  let currentTable = document.getElementById("container3");
  let totalitems = document.getElementById("table3items");
  let totalcost = document.getElementById("table3cost");
  costofTable3 += Number(itemcost);
  totalcost.innerText = String(costofTable3);
  totalitems.innerText = ++table3items;
  document.getElementById('billfortable3').innerText = costofTable3 //ADDED
  let existingRow = currentTable.querySelector(
    `tr[id="${itemname}_table3row"]`
  );
  if (!existingRow) {
    appendRow3(itemname, itemcost, currentTable);
    const someitem = {
      name: itemname,
      cost: itemcost,
      quantity: 1,
    };
    itemsandcount3.push(someitem);
  } else {
    itemsandcount3.forEach((obj) => {
      if (obj.name == itemname) {
        obj.quantity = obj.quantity + 1;
        obj.cost = Number(obj.cost) + Number(itemcost);
      }
    });
  }
}
function appendRow3(itemname, itemcost, table) {
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  cell1.innerHTML = row.rowIndex + 1;
  cell1.setAttribute("width", "65");
  var cell2 = row.insertCell(1);
  cell2.innerHTML = `${itemname}`;
  cell2.setAttribute("width", "386");
  var cell3 = row.insertCell(2);
  cell3.innerHTML = `${itemcost}`;
  cell3.setAttribute("width", "40");
  var cell3 = row.insertCell(3);
  var element3 = document.createElement("input");
  element3.type = "number";
  element3.setAttribute("min", "1")
  element3.addEventListener("change", function (event) {
    let totalitems = document.getElementById("table3items");
    let totalcost = document.getElementById("table3cost");
    let updatedquantity = Number(event.target.value);
    itemsandcount3.forEach((obj) => {
      if (obj.name == itemname) {
        let previousquantity = obj.quantity;
        let previouscost = Number(obj.cost);
        let updatedtotalcost =
          updatedquantity * (previouscost / previousquantity);
        obj.quantity = updatedquantity;
        obj.cost = updatedtotalcost;
        let totalitems = document.getElementById("table3items");
        let totalcost = document.getElementById("table3cost");
        let previoustotalcost = Number(totalcost.innerText); // right
        let previoustotalitems = Number(totalitems.innerText); // right
        let updatedtotalitems =
          previoustotalitems - previousquantity + updatedquantity;
        let updatedtotal = previoustotalcost - previouscost + updatedtotalcost;
        totalcost.innerText = `${updatedtotal}`;
        totalitems.innerText = `${updatedtotalitems}`;
        table3items = updatedtotalitems; 
        costofTable3 = updatedtotal; // imp
        document.getElementById('billfortable3').innerHTML = updatedtotal // ADDED
        this.parentNode.parentNode.cells[2].innerText = updatedtotalcost;
      }
    });
  });
  cell3.appendChild(element3);
  var cell4 = row.insertCell(4);
  cell4.innerHTML = '<i class="material-icons">&#xe872;</i>';
  cell4.setAttribute("width", "20");
  cell4.addEventListener("click", function () {
    var row = this.parentNode;
    table.deleteRow(row.rowIndex);
    // update serial numbers
    var rows = table.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
      rows[i].getElementsByTagName("td")[0].innerHTML = i + 1; //
    }
    let totalitems = document.getElementById("table3items");
    let totalcost = document.getElementById("table3cost");
    itemsandcount3.forEach((obj) => {
      if (obj.name == itemname) {
        const quantity = obj.quantity;
        let totalremovedcost = Number(obj.cost);
        let previoustotalcost = Number(totalcost.innerText);
        let previoustotalitems = Number(totalitems.innerText);
        let newtotalitems = previoustotalitems - quantity;
        let newtotalcost = previoustotalcost - totalremovedcost;
        totalcost.innerText = `${newtotalcost}`;
        totalitems.innerText = `${newtotalitems}`;
        table3items = newtotalitems;
        costofTable3 = newtotalcost;
        document.getElementById('billfortable3').innerHTML = newtotalcost // ADDED
      }
    });
    const result = itemsandcount3.filter((item) => item.name != itemname);
    itemsandcount3 = result;
  });
  //finally set unique id of the row
  row.setAttribute("id", `${itemname}_table3row`);
}
