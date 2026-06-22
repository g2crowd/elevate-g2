import { describe, test, expect } from 'vitest';
const { legacyToVariantCandidate } = require('./legacy-prefix');

describe('legacyToVariantCandidate', () => {
  test('converts basic utility class', () => {
    expect(legacyToVariantCandidate('elv-w-4')).toBe('elv:w-4');
  });

  test('converts arbitrary value class', () => {
    expect(legacyToVariantCandidate('elv-w-[355px]')).toBe('elv:w-[355px]');
  });

  test('converts arbitrary value with percentage', () => {
    expect(legacyToVariantCandidate('elv-w-[15%]')).toBe('elv:w-[15%]');
  });

  test('converts arbitrary value with calc()', () => {
    expect(legacyToVariantCandidate('elv-min-h-[calc(100vh-72px)]')).toBe('elv:min-h-[calc(100vh-72px)]');
  });

  test('converts arbitrary value with hex color', () => {
    expect(legacyToVariantCandidate('elv-text-[#ff492c]')).toBe('elv:text-[#ff492c]');
  });

  test('converts arbitrary value with rgba', () => {
    expect(legacyToVariantCandidate('elv-bg-[rgba(0,0,0,0.5)]')).toBe('elv:bg-[rgba(0,0,0,0.5)]');
  });

  test('converts grid cols with underscore-separated values', () => {
    expect(legacyToVariantCandidate('elv-grid-cols-[1fr_500px_2fr]')).toBe('elv:grid-cols-[1fr_500px_2fr]');
  });

  test('converts with responsive variant', () => {
    expect(legacyToVariantCandidate('md:elv-w-[355px]')).toBe('elv:md:w-[355px]');
  });

  test('converts with hover variant', () => {
    expect(legacyToVariantCandidate('hover:elv-opacity-100')).toBe('elv:hover:opacity-100');
  });

  test('converts important modifier', () => {
    expect(legacyToVariantCandidate('!elv-w-4')).toBe('elv:!w-4');
  });

  test('converts negative value', () => {
    expect(legacyToVariantCandidate('-elv-top-4')).toBe('elv:-top-4');
  });

  test('converts negative arbitrary value', () => {
    expect(legacyToVariantCandidate('elv-top-[-32px]')).toBe('elv:top-[-32px]');
  });

  test('returns null for non-elv class', () => {
    expect(legacyToVariantCandidate('w-4')).toBeNull();
  });
});
