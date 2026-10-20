import React, { useState, useEffect } from 'react';
import { GlossaryTerm } from '@export-cost/shared';
import { fetchGlossary } from '../../services/api';
import { BookOpen, Search, HelpCircle, Tag } from 'lucide-react';

export const GlossaryView: React.FC = () => {
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  useEffect(() => {
    fetchGlossary(search, selectedCategory === 'ALL' ? undefined : selectedCategory).then(setTerms);
  }, [search, selectedCategory]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={24} style={{ color: 'var(--primary)' }} />
          Export & Trade Logistics Glossary
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Educational guide clarifying complex international logistics terminology, Incoterms 2020 rules, and Indian customs procedures.
        </p>

        {/* Search & Category Filter */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.5rem' }}
              placeholder="Search trade terms, Incoterms, ICEGATE..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <select
            className="form-select"
            style={{ width: '200px' }}
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <option value="ALL">All Categories</option>
            <option value="INCOTERMS">Incoterms 2020</option>
            <option value="CUSTOMS">Customs & ICEGATE</option>
            <option value="DOCUMENTATION">Documentation</option>
            <option value="FREIGHT">Ocean & Air Freight</option>
            <option value="FINANCE">Export Finance</option>
          </select>
        </div>

        {/* Terms List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.2rem' }}>
          {terms.map(item => (
            <div key={item.id} className="glass-card" style={{ padding: '1.2rem', background: 'var(--bg-card-solid)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {item.term}
                </h3>
                <span className="badge badge-blue" style={{ fontSize: '0.68rem' }}>
                  {item.category}
                </span>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.8rem', lineHeight: '1.4' }}>
                {item.definition}
              </p>

              {item.example && (
                <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', background: 'rgba(255,255,255,0.03)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.5rem' }}>
                  <strong>Example:</strong> {item.example}
                </div>
              )}

              {item.incotermRelevance && (
                <div style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>
                  💡 {item.incotermRelevance}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
