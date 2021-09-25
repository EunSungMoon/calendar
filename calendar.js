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
      <div class = "listTitle" style = "font-weight : bold"></div>
      <div class = "listText"></div>
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
      <button class= "save">Save</button>
      <button class= "back">Back</button>
      <textarea class = "noteText" placeholder = "write the note" style = "width: 400px; height: 100px; display: flex"></textarea>
      <button class = "removeNoteBtn">Remove Note</button>
    </div>
  `
  $newNote.innerHTML = newNoteDom;
};

//뒤로가기 버튼 이벤트 
let backBtnEvt = () => {
  let $back = el('.back');

  $back.addEventListener('click', () => {
    displayEl('.noteContent', '');
    displayEl('.CreateNoteBtn', '');
    displayEl('.newNoteWrap', 'none');
  })
};

//저장 -> json으로 변환? -> localstorage에 저장
//저장된 데이터는 리스트에 출력해주기
//저장 후 데이터 지우고 싶은데 배열값도 같이 지워지네... 그럼 안되지
let saveBtnEvt = d => {
  let $save = el('.save');

  $save.addEventListener('click', e => {
    e.preventDefault();
    // noteData();
    noteDataObj.noteData();

    if ((el('.noteTitle').value.length == 0) || el('.noteText').value.length == 0) {
      alert("note를 작성하거라");
    }
    else {
      let $confirmSave = confirm("진짜로 저장?");
      switch ($confirmSave) {
        case true:
          // showNoteList();
          //노트 리스트가 등장하는 함수 
          break;
        case false: console.log("저장안됨");
          break;
      }
    }
  })
};

//삭제버튼 이벤트
let removeBtnEvt = () => {
  let $removeNoteBtn = el('.removeNoteBtn');
  $removeNoteBtn.addEventListener('click', e => {

    if ((el('.noteTitle').value.length == 0) && el('.noteText').value.length == 0) {
      console.log("note를 작성하거라");
    }
    else {
      let $confirmRemove = confirm("진짜로 지울꺼냐?");
      switch ($confirmRemove) {
        case true: console.log("지움");
          //리스트에 저장 안되는 함수
          break;
        case false: console.log("안지움");
          //리스트가 그대로 저장
          break;
      }
    }
  })
};

//노트 로컬 저장해보자
//제목, 내용 각각 배열에 push해줌 -> json으로 변환 -> localstorage에 저장
//고민... 제목과 내용을 각각 배열에 넣어서 json으로 변환, 가져오는 과정이 괜찮을까...? 더 좋은 방법은 없는걸까?
//각각 배열을 객체로 만들어보자 key=title, value=text로
// let noteData = () => {
//   let $noteTitle = el('.noteTitle');
//   let $noteText = el('.noteText');
//   let noteTitleArray = [];
//   let noteTextArray = [];

//   noteTitleArray.push($noteTitle.value);
//   noteTextArray.push($noteText.value);
//   let noteTitleJson = JSON.stringify(noteTitleArray);
//   let noteTextJson = JSON.stringify(noteTextArray);

//   console.log(noteTitleJson);
//   console.log(noteTextJson);
// };

// let showNoteList = () => {
//   console.log("저장완료");

//   displayEl('.noNoteList', 'none');
// };

let noteDataObj = {
  $noteTitle: el('.noteTitle'),
  $noteText: el('.noteText'),
  noteTitleArray:[],
  noteTextArray: new Array,

  noteData() {
    // this.noteTitleArray.push(this.$noteTitle.value);
    // this.noteTextArray.push(this.$noteText.value);
    // let noteTitleJson = JSON.stringify(this.noteTitleArray);
    // let noteTextJson = JSON.stringify(this.noteTextArray);

    // console.log(this.noteTitleJson);
    // console.log(this.noteTextJson);
  }
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
  backBtnEvt();
  saveBtnEvt();
  removeBtnEvt();
};


let obj = {
  name: 'lee',
  sayHi() {
    console.log(`hi ${this.name}`);
  }
};