const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));

sleep(1000).then(() => console.log("Hello World"));

// { id, title, body }
const posts = [
  {
    id: 1,
    title: "redux-middleware를 배워봅시다.",
    body: "redux-middleware를 직접 만들어보면 이해하기가 쉽죠.",
  },
  {
    id: 2,
    title: "redux-thunk를 배워봅시다.",
    body: "redux-thunk를 사용해서 비동기 작업을 처리해보아요.",
  },
  {
    id: 3,
    title: "redux-saga를 배워봅시다.",
    body: "redux-saga를 나중에 사용해서 비동기 작업을 처리할거에요.",
  },
];

export const getPosts = async () => {
  await sleep(500);
  return posts;
};

export const getPostById = async (id) => {
  await sleep(500);
  return posts.find((post) => post.id === id);
};
