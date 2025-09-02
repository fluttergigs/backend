# FlutterGigs Backend - Strapi CMS

FlutterGigs Backend is a Strapi v5.2.0 Content Management System (CMS) that powers the FlutterGigs job platform. This is a Node.js TypeScript application that provides REST and GraphQL APIs for managing job offers, companies, users, and related data.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Prerequisites and Environment Setup
- Node.js version: >=18.0.0 <=20.x.x (tested with v20.19.4)
- npm version: >=6.0.0 (tested with v10.8.2)
- Database: SQLite (default), MySQL, or PostgreSQL supported

### Bootstrap, Build, and Run the Application
Follow these steps in order for a fresh setup:

1. **Install dependencies**:
   ```bash
   npm install
   npm install better-sqlite3 --save
   ```
   - `npm install` takes ~1-2 minutes. NEVER CANCEL. Set timeout to 5+ minutes.
   - The `better-sqlite3` package is required for SQLite database support

2. **Setup environment variables**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add these required variables:
   ```
   HOST=0.0.0.0
   PORT=1337
   APP_KEYS="toBeModified1,toBeModified2"
   API_TOKEN_SALT=tobemodified
   ADMIN_JWT_SECRET=tobemodified
   TRANSFER_TOKEN_SALT=tobemodified
   JWT_SECRET=tobemodified
   RESEND_API_KEY=dummy_key_for_development
   TWITTER_APP_TOKEN=dummy_token
   TWITTER_APP_SECRET=dummy_secret
   TWITTER_ACCESS_TOKEN=dummy_access_token
   TWITTER_ACCESS_SECRET=dummy_access_secret
   ```

3. **Build the application**:
   ```bash
   npm run build
   ```
   - Build takes ~20-30 seconds. NEVER CANCEL. Set timeout to 5+ minutes.
   - Compiles TypeScript and builds admin panel

4. **Run in development mode**:
   ```bash
   npm run develop
   ```
   - Startup takes ~6 seconds after dependencies are installed. NEVER CANCEL. Set timeout to 10+ minutes.
   - Enables auto-reload on file changes
   - Creates admin panel at http://localhost:1337/admin

5. **Run in production mode**:
   ```bash
   npm run start
   ```
   - Startup takes ~3 seconds. NEVER CANCEL. Set timeout to 5+ minutes.
   - Runs without auto-reload

## Validation

### Manual Testing Scenarios
After making changes, ALWAYS test these scenarios:

1. **Server starts successfully**: Run `npm run develop` and verify no errors in console
2. **Admin panel loads**: Navigate to http://localhost:1337/admin and verify the welcome screen loads
3. **API endpoints respond**: Test GET http://localhost:1337/api/users-permissions/users-permissions to verify API is accessible
4. **Database connection works**: Server should start without database connection errors

### Build Validation
- Always run `npm run build` before committing changes
- Build should complete without TypeScript errors
- Admin panel should compile successfully

### Environment Validation
- Ensure all required environment variables are present in `.env`
- Missing API keys will cause startup failures (Resend, Twitter APIs)
- Use dummy values for development; real keys only needed for production

## Linting and Code Quality

### Current Limitations
- No test suite exists in this repository
- No lint script is configured in package.json
- ESLint configuration (`.eslintrc`) exists but uses legacy format
- ESLint v9+ requires migration to `eslint.config.js` format

### Manual Code Quality Checks
- Manually review TypeScript compilation errors during build
- Follow existing code patterns in `src/api/` directories
- Maintain consistency with existing service patterns in `src/services/`

## Architecture and Navigation

### Key Directories
- **`src/api/`**: Contains 11 API endpoints (job-offer, company, user management, etc.)
- **`src/services/`**: Business logic services (email, Twitter integration)
- **`src/extensions/`**: Strapi plugin customizations
- **`config/`**: Application configuration (database, server, middleware)
- **`types/`**: TypeScript type definitions

### Important Files
- **`src/index.ts`**: Application entry point
- **`config/database.ts`**: Database configuration (defaults to SQLite)
- **`config/server.ts`**: Server configuration and port settings
- **`src/services/emails/resendMailService.ts`**: Email service integration
- **`src/services/twitterApi.ts`**: Twitter API integration

### API Structure
Each API in `src/api/` follows Strapi conventions:
- `routes/`: API route definitions
- `controllers/`: Request handlers
- `services/`: Business logic
- `content-types/`: Data model schemas

## Common Tasks

### Adding New API Endpoints
1. Use Strapi CLI: `npm run strapi generate api <api-name>`
2. Define content types in `src/api/<api-name>/content-types/`
3. Implement controllers in `src/api/<api-name>/controllers/`
4. Add custom services in `src/api/<api-name>/services/`

### Database Operations
- Default: SQLite database stored in `.tmp/data.db`
- For MySQL: Set `DATABASE_CLIENT=mysql` in `.env`
- For PostgreSQL: Set `DATABASE_CLIENT=postgres` in `.env`
- Database migrations run automatically on startup

### Environment Configuration
- Development: Uses `.env` file
- Production: Set environment variables directly
- Database client can be changed via `DATABASE_CLIENT` env var
- External services (Resend, Twitter) require real API keys in production

## Troubleshooting

### Common Issues
1. **"Cannot find module 'better-sqlite3'"**: Run `npm install better-sqlite3 --save`
2. **"Missing API key" errors**: Add dummy values to `.env` for development
3. **"Invalid consumer tokens"**: Add Twitter API dummy credentials to `.env`
4. **Build failures**: Check TypeScript errors and ensure all dependencies are installed
5. **Port 1337 in use**: Change `PORT` in `.env` or stop existing Strapi instances

### Debug Mode
- Run with `--debug` flag: `npm run develop -- --debug`
- Check logs for detailed error information
- Monitor console output during startup

## Development Workflow

### Making Changes
1. Always run the bootstrap steps first if working with a fresh clone
2. Make minimal changes following existing patterns
3. Test changes with `npm run develop`
4. Verify admin panel still loads correctly
5. Build to check for TypeScript errors: `npm run build`
6. Test API endpoints manually or via admin panel

### Performance Notes
- Development server takes ~6 seconds to start
- Production server takes ~3 seconds to start
- Build process takes ~20-30 seconds
- Database operations are fast with SQLite (local file)

### External Dependencies
- **Resend**: Email service provider (requires API key for production)
- **Twitter API**: Social media integration (requires API keys for production)
- **MySQL2**: MySQL database driver (included but optional)
- **better-sqlite3**: SQLite database driver (required for default setup)

## Quick Reference Commands

```bash
# Fresh setup (run in order)
npm install
npm install better-sqlite3 --save
cp .env.example .env
# Edit .env with required API keys
npm run build
npm run develop

# Development workflow
npm run develop        # Start dev server with auto-reload
npm run start         # Start production server
npm run build         # Build for production
npm run strapi        # Access Strapi CLI commands

# Testing and validation
curl http://localhost:1337/admin    # Test admin panel
curl http://localhost:1337/api/     # Test API endpoints
```