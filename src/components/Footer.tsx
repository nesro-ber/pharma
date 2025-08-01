import React from 'react';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';
import PharmacyLogo from './PharmacyLogo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-green-800 to-green-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/10 p-3 rounded-xl">
                <PharmacyLogo className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Pharma Digital</h3>
                <p className="text-green-200 italic">La pharmacie à être numérique</p>
              </div>
            </div>
            <p className="text-green-100 mb-6 leading-relaxed">
              Pharma Digital révolutionne l'accès aux médicaments en connectant les pharmacies 
              et les patients à travers une plateforme numérique moderne et sécurisée. 
              Notre mission est de faciliter la recherche et l'accès aux traitements 
              tout en soutenant les pharmacies locales.
            </p>
            <div className="flex items-center gap-2 text-green-200">
              <Heart className="h-4 w-4 text-red-400" />
              <span className="text-sm">Fait avec passion pour améliorer la santé de tous</span>
            </div>
          </div>

          {/* Who We Are */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-100">Qui sommes-nous ?</h4>
            <div className="space-y-3 text-green-200 text-sm">
              <p>
                <strong className="text-white">Notre Vision:</strong><br />
                Démocratiser l'accès aux médicaments grâce au numérique
              </p>
              <p>
                <strong className="text-white">Notre Mission:</strong><br />
                Connecter pharmacies et patients pour un service de santé optimal
              </p>
              <p>
                <strong className="text-white">Nos Valeurs:</strong><br />
                Transparence, accessibilité, innovation et confiance
              </p>
              <div className="pt-2">
                <div className="text-white font-medium mb-2">Équipe fondatrice:</div>
                <div className="text-xs space-y-1">
                  <p>• Dr. Marie Dubois - Pharmacienne</p>
                  <p>• Jean Martin - Développeur</p>
                  <p>• Sophie Bernard - UX Designer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-100">Contactez-nous</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-green-200">
                  <div className="font-medium text-white mb-1">Siège social</div>
                  <p>123 Avenue de la Santé<br />75001 Paris, France</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-400 flex-shrink-0" />
                <div className="text-sm">
                  <div className="font-medium text-white">Téléphone</div>
                  <a href="tel:+33123456789" className="text-green-200 hover:text-white transition-colors">
                    +33 1 23 45 67 89
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-400 flex-shrink-0" />
                <div className="text-sm">
                  <div className="font-medium text-white">Email</div>
                  <a href="mailto:contact@pharmadigital.fr" className="text-green-200 hover:text-white transition-colors">
                    contact@pharmadigital.fr
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-green-700">
                <div className="text-sm text-green-200">
                  <div className="font-medium text-white mb-2">Horaires d'assistance</div>
                  <p>Lundi - Vendredi: 9h00 - 18h00</p>
                  <p>Samedi: 9h00 - 12h00</p>
                  <p className="text-xs mt-1 text-green-300">Support technique 24h/7j pour les pharmacies</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-green-200">
              © 2024 Pharma Digital. Tous droits réservés.
            </div>
            <div className="flex items-center gap-6 text-sm text-green-200">
              <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
              <a href="#" className="hover:text-white transition-colors">CGU</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;