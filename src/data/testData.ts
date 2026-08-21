export const credentials = {
  valid: {
    username: process.env.ADMIN_USERNAME || "Admin",
    password: process.env.ADMIN_PASSWORD || "admin123",
  },
  invalid: {
    username: "InvalidUser",
    password: "WrongPass123",
  },
};

export const dashboardModules = ["Admin"];

export function uniqueSuffix(): string {
  return Date.now().toString().slice(-6);
}

export const newUser = () => ({
  role: "ESS",
  employeeName: "Amelia",
  status: "Enabled",
  username: `testuser_${uniqueSuffix()}`,
  password: "TestPass@123",
});
