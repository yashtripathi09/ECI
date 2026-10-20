export const GLOSSARY_TERMS = [
    {
        id: 'gloss-incoterm',
        term: 'Incoterms (International Commercial Terms)',
        abbreviation: 'Incoterms',
        category: 'INCOTERMS',
        definition: 'A series of 11 pre-defined commercial terms published by the International Chamber of Commerce (ICC) defining seller and buyer responsibilities for freight, insurance, and clearance.',
        example: 'CIF (Cost, Insurance, and Freight) requires the seller to pay freight and insurance to the destination port.',
        incotermRelevance: 'Applies to all 6 Incoterms supported in this application (EXW, FOB, CFR, CIF, DAP, DDP).'
    },
    {
        id: 'gloss-icegate',
        term: 'ICEGATE (Indian Customs EDI Gateway)',
        abbreviation: 'ICEGATE',
        category: 'CUSTOMS',
        definition: 'The national portal of Indian Customs that offers e-filing services for exporters, CHAs, and logistics operators for shipping bills and bill of entry clearance.',
        example: 'Exporters file the Shipping Bill electronically through ICEGATE prior to cargo arrival at Indian ports.',
        incotermRelevance: 'Relevant for Indian origin customs clearance under FOB, CIF, DAP, DDP.'
    },
    {
        id: 'gloss-cha',
        term: 'Customs House Agent',
        abbreviation: 'CHA',
        category: 'CUSTOMS',
        definition: 'A licensed agent authorized to handle customs clearance procedures on behalf of exporters and importers at Indian sea ports and air cargo terminals.',
        example: 'A CHA files the Shipping Bill and handles physical cargo examination at Nhava Sheva or Mundra.',
        incotermRelevance: 'Mandatory for origin customs filing under FOB, CIF, DAP, DDP.'
    },
    {
        id: 'gloss-rodtep',
        term: 'Remission of Duties and Taxes on Exported Products',
        abbreviation: 'RoDTEP',
        category: 'FINANCE',
        definition: 'An Indian government incentive scheme refunding embedded central, state, and local duties/taxes incurred during production that are not otherwise rebated.',
        example: 'Textile exporters receive a 1.5% to 4.3% RoDTEP credit on FOB value credited directly to their e-Scrip account.',
        incotermRelevance: 'Applies to FOB valuation calculated in export invoices.'
    },
    {
        id: 'gloss-hsn',
        term: 'Harmonized System of Nomenclature Code',
        abbreviation: 'HSN Code',
        category: 'DOCUMENTATION',
        definition: 'An internationally standardized numerical method of classifying traded products used by customs authorities worldwide to assess duties.',
        example: 'Cotton T-shirts are classified under HSN Code 6109.10.',
        incotermRelevance: 'Required on all Shipping Bills and Commercial Invoices.'
    },
    {
        id: 'gloss-bill-of-lading',
        term: 'Bill of Lading',
        abbreviation: 'B/L',
        category: 'DOCUMENTATION',
        definition: 'A legal document issued by a ocean carrier to a shipper detailing the type, quantity, and destination of the goods being carried. Serves as a contract of carriage and title document.',
        example: 'An Original Negotiable B/L is surrendered to the bank under Letter of Credit transactions.',
        incotermRelevance: 'Issued upon ocean vessel loading under FOB, CFR, CIF, DAP, DDP.'
    },
    {
        id: 'gloss-demurrage',
        term: 'Demurrage & Detention',
        abbreviation: 'D&D',
        category: 'FREIGHT',
        definition: 'Demurrage is a fee charged by shipping lines when a container remains inside the port terminal beyond free allowed days. Detention applies outside the port.',
        example: 'Standard ocean carriers allow 7 free days at destination port before charging $100/day demurrage.',
        incotermRelevance: 'Included in contingency calculations to protect MSMEs against unexpected port delays.'
    },
    {
        id: 'gloss-thc',
        term: 'Terminal Handling Charges',
        abbreviation: 'THC',
        category: 'FREIGHT',
        definition: 'Fees charged by port container terminal operators for positioning, moving, loading, or unloading containers to/from vessels.',
        example: 'Origin THC at Nhava Sheva ranges between ₹6,500 and ₹9,500 for a 20ft container.',
        incotermRelevance: 'Paid by seller under FOB, CFR, CIF, DAP, DDP.'
    }
];
