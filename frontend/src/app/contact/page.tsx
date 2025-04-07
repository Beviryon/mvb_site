'use client';

import Image from 'next/image';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-offres.jpg"
            alt="Contact MVB Immobilier"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contactez-nous</h1>
          <p className="text-xl md:text-2xl">
            Notre équipe est à votre disposition
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Column */}
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <FaMapMarkerAlt className="w-6 h-6 text-[#800000]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Notre adresse</h3>
                      <p className="text-gray-600">
                      12 Rue Kimbouta, la frontière derrière le PSP<br />
                        Brazzaville
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <FaPhone className="w-6 h-6 text-[#800000]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Téléphone</h3>
                      <p className="text-gray-600">+242 06 686 99 83 / 06 941 22 02 / 06 709 10 43</p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <FaEnvelope className="w-6 h-6 text-[#800000]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Email</h3>
                      <p className="text-gray-600">contact@mvb-immobilier-cg.fr</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <FaClock className="w-6 h-6 text-[#800000]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Horaires d&apos;ouverture</h3>
                      <p className="text-gray-600">
                        Lundi - Vendredi : 8h00 - 18h00<br />
                        Samedi : 10h00 - 17h00<br />
                        Dimanche : Fermé
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="w-full h-[400px] relative mt-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047744831!2d2.2951590760000003!3d48.858370099999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4c0c0c0c0%3A0x0!2zNDjCsDUxJzMwLjEiTiAywrAxNyc0Ny4wIkU!5e0!3m2!1sfr!2sfr!4v1625760000000!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 