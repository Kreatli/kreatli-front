import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import React from 'react';

export const config = {
  runtime: 'edge',
};

const MAX_TITLE_LENGTH = 110;

// Social preview image (1200×630) used for og:image / twitter:image on every public page.
export default function handler(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawTitle = searchParams.get('title')?.trim() || 'Kreatli Marketplace';
  const title = rawTitle.length > MAX_TITLE_LENGTH ? `${rawTitle.slice(0, MAX_TITLE_LENGTH - 1)}…` : rawTitle;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #1b0b2e 0%, #3b1468 55%, #7828c8 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: 14,
              background: '#ffffff',
              color: '#7828c8',
              marginRight: 18,
              fontSize: 36,
            }}
          >
            K
          </div>
          Kreatli Marketplace
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: title.length > 60 ? 60 : 72,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -1.5,
          }}
        >
          {title}
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: '#e4d4f4' }}>
          Hire clippers · Find clipping jobs · marketplace.kreatli.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, immutable, no-transform, max-age=31536000',
      },
    },
  );
}
