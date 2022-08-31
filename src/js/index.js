// ## 🎯 step1 요구사항 - 돔 조작과 이벤트 핸들링으로 메뉴 관리하기

// 요구사항 분석

// TODO 메뉴 추가
// - [✅] 메뉴 이름을 입력 받고 확인 버튼 누르면 메뉴가 추가된다.
// - [✅] 메뉴 이름을 입력 받고 엔터키 입력으로 추가한다.
// - [✅]추가되는 메뉴의 아래 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
// - [✅] 총 메뉴 갯수를 count하여 상단에 보여준다.
// - [✅] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// - [✅] 사용자 입력값이 빈 값이라면 추가되지 않는다.

// TODO 메뉴 수정
// - [✅] 메뉴의 수정 버튼을 눌러 메뉴 이름 수정할 수 있다.
// - [✅] 메뉴 수정시 브라우저에서 제공하는 `prompt` 인터페이스를 활용한다.
// - [✅] `prompt` 인터페이스에서 메뉴명 수정 후 확인 버튼 또는 엔터키 입력으로 수정된다.

// TODO 메뉴 삭제
// - [✅] 메뉴 삭제 버튼을 이용하여 메뉴 삭제할 수 있다.
// - [✅] 메뉴 삭제시 브라우저에서 제공하는 `confirm` 인터페이스를 활용한다.
// - [✅] 총 메뉴 갯수를 count하여 상단에 보여준다.

// 코드 작성 후 리팩터링 => 코드 중복을 줄이고 가독성을 높여준다.
// 리팩터링 후 코드 정상 작동하는지 꼭 확인 => 테스트 코드 활용

const $ = (selector) => document.querySelector(selector);

function App() {
  const updateMenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  const addMenuName = () => {
    if ($("#espresso-menu-name").value === "") {
      alert("메뉴 이름을 입력해주세요.");
      return;
    }
    const espressoMenuName = $("#espresso-menu-name").value;
    const menuItemTemplate = (espressoMenuName) => {
      return `<li class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
            <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
            >
                수정
            </button>
            <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
            >
                삭제
            </button>
            </li>`;
    };
    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      menuItemTemplate(espressoMenuName)
    );
    updateMenuCount();
    $("#espresso-menu-name").value = "";
  };

  const editMenuName = (e) => {
    // closest라는 메서드를 이용해서 클릭한 수정버튼에 가장 가까운 li 태그를 찾음 +
    // element 안의 text의 값을 가져오는 innerText 메서드 사용
    // 반복 사용하는 코드 변수명 앞에 $붙이고 따로 만들어줘 훨씬 더 간결한 코드 작성.
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const editedMenuName = prompt(
      "수정하고 싶은 메뉴 이름을 입력해주세요.",
      $menuName.innerText
    );
    // 입력한 이름으로 수정 완료
    $menuName.innerText = editedMenuName;
  };

  const removeMenu = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      e.target.closest("li").remove();
      updateMenuCount(e);
    }
  };

  // event 위임
  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      editMenuName(e);
    }

    if (e.target.classList.contains("menu-remove-button")) {
      removeMenu(e);
    }
  });

  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#espresso-menu-submit-button").addEventListener("click", addMenuName);

  // 'Enter'키가 아닌 다른 키를 눌렀을 때 alert 뜨는 것 방지
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    addMenuName();
  });
}

App();
