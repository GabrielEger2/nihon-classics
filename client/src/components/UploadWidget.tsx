import { useEffect, useRef } from 'react';
import cloudinary from 'cloudinary-core';

// @ts-ignore
const UploadWidget = ({ onChange }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
  
    useEffect(() => {
      // @ts-ignore
      cloudinaryRef.current = window.cloudinary;
      // @ts-ignore
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: 'dur9zjqdp',
          uploadPreset: 'ewbmv57k',
        },
        function (error : any, result : any) {
          if (!error && result && result.event === 'success') {
            const secureUrl = result.info.secure_url;
            onChange(secureUrl); // Pass the secureUrl to the parent component
          }
        }
      );
    }, []);
  
    return (
      // @ts-ignore
      <div className="btn text-lg btn-primary" onClick={() => widgetRef.current.open()}>
        Upload
      </div>
    );
  };

  export default UploadWidget