# LingoSummar

React frontend for LingoSummar — a text summarization web app. Paste text or upload a file (TXT, PDF, DOCX) and get a concise summary powered by the LingoSummar API.

**Live app:** <https://lingosummar.michaelogunjimi.com>  
**API:** <https://lingosummar-api.fastapicloud.dev/api/v1>

---

## Tech Stack

- **Framework:** React 18 + Vite
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **HTTP:** Axios, Fetch API
- **File Upload:** react-dropzone
- **Deployment:** Netlify

---

## Features

- Paste text or upload TXT, PDF, or DOCX files
- Set summary compression percentage (30–80%)
- Animated typing effect on summary reveal
- Optional save history — toggle on/off with a Firebase UID stored in localStorage
- Re-summarize any saved text at a different compression level
- Responsive, mobile-first UI

---

## Project Structure

```
src/
├── App.jsx                   # Root component, routing, global state
├── main.jsx                  # React entry point
├── config/
│   └── api.js               # API base URL and endpoint definitions
└── components/
    ├── Header.jsx
    ├── SummaryForm.jsx       # Text input + file upload form
    ├── TypingSummary.jsx     # Animated summary display
    ├── Summary.jsx           # Summary card
    ├── SummaryView.jsx       # Detail view for a saved summary
    ├── Sidebar.jsx
    └── utilities/            # Button, Spinner, Toggle, InputComponent, etc.
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Configure environment

Create a `.env.local` for local development:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
```

### 3. Start the dev server

```bash
npm start
```

App runs at <http://localhost:3000>. The API base URL defaults to `http://127.0.0.1:8000/api/v1` in development (override with `VITE_API_BASE_URL`).

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start Vite dev server on port 3000 |
| `npm run build` | Build for production → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint with auto-fix |

---

## Deployment (Netlify)

The app deploys automatically from the `main` branch.

- **Build command:** `npm run build`
- **Publish directory:** `dist`

The production API URL (`https://lingosummar-api.fastapicloud.dev/api/v1`) is hardcoded in `src/config/api.js` for production builds — no Netlify env var is needed.

---

## API Configuration

All endpoints are defined in `src/config/api.js`. The base URL switches automatically between dev and prod:

```js
// Development  →  VITE_API_BASE_URL || http://127.0.0.1:8000/api/v1
// Production   →  https://lingosummar-api.fastapicloud.dev/api/v1
```

---

## License

MIT
