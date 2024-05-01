    import React, { useEffect, useState } from 'react'
    import { createUser,updateUser } from '../../services/reducer/userSlice'
    import{useDispatch,useSelector} from 'react-redux'
    import { useNavigate, useParams } from 'react-router-dom'


    const UserForm = () => {
        const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId } = useParams(); // Assuming you're using React Router for navigation

    const isEditMode = !!userId; // Check if userId exists, indicating edit mode

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const userToEdit = useSelector((state) =>
        state.user.allUsers.find((user) => user._id === userId)
    );

    useEffect(() => {
        // If in edit mode, populate form fields with user data
        if (isEditMode && userToEdit) {
            setFirstName(userToEdit.firstName);
            setLastName(userToEdit.lastName);
            setEmail(userToEdit.email);
            setIsAdmin(userToEdit.isAdmin);
            setUsername(userToEdit.username);
        }
    }, [isEditMode, userToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            username,
            firstName,
            lastName,
            email,
            password,
            isAdmin
        };

        if (isEditMode) {
            // If in edit mode, dispatch update user action
            dispatch(updateUser({ id: userId, ...formData }));
        } else {
            // If in add mode, dispatch create user action
            dispatch(createUser(formData));
        }

        navigate('/users');
    };

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    };

    const handleCheckboxChange = (e) => {
        setIsAdmin(e.target.value === 'true');
    };

    return (
        <div>
            <>
                {/* Card Section */}
                <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 mx-auto">
                    {/* Card */}
                    <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-neutral-800">
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
                                {isEditMode ? 'Edit User' : 'Add User'}
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-neutral-400">
                                {isEditMode
                                    ? 'Update your user information.'
                                    : 'Create your username, password, and account settings.'}
                            </p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {/* Grid */}
                            <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
                                {/* Username Field */}
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="username"
                                        className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                                    >
                                        Username
                                    </label>
                                </div>
                                <div className="sm:col-span-9">
                                    <input
                                        id="username"
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Username"
                                        autoComplete="username"
                                        required
                                        type="text"
                                        className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                    />
                                </div>
                                {/* End Username Field */}
    
                                {/* Full Name Fields */}
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="firstName"
                                        className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                                    >
                                        Full name
                                    </label>
                                    {/* Tooltip Code */}
                                </div>
                                <div className="sm:col-span-9">
                                    <div className="sm:flex">
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder="First Name"
                                            autoComplete="given-name"
                                            required
                                            type="text"
                                            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        />
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            autoComplete="family-name"
                                            required
                                            placeholder="Last Name"
                                            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        />
                                    </div>
                                </div>
                                {/* End Full Name Fields */}
    
                                {/* Email Field */}
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="email"
                                        className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                                    >
                                        Email
                                    </label>
                                </div>
                                <div className="sm:col-span-9">
                                    <input
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="email"
                                        required
                                        placeholder="Email"
                                        type="email"
                                        className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                    />
                                </div>
                                {/* End Email Field */}
    
                                {/* Password Field */}
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="password"
                                        className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                                    >
                                        Password
                                    </label>
                                </div>
                                <div className="sm:col-span-9">
                                    <div className="space-y-2">
                                        <input
                                            id="password"
                                            name="password"
                                            value={password}
                                            onChange={handlePasswordInput}
                                            autoComplete="new-password"
                                            required
                                            placeholder="Enter your password"
                                            type="text"
                                            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        />
                                    </div>
                                </div>
                                {/* End Password Field */}
    
                                {/* Role Field */}
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="af-account-gender-checkbox"
                                        className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                                    >
                                        Role
                                    </label>
                                </div>
                                <div className="sm:col-span-9">
                                    <div className="sm:flex">
                                        <label
                                            htmlFor="Admin"
                                            className="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        >
                                            <input
                                                type="radio"
                                                value={true}
                                                name="isAdmin"
                                                onChange={handleCheckboxChange}
                                                id="Admin"
                                                checked={isAdmin === true}
                                                defaultChecked={false}
                                                className="shrink-0 mt-0.5 border-gray-300 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                            />
                                            <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">
                                                Admin
                                            </span>
                                        </label>
                                        <label
                                            htmlFor="User"
                                            className="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        >
                                            <input
                                                type="radio"
                                                value={false}
                                                name="isAdmin"
                                                onChange={handleCheckboxChange}
                                                id="User"
                                                checked={isAdmin === false}
                                                defaultChecked={false}
                                                className="shrink-0 mt-0.5 border-gray-300 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                            />
                                            <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">
                                                User
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                {/* End Role Field */}
                            </div>
                            {/* End Grid */}
    
                            {/* Button Section */}
                            <div className="mt-5 flex justify-end gap-x-2">
                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    {isEditMode ? 'Save changes' : 'Create User'}
                                </button>
                            </div>
                            {/* End Button Section */}
                        </form>
                    </div>
                    {/* End Card */}
                </div>
                {/* End Card Section */}
            </>
        </div>
    );
    
    }

    export default UserForm