const Roles = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

type Roles = (typeof Roles)[keyof typeof Roles];

export default Roles;
