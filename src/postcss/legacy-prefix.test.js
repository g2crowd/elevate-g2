import { describe, test, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import os from 'os';
const { extractLegacyCandidates, legacyToVariantCandidate } = require('./legacy-prefix');

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

describe('extractLegacyCandidates', () => {
  function extractFromContent(content, extension = '.html') {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'legacy-prefix-test-'));
    try {
      const filePath = path.join(tempDir, `test${extension}`);
      fs.writeFileSync(filePath, content);
      return extractLegacyCandidates({ cwd: tempDir, directories: ['.'] });
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  }

  test('extracts basic utility class from HTML', () => {
    const candidates = extractFromContent('<div class="elv-w-4">');
    expect(candidates.get('elv:w-4')).toBe('elv-w-4');
  });

  test('extracts arbitrary pixel value', () => {
    const candidates = extractFromContent('<div class="elv-w-[355px]">');
    expect(candidates.get('elv:w-[355px]')).toBe('elv-w-[355px]');
  });

  test('extracts arbitrary percentage value', () => {
    const candidates = extractFromContent('<div class="elv-w-[15%]">');
    expect(candidates.get('elv:w-[15%]')).toBe('elv-w-[15%]');
  });

  test('extracts arbitrary calc value', () => {
    const candidates = extractFromContent('<div class="elv-min-h-[calc(100vh-72px)]">');
    expect(candidates.get('elv:min-h-[calc(100vh-72px)]')).toBe('elv-min-h-[calc(100vh-72px)]');
  });

  test('extracts arbitrary hex color', () => {
    const candidates = extractFromContent('<div class="elv-text-[#ff492c]">');
    expect(candidates.get('elv:text-[#ff492c]')).toBe('elv-text-[#ff492c]');
  });

  test('extracts rgba with commas - does not split on commas inside brackets', () => {
    const candidates = extractFromContent('<div class="elv-bg-[rgba(0,0,0,0.5)]">');
    expect(candidates.get('elv:bg-[rgba(0,0,0,0.5)]')).toBe('elv-bg-[rgba(0,0,0,0.5)]');
    expect(candidates.has('elv:bg-[rgba(0')).toBe(false);
  });

  test('extracts calc with decimal - does not split on dots inside brackets', () => {
    const candidates = extractFromContent('<div class="elv-w-[calc(100%-1.5rem)]">');
    expect(candidates.get('elv:w-[calc(100%-1.5rem)]')).toBe('elv-w-[calc(100%-1.5rem)]');
    expect(candidates.has('elv:w-[calc(100%-1')).toBe(false);
  });

  test('extracts type hint with colon inside brackets', () => {
    const candidates = extractFromContent('<div class="elv-text-[length:12px]">');
    expect(candidates.get('elv:text-[length:12px]')).toBe('elv-text-[length:12px]');
  });

  test('extracts URL with dots and colons inside brackets', () => {
    const candidates = extractFromContent('<div class="elv-bg-[url(https://example.com/a.b.svg)]">');
    expect(candidates.get('elv:bg-[url(https://example.com/a.b.svg)]')).toBe('elv-bg-[url(https://example.com/a.b.svg)]');
  });

  test('extracts grid cols with underscores', () => {
    const candidates = extractFromContent('<div class="elv-grid-cols-[1fr_500px_2fr]">');
    expect(candidates.get('elv:grid-cols-[1fr_500px_2fr]')).toBe('elv-grid-cols-[1fr_500px_2fr]');
  });

  test('extracts aspect ratio with slash inside brackets', () => {
    const candidates = extractFromContent('<div class="elv-aspect-[4/1]">');
    expect(candidates.get('elv:aspect-[4/1]')).toBe('elv-aspect-[4/1]');
  });

  test('extracts with responsive variant', () => {
    const candidates = extractFromContent('<div class="md:elv-w-[355px]">');
    expect(candidates.get('elv:md:w-[355px]')).toBe('md:elv-w-[355px]');
  });

  test('extracts dot-chained classes from slim files', () => {
    const candidates = extractFromContent('.elv-flex.elv-w-[100px].elv-p-4', '.slim');
    expect(candidates.get('elv:flex')).toBe('elv-flex');
    expect(candidates.get('elv:w-[100px]')).toBe('elv-w-[100px]');
    expect(candidates.get('elv:p-4')).toBe('elv-p-4');
  });

  test('handles complex class with decimal inside brackets when dot-chained', () => {
    const candidates = extractFromContent('.elv-opacity-[0.5].elv-mt-4', '.slim');
    expect(candidates.get('elv:opacity-[0.5]')).toBe('elv-opacity-[0.5]');
    expect(candidates.get('elv:mt-4')).toBe('elv-mt-4');
  });

  test('extracts multiple arbitrary value classes', () => {
    const candidates = extractFromContent('<div class="elv-w-[100px] elv-h-[200px] elv-bg-[#fff]">');
    expect(candidates.get('elv:w-[100px]')).toBe('elv-w-[100px]');
    expect(candidates.get('elv:h-[200px]')).toBe('elv-h-[200px]');
    expect(candidates.get('elv:bg-[#fff]')).toBe('elv-bg-[#fff]');
  });

  test('ignores non-elv classes', () => {
    const candidates = extractFromContent('<div class="w-4 bg-red-500">');
    expect(candidates.size).toBe(0);
  });

  test('ignores HTML attributes that look like classes', () => {
    const candidates = extractFromContent('<div data-foo="elv-bar(baz)">');
    expect(candidates.size).toBe(0);
  });
});
