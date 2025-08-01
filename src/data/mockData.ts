import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Paracétamol 500mg',
    description: 'Antalgique et antipyrétique pour traiter la douleur et la fièvre. Efficace contre les maux de tête et les douleurs musculaires.',
    type: 'Pharmaceutique',
    pharmacyLocation: 'Pharmacie Centrale - 123 Rue de la Santé, Paris',
    pharmacyComment: 'Disponible sans ordonnance. Conseils gratuits prodigués par nos pharmaciens.',
    price: 3.50,
    inStock: true,
    prescribedBy: 'Dr. Marie Dubois',
    pharmacyRating: 4.5,
    pharmacyId: '1',
    imageUrl: undefined,
    userReviews: [
      {
        id: '1',
        userName: 'Sophie M.',
        rating: 5,
        comment: 'Service excellent, personnel très professionnel et accueillant.',
        date: '2024-01-15'
      },
      {
        id: '2',
        userName: 'Marc L.',
        rating: 4,
        comment: 'Bonne pharmacie, conseils utiles mais parfois un peu d\'attente.',
        date: '2024-01-10'
      }
    ]
  },
  {
    id: '2',
    name: 'Crème Hydratante Visage',
    description: 'Crème hydratante enrichie en acide hyaluronique pour tous types de peau. Absorption rapide et fini non gras.',
    type: 'Cosmétique',
    pharmacyLocation: 'Pharmacie du Marché - 456 Avenue des Roses, Lyon',
    pharmacyComment: 'Produit dermatologiquement testé. Parfait pour les peaux sensibles.',
    price: 15.90,
    inStock: true,
    pharmacyRating: 4.2,
    pharmacyId: '2',
    imageUrl: undefined,
    userReviews: [
      {
        id: '3',
        userName: 'Claire D.',
        rating: 4,
        comment: 'Pharmacie moderne avec un bon choix de produits cosmétiques.',
        date: '2024-01-12'
      }
    ]
  },
  {
    id: '3',
    name: 'Vitamines D3',
    description: 'Complément alimentaire en vitamine D3 pour maintenir une ossature normale et soutenir le système immunitaire.',
    type: 'Parapharmaceutique',
    pharmacyLocation: 'Pharmacie Moderne - 789 Boulevard de la Liberté, Marseille',
    pharmacyComment: 'Recommandé pour les carences en vitamine D. Posologie adaptée selon les besoins.',
    price: 12.30,
    inStock: false,
    prescribedBy: 'Dr. Jean Martin',
    pharmacyRating: 4.8,
    pharmacyId: '3',
    imageUrl: undefined,
    userReviews: [
      {
        id: '4',
        userName: 'Pierre R.',
        rating: 5,
        comment: 'Pharmaciens très compétents, explications claires sur les traitements.',
        date: '2024-01-08'
      },
      {
        id: '5',
        userName: 'Anne T.',
        rating: 5,
        comment: 'Service impeccable, livraison rapide disponible.',
        date: '2024-01-05'
      }
    ]
  },
  {
    id: '4',
    name: 'Ibuprofène 400mg',
    description: 'Anti-inflammatoire non stéroïdien pour le traitement de la douleur et de l\'inflammation. Action rapide et efficace.',
    type: 'Pharmaceutique',
    pharmacyLocation: 'Pharmacie Saint-Martin - 321 Rue du Commerce, Toulouse',
    pharmacyComment: 'Médicament sur ordonnance. Consultation médicale recommandée avant utilisation.',
    price: 4.20,
    inStock: true,
    prescribedBy: 'Dr. Pierre Leroy',
    pharmacyRating: 3.8,
    pharmacyId: '4',
    imageUrl: undefined,
    userReviews: [
      {
        id: '6',
        userName: 'Julie B.',
        rating: 4,
        comment: 'Bonne pharmacie mais horaires d\'ouverture limités.',
        date: '2024-01-14'
      }
    ]
  },
  {
    id: '5',
    name: 'Sérum Anti-Âge',
    description: 'Sérum concentré aux peptides et rétinol pour réduire les signes de vieillissement cutané. Résultats visibles dès 2 semaines.',
    type: 'Cosmétique',
    pharmacyLocation: 'Pharmacie Beauté - 654 Rue de la Paix, Nice',
    pharmacyComment: 'Produit haut de gamme. Conseils d\'application personnalisés disponibles.',
    price: 45.00,
    inStock: true,
    pharmacyRating: 4.7,
    pharmacyId: '5',
    imageUrl: undefined,
    userReviews: [
      {
        id: '7',
        userName: 'Isabelle V.',
        rating: 5,
        comment: 'Excellents conseils beauté, personnel très qualifié.',
        date: '2024-01-11'
      }
    ]
  },
  {
    id: '6',
    name: 'Probiotiques Digestifs',
    description: 'Complément alimentaire contenant 10 milliards de micro-organismes vivants pour l\'équilibre de la flore intestinale.',
    type: 'Parapharmaceutique',
    pharmacyLocation: 'Pharmacie Verte - 987 Allée des Chênes, Nantes',
    pharmacyComment: 'Conservation au frais recommandée. Idéal pour les troubles digestifs légers.',
    price: 18.50,
    inStock: true,
    prescribedBy: 'Dr. Sophie Bernard',
    pharmacyRating: 4.3,
    pharmacyId: '6',
    imageUrl: undefined,
    userReviews: [
      {
        id: '8',
        userName: 'Thomas K.',
        rating: 4,
        comment: 'Bon conseil sur les compléments alimentaires.',
        date: '2024-01-09'
      }
    ]
  },
  {
    id: '7',
    name: 'Thermomètre Digital',
    description: 'Thermomètre électronique haute précision avec écran LCD et signal sonore. Mesure rapide en 60 secondes.',
    type: 'Parapharmaceutique',
    pharmacyLocation: 'Pharmacie Familiale - 246 Rue des Lilas, Bordeaux',
    pharmacyComment: 'Garantie 2 ans. Piles incluses. Idéal pour toute la famille.',
    price: 8.90,
    inStock: true,
    pharmacyRating: 4.1,
    pharmacyId: '7',
    imageUrl: undefined,
    userReviews: [
      {
        id: '9',
        userName: 'Marie F.',
        rating: 4,
        comment: 'Pharmacie familiale avec une bonne ambiance.',
        date: '2024-01-13'
      }
    ]
  },
  {
    id: '8',
    name: 'Shampoing Antipelliculaire',
    description: 'Shampoing dermatologique formulé pour traiter les pellicules et apaiser les démangeaisons du cuir chevelu.',
    type: 'Cosmétique',
    pharmacyLocation: 'Pharmacie du Centre - 135 Place de la République, Strasbourg',
    pharmacyComment: 'Testé sous contrôle dermatologique. Convient aux cuirs chevelus sensibles.',
    price: 11.70,
    inStock: false,
    pharmacyRating: 4.0,
    pharmacyId: '8',
    imageUrl: undefined,
    userReviews: [
      {
        id: '10',
        userName: 'David P.',
        rating: 4,
        comment: 'Pharmacie bien située, personnel compétent.',
        date: '2024-01-07'
      }
    ]
  }
];