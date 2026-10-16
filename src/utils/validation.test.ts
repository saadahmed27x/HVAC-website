import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateZipCode,
  formatPhoneNumber,
  cleanPhoneNumber,
  validateLeadForm
} from './validation.ts';

test('validateZipCode recognizes Orlando 32801 and Winter Park 32789 as in service area', () => {
  const orlando = validateZipCode('32801');
  assert.equal(orlando.isValid, true);
  assert.equal(orlando.inArea, true);

  const winterPark = validateZipCode('32789');
  assert.equal(winterPark.isValid, true);
  assert.equal(winterPark.inArea, true);
});

test('validateZipCode marks out-of-area valid ZIPs properly', () => {
  // New York ZIP
  const nyZip = validateZipCode('10001');
  assert.equal(nyZip.isValid, true);
  assert.equal(nyZip.inArea, false);
  assert.ok(nyZip.message?.includes('outside our primary'));
});

test('validateZipCode rejects invalid format', () => {
  const invalid = validateZipCode('abc');
  assert.equal(invalid.isValid, false);
});

test('formatPhoneNumber formats 10-digit number to (XXX) XXX-XXXX', () => {
  assert.equal(formatPhoneNumber('4075551234'), '(407) 555-1234');
  assert.equal(cleanPhoneNumber('(407) 555-1234'), '4075551234');
});

test('validateLeadForm verifies required fields and catches missing values', () => {
  const incomplete = validateLeadForm({
    name: 'J',
    phone: '123'
  });
  assert.equal(incomplete.isValid, false);
  assert.ok(incomplete.errors.name);
  assert.ok(incomplete.errors.phone);
  assert.ok(incomplete.errors.zipCode);
  assert.ok(incomplete.errors.serviceType);

  const complete = validateLeadForm({
    name: 'Robert Davis',
    phone: '(407) 555-9876',
    email: 'robert@example.com',
    zipCode: '32801',
    serviceType: 'ac-repair',
    message: 'AC stopped cooling overnight.'
  });
  assert.equal(complete.isValid, true);
  assert.equal(Object.keys(complete.errors).length, 0);
  assert.equal(complete.inServiceArea, true);
});
