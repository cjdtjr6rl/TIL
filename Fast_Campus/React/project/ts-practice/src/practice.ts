type Items<T, V> = {
  list: T[];
  value: V;
};

const items: Items<number, string> = {
  list: [1, 2, 3],
  value: "aaa",
};
