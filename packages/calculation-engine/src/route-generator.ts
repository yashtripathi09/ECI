import { Location, Route, RouteLeg, TransportMode } from '@export-cost/shared';

export interface RouteGeneratorInput {
  origin: Location;
  destination: Location;
  originPort?: Location;
  destinationPort?: Location;
  weightKg: number;
  volumeCbm: number;
}

export function generateRouteAlternatives(input: RouteGeneratorInput): Route[] {
  const { origin, destination, originPort, destinationPort, weightKg } = input;

  const defaultOriginPort: Location = originPort || {
    id: 'port-nhava-sheva',
    name: 'Jawaharlal Nehru Port (Nhava Sheva)',
    state: 'Maharashtra',
    country: 'India',
    lat: 18.95,
    lng: 72.95,
    type: 'PORT',
    code: 'INNSA'
  };

  const defaultDestPort: Location = destinationPort || {
    id: 'port-dest-main',
    name: `${destination.name} Commercial Port`,
    country: destination.country,
    lat: destination.lat - 0.2,
    lng: destination.lng - 0.2,
    type: 'PORT'
  };

  // Route 1: Standard Sea Freight (Direct/Primary)
  const seaLeg1: RouteLeg = {
    id: 'leg-1-1',
    legOrder: 1,
    mode: 'ROAD',
    origin: origin,
    destination: defaultOriginPort,
    distanceKm: 280,
    transitTimeHours: 14,
    carrier: 'Indian Container Haulage Services',
    carbonEmissionsKg: Math.round(weightKg * 0.08),
    estimatedCostUsd: 120
  };

  const seaLeg2: RouteLeg = {
    id: 'leg-1-2',
    legOrder: 2,
    mode: 'SEA',
    origin: defaultOriginPort,
    destination: defaultDestPort,
    distanceKm: 6500,
    transitTimeHours: 432, // 18 Days
    carrier: 'Maersk Line / MSC Shipping',
    carbonEmissionsKg: Math.round(weightKg * 0.18),
    estimatedCostUsd: 850
  };

  const seaLeg3: RouteLeg = {
    id: 'leg-1-3',
    legOrder: 3,
    mode: 'ROAD',
    origin: defaultDestPort,
    destination: destination,
    distanceKm: 85,
    transitTimeHours: 6,
    carrier: 'Destination Logistics Express',
    carbonEmissionsKg: Math.round(weightKg * 0.04),
    estimatedCostUsd: 180
  };

  const route1: Route = {
    id: 'route-sea-direct',
    name: `Direct Ocean Freight via ${defaultOriginPort.name}`,
    transportMode: 'SEA',
    origin,
    destination,
    legs: [seaLeg1, seaLeg2, seaLeg3],
    totalDistanceKm: 280 + 6500 + 85,
    totalTransitDays: 19,
    totalCostUsd: 1150,
    reliabilityScore: 88,
    riskScore: 20,
    carbonKg: seaLeg1.carbonEmissionsKg + seaLeg2.carbonEmissionsKg + seaLeg3.carbonEmissionsKg,
    isDirect: true,
    badges: ['Most Cost-Effective', 'Recommended for MSMEs', 'Lowest Carbon Footprint']
  };

  // Route 2: Ocean Freight via Transshipment (Hub Colombo / Jebel Ali / Singapore)
  const transshipmentPort: Location = {
    id: 'port-jebel-ali',
    name: 'Jebel Ali Port (Transshipment Hub)',
    country: 'UAE',
    lat: 24.98,
    lng: 55.06,
    type: 'PORT',
    code: 'AEJEA'
  };

  const transLeg1: RouteLeg = {
    id: 'leg-2-1',
    legOrder: 1,
    mode: 'ROAD',
    origin,
    destination: defaultOriginPort,
    distanceKm: 280,
    transitTimeHours: 14,
    carrier: 'Origin Feeder Trucking',
    carbonEmissionsKg: Math.round(weightKg * 0.08),
    estimatedCostUsd: 120
  };

  const transLeg2: RouteLeg = {
    id: 'leg-2-2',
    legOrder: 2,
    mode: 'SEA',
    origin: defaultOriginPort,
    destination: transshipmentPort,
    distanceKm: 1900,
    transitTimeHours: 120, // 5 Days
    carrier: 'DP World Feeder Service',
    carbonEmissionsKg: Math.round(weightKg * 0.09),
    estimatedCostUsd: 420
  };

  const transLeg3: RouteLeg = {
    id: 'leg-2-3',
    legOrder: 3,
    mode: 'SEA',
    origin: transshipmentPort,
    destination: defaultDestPort,
    distanceKm: 5200,
    transitTimeHours: 360, // 15 Days
    carrier: 'CMA CGM Global Service',
    carbonEmissionsKg: Math.round(weightKg * 0.16),
    estimatedCostUsd: 650
  };

  const transLeg4: RouteLeg = {
    id: 'leg-2-4',
    legOrder: 4,
    mode: 'ROAD',
    origin: defaultDestPort,
    destination: destination,
    distanceKm: 85,
    transitTimeHours: 6,
    carrier: 'Destination Logistics Express',
    carbonEmissionsKg: Math.round(weightKg * 0.04),
    estimatedCostUsd: 180
  };

  const route2: Route = {
    id: 'route-sea-transshipment',
    name: `Ocean Transshipment via Jebel Ali Hub`,
    transportMode: 'MULTIMODAL',
    origin,
    destination,
    legs: [transLeg1, transLeg2, transLeg3, transLeg4],
    totalDistanceKm: 280 + 1900 + 5200 + 85,
    totalTransitDays: 25,
    totalCostUsd: 1370,
    reliabilityScore: 78,
    riskScore: 35,
    carbonKg: transLeg1.carbonEmissionsKg + transLeg2.carbonEmissionsKg + transLeg3.carbonEmissionsKg + transLeg4.carbonEmissionsKg,
    isDirect: false,
    badges: ['Flexible Departure Schedules', 'High Capacity Route']
  };

  // Route 3: Air Cargo Express
  const originAirport: Location = {
    id: 'airport-delhi',
    name: 'Indira Gandhi International Cargo Terminal',
    state: 'Delhi',
    country: 'India',
    lat: 28.55,
    lng: 77.10,
    type: 'AIRPORT',
    code: 'DEL'
  };

  const destAirport: Location = {
    id: 'airport-dest-main',
    name: `${destination.name} Cargo Terminal`,
    country: destination.country,
    lat: destination.lat + 0.1,
    lng: destination.lng + 0.1,
    type: 'AIRPORT'
  };

  const airLeg1: RouteLeg = {
    id: 'leg-3-1',
    legOrder: 1,
    mode: 'ROAD',
    origin,
    destination: originAirport,
    distanceKm: 120,
    transitTimeHours: 4,
    carrier: 'Express Cargo Trucking',
    carbonEmissionsKg: Math.round(weightKg * 0.05),
    estimatedCostUsd: 90
  };

  const airLeg2: RouteLeg = {
    id: 'leg-3-2',
    legOrder: 2,
    mode: 'AIR',
    origin: originAirport,
    destination: destAirport,
    distanceKm: 6200,
    transitTimeHours: 12,
    carrier: 'Air India Cargo / Lufthansa Cargo',
    carbonEmissionsKg: Math.round(weightKg * 1.40), // Air is much higher carbon per kg
    estimatedCostUsd: 2850
  };

  const airLeg3: RouteLeg = {
    id: 'leg-3-3',
    legOrder: 3,
    mode: 'ROAD',
    origin: destAirport,
    destination,
    distanceKm: 45,
    transitTimeHours: 3,
    carrier: 'DHL / FedEx Air Hub Express',
    carbonEmissionsKg: Math.round(weightKg * 0.03),
    estimatedCostUsd: 140
  };

  const route3: Route = {
    id: 'route-air-express',
    name: `Direct Air Cargo via Delhi Airport (DEL)`,
    transportMode: 'AIR',
    origin,
    destination,
    legs: [airLeg1, airLeg2, airLeg3],
    totalDistanceKm: 120 + 6200 + 45,
    totalTransitDays: 3,
    totalCostUsd: 3080,
    reliabilityScore: 96,
    riskScore: 10,
    carbonKg: airLeg1.carbonEmissionsKg + airLeg2.carbonEmissionsKg + airLeg3.carbonEmissionsKg,
    isDirect: true,
    badges: ['Fastest Transit', 'Lowest Risk', 'Ideal for High-Value Goods']
  };

  return [route1, route2, route3];
}
