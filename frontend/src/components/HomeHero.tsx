'use client';

import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import ActionPopup from './ActionPopup';

const HomeHero = () => {
  const [isActionPopupOpen, setIsActionPopupOpen] = useState(false);

  return (
    <div>
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[#1A1A2E]" />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bienvenue chez MVB Immobilier
          </h1>
          <p className="text-xl md:text-2xl mb-8">
          Votre partenaire de confiance pour tous vos projets immobiliers. Nous vous accompagnons dans l'acquisition, la location, la construction et la gestion de votre patrimoine immobilier.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsActionPopupOpen(true)}
              className="bg-[#800000] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#9B1B30] transition-colors"
            >
              Commencer un projet
            </button>
            <Link
              href="/contact"
              className="bg-white text-[#800000] px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
      <ActionPopup isOpen={isActionPopupOpen} onClose={() => setIsActionPopupOpen(false)} />
    </div>
  );
}

export default HomeHero; 