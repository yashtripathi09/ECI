import React from 'react';
import { CalculationResult } from '@export-cost/shared';
import { formatCurrency } from '@export-cost/shared';
import { ArrowUpRight, Award, Calculator, MapPin, PackageCheck, Ship, TrendingUp } from 'lucide-react';

interface DashboardViewProps {
  savedCalculations: CalculationResult[];
  onStartNew: () => void;
  onViewResult: (calc: CalculationResult) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  savedCalculations,
  onStartNew,
  onViewResult
}) => {
  const totalCalcs = savedCalculations.length;

  const avgCostInr = totalCalcs > 0
    ? Math.round(savedCalculations.reduce((sum, c) => sum + c.costBreakdown.totalExportCostInr, 0) / totalCalcs)
    : 0;

  const avgScore = totalCalcs > 0
    ? Math.round(savedCalculations.reduce((sum, c) => sum + c.indicator.overallScore, 0) / totalCalcs)
    : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Hero Banner */}
      <div className="glass-card" style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(18,24,38,0.9) 0%, rgba(30,41,65,0.9) 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '650px', zIndex: 2, position: 'relative' }}>
          <span className="badge badge-green" style={{ marginBottom: '0.75rem' }}>
            MSME Logistics & Export Portal
          </span>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: '1.25', marginBottom: '0.75rem', color: '#fff' }}>
            Export Cost Indicator & Interactive Trade Route Map
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Estimate total landed costs, evaluate Incoterm responsibility allocations, visualize multi-modal sea & air trade corridors, and boost MSME export competitiveness.
          </p>

          <button className="btn btn-primary" onClick={onStartNew} style={{ padding: '0.85rem 1.5rem', fontSize: '1rem' }}>
            <Calculator size={20} /> Calculate Export Shipment Costs
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <span>Saved Calculations</span>
            <Calculator size={18} style={{ color: 'var(--primary)' }} />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.4rem' }}>{totalCalcs}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.2rem' }}>Total MSME quotes processed</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <span>Avg Shipment Export Cost</span>
            <TrendingUp size={18} style={{ color: 'var(--accent-green)' }} />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.4rem', color: 'var(--accent-green)' }}>
            {totalCalcs > 0 ? formatCurrency(avgCostInr, 'INR') : '₹0'}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.2rem' }}>Based on recent origin routes</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <span>Avg Export Readiness Score</span>
            <Award size={18} style={{ color: 'var(--accent-amber)' }} />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.4rem', color: 'var(--accent-amber)' }}>
            {avgScore} / 100
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.2rem' }}>Overall efficiency rating</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <span>Corridor Modes</span>
            <Ship size={18} style={{ color: 'var(--accent-purple)' }} />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.4rem', color: 'var(--accent-purple)' }}>
            Sea & Air
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.2rem' }}>Multi-modal Indian ports</div>
        </div>
      </div>

      {/* Recent Calculations List */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Recent Saved Calculations</h3>
          <button className="btn btn-outline btn-sm" onClick={onStartNew}>
            + Create New Quote
          </button>
        </div>

        {savedCalculations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
            <PackageCheck size={40} style={{ opacity: 0.5, marginBottom: '0.5rem' }} />
            <p>No saved export calculations yet.</p>
            <button className="btn btn-primary btn-sm" onClick={onStartNew} style={{ marginTop: '0.75rem' }}>
              Run First Calculation
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Origin → Destination</th>
                  <th>Incoterm / Mode</th>
                  <th>Total Cost (INR)</th>
                  <th>ECI Score</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {savedCalculations.map(calc => (
                  <tr key={calc.id}>
                    <td>
                      <strong>{calc.input.productName}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                        {calc.input.weightKg} kg | {calc.input.quantity} {calc.input.unit}
                      </div>
                    </td>
                    <td>
                      {calc.origin.name} → {calc.destination.name}
                    </td>
                    <td>
                      <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>
                        {calc.input.incoterm} / {calc.input.transportMode}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--accent-green)' }}>
                      {formatCurrency(calc.costBreakdown.totalExportCostInr, 'INR')}
                    </td>
                    <td>
                      <span className={`badge ${calc.indicator.overallScore >= 70 ? 'badge-green' : 'badge-amber'}`}>
                        {calc.indicator.overallScore} / 100
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-secondary btn-sm" onClick={() => onViewResult(calc)}>
                        View <ArrowUpRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
