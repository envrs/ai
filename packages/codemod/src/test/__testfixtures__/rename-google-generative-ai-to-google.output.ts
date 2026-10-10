// @ts-ignore provider package is not a codemod dependency.
import { createGoogle, type GoogleProvider } from '@ai-toolkit/google';

export const provider: GoogleProvider = createGoogle();
