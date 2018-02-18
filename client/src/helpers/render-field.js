import React from 'react';

export const renderField = field => {
  const { touched, error } = field.meta;

  const className = `form-group ${touched && error ? 'has-danger': ''}`;
  return (
    <fieldset className={className}>
      <label>{field.label}</label>
      <input
        className='form-control '
        type={field.type || "text"}
        value={field.input.value || ""}
        {...field.input}
      />
      <div className="text-help">
        {touched ? error : ''}
      </div>
    </fieldset>
  );
}
