/**
 JadenCase 문자열 만들기
문제 설명
JadenCase란 모든 단어의 첫 문자가 대문자이고, 그 외의 알파벳은 
소문자인 문자열입니다. 단, 첫 문자가 알파벳이 아닐 때에는 이어지는 
알파벳은 소문자로 쓰면 됩니다. (첫 번째 입출력 예 참고)
문자열 s가 주어졌을 때, s를 JadenCase로 바꾼 문자열을 리턴하는 함수, 
solution을 완성해주세요.

제한 조건
s는 길이 1 이상 200 이하인 문자열입니다.
s는 알파벳과 숫자, 공백문자(" ")로 이루어져 있습니다.
숫자는 단어의 첫 문자로만 나옵니다.
숫자로만 이루어진 단어는 없습니다.
공백문자가 연속해서 나올 수 있습니다.
입출력 예
s	return
"3people unFollowed me"	"3people Unfollowed Me"
"for the last week"	"For The Last Week"
※ 공지 - 2022년 1월 14일 제한 조건과 테스트 케이스가 추가되었습니다.

 */
function solution(s) {
  let answer = [];
  s.split(" ").forEach((key) => {
    let arr = [];

    key.split("").forEach((y, j) => {
      return j === 0 ? arr.push(y.toUpperCase()) : arr.push(y.toLowerCase());
    });
    return answer.push(arr.join(""));
  });
  return answer.join(" ");
}
//리팩토링
//다른 사람 풀이 참조 하여 만듦

function solution(s) {
  let answer = "";
  s.split("").map((v, i) => {
    if (i === 0 || s.split("")[i - 1] === " ")
      return (answer += v.toUpperCase());
    return (answer += v.toLowerCase());
  });
  return answer;
}

//220607 리팩토링
function solution(s) {
  let answer = [];
  s.split(" ").forEach((x) => {
    let word = "";
    word += x[0].toUpperCase();
    word += x.substring(1).toLowerCase();
    answer.push(word);
  });

  return answer.join(" ");
}

//런타임 에러로 인하여 리팩토링 - map 활용
function solution(s) {
  let answer = s
    .split(" ")
    .map((x) => x[0].toUpperCase() + x.substring(1).toLowerCase());

  return answer.join(" ");
}
