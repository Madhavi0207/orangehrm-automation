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

export const dashboardModules = [
  "Admin",
  "PIM",
  "Leave",
  "Time",
  "Recruitment",
  "My Info",
  "Performance",
  "Dashboard",
  "Directory",
  "Maintenance",
  "Claim",
  "Buzz",
];

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

export const newEmployee = () => ({
  firstName: "Automation",
  middleName: "QA",
  lastName: `Tester${uniqueSuffix()}`,
});

export const leaveRequest = {
  leaveType: "CAN - Vacation",
  fromDate: "2026-09-01",
  toDate: "2026-09-02",
};
