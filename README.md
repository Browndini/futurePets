# FuturePets 🐾

A modern virtual pet game inspired by NeoPets, built with Next.js, Babylon.js, and Redux.

## Features

- 🐕 **Virtual Pets**: Create and customize your own virtual pets
- 🎮 **Mini-Games**: Play 3D games built with Babylon.js to earn credits
- 💰 **Economy System**: Earn and manage credits through gameplay
- 📊 **Pet Stats**: Track your pet's hunger, happiness, and health
- 🔒 **Secure**: Server-side validation prevents client-side manipulation

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **State Management**: Redux Toolkit
- **3D Graphics**: Babylon.js
- **Sessions**: iron-session
- **Styling**: CSS Modules (no Tailwind as requested)

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file:

```env
SESSION_SECRET=your_secure_random_secret_at_least_32_characters
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── games/        # Game management endpoints
│   │   ├── pets/         # Pet management endpoints
│   │   └── user/         # User data endpoints
│   ├── games/            # Game pages
│   └── pets/             # Pet management pages
├── components/
│   ├── games/            # Game components (Babylon.js)
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── lib/
│   ├── db/               # In-memory database (replace with real DB)
│   ├── redux/            # Redux store and slices
│   └── session/          # Session management
├── styles/               # Global styles and CSS modules
└── types/                # TypeScript type definitions
```

## Available Games

### Color Match
A fast-paced 3D game where you click on colored spheres. Built with Babylon.js, featuring:
- Interactive 3D spheres with animations
- Score-based rewards
- 30-second time limit
- Server-side score validation

## API Security

All game rewards and user data are managed server-side to prevent client manipulation:

- Session-based authentication using iron-session
- Server validates all game completions
- Cooldown system prevents game abuse
- Reward calculations happen on the server

## Future Enhancements

- [ ] Add more mini-games
- [ ] Implement pet feeding and care mechanics
- [ ] Add a shop system for items
- [ ] Implement pet leveling and evolution
- [ ] Add multiplayer features
- [ ] Replace in-memory DB with PostgreSQL/MongoDB
- [ ] Add user registration and authentication
- [ ] Implement leaderboards

## Development

### Building for Production

```bash
npm run build
npm start
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## License

MIT
