import { registerLocale } from '../localeRegistry';
import { LocaleDefinition } from './schema';
import enJson from './en.json';
import bnJson from './bn.json';
import arJson from './ar.json';

/**
 * Casting through unknown keeps the emitted declarations referencing
 * LocaleDefinition rather than the wide literal type TypeScript infers
 * from the JSON file.
 */
export const en = enJson as unknown as LocaleDefinition;
export const bn = bnJson as unknown as LocaleDefinition;
export const ar = arJson as unknown as LocaleDefinition;

registerLocale('en', en);
registerLocale('bn', bn);
registerLocale('ar', ar);
