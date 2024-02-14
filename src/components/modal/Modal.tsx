import ReactDOM from "react-dom";
import { ImCross } from "react-icons/im";

export default function Modal({ children, onClose }: { children: React.ReactNode, onClose: () => void }) {
    return ReactDOM.createPortal(
        <>
            <div className='fixed top-0 left-0 right-0 bottom-0 z-40 backdrop-blur-md bg-white/30' />
            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#dbe0e9f5]  rounded-md p-3 z-50 h-[91%] w-[60%]'>
                <button className='absolute text-2xl top-4 right-4 text-gray-600 hover:text-ray-400' onClick={onClose}> <ImCross /> </button>
                {children}
            </div>
        </>,
        document.getElementById('modal-root')!
    );
}