import { useState } from 'react';

const AuthForm = ({ type = 'login', onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto p-6 bg-white shadow-md rounded-xl space-y-4">
      <h2 className="text-2xl font-bold text-center">{type === 'signup' ? 'Sign Up' : 'Login'}</h2>

      {type === 'signup' && (
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        {type === 'signup' ? 'Create Account' : 'Login'}
      </button>
    </form>
  );
};

export default AuthForm;