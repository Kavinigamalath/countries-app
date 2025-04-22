// Polyfill TextEncoder/TextDecoder for react‑router, etc.
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Then pull in your jest‑dom matchers
import "@testing-library/jest-dom";