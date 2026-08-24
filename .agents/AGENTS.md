# Workspace Rules & Constraints

## Component Definition of Done (DoD)
All components created in this workspace must adhere to the following standards:

1. **Theming**: Must fully support Light and Dark modes.
2. **Localization**: Must fully support RTL (Arabic) and LTR (English) layout flows.
3. **Responsiveness**: Layouts and element sizing must be fully responsive.
4. **Accessibility**: Elements must support proper ARIA attributes, keyboard navigation, and focus states.
5. **API & Variants**: Custom components must define a clean Variant API.
6. **Class Variance Authority**: Utilize `class-variance-authority` (CVA) if the component supports style variations.
7. **Design Tokens**: Do not use hardcoded sizes, padding, shadows, or color values. Utilize variables from CSS design tokens instead.
8. **Barrel Exports**: Ensure all components are correctly exported from an `index.js` or `index.ts` file in their respective folders.
9. **Usage Documentation**: Provide inline documentation or examples within the workspace (e.g. within testing dashboards or markdown files).
