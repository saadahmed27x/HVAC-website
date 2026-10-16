/**
 * Input validation, sanitization, and Florida service area verification utilities
 */

// Central Florida verified service area ZIP prefixes and exact ZIP codes
export const CENTRAL_FLORIDA_ZIP_PREFIXES = ['327', '328', '347', '321'];

export const VERIFIED_SERVICE_ZIPS = new Set([
  // Orlando
  '32801', '32803', '32804', '32805', '32806', '32807', '32812', '32814', '32819', '32822', '32824', '32827', '32828', '32832', '32835', '32839',
  // Winter Park & Maitland
  '32789', '32792', '32751',
  // Lake Nona / St. Cloud / Kissimmee
  '32827', '34741', '34743', '34744', '34746', '34769', '34771', '34772',
  // Altamonte Springs, Longwood, Casselberry, Oviedo, Winter Springs
  '32701', '32714', '32750', '32707', '32765', '32708',
  // Sanford, Lake Mary, Heathrow
  '32746', '32771', '32773',
  // Windermere, Winter Garden, Ocoee, Clermont
  '34786', '34787', '34761', '34711'
]);

export interface LeadFormData {
  name: string;
  phone: string;
  email?: string;
  zipCode: string;
  serviceType: string;
  message?: string;
  urgency?: string;
  preferredTime?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  inServiceArea: boolean;
}

/**
 * Validates a 5-digit US ZIP code and checks whether it's within the Central Florida service region
 */
export function validateZipCode(zip: string): { isValid: boolean; inArea: boolean; message?: string } {
  const cleaned = zip.trim();
  const zipRegex = /^\d{5}$/;

  if (!zipRegex.test(cleaned)) {
    return { isValid: false, inArea: false, message: 'Please enter a valid 5-digit US ZIP code.' };
  }

  const prefix = cleaned.substring(0, 3);
  const isPrefixMatch = CENTRAL_FLORIDA_ZIP_PREFIXES.includes(prefix);
  const isExactMatch = VERIFIED_SERVICE_ZIPS.has(cleaned);

  if (isExactMatch || isPrefixMatch) {
    return { isValid: true, inArea: true };
  }

  return {
    isValid: true,
    inArea: false,
    message: 'ZIP code is outside our primary Central Florida service territory. We can still review your request on a case-by-case basis.'
  };
}

/**
 * Formats user phone input into a standard (XXX) XXX-XXXX presentation
 */
export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

/**
 * Strips non-digit characters for storage
 */
export function cleanPhoneNumber(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Validates lead request form payload
 */
export function validateLeadForm(data: Partial<LeadFormData>): ValidationResult {
  const errors: Record<string, string> = {};

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Full name is required (minimum 2 characters).';
  } else if (data.name.trim().length > 80) {
    errors.name = 'Name cannot exceed 80 characters.';
  }

  // Phone validation
  const cleanedPhone = cleanPhoneNumber(data.phone || '');
  if (!cleanedPhone || cleanedPhone.length < 10) {
    errors.phone = 'A valid 10-digit phone number is required for dispatch.';
  }

  // Email validation (optional if phone given, but must be valid if entered)
  if (data.email && data.email.trim().length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }
  }

  // ZIP Code validation
  const zipCheck = validateZipCode(data.zipCode || '');
  if (!zipCheck.isValid) {
    errors.zipCode = zipCheck.message || 'Valid ZIP code required.';
  }

  // Service Type validation
  const validServices = [
    'ac-repair',
    'ac-installation',
    'hvac-maintenance',
    'heating-heat-pumps',
    'indoor-air-quality',
    'emergency-repair',
    'free-estimate',
    'other'
  ];
  if (!data.serviceType || !validServices.includes(data.serviceType)) {
    errors.serviceType = 'Please select a service category.';
  }

  // Message length check
  if (data.message && data.message.length > 1000) {
    errors.message = 'Message must be under 1,000 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    inServiceArea: zipCheck.inArea
  };
}
