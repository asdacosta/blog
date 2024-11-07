import firstLaptop from "../../assets/firstLaptop.jpg";
import secLaptop from "../../assets/secLaptop.jpg";
import lastLaptop from "../../assets/lastLaptop.jpg";

const content = [
  {
    header: "Programming Languages",
    commentNum: "0",
    img: firstLaptop,
    alt: "First Blog",
    link: "/article/1",
    text: [
      "Programming languages are essential tools in computer science, shaping how software developers and engineers communicate with computers to build applications, websites, and systems. Each programming language comes with its own syntax, design, and capabilities, making it suited for different types of projects and goals. Here’s a closer look at some major types of programming languages, how they differ, and where they’re used.",
      "High-Level Languages: These are designed to be closer to human language, which makes them easier to read and write. Examples include Python, Java, and C++. These languages are generally abstracted from machine code, making development faster and more accessible.",
      "Low-Level Languages: Closer to machine code, these languages are less abstract and more hardware-specific. Assembly language and Machine code are typical examples. They are mainly used in system programming, where direct memory and CPU management are needed.",
      "Popular Programming Languages:",
      "Python: Known for its simplicity and readability, Python is a versatile language used in web development, data science, artificial intelligence, and automation. It has a strong community and extensive libraries, which makes it a go-to for both beginners and experts.",
      "JavaScript: A core language for web development, JavaScript is essential for creating dynamic and interactive web content. It's primarily used on the front end, but with the advent of Node.js, it’s also widely used on the server side.",
    ],
    comments: [
      { user: "Ace", comment: "Anything ah anything.", date: "Date" },
      { user: "Draco", comment: "Once again.", date: "Date Now" },
    ],
  },
  {
    header: "Taking Notes",
    comments: 0,
    img: secLaptop,
    alt: "Second Blog",
    link: "/article/2",
  },
  {
    header: "Settings",
    comments: 0,
    img: lastLaptop,
    alt: "Last Blog",
    link: "/article/3",
  },
];

export { content };
