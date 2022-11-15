// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const discussionWrapper = document.createElement("div");
  discussionWrapper.className = "discussion__container--wrapper";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const answered = document.createElement("div");
 


  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const contentTitle = document.createElement('h4');
  contentTitle.className = "discussion__title";
  const contentTitleUrl =document.createElement('a');
  contentTitleUrl.href =obj.url;
  contentTitleUrl.textContent = obj.title;
  contentTitleUrl.target ='_blank';
  contentTitle.appendChild(contentTitleUrl);
  
  const contentInformation = document.createElement('div');
  contentInformation.className = 'discussion__information';
  contentInformation.textContent = `${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(contentTitle, contentInformation, answered);
  
  // 답변


  const answerWrapper = document.createElement("div"); 
  answerWrapper.className = "answer__container--wrapper"; 


  const answerAvatarWrapper = document.createElement("div");
  answerAvatarWrapper.className = "answer__avatar--wrapper";
  const answerContent = document.createElement("div");
  answerContent.className = "answer__content";
  const answercontentInformation = document.createElement('div');
  answercontentInformation.className = 'answer__information';

  const answerCheckbox =  document.createElement('div');

  if(obj.answer){
    answerCheckbox.textContent = '답변 완료 💗';
    answerCheckbox.classList.add('ok');
    answered.textContent = '답변 보기'

    const answerAvatarImg = document.createElement('img');
    answerAvatarImg.src = obj.answer.avatarUrl;
    answerAvatarImg.alt = 'avatar of ' + obj.answer.author;
    answerAvatarWrapper.append(answerAvatarImg);


    const answercontentTitle = document.createElement('p');
    answercontentTitle.className = "answer__title";
    const answercontentTitleUrl =document.createElement('a');
    answercontentTitleUrl.href =obj.answer.url;
    answercontentTitleUrl.textContent = obj.answer.author + '님의 답변';
    answercontentTitleUrl.target ='_blank';
    answercontentTitle.appendChild(answercontentTitleUrl);
    answerContent.append(answercontentTitle);

    answercontentInformation.textContent = `${new Date(obj.createdAt).toLocaleString()}`;

  }
  else{
    answerCheckbox.textContent  = '답변 대기중';
    answerCheckbox.classList.add('notOk');
  }

  answered.onclick = () => {
    li.append(discussionWrapper, answerWrapper); 
  }

  discussionAnswered.append(answerCheckbox);
  discussionWrapper.append(avatarWrapper, discussionContent, discussionAnswered);
  answerWrapper.append(answerAvatarWrapper, answerContent, answercontentInformation);
  li.append(discussionWrapper);
  return li;

};

const convertToNotice = (obj) => {
  let li = document.createElement('li');
  li.className = "notice__container";

  let noticeWrapper = document.createElement('a');
  noticeWrapper.className = "notice__container--wrapper";
  noticeWrapper.href =obj.url;
  noticeWrapper.target ='_blank';

  let noticeAvatarImg = document.createElement('div');
  noticeAvatarImg.className = "notice__avatar--wrapper";

  let noticeContent = document.createElement('div');
  noticeContent.className = "notice__content";

  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  const author = document.createElement('span');
  author.textContent = obj.author;
  noticeAvatarImg.append(avatarImg, author);

  const contentTitleNotice = document.createElement('div');
  contentTitleNotice.className = "notice__title";
  contentTitleNotice.textContent = obj.title.slice(0,obj.title.indexOf(']')+1)

  const contentTitle = document.createElement('div');
  contentTitle.className = "notice__title";
  contentTitle.textContent = obj.title.slice(obj.title.indexOf(']')+1);
  noticeContent.append(contentTitleNotice,contentTitle);

  noticeWrapper.append(noticeContent,noticeAvatarImg);
  li.append(noticeWrapper);
  return li;
}

const form = document.querySelector(".form");
const inputName = document.querySelector(".form__input--name > input");
const inputTitle = document.querySelector(".form__input--title > input");
const inputTextbox = document.querySelector(".form__textbox > textarea");

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    let data = {
      id: "anonymous",
      createdAt: new Date(),
      title: inputTitle.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions",
      author: inputName.value,
      answer: null,
      bodyHTML:
        inputTextbox.value,
      avatarUrl:
        "https://avatars.githubusercontent.com/u/79880249?s=64&v=4"
    }
    console.log(data)
    agoraStatesDiscussions.unshift(data);
    ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]))
})

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    if(!agoraStatesDiscussions[i].title.includes('[notice]')){
      element.append(convertToDiscussion(agoraStatesDiscussions[i]));
      }
  }
  return;
};

const notice_render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    if(agoraStatesDiscussions[i].title.includes('[notice]')){
    element.append(convertToNotice(agoraStatesDiscussions[i]));
    }
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
const notice_ul = document.querySelector("ul.notice__container");
const hide_button_container = document.querySelector(".form__button_container");
const hide_button = document.querySelector(".form__button");
const hide_form = document.querySelector(".form");

render(ul);
notice_render(notice_ul);

hide_button.onclick = ()=>{
  if(hide_form.classList.contains('hide')){
    hide_form.classList.remove('hide');
    hide_button.textContent = '숨기기 ⇩';
  }   
  else{
    hide_form.classList.add('hide');
    hide_button.textContent = '열기 ⇧';
  } 

}

