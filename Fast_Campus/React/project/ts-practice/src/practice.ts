interface Person {
  name: string;
  age?: number;
}

interface Developer extends Person {
  skills: string[];
}

const person: Person = {
  name: "Junnna",
  age: 27,
};

const expert: Developer = {
  name: "Hyoung",
  skills: ["JavaScript", "React", "TypeScript"],
};
