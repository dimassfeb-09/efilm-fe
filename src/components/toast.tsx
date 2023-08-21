import {toast} from "react-toastify";

const showToast = (isSuccess: boolean, msg: string) => {
    if (isSuccess) {
        toast.success(msg, {
            position: "top-right",
            autoClose: 5000,
            className: "top-24 mx-3",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    } else {
        toast.error(msg, {
            position: "top-right",
            autoClose: 5000,
            className: "top-24 mx-3",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

}

export default showToast;