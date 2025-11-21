import { Input } from "../ui/input";

const PasswordInput = ({ confirmPass = false }: { confirmPass?: boolean }) => {
  if (confirmPass) {
    return (
      <div className="space-y-2">
        <label
          htmlFor="confirm-password"
          className="text-xs font-medium uppercase tracking-wide text-gray-600"
        >
          Confirm Password
        </label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="••••••••"
          className="h-12 rounded-lg border-gray-300 bg-white text-sm focus-visible:ring-1 focus-visible:ring-black"
        />
      </div>
    );
  }
  return (
    <div className="space-y-2">
      <label
        htmlFor="password"
        className="text-xs font-medium uppercase tracking-wide text-gray-600"
      >
        Password
      </label>
      <Input
        id="password"
        type="password"
        placeholder="••••••••"
        className="h-12 rounded-lg border-gray-300 bg-white text-sm focus-visible:ring-1 focus-visible:ring-black"
      />
    </div>
  );
};

export default PasswordInput;
