import { axios } from "axios";

class Naver {
  constructor(key) {
    this.naver = axios.create({
      baseURL: "https://openapi.naver.com/v1",
      params: { key: key },
    });
  }

  async search(query) {
    const response = await this.naver.get("search", {
      params: {
        display: 10,
        query: query,
      },
    });
    return response.data.items.map((item) => ({
      ...item,
      id: item.title,
    }));
  }
}

export default Naver;
