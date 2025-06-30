# 🌟 Vibe AI

> Where code meets creativity and ideas come to life! ✨

Welcome to **Vibe AI** - your friendly neighborhood AI-powered code execution platform! Think of it as your personal coding companion that not only understands what you want to build but can actually help you build it, test it, and iterate on it in real-time.

## 🚀 What's This All About?

Ever wished you could just tell someone what you want to code and have them help you figure it out? That's exactly what Vibe AI does! It's like having a super smart coding buddy who:

- 💬 **Chats with you** about your ideas and requirements
- 🔧 **Executes code** in secure sandboxes (thanks to E2B!)
- 🎨 **Shows you results** in beautiful, interactive fragments
- 🔄 **Iterates with you** until you get exactly what you want

## 🛠️ The Tech Stack (aka The Good Stuff)

We're using some pretty sweet tech here:

- **Next.js 15** - Because we like our React fast and fancy
- **TypeScript** - Type safety is our love language
- **tRPC** - Type-safe APIs that just make sense
- **Prisma** - Database stuff made easy
- **Inngest** - Background jobs that actually work
- **E2B** - Secure code execution (no breaking your computer!)
- **Tailwind CSS** - Making things pretty without the CSS headaches
- **shadcn/ui** - Beautiful components out of the box

## 🎯 How It Works

1. **Create a project** - Start with an idea, any idea!
2. **Chat away** - Tell the AI what you want to build
3. **Watch the magic** - See your code execute in real-time
4. **Iterate** - Tweak, adjust, and perfect your creation

The interface is split into two main areas:

- **Left side**: Your conversation with the AI
- **Right side**: Live results, web fragments, and code outputs

## 🏃‍♂️ Getting Started

Ready to dive in? Let's get you set up!

### Prerequisites

- Node.js (the newer the better!)
- A database (we're using Prisma, so pretty flexible)
- Some curiosity and maybe a coffee ☕

### Installation

```bash
# Clone this bad boy
git clone <your-repo-url>
cd vibe-ai

# Install all the goodies
npm install

# Set up your database
npx prisma generate
npx prisma migrate dev

# Fire it up!
npm run dev
```

Visit `http://localhost:3000` and start vibing! 🎉

## 🗂️ Project Structure

Here's how we've organized this beauty:

```
src/
├── app/                    # Next.js app router magic
├── components/             # Reusable UI components
├── modules/
│   ├── projects/          # Project management
│   └── messages/          # Chat & messaging
├── inngest/               # Background job handlers
├── lib/                   # Utilities and helpers
└── trpc/                  # API routes and procedures
```

## 🎨 Features

- **🗨️ Interactive Chat**: Natural conversation with AI
- **⚡ Live Code Execution**: See results instantly
- **🔒 Secure Sandboxes**: Your code runs safely
- **📱 Responsive Design**: Works on all devices
- **🎯 Project-Based**: Organize your experiments
- **🔄 Real-time Updates**: Everything happens live

## 🚀 Deployment

Ready to show the world your creation?

### Vercel (Recommended)

- Push to GitHub
- Connect to Vercel
- Deploy with one click
- Done! 🎉

### Manual Deployment

```bash
npm run build
npm start
```

## 🤝 Contributing

Got ideas? Found a bug? Want to make this even more awesome? We'd love your help!

1. Fork it
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Notes

- This is a living, breathing project - expect awesome updates!
- The AI agent uses E2B for secure code execution
- Background processing is handled by Inngest
- We're all about that type-safe life with TypeScript + tRPC

## 🆘 Need Help?

Stuck? No worries! Here are some things to try:

1. Check the console for any errors
2. Make sure your database is running
3. Verify all environment variables are set
4. Try turning it off and on again (classic!)

## 🎉 Final Words

Building stuff should be fun, collaborative, and maybe a little bit magical. That's what Vibe AI is all about - bringing your ideas to life with the help of AI, one conversation at a time.

Happy coding! 🚀✨

---

_Made with ❤️ and probably too much coffee_
