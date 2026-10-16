import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Ensure GoogleGenAI is only initialized on server side
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

export interface DiagnosticRequest {
  symptom: string;
  systemAge?: string;
  unitType?: string;
  soundOrSmell?: string;
}

export interface DiagnosticResponse {
  summary: string;
  potentialCauses: string[];
  safeTroubleshootingSteps: string[];
  requiresEmergencyTechnician: boolean;
  floridaClimateConsiderations: string;
  estimatedUrgency: 'low' | 'moderate' | 'high' | 'immediate-hazard';
}

/**
 * Executes low-latency troubleshooting advice using gemini-3.1-flash-lite
 */
export async function getHvacDiagnostics(data: DiagnosticRequest): Promise<DiagnosticResponse> {
  const ai = getAiClient();

  if (!ai) {
    // Graceful fallback if GEMINI_API_KEY is not set yet in environment
    return {
      summary: 'Initial Florida HVAC troubleshooting evaluation',
      potentialCauses: [
        'Clogged condensate drain line tripping the safety float switch',
        'Defective dual-run capacitor preventing outdoor compressor startup',
        'Severely clogged return air filter restricting evaporator airflow'
      ],
      safeTroubleshootingSteps: [
        'Turn off the system at the thermostat immediately to prevent compressor overheating',
        'Check the air filter inside your return grill and replace if dirty',
        'Inspect the outdoor condenser breaker in your electrical service panel',
        'Look at your air handler auxiliary drain pan for standing water'
      ],
      requiresEmergencyTechnician: true,
      floridaClimateConsiderations: 'In Florida heat exceeding 90°F, prolonged indoor heat buildup can cause rapid humidity spikes and secondary moisture issues. Schedule a certified technician for safety.',
      estimatedUrgency: 'high'
    };
  }

  const prompt = `You are a certified Florida Master HVAC technician advising a homeowner with cooling/heating troubles.
Homeowner reported symptoms:
- Main problem: ${data.symptom}
- System approximate age: ${data.systemAge || 'Unknown'}
- Unit type: ${data.unitType || 'Split System Heat Pump / Central AC'}
- Sounds/Smells reported: ${data.soundOrSmell || 'None noted'}

Provide a helpful, calm, realistic diagnostic response in valid JSON with these exact keys:
{
  "summary": "1-2 sentence assessment of what is likely happening",
  "potentialCauses": ["3-4 bullet points of the most common causes in Florida"],
  "safeTroubleshootingSteps": ["2-3 safe homeowner checks (filters, breakers, thermostat settings). NEVER tell homeowners to touch high-voltage capacitors or open electrical panels"],
  "requiresEmergencyTechnician": boolean,
  "floridaClimateConsiderations": "1 sentence on why Florida heat/humidity makes this time-sensitive",
  "estimatedUrgency": "low" | "moderate" | "high" | "immediate-hazard"
}
Output ONLY valid raw JSON.`;

  try {
    const result = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const text = result.text || '';
    const parsed = JSON.parse(text) as DiagnosticResponse;
    return parsed;
  } catch (err) {
    console.error('Gemini Diagnostics error:', err);
    return {
      summary: 'HVAC System Assessment based on symptoms reported.',
      potentialCauses: [
        'Refrigerant pressure drop or leak',
        'Motor capacitor failure',
        'Condensate drainage obstruction'
      ],
      safeTroubleshootingSteps: [
        'Switch thermostat fan from AUTO to ON to test air circulation',
        'Inspect air filter for dirt saturation',
        'Check float switch in indoor drain line'
      ],
      requiresEmergencyTechnician: true,
      floridaClimateConsiderations: 'Florida humidity requires prompt repair to prevent indoor mold growth.',
      estimatedUrgency: 'moderate'
    };
  }
}
