import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Barcode, Tag, Archive, Image as ImageIcon } from 'lucide-react';
import { useProductsStore } from '../../../store/productsStore';
import { generateBarcode } from '../../../utils/barcodeGenerator';
import { toast } from 'sonner';

interface ProductFormData {
  nombre: string;
  codigo_barra: string;
  descripcion: string;
  categoria: string;
  minimo_stock: number;
  imagen?: File;
}

const ProductForm: React.FC = () => {
  const { addProduct, loading } = useProductsStore();
  const [formData, setFormData] = useState<ProductFormData>({
    nombre: '',
    codigo_barra: '',
    descripcion: '',
    categoria: '',
    minimo_stock: 1
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'minimo_stock') {
      const numValue = parseInt(value);
      if (numValue < 0) return;
      setFormData(prev => ({ ...prev, [name]: numValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('La imagen no debe superar los 5MB');
        return;
      }
      
      setFormData(prev => ({ ...prev, imagen: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateNewBarcode = () => {
    const barcode = generateBarcode();
    setFormData(prev => ({ ...prev, codigo_barra: barcode }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.codigo_barra) {
      generateNewBarcode();
    }

    try {
      await addProduct(formData);
      toast.success('Producto agregado exitosamente');
    } catch (error) {
      toast.error('Error al agregar el producto');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Imagen del producto */}
      <div className="flex justify-center">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative w-32 h-32 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
          />
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </motion.div>
      </div>

      {/* Campos del formulario */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Nombre del producto
          </label>
          <div className="relative">
            <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500/20 dark:focus:ring-pink-500/20"
              placeholder="Nombre del producto"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Código de barras
          </label>
          <div className="relative">
            <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="codigo_barra"
              value={formData.codigo_barra}
              onChange={handleChange}
              className="w-full pl-11 pr-20 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500/20 dark:focus:ring-pink-500/20"
              placeholder="Código de barras"
            />
            <button
              type="button"
              onClick={generateNewBarcode}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-xs text-lime-600 dark:text-pink-400 hover:bg-lime-50 dark:hover:bg-pink-900/30 rounded-md"
            >
              Generar
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Categoría
          </label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
              className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500/20 dark:focus:ring-pink-500/20"
              placeholder="Categoría del producto"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Stock mínimo
          </label>
          <div className="relative">
            <Archive className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              name="minimo_stock"
              value={formData.minimo_stock}
              onChange={handleChange}
              min="0"
              required
              className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500/20 dark:focus:ring-pink-500/20"
              placeholder="Stock mínimo"
            />
          </div>
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Descripción
          </label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500/20 dark:focus:ring-pink-500/20"
            placeholder="Descripción del producto"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          Cancelar
        </motion.button>
        
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-lime-500 dark:bg-pink-500 text-white rounded-lg hover:bg-lime-600 dark:hover:bg-pink-600 transition-colors disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Guardar Producto'}
        </motion.button>
      </div>
    </form>
  );
};

export default ProductForm;