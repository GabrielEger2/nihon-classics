import { useEffect, useRef } from 'react';

const UploadWidget = ({ onChange }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
  
    useEffect(() => {
      cloudinaryRef.current = window.cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: 'dur9zjqdp',
          uploadPreset: 'ewbmv57k',
        },
        function (error, result) {
          if (!error && result && result.event === 'success') {
            const secureUrl = result.info.secure_url;
            onChange(secureUrl); // Pass the secureUrl to the parent component
          }
        }
      );
    }, []);
  
    return (
      <button className="btn text-lg btn-primary" onClick={() => widgetRef.current.open()}>
        Upload
      </button>
    );
  };

  export default UploadWidget