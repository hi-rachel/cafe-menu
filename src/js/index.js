// 요구사항 분석

// ## 🎯 step1 요구사항 - 돔 조작과 이벤트 핸들링으로 메뉴 관리하기

// TODO 메뉴 추가
// - [✅] 메뉴 이름을 입력 받고 확인 버튼 누르면 메뉴가 추가된다.
// - [✅] 메뉴 이름을 입력 받고 엔터키 입력으로 추가한다.
// - [✅]추가되는 메뉴의 아래 마크업은 `<ul id="menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
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

// 🎯 step2 요구사항 - 상태 관리로 메뉴 관리하기

// TODO localStorage Read & Write
// - [✅] localStorage에 데이터를 저장한다.
// - [✅] 메뉴를 추가할 때 데이터를 저장한다.
// - [✅] 메뉴를 수정할 때 데이터를 저장한다.
// - [✅] 메뉴를 삭제할 때 데이터를 저장한다.
// - [✅] localStorage에 있는 데이터를 읽어온다.
//(https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)

// TODO 카테고리별 메뉴판 관리
// - [✅] 에스프레소 메뉴판 관리
// - [✅] 프라푸치노 메뉴판 관리
// - [✅] 블렌디드 메뉴판 관리
// - [✅] 티바나 메뉴판 관리
// - [✅] 디저트 메뉴판 관리 (각각의 종류별로 관리할 수 있게 만든다.)

// TODO 페이지 접근시 최초 데이터 Read & Rendering
// - [✅] 페이지에 최초 로딩시 localStorage의 에스프레소 메뉴를 읽어온다.
// - [✅] 에스프레소 메뉴를 페이지에 보여준다.

// TODO 품절 관리
// - [✅] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가한다.
// - [✅] 품절 버튼을 누르면 `sold-out` class를 추가하여 상태를 변경한다.
// - [✅] 품절 버튼을 누르면 localStorage에 상태값이 저장된다.
// - [✅] 품절 상태에서 버튼을 다시 한번 누르면 `sold-out` class가 제거된다.
// - [✅] 품절 상태에서 버튼을 다시 한번 누르면 localStorage에 상태값이 저장된다.

// 🙌🏼 추가하고 싶은 기능
// - [ ] 새로고침시 원래 보던 페이지를 사용자에게 보여주는 기능
// - [ ] 카테고리 추가 / 삭제 기능

// ## 🎯 step3 요구사항 - 서버와의 통신을 통해 메뉴 관리하기

// TODO 서버 요청 부분
// - [✅] [링크](https://github.com/blackcoffee-study/moonbucks-menu-server)에 있는 웹 서버 저장소를 clone하여 로컬에서 웹 서버를 실행시킨다.
// - [✅] 웹 서버를 띄운다.
// - [✅] 서버에 새로운 메뉴명이 추가될 수 있도록 요청한다.
// - [✅] 서버에 카테고리별 메뉴리스트를 요청한다.
// - [ ] 서버에 메뉴 이름이 수정될 수 있도록 요청한다.
// - [ ] 서버에 메뉴의 품절 상태를 토글 될 수 있도록 요청한다.
// - [ ] 서버에 메뉴가 삭제 될 수 있도록 요청한다.

// TODO 리팩터링 부분
// - [ ] localStorage에 저장하는 로직은 지운다.
// - [ ] fetch 비동기 api를 사용하는 부분을 async await을 사용하여 구현한다.

// TODO 사용자 경험
// - [ ] API 통신이 실패하는 경우에 대해 사용자가 알 수 있게[alert](https://developer.mozilla.org/ko/docs/Web/API/Window/alert)로 예외처리를 진행한다.
// - [ ] 중복되는 메뉴는 추가할 수 없다.

import { $ } from "./utils/dom.js";
import store from "./store/index.js";

const BASE_URL = "http://localhost:3000/api";

const MenuApi = {
  async getAllMenuByCategory(category) {
    const response = await fetch(`${BASE_URL}/category/${category}/menu`);
    return response.json();
  },
  async createMenu(category, name) {
    const response = await fetch(`${BASE_URL}/category/${category}/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      console.error(response);
    }
  },
  async editMenu(category, name, menuId) {
    const response = await fetch(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );
    if (!response.ok) {
      console.error(response);
    }
    return response.json();
  },
};

function App() {
  // 상태(= 변하는 데이터) - 메뉴명
  // 초기화 + 데이터 형태 선언(배열)
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  this.currentCategory = "espresso";

  this.init = async () => {
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory
    );
    renderMenu();
    initEventListeners();
  };

  const renderMenu = () => {
    const template = this.menu[this.currentCategory]
      .map((item, index) => {
        return `<li data-menu-id="${
          item.id
        }" class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name ${item.soldOut ? "sold-out" : ""}">${
          item.name
        }</span>
          <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
  >
    품절
  </button>
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
      })
      .join("");

    $("#menu-list").innerHTML = template;
    updateMenuCount();
  };

  const updateMenuCount = () => {
    const menuCount = this.menu[this.currentCategory].length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  const addMenuName = async () => {
    if ($("#menu-name").value === "") {
      alert("메뉴 이름을 입력해주세요.");
      return;
    }
    const menuName = $("#menu-name").value;
    await MenuApi.createMenu(this.currentCategory, menuName);
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory
    );
    renderMenu();
    $("#menu-name").value = "";
  };

  const editMenuName = async (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const editedMenuName = prompt(
      "수정하고 싶은 메뉴 이름을 입력해주세요.",
      $menuName.innerText
    );
    await MenuApi.editMenu(this.currentCategory, editedMenuName, menuId);
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory
    );
    renderMenu();
  };

  const removeMenu = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      this.menu[this.currentCategory].splice(menuId, 1);
      store.setLocalStrage(this.menu);
      renderMenu();
    }
  };

  const soldOutMenu = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    this.menu[this.currentCategory][menuId].soldOut =
      !this.menu[this.currentCategory][menuId].soldOut;
    store.setLocalStrage(this.menu);
    renderMenu();
  };

  const initEventListeners = () => {
    // event 위임
    $("#menu-list").addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-edit-button")) {
        editMenuName(e);
        // 뒷 부분과 관련없이 실행되는 함수가 연속으로 있을 때 return을 해주어 불필요한 연산을 줄여줌.
        return;
      }

      if (e.target.classList.contains("menu-remove-button")) {
        removeMenu(e);
        return;
      }

      if (e.target.classList.contains("menu-sold-out-button")) {
        soldOutMenu(e);
        return;
      }
    });

    $("#menu-form").addEventListener("submit", (e) => {
      e.preventDefault();
    });

    $("#menu-submit-button").addEventListener("click", addMenuName);

    // 'Enter'키가 아닌 다른 키를 눌렀을 때 alert 뜨는 것 방지
    $("#menu-name").addEventListener("keypress", (e) => {
      if (e.key !== "Enter") {
        return;
      }
      addMenuName();
    });

    $("nav").addEventListener("click", async (e) => {
      const isCategoryBtn = e.target.classList.contains("cafe-category-name");
      if (isCategoryBtn) {
        const categoryName = e.target.dataset.categoryName;
        this.currentCategory = categoryName;
        $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
        this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
          this.currentCategory
        );
        renderMenu();
      }
    });
  };
}

const app = new App();
app.init();
// new 키워드를 사용하여 생성자 함수를 호출하게 되면 이때의 this는 "만들어질 객체"를 참조한다.
