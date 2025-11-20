# Firestore Security Rules

Copy these rules to your Firebase Console > Firestore Database > Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Helper function to check if user owns the resource
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    // Profiles collection
    match /profiles/{profileId} {
      // Users can read their own profiles or public profiles (for venue view)
      allow read: if isAuthenticated() || 
                     resource.data.userId == null; // Public profile
      
      // Users can create profiles
      allow create: if isAuthenticated() && 
                       request.resource.data.userId == request.auth.uid;
      
      // Users can update their own profiles
      allow update: if isOwner(resource.data.userId);
      
      // Users can delete their own profiles
      allow delete: if isOwner(resource.data.userId);
    }
    
    // Shared venues collection
    match /shared/{sharedId} {
      // Users can only read their own shared entries
      allow read: if isOwner(resource.data.userId);
      
      // Users can create shared entries
      allow create: if isAuthenticated() && 
                       request.resource.data.userId == request.auth.uid;
      
      // Users can update their own shared entries
      allow update: if isOwner(resource.data.userId);
      
      // Users can delete their own shared entries
      allow delete: if isOwner(resource.data.userId);
    }
    
    // User settings collection
    match /settings/{userId} {
      // Users can only read their own settings
      allow read: if isOwner(userId);
      
      // Users can create their own settings
      allow create: if isAuthenticated() && userId == request.auth.uid;
      
      // Users can update their own settings
      allow update: if isOwner(userId);
      
      // Users can delete their own settings
      allow delete: if isOwner(userId);
    }
    
    // Users collection (if you need to store additional user data)
    match /users/{userId} {
      // Users can only read their own data
      allow read: if isOwner(userId);
      
      // Users can create their own document
      allow create: if isAuthenticated() && userId == request.auth.uid;
      
      // Users can update their own data
      allow update: if isOwner(userId);
    }
  }
}
```

## Public Profile Access (for Venue View)

For venue view to work without authentication, you have two options:

### Option 1: Public Read Access (Current Rules)
The rules above allow reading profiles where `userId == null`, which means you can create public profiles that venues can view.

### Option 2: Separate Public Collection
Create a separate `publicProfiles` collection with public read access:

```javascript
match /publicProfiles/{profileId} {
  // Anyone can read public profiles
  allow read: if true;
  
  // Only authenticated users can create/update
  allow create, update: if isAuthenticated();
}
```

Then create a Cloud Function to sync profiles to publicProfiles when they're shared.
