import { User } from "firebase/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useAuth } from "../../../context/authContext";

export default function UpdateUser({ user, onClose }: { user: User, onClose: () => void }) {
    const [currentUser, setCurrentUser] = useState<User>(user);
    const { updateProfileDetails, updateUserEmail } = useAuth();
    const [image, setImage] = useState<File | null>(null);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.type === "file") {
            const fileInput = e.target as HTMLInputElement;
            const file = fileInput.files ? fileInput.files[0] : null;
            setImage(file);
        } else {
            setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
        }
    };

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (updateProfileDetails && (image || currentUser.displayName !== user.displayName)) updateProfileDetails(currentUser.displayName, image);
        if (currentUser.email && user.email !== currentUser.email && updateUserEmail) updateUserEmail(currentUser.email);
        onClose();
    };

    return (
        <div className="flex flex-col justify-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-1 text-center text-lg font-bold text-gray-800">
                    Update User
                </h2>
            </div>

            <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleOnSubmit}>
                    <div>
                        <label
                            htmlFor="displayName"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Name
                        </label>
                        <div className="mt-1">
                            <input
                                id="displayName"
                                name="displayName"
                                type="text"
                                placeholder="Enter name"
                                required
                                minLength={3}
                                value={currentUser.displayName || ""}
                                onChange={handleOnChange}
                                className="block px-4 py-3 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Email
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter email"
                                required
                                minLength={4}
                                value={currentUser.email || ""}
                                onChange={handleOnChange}
                                className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="profilePic"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Profile Picture
                        </label>
                        <div className="mt-1">
                            <input
                                id="profilePic"
                                name="profilePic"
                                type="file"
                                accept="image/*"
                                onChange={handleOnChange}
                                className="block w-full px-4 py-3 rounded-md bg-white border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                        >
                            <IoMdSend className="mr-2" /> Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
