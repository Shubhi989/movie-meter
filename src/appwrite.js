import { Client, Databases, ID, Query } from 'appwrite';

// Explicitly hardcoded IDs to completely bypass any hidden environment caching bugs
const DATABASE_ID = '6a19c0ef002d192dd173';
const COLLECTION_ID = 'metrices';
const PROJECT_ID = '6a19b2010032bbb58986';

const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const database = new Databases(client);

export const ubdateSearchCount = async (searchTerm, movie) => {
  try {
    if (!movie) return;

    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', searchTerm)
    ]);

    if (result.documents.length > 0) {
      const doc = result.documents[0];
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: Number(movie.id), // Matches your Appwrite Integer column type
        poster_url: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
      });
    }
  } catch (error) {
    console.error("Appwrite database error:", error);
  }
};