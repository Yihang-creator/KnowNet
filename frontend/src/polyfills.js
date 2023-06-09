import { TextEncoder } from 'text-encoding';

if (typeof window.TextEncoder === 'undefined') {
  window.TextEncoder = TextEncoder;
}