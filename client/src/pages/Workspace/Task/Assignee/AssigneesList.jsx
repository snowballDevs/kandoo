import AssigneeCheckbox from './AssigneeCheckbox';

const AssigneesList = ({users, formData, onChange}) => (
    <div className='flex gap-x-4 flex-wrap '>
        {users.map((user) => (
            <AssigneeCheckbox
                user={user}
                onChange={onChange}
                formData={formData}
                key={user}
            />
        ))}
    </div>
);

export default AssigneesList;
