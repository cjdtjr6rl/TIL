class NaverFecth {
  constructor(key) {
    this.key = key;
    this.getRequestOptions = {
      method: "GET",
      redirect: "foll ow",
    };
  }

  async search(query) {
    const response = await fetch(
      // query의 값이 search하는 값
      // props에서 넘어갔을 때 값이 들어갈 것임
      `https://openapi.naver.com/v1/search/blog.json?query=${query}&display=10&key=${this.key}`,
      this.getRequestOptions
    );
    const result = await response.json();
    return result.items.map((item) => ({ ...item, id: item.title }));
  }
}

export default NaverFecth;
