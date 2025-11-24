import { Input } from "../ui/input";

const EmailInput = () => {
  return (
    <div className="space-y-2">
      <label
        htmlFor="email"
        className="text-xs font-medium uppercase tracking-wide text-gray-600"
      >
        Email
      </label>
      <Input
        id="email"
        type="email"
        placeholder="you@example.com"
        className="h-12 rounded-lg border-gray-300 bg-white text-sm focus-visible:ring-1 focus-visible:ring-black"
      />
    </div>
  );
};

export default EmailInput;
