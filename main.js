// نعرف اللي فاتح مذكر ولا مؤنث + طالب ولا مدرس
let userGender = localStorage.getItem('userGender');
let userRole = localStorage.getItem('userRole');

window.addEventListener('load', function() {
  if (!userGender) {
    document.getElementById('genderPopup').style.display = 'flex';
  } else if (!userRole) {
    updateRoleLabels();
    document.getElementById('rolePopup').style.display = 'flex';
  }
});

function updateRoleLabels() {
  document.getElementById('studentBtn').textContent = 'Student';
  document.getElementById('teacherBtn').textContent = 'Teacher';
}


function chooseGender(gender) {
  userGender = gender;
  localStorage.setItem('userGender', gender);
  document.getElementById('genderPopup').style.display = 'none';
  updateRoleLabels();
  document.getElementById('rolePopup').style.display = 'flex';
}

function chooseRole(role) {
  userRole = role;
  localStorage.setItem('userRole', role);
  document.getElementById('rolePopup').style.display = 'none';
  location.reload();
}

function t(maleText, femaleText) {
  return userGender === 'male' ? maleText : femaleText;
}
class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;
    this.name = name;
    this.grades = grades;
    this.attendance = attendance;
  }
  getAverage() {
    let sum = this.grades.reduce((acc, grade) => acc + grade, 0);
    return sum / this.grades.length;
  }
  getGrade() {
    let avg = this.getAverage();
    if (avg >= 90) return "A";
    else if (avg >= 80) return "B";
    else if (avg >= 70) return "C";
    else if (avg >= 60) return "D";
    else if (avg >= 50) return "E";
    else return "F";
  }
  getResult() {
    let avg = this.getAverage();
    if (avg >= 50 && this.attendance >= 75) return "ناجح";
    else return "يحتاج مراجعة";
  }
}

let studentsList = [
  new Student(1, "نور", [85, 90, 88], 95),
  new Student(2, "نورا", [45, 42, 48], 80),
  new Student(3, "نورهان", [70, 75, 68], 90),
  new Student(4, "صلاح", [40, 44, 46], 70),
];

function render() {
  let addBtn = document.getElementById("addBtn");
if (addBtn) addBtn.style.display = (userRole === 'teacher' || userRole === 'Teacher') ? 'block' : 'none';
let delHeader = document.getElementById("delHeader");
if (delHeader) delHeader.style.display = (userRole === 'teacher' || userRole === 'Teacher') ? '' : 'none';
let addForm = document.getElementById("addForm");
if (addForm) addForm.style.display = (userRole === 'teacher' || userRole === 'Teacher') ? 'block' : 'none';
  let tbody = document.getElementById("studentsTable");
  tbody.innerHTML = "";
  studentsList.forEach((student, index) => {
    tbody.innerHTML += `<tr>
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.getAverage().toFixed(2)}</td>
      <td>${student.getGrade()}</td>
      <td class="${student.getResult() === "ناجح" ? "success" : "fail"}">${student.getResult()}</td>
      <td>${userRole === 'teacher' || userRole === 'Teacher' ? '<button class="delete-btn" onclick="deleteStudent(' + index + ')">حذف</button>' : ''}</td>
            </tr>`;
    });

  let struggling = studentsList.filter(s => s.getAverage() >= 40 && s.getAverage() <= 49);
  let afterMercy = struggling.map(s => s.getAverage() + 5);
  let total = afterMercy.reduce((acc, avg) => acc + avg, 0);
  let mercyAverage = afterMercy.length === 0 ? 0 : total / afterMercy.length;

  document.getElementById("mercyBox").innerHTML =
    `<h3>الطلاب المتعثرين بعد الرأفة (+5 درجات)</h3>
    <p>عدد المتعثرين: ${struggling.length} | متوسطهم بعد الرأفة: ${mercyAverage.toFixed(2)}</p>
    <p>${struggling.map(s => s.name + " → " + (s.getAverage() + 5).toFixed(2)).join(" | ") || "مفيش طلاب متعثرين"}</p>`;
}

function addStudent() {
  let idInput = document.getElementById("studentId").value;
  let name = document.getElementById("name").value;
  let g1 = Number(document.getElementById("g1").value);
  let g2 = Number(document.getElementById("g2").value);
  let g3 = Number(document.getElementById("g3").value);
  let att = Number(document.getElementById("att").value);
  if (!name) { alert("اكتبي الاسم الأول"); return; }
  let newId = idInput ? Number(idInput) : studentsList.length + 1;
  studentsList.push(new Student(newId, name, [g1, g2, g3], att));
  render();
  document.getElementById("studentId").value = "";
  document.getElementById("name").value = "";
  document.getElementById("g1").value = "";
  document.getElementById("g2").value = "";
  document.getElementById("g3").value = "";
  document.getElementById("att").value = "";
}

function deleteStudent(index) {
  studentsList.splice(index, 1);
  render();
}

render();