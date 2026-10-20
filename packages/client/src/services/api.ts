import { calculateExportCost } from '@export-cost/calculation-engine';
import {
  CalculationInput,
  CalculationResult,
  CurrencyCode,
  GlossaryTerm,
  Location,
  Port,
  Route,
  RouteComparison
} from '@export-cost/shared';

const API_BASE = '/api/v1';

// Seed fallbacks for offline execution
const SEED_ORIGINS: Location[] = [
  { id: 'origin-ludhiana', name: 'Ludhiana Industrial Hub', state: 'Punjab', country: 'India', lat: 30.9, lng: 75.85, type: 'ORIGIN', code: 'INLUH' },
  { id: 'origin-delhi', name: 'Delhi NCR (ICD Tughlakabad)', state: 'Delhi', country: 'India', lat: 28.51, lng: 77.26, type: 'ORIGIN', code: 'INTKD' },
  { id: 'origin-jaipur', name: 'Jaipur Handicraft Zone', state: 'Rajasthan', country: 'India', lat: 26.91, lng: 75.78, type: 'ORIGIN', code: 'INJAI' },
  { id: 'origin-tirupur', name: 'Tirupur Textile Hub', state: 'Tamil Nadu', country: 'India', lat: 11.1, lng: 77.34, type: 'ORIGIN', code: 'INTUP' },
  { id: 'origin-surat', name: 'Surat Diamond & Textile City', state: 'Gujarat', country: 'India', lat: 21.17, lng: 72.83, type: 'ORIGIN', code: 'INSUR' },
  { id: 'origin-indore', name: 'Indore Pharma & Agri Zone', state: 'Madhya Pradesh', country: 'India', lat: 22.71, lng: 75.85, type: 'ORIGIN', code: 'ININD' },
  { id: 'origin-moradabad', name: 'Moradabad Brass City', state: 'Uttar Pradesh', country: 'India', lat: 28.83, lng: 78.78, type: 'ORIGIN', code: 'INMBD' },
  { id: 'origin-bengaluru', name: 'Bengaluru Tech & Engineering Hub', state: 'Karnataka', country: 'India', lat: 12.97, lng: 77.59, type: 'ORIGIN', code: 'INBLR' }
];

const SEED_DESTINATIONS: Location[] = [
  { id: 'dest-hamburg', name: 'Hamburg Port City', country: 'Germany', lat: 53.55, lng: 9.99, type: 'DESTINATION', code: 'DEHAM' },
  { id: 'dest-rotterdam', name: 'Rotterdam Logistics Port', country: 'Netherlands', lat: 51.92, lng: 4.47, type: 'DESTINATION', code: 'NLRTM' },
  { id: 'dest-dubai', name: 'Dubai Jebel Ali Free Zone', country: 'UAE', lat: 24.98, lng: 55.06, type: 'DESTINATION', code: 'AEJEA' },
  { id: 'dest-singapore', name: 'Singapore PSA Container Port', country: 'Singapore', lat: 1.29, lng: 103.85, type: 'DESTINATION', code: 'SGSIN' },
  { id: 'dest-newyork', name: 'New York / New Jersey Port Terminal', country: 'USA', lat: 40.71, lng: -74.0, type: 'DESTINATION', code: 'USNYC' },
  { id: 'dest-felixstowe', name: 'Felixstowe Port Hub', country: 'United Kingdom', lat: 51.96, lng: 1.35, type: 'DESTINATION', code: 'GBFXT' },
  { id: 'dest-yokohama', name: 'Yokohama Bay Port', country: 'Japan', lat: 35.44, lng: 139.63, type: 'DESTINATION', code: 'JPYOK' },
  { id: 'dest-sydney', name: 'Sydney Port Botany', country: 'Australia', lat: -33.86, lng: 151.2, type: 'DESTINATION', code: 'AUSYD' }
];

const SEED_PORTS: Port[] = [
  { id: 'port-nhava-sheva', name: 'Jawaharlal Nehru Port (Nhava Sheva)', state: 'Maharashtra', country: 'India', lat: 18.95, lng: 72.95, type: 'PORT', portType: 'SEA', unlocode: 'INNSA', handlingFeeUsd: 110 },
  { id: 'port-mundra', name: 'Adani Ports Mundra', state: 'Gujarat', country: 'India', lat: 22.74, lng: 69.7, type: 'PORT', portType: 'SEA', unlocode: 'INMUN', handlingFeeUsd: 95 },
  { id: 'port-chennai', name: 'Chennai Ocean Terminal', state: 'Tamil Nadu', country: 'India', lat: 13.08, lng: 80.29, type: 'PORT', portType: 'SEA', unlocode: 'INMAA', handlingFeeUsd: 105 }
];

