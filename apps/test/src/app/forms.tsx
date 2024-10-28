import React from 'react';
import { useForm } from 'react-hook-form';

const config = {
  name: {
    type: 'text',
  },
  password: {
    type: 'password',
  },

};

export interface FormsProps {
  className?: string;
}

export const Forms: React.FC<FormsProps> = () => {
  const onSubmit = (data: any) => {
    console.log('submit', data);
  };
  const { register, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Object.entries(config).map(([key, value]) => {
        return (
          <div key={key}>
            <label htmlFor={key}>{key}</label>
            <input
              className="px-2 py-4 border border-gray-300 rounded"
              {...register(key)}
              id={key}
              type={value.type}
            />
          </div>
        );
      })}
      <button
        className="px-2 py-4 bg-blue-500 text-white rounded"
        type="submit"
      >Submit</button>
    </form>
  );
};
