import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { getHvacDiagnostics } from './src/server/geminiService.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Premium HVAC API', time: new Date().toISOString() });
});

// Low-latency Gemini 3.1 Flash-Lite HVAC Diagnostics
app.post('/api/diagnostics', async (req, res) => {
  try {
    const { symptom, systemAge, unitType, soundOrSmell } = req.body;
    if (!symptom || typeof symptom !== 'string') {
      res.status(400).json({ error: 'Symptom description is required' });
      return;
    }
    const result = await getHvacDiagnostics({ symptom, systemAge, unitType, soundOrSmell });
    res.json(result);
  } catch (error) {
    console.error('Diagnostic API error:', error);
    res.status(500).json({ error: 'Internal diagnostics failure' });
  }
});

// Lead Submission Proxy Endpoint
app.post('/api/leads', (req, res) => {
  try {
    const lead = req.body;
    if (!lead.name || !lead.phone || !lead.zipCode || !lead.serviceType) {
      res.status(400).json({ error: 'Missing required lead fields' });
      return;
    }
    console.log('[LEAD DISPATCH] New service request received:', {
      name: lead.name,
      phone: lead.phone,
      zipCode: lead.zipCode,
      service: lead.serviceType,
      receivedAt: new Date().toISOString()
    });
    res.status(200).json({ success: true, message: 'Lead recorded and queued for dispatch' });
  } catch (error) {
    console.error('Lead submission error:', error);
    res.status(500).json({ error: 'Failed to process service enquiry' });
  }
});

// Serve Vite build assets in production
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback to SPA index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Premium HVAC server running on http://0.0.0.0:${PORT}`);
});
