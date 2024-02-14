import { FaUserEdit } from "react-icons/fa";
import { useAuth } from "../context/authContext";
import { imageUrl } from "../constants/constant";
import UpdateUser from "../components/modal/updateUser/UpdateUser";
import { useState } from "react";
import Modal from "../components/modal/Modal";

export default function MyAccount() {
  const { user } = useAuth();
  const [show, setShow] = useState<boolean>(false);
  const toggalModal = () => {
    setShow(!show);
  }
  return (
    <section>
      <div className="container mx-auto mt-8">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-md shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">My Account</h2>
            <div className="relative w-20 h-20">
              <img
                src={(user && user.photoURL) ? user.photoURL : imageUrl}
                alt="User Profile"
                className="rounded-full object-fill"
              />
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="text-sm text-gray-600 block">Name</label>
              <p className="font-medium text-gray-800">{user && user.displayName}</p>
            </div>
            <div className="mb-4">
              <label className="text-sm text-gray-600 block">Email</label>
              <p className="font-medium text-gray-800">{user && user.email}</p>
            </div>
            <div className="mb-4">
              <label className="text-sm text-gray-600 block">Password</label>
              <div className="flex items-center">
                <p className="text-lg blur-sm h-7">{'**************'}</p>
              </div>
              <p onClick={toggalModal} className='font-medium mt-3 text-indigo-600'><FaUserEdit /></p>
            </div>
          </div>
        </div>
      </div>
      {show && user && <Modal onClose={toggalModal}><UpdateUser user={user} onClose={toggalModal} /></Modal>}
    </section>
  )
}