/**
 * HVAC Engineering & Cost Calculation Utilities
 * Standard Manual J estimation formulas adapted for Florida's humid subtropical climate (Zone 2)
 */

export interface SystemSizingResult {
  recommendedTons: number;
  minTons: number;
  maxTons: number;
  totalBtu: number;
  climateZone: string;
  notes: string[];
}

export interface EnergySavingsResult {
  annualKwhSaved: number;
  annualDollarSavings: number;
  tenYearDollarSavings: number;
  percentReduction: number;
}

export interface EstimateRangeResult {
  minPrice: number;
  maxPrice: number;
  equipmentType: string;
  seer2Rating: number;
  includesDuctwork: boolean;
  warrantyYears: number;
}

/**
 * Calculates approximate residential AC tonnage requirement for Florida homes.
 * In Florida's hot/humid climate, standard residential thumb rule is ~450-500 sq ft per ton,
 * adjusted for ceiling heights > 8ft and sun exposure.
 */
export function calculateTonnage(
  sqFt: number,
  ceilingHeight: number = 8,
  highSunExposure: boolean = false
): SystemSizingResult {
  if (sqFt <= 0) {
    throw new Error('Square footage must be greater than zero');
  }

  // Base Florida sizing: 500 sq ft per ton for standard 8ft ceilings
  const baseTons = sqFt / 500;

  // Ceiling height adjustment factor
  const heightMultiplier = ceilingHeight > 8 ? 1 + (ceilingHeight - 8) * 0.05 : 1.0;

  // Sun exposure and Florida high humidity latent load adder (+8%)
  const solarMultiplier = highSunExposure ? 1.08 : 1.0;

  const rawTons = baseTons * heightMultiplier * solarMultiplier;

  // Standard residential HVAC units come in half-ton increments: 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 5.0
  const validSizes = [1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 5.0];
  
  let recommended = validSizes[0];
  for (const size of validSizes) {
    if (size >= rawTons) {
      recommended = size;
      break;
    }
    recommended = size;
  }

  const minTons = Math.max(1.5, recommended - 0.5);
  const maxTons = Math.min(5.0, recommended + 0.5);
  const totalBtu = recommended * 12000;

  const notes: string[] = [
    'Based on Florida IECC Climate Zone 2 design temperatures (92°F dry bulb / 77°F wet bulb).',
    'A certified Manual J load calculation is required before official installation to account for insulation and window solar heat gain coefficients (SHGC).'
  ];

  if (ceilingHeight > 10) {
    notes.push('High volume ceilings factored into air exchange and cooling distribution.');
  }

  return {
    recommendedTons: recommended,
    minTons,
    maxTons,
    totalBtu,
    climateZone: 'Zone 2 (Hot/Humid - Florida)',
    notes
  };
}

/**
 * Calculates estimated annual electrical energy savings when upgrading from an older SEER unit
 * to a new SEER2 high-efficiency heat pump or straight-cool system.
 * 
 * Formula: (BTU / Old SEER - BTU / New SEER) * Annual Operating Hours / 1000 = kWh Saved
 * Florida homes average ~2,600 to 3,000 cooling hours per year.
 */
export function calculateSeerSavings(
  currentSeer: number,
  newSeer2: number,
  tonnage: number = 3.0,
  annualHours: number = 2800,
  kwhRate: number = 0.155 // Central Florida Duke / OUC average rate ~15.5 cents/kWh
): EnergySavingsResult {
  if (currentSeer <= 0 || newSeer2 <= 0) {
    throw new Error('SEER ratings must be positive numbers');
  }

  const btu = tonnage * 12000;
  const oldWatts = btu / currentSeer;
  const newWatts = btu / newSeer2;

  const wattDifference = Math.max(0, oldWatts - newWatts);
  const annualKwhSaved = Math.round((wattDifference * annualHours) / 1000);
  const annualDollarSavings = Math.round(annualKwhSaved * kwhRate);
  const tenYearDollarSavings = annualDollarSavings * 10;
  const percentReduction = Math.round(((currentSeer < newSeer2 ? (newWatts - oldWatts) / -oldWatts : 0)) * 100);

  return {
    annualKwhSaved,
    annualDollarSavings,
    tenYearDollarSavings,
    percentReduction: Math.min(100, Math.max(0, percentReduction))
  };
}

/**
 * Calculates realistic, truthful estimate ranges for complete Florida HVAC replacements.
 * Florida Building Code 2023+ mandates minimum 15.2 SEER2 for split system heat pumps.
 */
export function estimateSystemPriceRange(
  tonnage: number,
  efficiencyTier: 'standard' | 'high' | 'ultra' = 'standard',
  includesDuctwork: boolean = false
): EstimateRangeResult {
  // Base equipment & certified installation cost per ton
  let baseCostPerTon = 2200;
  let seer2Rating = 15.2;
  let warrantyYears = 10;
  let equipmentType = '15.2 SEER2 Single-Stage Heat Pump System';

  if (efficiencyTier === 'high') {
    baseCostPerTon = 2800;
    seer2Rating = 17.0;
    warrantyYears = 10;
    equipmentType = '17.0 SEER2 Two-Stage High-Efficiency System';
  } else if (efficiencyTier === 'ultra') {
    baseCostPerTon = 3600;
    seer2Rating = 20.0;
    warrantyYears = 12;
    equipmentType = '20+ SEER2 Inverter Variable-Speed Whisper System';
  }

  const equipmentCost = tonnage * baseCostPerTon;
  const ductworkCost = includesDuctwork ? 2500 + tonnage * 450 : 0;

  // Range factor: ±12% depending on line set length, electrical disconnect upgrade, and hurricane pad
  const totalBase = equipmentCost + ductworkCost;
  const minPrice = Math.round((totalBase * 0.9) / 50) * 50;
  const maxPrice = Math.round((totalBase * 1.15) / 50) * 50;

  return {
    minPrice,
    maxPrice,
    equipmentType,
    seer2Rating,
    includesDuctwork,
    warrantyYears
  };
}
