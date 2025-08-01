import { useState } from "react";

type Field = {
  type: string;
  placeholder?: string;
};

type Props = {
  fields: Record<string, Field>;
  onSubmit: (values: Record<string, string>) => void;
  button: React.ReactNode;
  appName?: string;
  buttonText?: string;
  footer?: React.ReactNode;
};

export default function GenericForm({
  fields,
  onSubmit,
  appName,
  button,
  footer,
}: Props) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.keys(fields).reduce((acc, key) => ({ ...acc, [key]: "" }), {})
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 border border-gray-800 shadow-lg rounded-2xl">
      <h1 className="text-3xl font-semibold text-center text-white">
        {appName}
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {Object.entries(fields).map(([name, config]) => (
          <input
            key={name}
            name={name}
            type={config.type}
            placeholder={config.placeholder}
            value={values[name]}
            onChange={handleChange}
            className="w-full px-4 py-2 placeholder-gray-400 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
        {button}
        {footer}
      </form>
    </div>
  );
}
