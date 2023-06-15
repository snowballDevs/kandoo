import React from 'react';
import { useForm } from 'react-hook-form';

const Form = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    // You can perform additional logic here, like sending the form data to a server
    console.log(data);

    // Reset the form fields
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block text-white-700 font-bold mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          className="w-full border border-gray-300 p-2 rounded-md"
          {...register('name')}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-white-700 font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="w-full border border-gray-300 p-2 rounded-md"
          {...register('email')}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
