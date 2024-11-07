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
    commentNum: "0",
    img: secLaptop,
    alt: "Second Blog",
    link: "/article/2",
    text: [
      "Taking notes is an essential skill for programmers, whether you're learning a new language, troubleshooting a project, or keeping track of complex code logic. Effective notes can help you retain information, work more efficiently, and quickly revisit critical details. Here’s how you can make your notes more useful and organized for programming.",
      "Learning: If you’re learning a new language, framework, or concept, notes can help reinforce your understanding and serve as a reference.",
      "Documentation: Documenting code, functions, and processes can save time and make it easier for others (or future you!) to understand your work.",
      "Troubleshooting: Noting down errors, solutions, and thought processes can help you avoid repetitive issues and streamline problem-solving.",
      "Notes are most useful when they’re relevant and up-to-date. Periodically revisit your notes, refine them, add new insights, or remove outdated content. This habit keeps your notes sharp and aligned with your current knowledge level.",
    ],
    comments: [
      { user: "Ace", comment: "Anything ah anything.", date: "Date" },
      { user: "Draco", comment: "Once again.", date: "Date Now" },
    ],
  },
  {
    header: "Settings",
    commentNum: "0",
    img: lastLaptop,
    alt: "Last Blog",
    link: "/article/3",
    text: [
      "Creating a physical setup optimized for programming can make a huge difference in comfort, focus, and overall productivity. Here are some important considerations for designing a workspace for programming:",
      "Ergonomic Chair: Invest in an adjustable, ergonomic chair with lumbar support to maintain good posture during long coding sessions. Look for one with adjustable height, armrests, and seat depth.",
      "Desk Space: Ensure you have enough desk space to comfortably accommodate your monitors, keyboard, mouse, and any other peripherals you need. Keep it clear to avoid distractions.",
      "Setting up a workspace optimized for programming isn’t only about comfort—it’s also about efficiency and focus. These adjustments can help create a productive environment where you can code comfortably for hours.",
    ],
    comments: [
      { user: "Ace", comment: "Anything ah anything.", date: "Date" },
      { user: "Draco", comment: "Once again.", date: "Date Now" },
    ],
  },
];

export { content };
