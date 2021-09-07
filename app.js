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

if (first.getFullYear() % 4 === 0) {
  pageYear = leapYear
} else {
  pageYear = notLeapYear
}

let showCalendar = () => {
  let monthCnt = 100;
  let cnt = 1;

  for (let i = 0; i < 6; i++) {
    let $tr = dom('tr')
    $tr.setAttribute('id', monthCnt);
    for (let j = 0; j < 7; j++) {
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
    monthCnt++;
    calendarBody.appendChild($tr);
  }
}
showCalendar();

let showMonth = ()=>{
  currenTitle.innerHTML=`${monthList[first.getMonth()]} ${first.getFullYear()}`
}
showMonth();

//달력 업데이트
let removeCalendar = () => {
  let catchTr = 100;
  for (let i = 100; i < 106; i++) {
    let $tr = document.getElementById(catchTr);
    $tr.remove();
    catchTr++;
  }
}

// let prev = () => {
//   inputBox.value = '';
//   const $divs = elAll('#input-list > div');
//   $divs.forEach(e => {
//     e.remove();
//   });
//   const $btns = elAll('#input-list > button');
//   $btns.forEach(e1 => {
//     e1.remove();
//   });
//   if (pageFirst.getMonth() === 1) {
//     pageFirst = new Date(first.getFullYear() - 1, 12, 1);
//     first = pageFirst;
//     if (first.getFullYear() % 4 === 0) {
//       pageYear = leapYear
//     } else {
//       pageYear = notLeapYear
//     }
//   } else {
//     pageFirst = new Date(first.getFullYear(), first.getMonth() - 1, 1);
//     first = pageFirst
//   }
//   today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()) //수상
//   currenTitle.innerHTML = `${monthList[first.getMonth()]} ${first.getFullYear()}`
//   removeCalendar();
//   showCalendar();
//   showMain();
//   clickedDate1 = dom('#today.getDate()');
//   clickedDate1.classList.add('active');
//   clickStart();
//   reshowingList();
// }

// let next = () => {
//   inputBox = '';
//   const $divs = elAll('#input-list > div');
//   $divs.forEach(e => {
//     e.remove();
//   });
//   const $btns = elAll('#input-list > button');
//   $btns.forEach(e1 => {
//     e1.remove();
//   });
//   if (pageFirst.getMonth() === 12) {
//     pageFirst = new Date(first.getFullYear() + 1, 1, 1);
//     first = pageFirst;
//     if (first.getFullYear() % 4 === 0) {
//       pageYear = leapYear;
//     } else {
//       pageYear = notLeapYear;
//     }
//   } else {
//     pageFirst = new Date(first.getFullYear(), first.getMonth() + 1, 1);
//     first = pageFirst;
//   }
//   today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()) //수상
//   currenTitle.innerHTML = `${monthList[first.getMonth()]} ${first.getFullYear()}`
//   removeCalendar();
//   showCalendar();
//   showMain();
//   clickedDate1 = el('#today.getDate()');
//   clickedDate1.classList.add('active');
//   clickStart();
//   reshowingList();
// }

// let showMain = () => {
//   mainTodayDay.innerHTML = dayList[today.getDay()];
//   mainTodayDay.innerHTML = today.getDay();
// }

// let clickedDate1 = document.getElementById(today.getDate());
// clickedDate1.classList.add('active');
// let prevBtn = el('#prev');
// let nextBtn = el('#next');
// prevBtn.addEventListener('click', prev);
// nextBtn.addEventListener('click', next);

// let tdGroup = [];
// let clickStart = () => {
//   for (let i = 1; i <= pageYear[first.getMonth()]; i++) {
//     if(tdGroup[i].classList.contains('actvie')){
//       tdGroup[i].classList.remove('active');
//     }
//   }
//   clickedDate1.e.currenTarget;
//   clickedDate1.classList.add('active');
//   today=new Date(today.getFullYear(), today.getMonth(), clickedDate1.id);
//   showMain();
//   keyValue=`${today.getFullYear()} ${today.getMonth()} ${today.getDate()}`;
//   reshowingList();
// }