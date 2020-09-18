type Person = {
  name: string;
  age?: number;
};

type Developer = Person & {
  skills: string[];
};

const person: Person = {
  name: "Junnna",
  age: 27,
};

const expert: Developer = {
  name: "Hyoung",
  skills: ["JavaScript", "React", "TypeScript"],
};

type People = Person[];
const people: People = [person, expert];

type Color = "red" | "orange" | "yellow";
const color: Color = "orange";
