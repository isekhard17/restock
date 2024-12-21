import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImageUploadProps {
  onChange: (file: File | null) => void;
  value?: File | null;
  previewUrl?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value, previewUrl }) => {
  const [preview, setPreview] = useState<string | null>(previewUrl || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    onChange(null);
    setPreview(null);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        {preview ? (
          <div className="relative">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={preview}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
            />
            <button
              onClick={handleRemove}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center cursor-pointer relative overflow-hidden group"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500 group-hover:text-lime-500 dark:group-hover:text-pink-500 transition-colors" />
          </motion.div>
        )}
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {preview ? 'Cambiar foto' : 'Subir foto de perfil'}
      </span>
    </div>
  );
};

export default ImageUpload;