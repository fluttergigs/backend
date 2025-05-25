/**
 * tag service
 */

import {factories} from '@strapi/strapi';

export default factories.createCoreService('api::tag.tag', ({strapi}) => ({


  async populate() {

    const tags = [
      {
        "name": "UI",
        "description": "Tips and patterns for building and customizing Flutter user interfaces.",
        "slug": "ui"
      },
      {
        "name": "Animations",
        "description": "Techniques for animating widgets and creating smooth transitions.",
        "slug": "animations"
      },
      {
        "name": "State Management",
        "description": "Approaches and tools for managing state in Flutter applications.",
        "slug": "state-management"
      },
      {
        "name": "Bloc",
        "description": "Using the Bloc pattern for scalable business logic and state management.",
        "slug": "bloc"
      },
      {
        "name": "Provider",
        "description": "State management and dependency injection with the Provider package.",
        "slug": "provider"
      },
      {
        "name": "Riverpod",
        "description": "Modern, type-safe state management using Riverpod.",
        "slug": "riverpod"
      },
      {
        "name": "GetX",
        "description": "Simplified state management, routing, and dependency injection with GetX.",
        "slug": "getx"
      },
      {
        "name": "Hooks",
        "description": "Reusable logic in Flutter using functional hooks.",
        "slug": "hooks"
      },
      {
        "name": "Widget",
        "description": "Building and composing custom and native Flutter widgets.",
        "slug": "widget"
      },
      {
        "name": "CustomPainter",
        "description": "Advanced graphics and custom drawing using CustomPainter.",
        "slug": "custompainter"
      },
      {
        "name": "Theme",
        "description": "Theme management, light/dark mode, and color customization.",
        "slug": "theme"
      },
      {
        "name": "Navigation",
        "description": "Navigating between screens and handling in-app routing.",
        "slug": "navigation"
      },
      {
        "name": "Deep Linking",
        "description": "Implementing deep links to open specific app screens via URLs.",
        "slug": "deep-linking"
      },
      {
        "name": "Routing",
        "description": "Advanced routing strategies and navigation architectures.",
        "slug": "routing"
      },
      {
        "name": "Forms",
        "description": "Creating and validating user forms in Flutter.",
        "slug": "forms"
      },
      {
        "name": "Validation",
        "description": "Client-side validation techniques for user input.",
        "slug": "validation"
      },
      {
        "name": "ListView",
        "description": "Efficiently displaying and managing scrollable lists.",
        "slug": "listview"
      },
      {
        "name": "GridView",
        "description": "Displaying and managing grid layouts and content.",
        "slug": "gridview"
      },
      {
        "name": "Sliver",
        "description": "Custom scroll effects and layouts using Slivers.",
        "slug": "sliver"
      },
      {
        "name": "Responsive",
        "description": "Designing adaptive interfaces for all device sizes.",
        "slug": "responsive"
      },
      {
        "name": "Adaptive",
        "description": "Building UIs that adapt to multiple platforms and environments.",
        "slug": "adaptive"
      },
      {
        "name": "Material",
        "description": "Implementing Material Design components and guidelines.",
        "slug": "material"
      },
      {
        "name": "Cupertino",
        "description": "Building iOS-style interfaces using Cupertino widgets.",
        "slug": "cupertino"
      },
      {
        "name": "Packages",
        "description": "Integrating and leveraging third-party Dart/Flutter packages.",
        "slug": "packages"
      },
      {
        "name": "Plugin",
        "description": "Developing and using Flutter plugins for platform features.",
        "slug": "plugin"
      },
      {
        "name": "Localization",
        "description": "Localizing Flutter apps for multiple languages.",
        "slug": "localization"
      },
      {
        "name": "Internationalization",
        "description": "Supporting internationalization and global audiences.",
        "slug": "internationalization"
      },
      {
        "name": "Assets",
        "description": "Managing images, fonts, and other asset files.",
        "slug": "assets"
      },
      {
        "name": "Images",
        "description": "Displaying, optimizing, and manipulating images.",
        "slug": "images"
      },
      {
        "name": "SVG",
        "description": "Using SVG graphics in Flutter applications.",
        "slug": "svg"
      },
      {
        "name": "Performance",
        "description": "Profiling and optimizing app performance.",
        "slug": "performance"
      },
      {
        "name": "Testing",
        "description": "Writing and running tests for Flutter and Dart code.",
        "slug": "testing"
      },
      {
        "name": "Unit Test",
        "description": "Unit testing functions, classes, and business logic.",
        "slug": "unit-test"
      },
      {
        "name": "Integration Test",
        "description": "Automated end-to-end testing for Flutter apps.",
        "slug": "integration-test"
      },
      {
        "name": "Golden Test",
        "description": "Visual regression and snapshot testing with golden files.",
        "slug": "golden-test"
      },
      {
        "name": "Accessibility",
        "description": "Making apps accessible to all users.",
        "slug": "accessibility"
      },
      {
        "name": "Error Handling",
        "description": "Catching and handling errors gracefully.",
        "slug": "error-handling"
      },
      {
        "name": "Dependency Injection",
        "description": "Managing dependencies for testability and scalability.",
        "slug": "dependency-injection"
      },
      {
        "name": "Isolate",
        "description": "Parallel and background processing with Dart isolates.",
        "slug": "isolate"
      },
      {
        "name": "Async",
        "description": "Asynchronous programming, Futures, and async/await.",
        "slug": "async"
      },
      {
        "name": "Streams",
        "description": "Working with Dart Streams for reactive programming.",
        "slug": "streams"
      },
      {
        "name": "Future",
        "description": "Handling asynchronous tasks using Futures.",
        "slug": "future"
      },
      {
        "name": "Extension",
        "description": "Extending Dart classes with extension methods.",
        "slug": "extension"
      },
      {
        "name": "Mixin",
        "description": "Composing behavior with Dart mixins.",
        "slug": "mixin"
      },
      {
        "name": "Null Safety",
        "description": "Enforcing null safety in Flutter and Dart code.",
        "slug": "null-safety"
      },
      {
        "name": "Generics",
        "description": "Using generics for type-safe and reusable code.",
        "slug": "generics"
      },
      {
        "name": "Linter",
        "description": "Enforcing code style and quality with Dart linter rules.",
        "slug": "linter"
      },
      {
        "name": "Build Runner",
        "description": "Code generation and automation using build_runner.",
        "slug": "build-runner"
      },
      {
        "name": "Code Generation",
        "description": "Generating boilerplate and code with tools.",
        "slug": "code-generation"
      },
      {
        "name": "CI/CD",
        "description": "Continuous Integration and Continuous Deployment strategies.",
        "slug": "ci-cd"
      },
      {
        "name": "Firebase",
        "description": "Integrating Firebase services (Auth, Firestore, etc.).",
        "slug": "firebase"
      },
      {
        "name": "Firestore",
        "description": "Using Firebase Cloud Firestore in Flutter.",
        "slug": "firestore"
      },
      {
        "name": "Auth",
        "description": "Implementing authentication and authorization.",
        "slug": "auth"
      },
      {
        "name": "REST API",
        "description": "Consuming and building RESTful APIs.",
        "slug": "rest-api"
      },
      {
        "name": "GraphQL",
        "description": "Using GraphQL for flexible data queries.",
        "slug": "graphql"
      },
      {
        "name": "WebSocket",
        "description": "Real-time communication with WebSockets.",
        "slug": "websocket"
      },
      {
        "name": "Notifications",
        "description": "Implementing and handling notifications.",
        "slug": "notifications"
      },
      {
        "name": "Push Notification",
        "description": "Sending and receiving push notifications.",
        "slug": "push-notification"
      },
      {
        "name": "App Lifecycle",
        "description": "Handling app states and lifecycle events.",
        "slug": "app-lifecycle"
      },
      {
        "name": "Background Task",
        "description": "Executing background work and tasks.",
        "slug": "background-task"
      },
      {
        "name": "Platform Channel",
        "description": "Communicating between Dart and native code.",
        "slug": "platform-channel"
      },
      {
        "name": "Native Integration",
        "description": "Accessing platform-specific features and APIs.",
        "slug": "native-integration"
      },
      {
        "name": "iOS",
        "description": "iOS-specific development tips and issues.",
        "slug": "ios"
      },
      {
        "name": "Android",
        "description": "Android-specific development tips and issues.",
        "slug": "android"
      },
      {
        "name": "Web",
        "description": "Flutter web development, deployment, and optimization.",
        "slug": "web"
      },
      {
        "name": "Desktop",
        "description": "Building and deploying Flutter apps for desktop platforms.",
        "slug": "desktop"
      },
      {
        "name": "Linux",
        "description": "Developing Flutter apps targeting Linux.",
        "slug": "linux"
      },
      {
        "name": "Windows",
        "description": "Developing Flutter apps targeting Windows.",
        "slug": "windows"
      },
      {
        "name": "MacOS",
        "description": "Developing Flutter apps targeting macOS.",
        "slug": "macos"
      },
      {
        "name": "Monorepo",
        "description": "Organizing large projects with monorepo architecture.",
        "slug": "monorepo"
      },
      {
        "name": "Micro Apps",
        "description": "Splitting projects into independent micro apps/modules.",
        "slug": "micro-apps"
      },
      {
        "name": "Clean Architecture",
        "description": "Structuring code using Clean Architecture principles.",
        "slug": "clean-architecture"
      },
      {
        "name": "SOLID",
        "description": "Applying SOLID principles to Flutter and Dart code.",
        "slug": "solid"
      },
      {
        "name": "Design Pattern",
        "description": "Reusable patterns for scalable and maintainable code.",
        "slug": "design-pattern"
      },
      {
        "name": "MVVM",
        "description": "Model-View-ViewModel architecture in Flutter.",
        "slug": "mvvm"
      },
      {
        "name": "Domain Driven",
        "description": "Applying Domain Driven Design (DDD) to Flutter projects.",
        "slug": "domain-driven"
      },
      {
        "name": "Repository Pattern",
        "description": "Abstracting data access using repository pattern.",
        "slug": "repository-pattern"
      },
      {
        "name": "Service Locator",
        "description": "Managing dependencies with the service locator pattern.",
        "slug": "service-locator"
      },
      {
        "name": "Optimization",
        "description": "Improving app speed, size, and efficiency.",
        "slug": "optimization"
      },
      {
        "name": "Refactoring",
        "description": "Restructuring code for clarity and maintainability.",
        "slug": "refactoring"
      },
      {
        "name": "Code Review",
        "description": "Best practices for peer code review and feedback.",
        "slug": "code-review"
      },
      {
        "name": "Best Practice",
        "description": "Industry best practices for Flutter and Dart.",
        "slug": "best-practice"
      },
      {
        "name": "Anti Pattern",
        "description": "Common pitfalls and anti-patterns to avoid.",
        "slug": "anti-pattern"
      },
      {
        "name": "Security",
        "description": "Securing Flutter apps and user data.",
        "slug": "security"
      },
      {
        "name": "Open Source",
        "description": "Contributing to and leveraging open source tools.",
        "slug": "open-source"
      },
      {
        "name": "Beginner",
        "description": "Content suitable for developers new to Flutter or Dart.",
        "slug": "beginner"
      },
      {
        "name": "Intermediate",
        "description": "Tips and patterns for intermediate-level developers.",
        "slug": "intermediate"
      },
      {
        "name": "Advanced",
        "description": "Advanced topics and expert-level techniques.",
        "slug": "advanced"
      },
      {
        "name": "Enterprise",
        "description": "Enterprise-grade architecture, scalability, and compliance.",
        "slug": "enterprise"
      },
      {
        "name": "Interview",
        "description": "Tips and preparation for Flutter/Dart job interviews.",
        "slug": "interview"
      },
      {
        "name": "Productivity",
        "description": "Tools and tips to boost development productivity.",
        "slug": "productivity"
      },
      {
        "name": "UI Kit",
        "description": "Reusable UI kits and design systems for Flutter.",
        "slug": "ui-kit"
      },
      {
        "name": "Starter",
        "description": "Starter templates and boilerplate projects.",
        "slug": "starter"
      },
      {
        "name": "Sample",
        "description": "Sample code and mini-projects.",
        "slug": "sample"
      },
      {
        "name": "Demo",
        "description": "Demonstrations of features and patterns.",
        "slug": "demo"
      },
      {
        "name": "Showcase",
        "description": "Showcasing impressive Flutter apps and code.",
        "slug": "showcase"
      },
      {
        "name": "Must-Have",
        "description": "Essential tools, packages, or patterns every dev should know.",
        "slug": "must-have"
      },
      {
        "name": "Time Saver",
        "description": "Techniques and utilities to save development time.",
        "slug": "time-saver"
      },
      {
        "name": "Tip",
        "description": "Quick tips for everyday Flutter/Dart development.",
        "slug": "tip"
      },
      {
        "name": "Trick",
        "description": "Clever tricks and lesser-known Flutter/Dart features.",
        "slug": "trick"
      },
      {
        "name": "FAQ",
        "description": "Frequently asked questions and concise answers.",
        "slug": "faq"
      },
      {
        "name": "HowTo",
        "description": "Step-by-step guides and how-to articles.",
        "slug": "howto"
      },
      {
        "name": "Cheat Sheet",
        "description": "Reference cheat sheets for syntax and commands.",
        "slug": "cheat-sheet"
      },
      {
        "name": "AI",
        "description": "Integrating AI and machine learning in Flutter.",
        "slug": "ai"
      },
      {
        "name": "LLM",
        "description": "Large Language Models (LLM) use-cases and integrations.",
        "slug": "llm"
      },
      {
        "name": "Copilot",
        "description": "AI-powered coding tools and Copilot for Flutter/Dart.",
        "slug": "copilot"
      },
      {
        "name": "Prompt Engineering",
        "description": "Best practices for engineering prompts for LLMs and AI.",
        "slug": "prompt-engineering"
      }
    ]


    strapi.log.info("Populating tags in the database...")

    await strapi.db.query('api::tag.tag').createMany({
      data: tags,
    })

    strapi.log.info("Tags populated successfully.")
  }
}));
