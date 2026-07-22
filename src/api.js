// api.js


export async function fetchSampleUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();

    return users.map(({ id, name, email }) => ({ id, name, email }));
  } catch (error) {
    console.error("Failed to fetch sample users:", error);
    return [];
  } finally {
    // No cleanup needed, but finally block is included per spec
  }
}


export function fetchSampleUsersPromise() {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((users) => users.map(({ id, name, email }) => ({ id, name, email })))
    .catch((error) => {
      console.error("Failed to fetch sample users:", error);
      return [];
    });
}
