# CLAUDE.md - Development Guidelines

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm run lint -- --fix` - Fix linting issues automatically

## Code Style Guidelines
- **TypeScript**: Use TypeScript with proper interfaces/types
- **Component Structure**: Functional components with React.FC<Props> typing
- **Imports**: Group imports by React, libraries, components, assets
- **UI Components**: Use Chakra UI components for consistent styling
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Styling**: Use Chakra's styling props over CSS files when possible
- **Animations**: Use Framer Motion for animations, with MotionBox pattern
- **Internationalization**: Support English/Romanian through language prop
- **Color Modes**: Use useColorModeValue for light/dark theme support
- **Responsive Design**: Use Chakra responsive props (base, md, lg)
- **Error Handling**: Use try/catch for async operations

## Linting Rules
- Use recommended ESLint rules
- Follow React Hooks rules
- Unused vars allowed if matching pattern ^[A-Z_]