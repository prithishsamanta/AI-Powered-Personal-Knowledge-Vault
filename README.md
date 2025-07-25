# AI-Powered-Personal-Knowledge-Vault

A secure, full-stack, cloud-based note-taking platform that uses OpenAI to automatically summarize your notes. Organize thoughts in tabs, find content instantly, and never lose the big picture again.

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![OpenAI](https://img.shields.io/badge/AI-OpenAI-lightgrey)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🚀 Features

- ✍️ Create, edit, and organize notes into folders/tabs
- 🤖 One-click AI summarization using OpenAI GPT
- 🔒 User authentication (Sign up / Log in with JWT)
- 🌐 Cross-device access with cloud data sync
- 📦 MongoDB Atlas for persistent storage
- ☁️ Optional support for file uploads (PDFs, images)
- ⚙️ Real-time note saving with full-text search
- 🛡️ Secure backend with hashed credentials and token-based auth

---

## 🧱 Tech Stack

| Layer        | Technologies                                 |
|--------------|----------------------------------------------|
| **Frontend** | React.js, React Router, Tailwind CSS (if used) |
| **Backend**  | Node.js, Express                             |
| **Database** | MongoDB Atlas, Mongoose                      |
| **AI**       | OpenAI API (GPT-4)                           |
| **Security** | JWT, bcryptjs                                |
| **DevOps**   | Docker, GitHub Actions (CI/CD)               |

---

## 📸 Screenshots

_coming soon_

---

## 🔧 Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ai-knowledge-vault.git
cd ai-knowledge-vault
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

Start the server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🌐 API Endpoints

> All protected routes require an `Authorization: Bearer <token>` header.

| Method | Endpoint                     | Description              |
|--------|------------------------------|--------------------------|
| POST   | `/api/auth/signup`           | Register a new user      |
| POST   | `/api/auth/login`            | Log in and get JWT token |
| GET    | `/api/notes`                 | Get all notes            |
| GET    | `/api/notes/:id`             | Get one note             |
| POST   | `/api/notes`                 | Create new note          |
| PUT    | `/api/notes/:id`             | Update a note            |
| DELETE | `/api/notes/:id`             | Delete a note            |
| POST   | `/api/notes/:id/summary`     | Generate AI summary      |

---

## 🧠 AI Integration

- This project uses OpenAI's gpt-3.5-turbo model [OpenAI’s GPT API](https://platform.openai.com/) to generate automatic summaries of notes.
- Summaries are stored alongside the original note in MongoDB.

---

## ✍️ Author

**Prithish Samanta**  
M.S. in Computer Science @ NC State University  
[LinkedIn]([https://www.linkedin.com/in/your-profile](https://www.linkedin.com/in/prithish-samanta/))  
[GitHub](https://github.com/prithishsamanta)  
[Portfolio]([https://your-portfolio.com](https://prithishsamanta.github.io/Portfolio/index.html))

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🌟 Contributions

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
