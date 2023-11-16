import "./Create.css";
import { FaPlus as PlusIcon } from "react-icons/fa";
import { RiCloseFill as CloseIcon } from "react-icons/ri";

const Create = ({ children, open, setOpen }) => {
    return (
        <div className="create-container">
            {
                open &&
                <div className="create-content retro-style">
                    {children}
                </div>
            }
            <div 
                className="plus-container retro-style" 
                style={{ width: "65px", height: "65px", backgroundColor: open ? "#ef5aa0" : "white" }}
                onClick={() => { setOpen(!open) }}
            >
                {
                    open ? 
                    <CloseIcon 
                        size={55} 
                        color={"#fff"}
                    /> :
                    <PlusIcon 
                        size={40} 
                        color={"#000"}
                    />
                }
            </div>
        </div>
    );
}

export default Create;