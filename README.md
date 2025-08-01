# Pharma Digital - Firebase Setup Guide

## Firebase Configuration

To connect your application to Firebase, follow these steps:

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "pharma-digital")
4. Follow the setup wizard

### 2. Enable Firestore Database

1. In your Firebase project console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" for development
4. Select a location for your database

### 3. Get Your Firebase Configuration

1. In your Firebase project console, go to "Project Settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon (</>)
4. Register your app with a nickname
5. Copy the Firebase configuration object

### 4. Update Firebase Configuration

Replace the placeholder values in `src/config/firebase.ts` with your actual Firebase configuration:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

### 5. Set Up Firestore Security Rules

In your Firebase console, go to Firestore Database > Rules and update them:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all products
    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Allow read access to all pharmacies
    match /pharmacies/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 6. Firebase Collections Structure

The app uses these Firestore collections:

#### Products Collection (`products`)
```typescript
{
  id: string (auto-generated),
  name: string,
  description: string,
  type: 'Pharmaceutique' | 'Parapharmaceutique' | 'Cosmétique',
  pharmacyLocation: string,
  pharmacyComment: string,
  price: number,
  inStock: boolean,
  prescribedBy?: string,
  pharmacyRating: number,
  userReviews: UserReview[],
  pharmacyId: string,
  imageUrl?: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### Pharmacies Collection (`pharmacies`)
```typescript
{
  id: string (auto-generated),
  name: string,
  email: string,
  address: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### 7. Using Firebase in Development

Once configured, the app will:
- Load products from Firestore instead of mock data
- Save new products to Firestore
- Update and delete products in Firestore
- Handle pharmacy authentication with Firestore

### 8. Environment Variables (Optional)

For better security, you can use environment variables:

Create a `.env` file in your project root:
```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

Then update `src/config/firebase.ts` to use these variables:
```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

### 9. Viewing Data in Firebase Console

To view your data:
1. Go to Firebase Console
2. Select your project
3. Go to "Firestore Database"
4. You'll see your collections (products, pharmacies) and documents
5. Click on any document to view/edit its data

The Firebase console provides a user-friendly interface to:
- View all products and pharmacies
- Edit document fields
- Add new documents
- Delete documents
- Monitor database usage
- Set up indexes for better performance

### Troubleshooting

If you encounter issues:
1. Check that your Firebase configuration is correct
2. Ensure Firestore is enabled in your Firebase project
3. Verify your security rules allow the operations you're trying to perform
4. Check the browser console for any Firebase-related errors