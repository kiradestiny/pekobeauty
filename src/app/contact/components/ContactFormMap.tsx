"use client";
import React from 'react';
import ContactForm from './ContactForm';
import ContactMap from './ContactMap';

export default function ContactFormMap() {
  return (
    <section className="pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-[48px] shadow-2xl shadow-gray-200/60 overflow-hidden border border-gray-50">
          <div className="grid lg:grid-cols-2">
            {/* Left: Contact Form */}
            <ContactForm />
            {/* Right: Map */}
            <div className="relative min-h-[600px] bg-gray-50 group/map overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.282683182031!2d114.16753137602432!3d22.319356642055342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34040090a0a0a0a1%3A0x1234567890abcdef!2sPeko%20Beauty!5e0!3m2!1szh-TW!2shk!4v1700000000000!5m2!1szh-TW!2shk"
                width="100%" height="100%"
                style={{ border: 0, position: 'absolute', inset: 0 }}
                allowFullScreen loading="lazy"
                className="grayscale group-hover/map:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
