import toast, { Toaster } from 'react-hot-toast';

const notify = () => setTimeout(() => toast('Here is your toast.'), 100);


const commonToast = () => {
  return (
    <div style={{marginTop:"100px"}}>
      <button onClick={notify}>Make me a toast</button>
      <Toaster
         toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
      />
    </div>
  );
};

export default commonToast;