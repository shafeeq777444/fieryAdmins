import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

const BANNER_ASPECT = 16 / 9;

// Utility to crop the image and return a blob
function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
}

async function getCroppedImg(imageSrc, crop, aspect) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas is empty'));
        return;
      }
      resolve(blob);
    }, 'image/jpeg');
  });
}

const ImageCropper = ({ imageUrl, onCropComplete, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropCompleteCallback = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropSave = async () => {
    if (!imageUrl || !croppedAreaPixels) return;
    const croppedBlob = await getCroppedImg(imageUrl, croppedAreaPixels, BANNER_ASPECT);
    onCropComplete(croppedBlob);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg animate-slide-up">
        <h3 className="text-lg font-semibold mb-4 animate-fade-in-delay">Crop Image (16:9) - Required</h3>
        <p className="text-sm text-gray-600 mb-4 animate-fade-in-delay-2">Please crop your image to continue</p>
        <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden animate-fade-in-delay-3">
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={BANNER_ASPECT}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropCompleteCallback}
          />
        </div>
        {/* Zoom Slider */}
        <div className="flex items-center gap-3 mt-4 animate-fade-in-delay-4">
          <span className="text-xs text-gray-500">Zoom</span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={e => setZoom(Number(e.target.value))}
            className="w-full accent-blue-600 transition-all duration-200 hover:accent-blue-700"
          />
          <span className="text-xs text-gray-500 min-w-[2rem]">{zoom.toFixed(1)}x</span>
        </div>
        <div className="flex justify-end gap-2 mt-4 animate-fade-in-delay-5">
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 hover:shadow-md transform hover:scale-105"
            onClick={handleCropSave}
          >
            Save Crop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper; 