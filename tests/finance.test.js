import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidDateOnly, monthKey, parseAmount, normalizeStoredData } from '../utils/finance.js';

test('date-only month keys do not shift with timezone', () => {
  assert.equal(monthKey('2026-11-01'), '2026-11');
  assert.equal(monthKey('2026-02-28'), '2026-02');
  assert.equal(monthKey('2026-02-30'), '');
});

test('validates calendar dates', () => {
  assert.equal(isValidDateOnly('2024-02-29'), true);
  assert.equal(isValidDateOnly('2025-02-29'), false);
  assert.equal(isValidDateOnly('not-a-date'), false);
});

test('parses Brazilian and decimal currency formats', () => {
  assert.equal(parseAmount('1.234,56'), 1234.56);
  assert.equal(parseAmount('1234,56'), 1234.56);
  assert.equal(parseAmount('1234.56'), 1234.56);
  assert.equal(parseAmount(''), NaN);
  assert.equal(parseAmount('abc'), NaN);
});

test('normalizes invalid stored records without throwing', () => {
  const fallback = { transactions: [], goals: [], budgets: {}, profile: { name: 'Olá!', email: '' }, dark: false };
  const result = normalizeStoredData({
    transactions: [{ id: 'ok', description: 'Mercado', amount: 10, type: 'expense', category: 'Alimentação', date: '2026-11-01' }, { id: 'bad', amount: NaN }],
    goals: [{ id: 'g', name: 'Viagem', target: 100, saved: 20 }, { id: 'bad', target: NaN }],
    budgets: { Alimentação: 500, Lazer: NaN },
    profile: { name: 42, email: 'x@y.com' },
    dark: true
  }, fallback);
  assert.equal(result.transactions.length, 1);
  assert.equal(result.goals.length, 1);
  assert.deepEqual(result.budgets, { Alimentação: 500 });
  assert.equal(result.profile.name, 'Olá!');
  assert.equal(result.profile.email, 'x@y.com');
  assert.equal(result.dark, true);
});
