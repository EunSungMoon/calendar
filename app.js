/******************************************************************************************
-날짜 관련 함수 정리(공부한거 까먹으면 아깝자나....ㅜ)
getFullYear() : 연도 반환
getMonth() : 월 반환 1월-12월 -> 0-11 (해당하는 월을 출력하고 싶을때 getMonth()+1로 해줌)
getDay() : sunday-saturday -> 0-6
getDate() : 일 반환
-버튼 타입에 관련한 내용(새로 알게 된 사실이라 적어둠!!)
버튼 타입 3가지 : submit, button, reset
submit : 타입 명시가 없다면 기본 타입. form 테그로 버튼이 감싸져있을 경우 
        버튼 클릭 시 새로고침 됨 => onsubmit ="return false" 해주면 해결

        **마크업 측면에서 버튼의 기능을 명시해주는 것이 좋다
button : 클릭해도 기능없음. 기능함수를 만들면 기능을 실행하기 위한 대상의 역할
reset : 버튼을 감싸고 있는 form 데이터의 입력된 데이터를 초기화
*****************************************************************************************/
/**
todolist
1. 날짜 클릭 -> 색 바뀌기, 날짜, 요일 바뀌기, 다른 날짜 선택 시 이전선택 날짜 글씨 색 바꾸기
2. for문 foreach로 바꾸기
3. 메모장 만들기
  - 메모
  - 날짜, 시간 출력
  - todolist 기능 삭제
  - 메모 데이터를 json형태로 저장, 받아오기 
4. 스케줄러 만들기
  - 날짜 클릭 -> 스케줄러 화면 나오기
  - 제목 입력
  - 날짜, 시간 선택(데이트피커?)
  - 하루종일
  - 반복(매년, 매월)
5. 디데이 만들어볼까?

**/

let el = selector => document.querySelector(selector);
let elAll = selector => document.querySelectorAll(selector);
let dom = selector => document.createElement(selector)

let currenTitle = el('#current-year-month');
let calendarBody = el('#calendar-body');
let today = new Date();
let first = new Date(today.getFullYear(), today.getMonth(), 1);
let dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let notLeapYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let pageFirst = first;
let pageYear;

//윤달
if (first.getFullYear() % 4 === 0) {
  pageYear = leapYear
} else {
  pageYear = notLeapYear
}

//캘린더 그리기
let showCalendar = () => {
  let monthCnt = 100;
  let cnt = 1;

  for (let i = 0; i < 6; i++) { //주 단위
    let $tr = dom('tr');
    $tr.setAttribute('id', monthCnt);
    monthCnt++;

    for (let j = 0; j < 7; j++) { //요일 단위
      //빈칸을 만드려면 빈칸에 해당하는 조건을 만드는게 당연하지!!
      //시작요소 : 첫번째 주라면 시작하는 요일부터 날짜를 출력하기 위한 설정 
      //마지막요소 : 월마다 총 일수가 다르기 때문에 pageYear에 월마다 일수를 넣음. 비교하면서 출력

      if ((i === 0 && j < first.getDay()) || cnt > pageYear[first.getMonth()]) {
        let $td = dom('td');
        $tr.appendChild($td);
      }
      else {
        let $td = dom('td');
        $td.textContent = cnt;
        $td.setAttribute('id', cnt);
        $tr.appendChild($td);
        cnt++;
      }
    }
    calendarBody.appendChild($tr);
  }
}

//월 출력
let showMonth = () => {
  currenTitle.innerHTML = `${monthList[first.getMonth()]} ${first.getFullYear()}`
}

//달력 업데이트
let removeCalendar = () => {
  let catchTr = 100;
  for (let i = 100; i < 106; i++) {
    let $tr = document.getElementById(catchTr);
    $tr.remove();
    catchTr++;
  }
}

//이전, 다음 월 계산
let calendarCal = e => {
  today = new Date(today.getFullYear(), today.getMonth() - e, today.getDate());
  pageFirst = new Date(first.getFullYear(), first.getMonth() - e, 1);
  first = pageFirst;

}

//이전, 다음 월 이동 버튼
let btnEvt = () => {
  el('.btn-wrap').addEventListener('click', e => {
    if (e.target.id == 'prev') {
      removeCalendar();
      calendarCal(1)
      showMonth();
      showCalendar();
      showMain();

    } else if (e.target.id == 'next') {
      removeCalendar();
      calendarCal(-1)
      showMonth();
      showCalendar();
      showMain();
    }
  })
}

//오늘 날짜 출력
let showMain = () => {
  let mainTodayDay = el('.main-day');
  let mainTodayDate = el('.main-date');
  mainTodayDay.innerHTML = dayList[today.getDay()];
  mainTodayDate.innerHTML = today.getDate();

  let todayDate = document.getElementById(today.getDate());
  addActive(todayDate);
}

//날짜 클릭 -> 그 날짜, 요일 출력 =>다음이 안되네
let clickToday = () => {
  el('.calendar-body').addEventListener('click', e => {
    let todaySel = document.getElementById(today.getDate());

    if (e.target.id) {
      removeActive(todaySel);
      addActive(e.target);
    }
  })
}

//active class 삭제 
let removeActive = e => {
  if (e.className == 'active') {
    e.classList.remove('active');
    e.style.color = '';
  }
}

//active class 추가
let addActive = e => {
  e.classList.add('active');
  e.style.color = 'red';
}

//todolist 추가
let addList = () => {
  let $inputBox = el('.input-box');
  if ($inputBox.value.length == 0) {
    alert('Please enter a task');
  } else {
    el('.input-list ul').innerHTML +=
      `<li>${$inputBox.value} <button class="delText">X</button></li>`
  }
  $inputBox.value = '';
}

//todolist 추가 이벤트 함수
let addListFunc = () => {
  el('.input-data').addEventListener('click', addList);
}

//list 삭제 
let delEvt = () => {
  el('.list').addEventListener('click', e => {
    e.target.className ? e.target.parentNode.remove() : '';
  })
}

let init = () => {
  showCalendar();
  showMonth();
  btnEvt();
  showMain();
  addListFunc();
  delEvt();
  clickToday();
}
init();