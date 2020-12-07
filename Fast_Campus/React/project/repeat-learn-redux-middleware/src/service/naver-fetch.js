class NaverFecth {
  constructor(key) {
    const myHeaders = new Headers();
    myHeaders.append("X-Naver-Client-Id", "azCfR_4mXB3maUDuLQI9");
    myHeaders.append("X-Naver-Client-Secret", "2L6p1xVCnn");
    this.key = key;
    this.getRequestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
  }

  async search(query) {
    const response = await fetch(
      // query의 값이 search하는 값
      // props에서 넘어갔을 때 값이 들어갈 것임
      `https://openapi.naver.com/v1/search/blog.json?query=신촌 피자몰&display=10`,
      this.getRequestOptions
    );
    const result = await response.json();
    return result.items.map((item) => ({ ...item, id: item.title }));
  }
}

export default NaverFecth;
