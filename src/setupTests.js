// Polyfill for TextEncoder/TextDecoder (needed by some dependencies that expect these globals in a JS environment)
import { TextEncoder, TextDecoder } from "util";

// Assign the imported classes to global scope so modules can use TextEncoder/TextDecoder as if they were built-ins
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Extend Jest's expect with additional DOM-related matchers (e.g., toBeInTheDocument, toHaveClass)
import "@testing-library/jest-dom";
