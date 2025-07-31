# React Curriculum Render

A robust and optimized Server-Side Rendering (SSR) service, built with **React**, state management via **Redux**, styling with **SCSS**, and focused on data efficiency through a **single API request**.

---

## Technologies Used

This project was developed using the following main technologies:

* **React:** JavaScript library for building reactive and component-based user interfaces.
* **Redux:** Library for global application state management, ensuring predictability and ease of debugging.
* **Server-Side Rendering (SSR):** Initial React rendering on the server, providing better loading performance, improved SEO, and a faster user experience.
* **Vite:** Optimizes the overall application development process.
* **SCSS (Sass):** CSS pre-processor that adds features like variables, mixins, and nesting, making styling more organized and scalable.

---

## Key Features

* **Optimized Performance:** Thanks to SSR, pages load faster and content is visible almost instantly.
* **Centralized State Management:** Redux offers a clear architecture for handling complex application state.
* **Efficient Styling:** SCSS allows for modular and easily maintainable style development.
* **Bandwidth Saving:** The single API request eliminates the overhead of multiple HTTP calls, crucial for Vercel's free tier and for users with limited connections.
* **SEO Friendly:** Pre-rendered content in HTML facilitates indexing by search engines.

---

## How to Run the Project Locally

Follow these steps to set up and run the project on your machine:

### Prerequisites

Make sure you have the following tools installed:

* Node.js (LTS version recommended)
* npm or Yarn

### Setup

1.  Clone this repository:
    ```bash
    git clone [https://github.com/blink992/react_curriculum_render.git](https://github.com/blink992/react_curriculum_render.git)
    cd react_curriculum_render
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **API Configuration:**
    This project expects a **RESTful resume API** to be running at an accessible address.

    * Create a `.env` file in the project root (if necessary) and define your API's URL:
        ```
        VITE_API_URL=http://localhost:8000/api
        ```
    * Ensure the API is running and accessible.

---

### Running the Project

To start the development server:

```bash
npm run dev
````

The application will be available at `http://localhost:3000` (or another available port).
You can access /login for log with you username and password or /curriculum:token for receive the resume by token, for example: http://localhost:3000/curriculum/token_code_12345.
You can get a token when registering your resume data or after log in, a new token is generated every time you access the resume

The Register Curriculum Service is in development.
-----

## Project Structure

```
react-curriculum-render/
├── src/
│   ├── components/         # Reusable React components
│   ├── features/           # Components that interact with Redux, i.e., have global state
│   ├── static/             # Global and component SCSS files
│   │   └── scss/
│   │       ├── partials/   # SCSS partials
│   │       └── main.scss   # Main SCSS file that imports all partials
│   ├── types/              # TypeScript types, typing objects returned by the data API
│   ├── App.tsx             # Main application component
|   ├── custom.d.ts         # Type declaration file
|   ├── store.ts            # Redux store
│   └── main.tsx            # Client entry point
├── package.json            # Project dependencies and scripts
└── README.md
```

-----

## Contribution

Contributions are welcome\! If you have suggestions, found a bug, or want to add a feature:

1.  Fork the project.
2.  Create a new branch (`git checkout -b feature/my-feature`).
3.  Make your changes and commit (`git commit -am 'feat: Add new feature X'`).
4.  Push to the branch (`git push origin feature/my-feature`).
5.  Open a Pull Request.

-----

## License

This project is licensed under the MIT license. See the [LICENSE](./LICENSE.md) file for more details.

-----

## Contact

Pedro Arthur Gregorio Abreu - [pedro.agb2004@gmail.com](mailto:pedro.agb2004@gmail.com)

Project Link: [`https://react-curriculum-render.vercel.app/login`](https://react-curriculum-render.vercel.app/login)

GitHub Link: [`https://github.com/meiyo-aru/react-curriculum-render`](https://github.com/meiyo-aru/react-curriculum-render)

-----
