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

// //저장, 뒤로가기 버튼 이벤트 한번에
let buttonEvent = () => {
  let buttons = elAll('.btn');

  for (const button of buttons) {
    button.addEventListener('click', function (e) {
      if ((el('.noteTitle').value.length) && el('.noteText').value.length) {
        console.log("데이터 o");
        switch (button.className == 'save btn') {
          case true:
            condition.memoExistFunc()
            break;
          case false: console.log("back");
            condition.memoExistFunc()
            break;
        }
      } else {
        console.log("데이터 x");
        switch (button.className == 'save btn') {
          case true:
            condition.saveNoMemoExist();
            console.log("save");
            break;
          case false:
            condition.backNoMemoExist()
            console.log("back");
            break;
        }
      }
    })
  }
}

//버튼 이벤트 조건
let condition = {
  //메모가 적혀있을때 조건
  memoExistFunc() {
    let memoExist = confirm('저장할래?');
    switch (memoExist) {
      case true:
        localstorageObj.saveNoteData();
        // localstorageObj.showNoteData();
        // displayEl('.noteContent', '');
        // displayEl('.CreateNoteBtn', '');
        // displayEl('.newNoteWrap', 'none');

        alert("저장됨");
        console.log("저장됨");

        break;
      case false:
        alert("저장 취소");
        console.log("저장 취소");
        break;
    }
  },

  //메모가 없고 save눌렀을때
  saveNoMemoExist() {
    alert('메모가 없음 메모써라');
  },

  //메모가 없고 back을 눌렀을때
  backNoMemoExist() {
    let noMemoExist = confirm('메모 없음 작성 암함?');
    switch (noMemoExist) {
      case true:
        console.log("yes");
        displayEl('.noteContent', '');
        displayEl('.CreateNoteBtn', '');
        displayEl('.newNoteWrap', 'none');
        break;

      case false:
        console.log("no");
    }
  }
}

//노트 로컬 저장, 메모입력칸 초기화, 저장된 데이터 출력
let localstorageObj = {
  memoObj: {},

  saveNoteData() {
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
      el('.listWrap').insertAdjacentHTML('afterbegin', list)
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
  buttonEvent();
};