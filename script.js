//storing data from form
let taskList = [];
const hoursPerWeek = 24 * 7;
// Getting data from form
const handleOnSubmit = (e) => {
  //   const elm = document.getElementById("task");
  const newForm = new FormData(e);
  const task = newForm.get("Task");
  const hr = +newForm.get("hr");
  const obj = {
    task,
    hr,
    id: randomIdGenerator(),
    type: "entry",
  };

  // check if there is enough hours left
  const existingTtlHrs = taskTotal();
  if (existingTtlHrs + hr > hoursPerWeek) {
    return alert("Sorry boss not ehough time fit this task from last week");
  }
  taskList.push(obj);
  displayEntryList();
};

// displaying entry data in entry table
const displayEntryList = () => {
  console.log(taskList);
  let str = "";
  console.log("first");
  const entryElm = document.getElementById("entryList");
  const entryList = taskList.filter((item) => item.type === "entry");
  taskList.map((item, i) => {
    str += `<tr>
                  <td>${i + 1}</td>
                  <td>${item.task}</td>
                  <td>${item.hr}Hrs</td>
                  <td class="text-end">
                    <button onclick = "handleOnDelete('${
                      item.id
                    }')" class="btn btn-danger">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <button onclick = "switchTask('${
                      item.id
                    }', 'bad')" class="btn btn-success">
                      <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </td>
                </tr>`;
  });
  entryElm.innerHTML = str;
  taskTotal();
};
const displayBadList = () => {
  console.log(taskList);
  let str = "";
  const badElm = document.getElementById("badlist");
  const badlist = taskList.filter((item) => item.type === "bad");
  badlist.map((item, i) => {
    str += `<tr>
                  <td>${i + 1}</td>
                  <td>${item.task}</td>
                  <td>${item.hr}Hrs</td>
                  <td class="text-end">
                    <button onclick = "switchTask('${
                      item.id
                    }', 'entry')" class="btn btn-warning">
                      <i class="fa-solid fa-arrow-left"></i>
                    </button>
                    <button onclick = "handleOnDelete('${
                      item.id
                    }')" class="btn btn-danger">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>`;
  });
  badElm.innerHTML = str;
  document.getElementById("savedHrs").innerText = badlist.reduce(
    (acc, item) => acc + item.hr,
    0
  );
};

// Creating the unique ID
const randomIdGenerator = (length = 6) => {
  const str = "qwertyuiopasdfghjklzxcvbnmQWRTYUIOPASDFGHJKLZXCVBNM0123456789";
  let id = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * str.length);
    id += str[randomIndex];
  }
  return id;
};
// deleting added task
const handleOnDelete = (id) => {
  if (window.confirm("Are you sure that you wanna delete?")) {
    taskList = taskList.filter((item) => item.id !== id);
    displayEntryList();
  }
};

// swithchin the tasks between Entry list and bad list
const switchTask = (id, type) => {
  taskList = taskList.map((item) => {
    if (item.id === id) {
      item.type = type;
    }
    return item;
  });
  displayEntryList();
  displayBadList();
};
const taskTotal = () => {
  const ttlHr = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);
  document.getElementById("ttlHrs").innerText = ttlHr;
  return ttlHr;
};
