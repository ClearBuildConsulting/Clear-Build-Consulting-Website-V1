import React from 'react';

/**
 * Renders a JSON-LD structured-data block. React 19 hoists the <script> and
 * react-snap prerenders it into static HTML so crawlers see it without JS.
 * Pass a plain schema.org object (or array of objects).
 */
export const JsonLd: React.FC<{ data: object | object[] }> = ({ data }) => (
  <script
    type="application/ld+json"
    // Schema is author-controlled static data, not user input.
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);
