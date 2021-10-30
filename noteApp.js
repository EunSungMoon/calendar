let el = selector => document.querySelector(selector);
let elAll = selector => document.querySelectorAll(selector);
let dom = selector => document.createElement(selector);

//노트 앱 첫 화면 그리기
let NoteAppDom = () => {
  let $noteWrap = el('.noteWrap');
  let noteDom = `
    <div class = "title">
      <h1>Notes App</h1>
      <span>Take notes and never forget.</span>
    </div>
    <div class = "noteContent">
      <div class = "search">
        <select name = "sorting">
          <option value = "last">sort by last edited</option>
          <option value = "recent">sort by recently created</option>
          <option value = "abc">sort by ABC</option>
        </select>
        <input id = "searchBox" placeholder = "Search">
        <button class = "searchBtn">Search</button>
      </div>
      <div class = "noteList"></div>
      <button class = "CreateNoteBtn">Create Note</button>
    </div>
    <div class = "newNoteWrap"></div>
  `
  $noteWrap.innerHTML = noteDom;
};

//노트 리스트 화면 그리기
let NoteListDom = () => {
  let $noteList = el('.noteList');
  let list = `
    <div class = "listWrap">
      <span class = "noNoteList">노트가 없습니다.</span>
    </div>
  `
  $noteList.innerHTML += list;
};

let displayEl = (elClassName, displayEvt) => {
  el(elClassName).style.display = displayEvt
};

//새노트 만들기 버튼 이벤트
let createNoteBtnEvt = () => {
  let $createNote = el('.CreateNoteBtn');

  $createNote.addEventListener('click', () => {
    loadNote();
    displayEl('.noteContent', 'none');
    displayEl('.CreateNoteBtn', 'none');
    displayEl('.newNoteWrap', '');
  })
};

//새 노트 만드는 화면 그리기
let writeNewNote = () => {
  let $newNote = el('.newNoteWrap');
  let newNoteDom = `
    <div class = "newNoteContent">
      <form class = "inputForm">
        <input type="text" class = "noteTitle" placeholder = "title">
      </form>

      <textarea class = "noteText" placeholder = "write the note" style = "width: 400px; height: 100px; display: flex"></textarea>
      <button class= "save btn">Save</button>
      <button class= "back btn">Back</button>
    </div>
  `
  $newNote.innerHTML = newNoteDom;
};

// //뒤로가기 버튼 이벤트 
// let backBtnEvt = () => {
//   let $back = el('.back');

//   $back.addEventListener('click', function () {

//     displayEl('.noteContent', '');
//     displayEl('.CreateNoteBtn', '');
//     displayEl('.newNoteWrap', 'none');

//     if ((el('.noteTitle').value.length) || el('.noteText').value.length) {
//       console.log("메모가 있다구!!");
//       let confirmRemove = confirm("저장하고 뒤로갈래?");
//       switch (confirmRemove) {
//         case true:
//           localstorageObj.savenNoteData();
//           localstorageObj.showNoteData();
//           console.log("저장했다");
//           //로컬에 저장하고 뒤로
//           break;
//         case false: console.log("지웠다 ");
//           //걍 뒤로
//           break;
//       }
//     }
//   })
// };

// //저장버튼 이벤트
// let saveBtnEvt = d => {
//   let $save = el('.save');

//   $save.addEventListener('click', function (e) {
//     e.preventDefault();

//     if ((el('.noteTitle').value.length == 0) || el('.noteText').value.length == 0) {
//       alert("note를 작성하거라");
//     }
//     else {
//       let $confirmSave = confirm("진짜로 저장?");
//       switch ($confirmSave) {
//         case true:
//           // localstorageObj.savenNoteData();
//           // localstorageObj.showNoteData();
//           console.log('저장완료');
//           break;
//         case false: console.log("저장안됨");
//           break;
//       }
//     }
//   })
// };

// //저장, 뒤로가기 버튼 이벤트 한번에
let btnAllEvt = () => {
  let buttons = elAll('.btn');

  for (const button of buttons) {
    button.addEventListener('click', function (e) {
      if ((el('.noteTitle').value.length) || el('.noteText').value.length) {
        console.log("데이터 o");
        switch (buttons.elClassName) {
          case 'save': console.log("save");
          case 'back': console.log("back");
        }
      } else {
        console.log("데이터 x");
      }
    })
  }
}


//노트 로컬 저장, 메모입력칸 초기화, 저장된 데이터 출력
let localstorageObj = {
  memoObj: {},

  savenNoteData() {
    this.memoObj.noteTitle = el('.noteTitle').value
    this.memoObj.noteText = el('.noteText').value
    let saveData = localStorage.setItem(this.memoObj.noteTitle, this.memoObj.noteText);

    el('.noteTitle').value = ''
    el('.noteText').value = ''
  },

  showNoteData() {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let list =
        `
      <div style= "border: 1px solid; width: 200px">
        <div class = "listTitle" style = "font-weight : bold">${key}</div>
        <div class = "listText">${localStorage.getItem(key)}</div>
        <button class="del">del</button>
      <div>
      `
      el('.listWrap').innerHTML += list
    }
    deleteNoList()
  }
}

//리스트 없음 텍스트 삭제
let deleteNoList = () => {
  displayEl('.noNoteList', 'none');
};

//노트 첫 화면
let noteInit = () => {
  NoteAppDom();
  NoteListDom();
  createNoteBtnEvt();
};
noteInit();

//새 노트 작성 화면 로딩
let loadNote = () => {
  writeNewNote();
  // backBtnEvt();
  // saveBtnEvt();
  btnAllEvt();
};
/*
메모 리스트에 버튼 이벤트 추가  => 로컬 데이터 지우기

*/