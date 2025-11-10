interface User {
  email: string;
  password: string;
}

// Predefined users that will always be available
const defaultUsers: User[] = [
  { email: "sofiaorejuela@gmail.com", password: "123456" },
  { email: "test@gmail.com", password: "123456" }
];

/**
 * Gets all users from localStorage, including predefined ones
 */
export const getUsers = (): User[] => {
  try {
    const storedUsers = localStorage.getItem('pancachitos_users');
    if (!storedUsers) {
      // First time: initialize with default users
      localStorage.setItem('pancachitos_users', JSON.stringify(defaultUsers));
      return defaultUsers;
    }
    const parsedUsers = JSON.parse(storedUsers);
    // Ensure default users are always present
    const mergedUsers = [...defaultUsers];
    parsedUsers.forEach((user: User) => {
      if (!defaultUsers.some(def => def.email === user.email)) {
        mergedUsers.push(user);
      }
    });
    return mergedUsers;
  } catch {
    return defaultUsers;
  }
};

/**
 * Adds a new user if the email doesn't exist
 */
export const addUser = (email: string, password: string): boolean => {
  try {
    const users = getUsers();
    const exists = users.some(user => user.email.toLowerCase() === email.toLowerCase());
    
    if (exists) return false;
    
    const newUsers = [...users, { email, password }];
    localStorage.setItem('pancachitos_users', JSON.stringify(newUsers));
    return true;
  } catch {
    return false;
  }
};

/**
 * Verifies user credentials
 */
export const verifyUser = (email: string, password: string): boolean => {
  try {
    const users = getUsers();
    return users.some(user => 
      user.email.toLowerCase() === email.toLowerCase() && 
      user.password === password
    );
  } catch {
    return false;
  }
};

/**
 * Checks if an email exists (for password recovery)
 */
export const emailExists = (email: string): boolean => {
  try {
    const users = getUsers();
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
  } catch {
    return false;
  }
};