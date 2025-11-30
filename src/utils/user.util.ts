export function generateUniqueUser(prefix = 'user') {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let username:string = '';
  for (let i = 0; i < 10; i++) {
    username += chars.charAt(Math.floor(Math.random() * chars.length));
  }

    const password = "Password@123";
  // random SSN pattern to avoid duplicates on ParaBank demo site
  const ssn = `${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 90 + 10)}-${Math.floor(Math.random() * 9000 + 1000)}`;
  return { username, password, ssn };
}
