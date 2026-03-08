<div align="center">
  <img src="https://raw.githubusercontent.com/developerHub01/ApiBolt-web/refs/heads/development/preview/og.png" alt="ApiBolt Web Banner" width="400"/>

  # ApiBolt Web

  **The community and theme marketplace for the ApiBolt REST API client.**

  [![License](https://img.shields.io/github/license/developerHub01/ApiBolt-web?style=for-the-badge&color=2E86C1)](/LICENSE)
  [![Issues](https://img.shields.io/github/issues/developerHub01/ApiBolt-web?style=for-the-badge&logo=github&color=C70039)](https://github.com/developerHub01/ApiBolt-web/issues)

</div>

This is the official web platform for **[ApiBolt](https://github.com/developerHub01/ApiBolt)**, an open-source REST API testing platform. This website serves as a central hub for the community, featuring a marketplace where developers can browse, share, and download custom themes for the ApiBolt desktop application.

## ✨ Features

-   **Theme Marketplace**: Discover a variety of themes created by the community to customize the look and feel of your ApiBolt application.
-   **User Profiles**: Sign up and create a public profile to showcase your own themes and contributions.
-   **Theme Management**: Upload, manage, and update your themes directly through the platform.
-   **Responsive Design**: A fully responsive interface to browse the marketplace on any device.

## 🛠️ Tech Stack

ApiBolt Web is built with a modern and powerful tech stack:

-   **[Nuxt 3](https://nuxt.com/)**: A powerful Vue.js framework for building server-side rendered and static websites.
-   **[Vue.js](https://vuejs.org/)**: The progressive JavaScript framework for building user interfaces.
-   **[Supabase](https://supabase.io/)**: Used for database, authentication, and storage.
-   **[Pinia](https://pinia.vuejs.org/)**: Intuitive state management for Vue.
-   **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
-   **[Shadcn-Nuxt](https://www.shadcn-nuxt.com/)**: A collection of beautifully designed and accessible UI components.
-   **[TypeScript](https://www.typescriptlang.org/)**: Brings static typing to JavaScript, enhancing code quality and developer productivity.

## 🚀 Getting Started

Follow these instructions to get the ApiBolt web platform up and running on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18.x or later recommended)
-   [pnpm](https://pnpm.io/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/developerHub01/ApiBolt-web.git
    cd ApiBolt-web
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Setup environment variables:**

    Create a `.env` file by copying the `example.env` file. You will need to add your Supabase project URL and keys.

    ```bash
    cp example.env .env
    ```

    Then run the command to generate Supabase types:
    ```bash
    pnpm gen:db:types
    ```


### Running the Application

-   **Development Mode:**

    To run the app in development mode with hot-reloading:

    ```bash
    pnpm dev
    ```

-   **Preview Mode:**

    To build and preview the production build locally:

    ```bash
    pnpm build
    pnpm preview
    ```

## 🤝 Contributing

Contributions are welcome! If you have ideas for new features, bug fixes, or improvements, feel free to open an issue or submit a pull request.

## 📜 License

This project is licensed under the MIT License.

## 🖼️ Preview

[![Website](https://raw.githubusercontent.com/developerHub01/ApiBolt-web/refs/heads/development/preview/website.png)](https://apibolt.vercel.app/)