export async function fetchOrigins(): Promise<Location[]> {
  try {
    const res = await fetch(`${API_BASE}/locations/origins`);
    if (res.ok) {
      const body = await res.json();
      return body.data;
    }
  } catch {}
  return SEED_ORIGINS;
}

export async function fetchDestinations(): Promise<Location[]> {
  try {
    const res = await fetch(`${API_BASE}/locations/destinations`);
    if (res.ok) {
      const body = await res.json();
      return body.data;
    }
  } catch {}
  return SEED_DESTINATIONS;
}

export async function fetchPorts(): Promise<Port[]> {
  try {
    const res = await fetch(`${API_BASE}/locations/ports`);
    if (res.ok) {
      const body = await res.json();
      return body.data;
    }
  } catch {}
  return SEED_PORTS;
}

export async function runCalculation(input: CalculationInput): Promise<CalculationResult> {
  try {
    const res = await fetch(`${API_BASE}/calculations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });
    if (res.ok) {
      const body = await res.json();
      saveToLocalStorage(body.data);
      return body.data;
    }
  } catch {}

  // Local fallback calculation engine
  const origins = await fetchOrigins();
  const destinations = await fetchDestinations();

  const origin = origins.find(o => o.id === input.originId) || origins[0];
  const destination = destinations.find(d => d.id === input.destinationId) || destinations[0];

  const result = calculateExportCost({
    input,
    origin,
    destination
  });

  saveToLocalStorage(result);
  return result;
}

export async function compareRoutesApi(routes: Route[]): Promise<RouteComparison> {
  try {
    const res = await fetch(`${API_BASE}/routes/compare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ routes })
    });
    if (res.ok) {
      const body = await res.json();
      return body.data;
    }
  } catch {}

  // Fallback comparative matrix
  const sorted = [...routes].sort((a, b) => a.totalCostUsd - b.totalCostUsd);
  return {
    calculationId: `cmp-local-${Date.now()}`,
    routes,
    recommendedRouteId: sorted[0].id,
    comparisonMatrix: routes.map(r => ({
      routeId: r.id,
      routeName: r.name,
      transportMode: r.transportMode,
      totalCostInr: Math.round(r.totalCostUsd * 83.5),
      transitDays: r.totalTransitDays,
      eciScore: r.reliabilityScore,
      carbonKg: r.carbonKg,
      reliabilityScore: r.reliabilityScore,
      riskScore: r.riskScore,
      badges: r.badges
    }))
  };
}

export async function fetchExchangeRates(): Promise<Record<CurrencyCode, number>> {
  try {
    const res = await fetch(`${API_BASE}/pricing/exchange-rates`);
    if (res.ok) {
      const body = await res.json();
      return body.rates;
    }
  } catch {}
  return {
    INR: 1.0,
    USD: 83.50,
    EUR: 90.80,
    GBP: 106.20,
    AED: 22.73,
    SGD: 62.15,
    JPY: 0.54
  };
}

export async function fetchGlossary(query?: string, category?: string): Promise<GlossaryTerm[]> {
  try {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (category) params.append('category', category);

    const res = await fetch(`${API_BASE}/glossary?${params.toString()}`);
    if (res.ok) {
      const body = await res.json();
      return body.data;
    }
  } catch {}
  return [];
}

// Local Storage Helper
function saveToLocalStorage(calc: CalculationResult) {
  try {
    const existingRaw = localStorage.getItem('export_calculations') || '[]';
    const list: CalculationResult[] = JSON.parse(existingRaw);
    const updated = [calc, ...list.filter(item => item.id !== calc.id)].slice(0, 20);
    localStorage.setItem('export_calculations', JSON.stringify(updated));
  } catch (e) {
    console.warn('LocalStorage save failed:', e);
  }
}

export function getSavedCalculations(): CalculationResult[] {
  try {
    const existingRaw = localStorage.getItem('export_calculations');
    if (existingRaw) return JSON.parse(existingRaw);
  } catch {}
  return [];
}
