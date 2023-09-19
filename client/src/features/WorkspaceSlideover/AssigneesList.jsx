/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

import AssigneeCheckbox from './AssigneeCheckbox';

export default function AssigneesList({users, formData, onChange}) {
    console.log(users);
    console.log(formData);
    return (
        <div className='flex gap-x-4 flex-wrap '>
            {users.map((user) => {
                return (
                    <AssigneeCheckbox
                        user={user}
                        onChange={onChange}
                        formData={formData}
                    />
                );
            })}
        </div>
    );
}
