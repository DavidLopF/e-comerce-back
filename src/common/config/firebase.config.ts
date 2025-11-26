import * as admin from 'firebase-admin';
import { join } from 'path';

/**
 * Firebase initialization helper.
 *
 * Supports three initialization strategies (in order):
 * 1. FIREBASE_SERVICE_ACCOUNT_PATH -> path to the service account JSON file
 * 2. FIREBASE_PROJECT_ID + FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY -> credential values passed via environment
 *    NOTE: When providing FIREBASE_PRIVATE_KEY in .env, replace newlines with literal '\n' and we will restore them below.
 * 3. Default application credentials (admin.initializeApp() without args) — useful when running on GCP or similar.
 */

if (!admin.apps.length) {
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

  if (serviceAccountPath) {
    // Prefer explicit JSON file path if provided
    admin.initializeApp({
      credential: admin.credential.cert(
        join(process.cwd(), serviceAccountPath),
      ),
    });
  } else if (
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  ) {
    // Support passing the service account fields via environment variables
    // Replace escaped newlines with real newlines for the private key
    const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey,
      } as admin.ServiceAccount),
    });
  } else {
    // Fallback to default credentials (e.g., when running on GCP or if GOOGLE_APPLICATION_CREDENTIALS is set)
    admin.initializeApp();
  }
}

export default admin;
