import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTonnage,
  calculateSeerSavings,
  estimateSystemPriceRange
} from './hvacCalculations.ts';

test('calculateTonnage sizes properly for standard 1500 sq ft home', () => {
  const result = calculateTonnage(1500, 8, false);
  assert.equal(result.recommendedTons, 3.0);
  assert.equal(result.totalBtu, 36000);
  assert.equal(result.climateZone, 'Zone 2 (Hot/Humid - Florida)');
});

test('calculateTonnage adjusts for high 12ft ceilings', () => {
  const result = calculateTonnage(1500, 12, false);
  // 1500 / 500 = 3 tons * (1 + 4*0.05 = 1.2) = 3.6 tons -> sizes to 4.0 tons
  assert.equal(result.recommendedTons, 4.0);
  assert.equal(result.totalBtu, 48000);
});

test('calculateTonnage throws error on non-positive sq ft', () => {
  assert.throws(() => calculateTonnage(0), {
    message: 'Square footage must be greater than zero'
  });
});

test('calculateSeerSavings computes accurate Florida energy savings', () => {
  // Upgrade from 10 SEER to 16 SEER2 on a 3-ton unit in Florida
  const result = calculateSeerSavings(10, 16, 3.0, 2800, 0.155);
  assert.ok(result.annualKwhSaved > 3000, `Expected >3000 kWh saved, got ${result.annualKwhSaved}`);
  assert.ok(result.annualDollarSavings > 450, `Expected >$450 annual savings, got ${result.annualDollarSavings}`);
  assert.equal(result.tenYearDollarSavings, result.annualDollarSavings * 10);
});

test('calculateSeerSavings handles equal or lower new SEER gracefully', () => {
  const result = calculateSeerSavings(16, 16, 3.0);
  assert.equal(result.annualKwhSaved, 0);
  assert.equal(result.annualDollarSavings, 0);
});

test('estimateSystemPriceRange provides realistic tiers for Florida installations', () => {
  const standard = estimateSystemPriceRange(3.0, 'standard', false);
  const highTier = estimateSystemPriceRange(3.0, 'high', false);
  const ultraTier = estimateSystemPriceRange(3.0, 'ultra', true);

  assert.ok(standard.minPrice < standard.maxPrice);
  assert.ok(highTier.minPrice > standard.minPrice);
  assert.ok(ultraTier.minPrice > highTier.minPrice);
  assert.equal(ultraTier.includesDuctwork, true);
});
