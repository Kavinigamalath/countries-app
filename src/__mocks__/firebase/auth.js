export const getAuth = jest.fn(() => ({}));
export const onAuthStateChanged = jest.fn((auth, callback) => {
  callback(null); // or mock user if needed
  return () => {};
});
