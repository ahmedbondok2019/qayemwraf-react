// Export Guards
export { default as ProtectedRoute } from "./guards/ProtectedRoute";
export { default as GuestRoute } from "./guards/GuestRoute";
export { default as RoleGuard } from "./guards/RoleGuard";
export { default as PermissionGuard } from "./guards/PermissionGuard";

// Export Hooks
export { default as useLogin } from "./hooks/useLogin";
export { default as useRegister } from "./hooks/useRegister";
export { default as useLogout } from "./hooks/useLogout";
export { default as useCurrentUser } from "./hooks/useCurrentUser";
export { default as useRefreshToken } from "./hooks/useRefreshToken";
export { default as usePermissions } from "./hooks/usePermissions";

// Export Components
export { default as PasswordField } from "./components/PasswordField";
export { default as PasswordStrength } from "./components/PasswordStrength";
export { default as OTPInput } from "./components/OTPInput";
export { default as RememberMe } from "./components/RememberMe";
export { default as SocialLoginButton } from "./components/SocialLoginButton";
export { default as AuthFooter } from "./components/AuthFooter";

// Export Service & Storage
export { default as authService } from "./services/authService";
export { default as authStorage } from "./storage/authStorage";
export { ROLES } from "./constants/authConstants";
export { authValidators, getPasswordStrength } from "./validation/authSchemas";
