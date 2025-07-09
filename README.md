# Vibe AI - AI-Powered Code Execution Platform

> ⚠️ **STUDY PROJECT NOTICE**: This application is developed for educational and research purposes. API requests and code execution are limited to prevent abuse. Not intended for production use.

## Overview

Vibe AI is an experimental platform that demonstrates AI-powered code execution capabilities through secure sandboxed environments. The system enables real-time interaction with AI agents for code generation, execution, and iteration workflows.

## Architecture

The platform implements a microservices architecture with the following core components:

### Frontend Layer

- **Next.js 15** with App Router for server-side rendering and routing
- **TypeScript** for type safety and enhanced developer experience
- **Tailwind CSS** + **shadcn/ui** for component-based UI architecture
- **tRPC** client for type-safe API communication

### Backend Services

- **tRPC** server with type-safe procedure definitions
- **Prisma ORM** with PostgreSQL for data persistence
- **Inngest** for background job processing and event handling
- **E2B** integration for secure code execution in isolated environments

### Database Schema

- Projects management with user association
- Message threading with fragment storage
- Usage tracking and rate limiting
- Migration history with Prisma migrations

## Technical Implementation

### Code Execution Pipeline

1. **Input Processing**: User messages are processed through tRPC procedures
2. **AI Integration**: Messages are sent to AI agents for code generation
3. **Sandbox Execution**: Generated code is executed in E2B sandboxes
4. **Result Aggregation**: Execution results are captured and stored as fragments
5. **Real-time Updates**: WebSocket connections provide live feedback

### Security Model

- **Isolated Execution**: All code runs in containerized E2B environments
- **Resource Limits**: CPU, memory, and execution time constraints
- **Network Isolation**: Sandboxes have restricted network access
- **Input Validation**: All user inputs are sanitized and validated

## Development Setup

### Prerequisites

- Node.js 18+ with npm/yarn
- PostgreSQL database instance
- E2B API credentials
- Inngest development environment

### Installation

```bash
# Clone repository
git clone <repository-url>
cd vibe-ai

# Install dependencies
npm install

# Database setup
npx prisma generate
npx prisma migrate dev

# Environment configuration
cp .env.example .env
# Configure required environment variables

# Development server
npm run dev
```

### Environment Variables

```env
DATABASE_URL="postgresql://..."
E2B_API_KEY="your-e2b-api-key"
INNGEST_EVENT_KEY="your-inngest-key"
INNGEST_SIGNING_KEY="your-inngest-signing-key"
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (home)/            # Public pages (auth, pricing)
│   ├── api/               # API routes
│   └── projects/          # Project-specific pages
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── code-view/        # Code display components
├── modules/              # Feature modules
│   ├── projects/         # Project management
│   ├── messages/         # Chat system
│   └── usage/            # Usage tracking
├── inngest/              # Background job handlers
├── lib/                  # Utility functions
├── trpc/                 # API layer
└── hooks/                # Custom React hooks
```

## API Design

### tRPC Procedures

- **projects.create**: Initialize new project instances
- **projects.list**: Retrieve user projects with pagination
- **messages.create**: Process user messages and trigger AI responses
- **messages.list**: Fetch conversation history
- **usage.track**: Monitor API usage and rate limits

### Data Models

```prisma
model Project {
  id        String   @id @default(cuid())
  name      String
  userId    String
  messages  Message[]
  createdAt DateTime @default(now())
}

model Message {
  id        String   @id @default(cuid())
  content   String
  role      String   // 'user' | 'assistant'
  projectId String
  fragments MessageFragment[]
}

model MessageFragment {
  id        String   @id @default(cuid())
  type      String   // 'code' | 'web' | 'text'
  content   String
  messageId String
}
```

## Rate Limiting & Usage

Due to the experimental nature of this project:

- **Daily Limits**: 100 requests per user
- **Execution Time**: 30 seconds max per sandbox
- **Storage**: 100MB per project
- **Concurrent Sessions**: 5 per user

## Development Guidelines

### Code Standards

- TypeScript strict mode enabled
- ESLint configuration for code quality
- Prettier for consistent formatting
- Conventional commits for version control

### Testing Strategy

- Unit tests for utility functions
- Integration tests for API procedures
- E2E tests for critical user flows
- Performance testing for sandbox execution

## Deployment

### Production Considerations

- Database migrations through Prisma
- Environment-specific configurations
- Container orchestration for sandboxes
- Monitoring and logging setup

### Vercel Deployment

```bash
npm run build
vercel --prod
```

## Research & Educational Context

This project serves as a study implementation for:

- **AI Agent Integration**: Exploring conversational AI in development workflows
- **Secure Code Execution**: Implementing isolation mechanisms for user-generated code
- **Real-time Communication**: WebSocket integration for live development feedback
- **Type-safe Full-stack Development**: tRPC implementation patterns

## Limitations & Future Work

- **Scalability**: Current architecture suitable for prototype/study use
- **Language Support**: Limited to JavaScript/TypeScript execution
- **Persistence**: Session-based storage without long-term data retention
- **Authentication**: Basic implementation without advanced security features

## Contributing

This being a study project, contributions should focus on:

- Educational improvements and documentation
- Code quality and architectural patterns
- Performance optimizations
- Security enhancements

## License

This project is for educational purposes only. Not licensed for commercial use.

---

_Developed as part of software engineering studies focusing on AI integration and secure code execution._
