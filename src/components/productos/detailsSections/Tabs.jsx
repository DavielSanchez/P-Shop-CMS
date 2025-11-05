import React, { useState } from 'react';
import { useColors } from "../../../hooks/useColor";
import DetailsTab from "./tabs/DetailsTab";
import InventoryTab from "./tabs/InventoryTab";
import AccountingTab from "./tabs/AccountingTab";
import SalesTab from "./tabs/SalesTab";

function Tabs({
  product,
  isEditing,
  setIsEditing,
  formData,
  handleInputChange,
  handleCheckboxChange,
}) {
  const colors = useColors();
  const [activeTab, setActiveTab] = useState("Detalles");

  const tabs = ["Detalles", "Inventario", "Contabilidad", "Ventas"];

  const renderTabContent = () => {
    const commonProps = {
      isEditing,
      setIsEditing,
      colors,
      formData: formData || product,
      handleInputChange,
      handleCheckboxChange,
    };

    switch (activeTab) {
      case "Detalles":
        return <DetailsTab {...commonProps} product={product} />;
      case "Inventario":
        return <InventoryTab {...commonProps} />;
      case "Contabilidad":
        return <AccountingTab {...commonProps} />;
      case "Ventas":
        return <SalesTab {...commonProps} product={product} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="w-full border rounded-lg"
      style={{ borderColor: colors.border }}
    >
      <div className="flex border-b" style={{ borderColor: colors.border }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab ? "font-semibold" : ""
            }`}
            style={{
              borderColor: activeTab === tab ? colors.primary : "transparent",
              color: activeTab === tab ? colors.primary : colors.textSecondary,
              backgroundColor:
                activeTab === tab ? colors.primary + "08" : "transparent",
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-5" style={{ color: colors.textPrimary }}>
        {renderTabContent()}
      </div>
    </div>
  );
}

export default Tabs;


// import React, { useState } from 'react';
// import { useColors } from '../../../hooks/useColor';
// import { ConstructionOutlined } from '@mui/icons-material';

// function Tabs({ product }) {
//     const colors = useColors();
//     const [activeTab, setActiveTab] = useState('Detalles');
//     const [isEditing, setIsEditing] = useState(false);
//     const [useMeasures, setUseMeasures] = useState(false);
//     console.log(product)
//     const [formData, setFormData] = useState({
//         productName: product.productName || 'No especificado',
//         productTag: product.productTag || [],
//         productColors: product.productColors || [],
//         productSizes: product.productSizes || [],
//         productSummary: product.productSummary || '',
//         productDescription: product.productDescription || '',
//         productStock: product.productStock || 0,
//         productPrice: product.productPrice || 0,
//         productCost: product.cost || 0,
//         productOffer: product.productOffer || false,
//         productDiscount: product.productDiscount || 0,
//         isPriceDisabled: product.isPriceDisabled || false,
//         productCategory: product.productCategory || '',
//         category: product.category || '',
//         productComment: product.productComment || ''
//     });

//     const handleInputChange = (field, value) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: value
//         }));
//     };

//     const handleCheckboxChange = (field, checked) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: checked
//         }));
//     };

//     const tabs = ['Detalles', 'Inventario', 'Contabilidad', 'Ventas'];

//     const renderTabContent = () => {
//         switch (activeTab) {
//             case 'Detalles':
//                 return (
//                     <div className="space-y-6">
//                         <div className="flex justify-between items-center">
//                             <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
//                                 Información General
//                             </h3>
//                             <button
//                                 onClick={() => setIsEditing(!isEditing)}
//                                 className="px-4 py-2 rounded-lg border text-sm"
//                                 style={{ 
//                                     borderColor: colors.border,
//                                     color: isEditing ? '#fff' : colors.textPrimary,
//                                     backgroundColor: isEditing ? colors.primary : 'transparent'
//                                 }}
//                             >
//                                 {isEditing ? 'Guardar' : 'Editar'}
//                             </button>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
//                                     Nombre del producto *
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={formData.productName}
//                                     onChange={(e) => handleInputChange('productName', e.target.value)}
//                                     disabled={!isEditing}
//                                     className="w-full p-3 rounded border"
//                                     style={{ 
//                                         backgroundColor: colors.background, 
//                                         borderColor: colors.border,
//                                         color: colors.textPrimary
//                                     }}
//                                 />
//                             </div>
                            
//                             <div>
//                                 <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
//                                     Etiqueta del producto
//                                 </label>
                                
//                                 {isEditing && (
//                                     <input
//                                         type="text"
//                                         placeholder="Escribe y presiona Enter para agregar etiquetas"
//                                         onKeyDown={(e) => {
//                                             if (e.key === 'Enter' && e.target.value.trim()) {
//                                                 e.preventDefault();
//                                                 const newTag = e.target.value.trim();
//                                                 if (!formData.productTag.includes(newTag)) {
//                                                     handleInputChange('productTag', [...formData.productTag, newTag]);
//                                                 }
//                                                 e.target.value = '';
//                                             }
//                                         }}
//                                         className="w-full p-3 rounded border"
//                                         style={{ 
//                                             backgroundColor: colors.background, 
//                                             borderColor: colors.border,
//                                             color: colors.textPrimary
//                                         }}
//                                     />
//                                 )}
//                                 <div className={`flex flex-wrap gap-2 ${isEditing ? 'mt-2' : 'mt-4' }`}>
//                                     {formData.productTag.map((tag, index) => (
//                                         <div
//                                             key={index}
//                                             className="flex items-center gap-1 px-3 py-1 rounded-full text-sm"
//                                             style={{ 
//                                                 backgroundColor: colors.primary + '20',
//                                                 color: colors.primary
//                                             }}
//                                         >
//                                             {tag}
//                                             {isEditing && (
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => {
//                                                         const newTags = formData.productTag.filter((_, i) => i !== index);
//                                                         handleInputChange('productTag', newTags);
//                                                     }}
//                                                     className="ml-1 text-xs"
//                                                     style={{ color: colors.primary }}
//                                                 >
//                                                     ×
//                                                 </button>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             <div className="md:col-span-2">
//                                 <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
//                                     Colores disponibles
//                                 </label>
                                
//                                 {isEditing && (
//                                     <input
//                                         type="text"
//                                         placeholder="Escribe colores y presiona Enter (separar con comas)"
//                                         onKeyDown={(e) => {
//                                             if (e.key === 'Enter' && e.target.value.trim()) {
//                                                 e.preventDefault();
//                                                 const newColors = e.target.value.split(',')
//                                                     .map(c => c.trim())
//                                                     .filter(c => c && !formData.productColors.includes(c));
//                                                 if (newColors.length > 0) {
//                                                     handleInputChange('productColors', [...formData.productColors, ...newColors]);
//                                                 }
//                                                 e.target.value = '';
//                                             }
//                                         }}
//                                         className="w-full p-3 rounded border"
//                                         style={{ 
//                                             backgroundColor: colors.background, 
//                                             borderColor: colors.border,
//                                             color: colors.textPrimary
//                                         }}
//                                     />
//                                 )}
//                                 <div className="flex flex-wrap gap-2 mt-2">
//                                     {formData.productColors.map((color, index) => (
//                                         <div
//                                             key={index}
//                                             className="flex items-center gap-1 px-3 py-1 rounded-full text-sm"
//                                             style={{ 
//                                                 backgroundColor: colors.primary + '20',
//                                                 color: colors.primary
//                                             }}
//                                         >
//                                             {color}
//                                             {isEditing && (
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => {
//                                                         const newColors = formData.productColors.filter((_, i) => i !== index);
//                                                         handleInputChange('productColors', newColors);
//                                                     }}
//                                                     className="ml-1 text-xs"
//                                                     style={{ color: colors.primary }}
//                                                 >
//                                                     ×
//                                                 </button>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             <div className="md:col-span-2">
//                                 <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
//                                     Tallas/Medidas disponibles
//                                 </label>
                                
//                                 {isEditing ? (
//                                     <div className="space-y-3">
//                                         {/* Switch para cambiar entre tallas y medidas */}
//                                         <div className="flex items-center gap-3 mb-2">
//                                             <span className="text-sm" style={{ color: colors.textSecondary }}>Tallas</span>
//                                             <label className="relative inline-flex items-center cursor-pointer">
//                                                 <input 
//                                                     type="checkbox" 
//                                                     className="sr-only peer"
//                                                     checked={useMeasures}
//                                                     onChange={(e) => setUseMeasures(e.target.checked)}
//                                                 />
//                                                 <div 
//                                                     className="w-11 h-6 rounded-full peer"
//                                                     style={{ 
//                                                         backgroundColor: useMeasures ? colors.primary : colors.border
//                                                     }}
//                                                 >
//                                                     <div 
//                                                         className={`absolute top-0.5 left-0.5 bg-white border rounded-full h-5 w-5 transition-all ${
//                                                             useMeasures ? 'transform translate-x-5' : ''
//                                                         }`}
//                                                         style={{ borderColor: colors.border }}
//                                                     ></div>
//                                                 </div>
//                                             </label>
//                                             <span className="text-sm" style={{ color: colors.textSecondary }}>Medidas</span>
//                                         </div>

//                                         {/* Select según el modo */}
//                                         <select
//                                             onChange={(e) => {
//                                                 if (e.target.value && !formData.productSizes.includes(e.target.value)) {
//                                                     handleInputChange('productSizes', [...formData.productSizes, e.target.value]);
//                                                 }
//                                                 e.target.value = ''; 
//                                             }}
//                                             className="w-full p-3 rounded border"
//                                             style={{ 
//                                                 backgroundColor: colors.background, 
//                                                 borderColor: colors.border,
//                                                 color: colors.textPrimary
//                                             }}
//                                         >
//                                             <option value="">
//                                                 {useMeasures ? 'Seleccionar medida para agregar' : 'Seleccionar talla para agregar'}
//                                             </option>
                                            
//                                             {/* Opciones de tallas */}
//                                             {!useMeasures && (
//                                                 <>
//                                                         <option value="2">2</option>
//                                                         <option value="4">4</option>
//                                                         <option value="6">6</option>
//                                                         <option value="8">8</option>
//                                                         <option value="10">10</option>
//                                                         <option value="12">12</option>
//                                                         <option value="14">14</option>
//                                                         <option value="16">16</option>
//                                                         <option value="XS">XS</option>
//                                                         <option value="S">S</option>
//                                                         <option value="M">M</option>
//                                                         <option value="L">L</option>
//                                                         <option value="XL">XL</option>
//                                                         <option value="2XL">2XL</option>
//                                                         <option value="3XL">3XL</option>
//                                                         <option value="4XL">4XL</option>
//                                                         <option value="5XL">5XL</option>
//                                                 </>
//                                             )}
                                            
//                                             {/* Opciones de medidas */}
//                                             {useMeasures && (
//                                                 <>
//                                                     <option value="25x20cm">25 × 20 cm</option>
//                                                     <option value="30x25cm">30 × 25 cm</option>
//                                                     <option value="35x30cm">35 × 30 cm</option>
//                                                     <option value="40x30cm">40 × 30 cm</option>
//                                                     <option value="80x30cm">80 × 30 cm</option>
//                                                     <option value="90x40cm">90 × 40 cm</option>
//                                                 </>
//                                             )}
//                                         </select>

//                                         {/* Elementos seleccionados */}
//                                         <div className="flex flex-wrap gap-2">
//                                             {formData.productSizes.map((size, index) => (
//                                                 <div
//                                                     key={index}
//                                                     className="flex items-center gap-1 px-3 py-1 rounded-full text-sm"
//                                                     style={{ 
//                                                         backgroundColor: colors.primary + '20',
//                                                         color: colors.primary
//                                                     }}
//                                                 >
//                                                     {size.replace('x', ' × ')}
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => {
//                                                             const newSizes = formData.productSizes.filter((_, i) => i !== index);
//                                                             handleInputChange('productSizes', newSizes);
//                                                         }}
//                                                         className="ml-1 text-xs hover:bg-red-500 hover:text-white rounded-full w-4 h-4 flex items-center justify-center"
//                                                         style={{ color: colors.primary }}
//                                                     >
//                                                         ×
//                                                     </button>
//                                                 </div>
//                                             ))}
                                            
//                                             {formData.productSizes.length === 0 && (
//                                                 <span className="text-sm italic" style={{ color: colors.textSecondary }}>
//                                                     No hay {useMeasures ? 'medidas' : 'tallas'} seleccionadas
//                                                 </span>
//                                             )}
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     /* Modo visualización */
//                                     <div className="flex flex-wrap gap-2">
//                                         {formData.productSizes.map((size, index) => (
//                                             <div
//                                                 key={index}
//                                                 className="flex items-center gap-1 px-3 py-1 rounded-full text-sm"
//                                                 style={{ 
//                                                     backgroundColor: colors.primary + '20',
//                                                     color: colors.primary
//                                                 }}
//                                             >
//                                                 {size.replace('x', ' × ')}
//                                             </div>
//                                         ))}
                                        
//                                         {formData.productSizes.length === 0 && (
//                                             <span className="text-sm italic" style={{ color: colors.textSecondary }}>
//                                                 No hay tallas/medidas disponibles
//                                             </span>
//                                         )}
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Resumen */}
//                         <div>
//                             <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>
//                                 Resumen
//                             </h3>
//                             <textarea
//                                 value={formData.productSummary}
//                                 onChange={(e) => handleInputChange('productSummary', e.target.value)}
//                                 disabled={!isEditing}
//                                 className="w-full p-4 rounded border resize-y min-h-[150px] max-h-[200px]"
//                                 style={{ 
//                                     backgroundColor: colors.background, 
//                                     borderColor: colors.border,
//                                     color: colors.textPrimary
//                                 }}
//                                 placeholder="Breve descripción del producto"
//                                 rows={4}
//                             />
//                         </div>

//                         {/* Descripción completa */}
//                         <div>
//                             <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>
//                                 Descripción Completa
//                             </h3>
//                             <textarea
//                                 value={formData.productDescription}
//                                 onChange={(e) => handleInputChange('productDescription', e.target.value)}
//                                 disabled={!isEditing}
//                                 className="w-full p-4 rounded border resize-y min-h-[300px] max-h-[1200px]"
//                                 style={{ 
//                                     backgroundColor: colors.background, 
//                                     borderColor: colors.border,
//                                     color: colors.textPrimary
//                                 }}
//                                 placeholder="Descripción detallada del producto"
//                                 rows={6}
//                             />
//                         </div>
//                     </div>
//                 );

//             case 'Inventario':
//                 return (
//                     <div className="space-y-6">
//                         <div className="flex justify-between items-center">
//                             <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
//                                 Gestión de Inventario
//                             </h3>
//                             <button
//                                 onClick={() => setIsEditing(!isEditing)}
//                                 className="px-4 py-2 rounded-lg border text-sm"
//                                 style={{ 
//                                     borderColor: colors.border,
//                                     color: isEditing ? '#fff' : colors.textPrimary,
//                                     backgroundColor: isEditing ? colors.primary : 'transparent'
//                                 }}
//                             >
//                                 {isEditing ? 'Guardar' : 'Editar'}
//                             </button>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
//                                     Stock disponible
//                                 </label>
//                                 <input
//                                     type="number"
//                                     value={formData.productStock}
//                                     onChange={(e) => handleInputChange('productStock', parseInt(e.target.value))}
//                                     disabled={!isEditing}
//                                     className="w-full p-3 rounded border"
//                                     style={{ 
//                                         backgroundColor: colors.background, 
//                                         borderColor: colors.border,
//                                         color: colors.textPrimary
//                                     }}
//                                 />
//                             </div>
                            
//                             <div>
//                                 <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
//                                     Stock mínimo
//                                 </label>
//                                 <input
//                                     type="number"
//                                     value={formData.minStock || 0}
//                                     onChange={(e) => handleInputChange('minStock', parseInt(e.target.value))}
//                                     disabled={!isEditing}
//                                     className="w-full p-3 rounded border"
//                                     style={{ 
//                                         backgroundColor: colors.background, 
//                                         borderColor: colors.border,
//                                         color: colors.textPrimary
//                                     }}
//                                 />
//                             </div>
//                         </div>

//                         <div className="space-y-3">
//                             <div className="flex items-center gap-3">
//                                 <input
//                                     type="checkbox"
//                                     checked={formData.maintainStock || true}
//                                     onChange={(e) => handleCheckboxChange('maintainStock', e.target.checked)}
//                                     disabled={!isEditing}
//                                     className="w-4 h-4 rounded border"
//                                     style={{ 
//                                         borderColor: colors.border,
//                                         backgroundColor: formData.maintainStock ? colors.primary : colors.background
//                                     }}
//                                 />
//                                 <span style={{ color: colors.textPrimary }}>Mantener control de stock</span>
//                             </div>
//                         </div>
//                     </div>
//                 );

//             case 'Contabilidad':
//                 return (
//                     <div className="space-y-6">
//                         <div className="flex justify-between items-center">
//                             <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
//                                 Información Contable
//                             </h3>
//                             <button
//                                 onClick={() => setIsEditing(!isEditing)}
//                                 className="px-4 py-2 rounded-lg border text-sm"
//                                 style={{ 
//                                     borderColor: colors.border,
//                                     color: isEditing ? '#fff' : colors.textPrimary,
//                                     backgroundColor: isEditing ? colors.primary : 'transparent'
//                                 }}
//                             >
//                                 {isEditing ? 'Guardar' : 'Editar'}
//                             </button>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
//                                     Precio de venta *
//                                 </label>
//                                 <input
//                                     type="number"
//                                     value={formData.productPrice}
//                                     onChange={(e) => handleInputChange('productPrice', parseFloat(e.target.value))}
//                                     disabled={!isEditing || formData.isPriceDisabled}
//                                     className="w-full p-3 rounded border"
//                                     style={{ 
//                                         backgroundColor: formData.isPriceDisabled ? colors.border : colors.background, 
//                                         borderColor: colors.border,
//                                         color: colors.textPrimary
//                                     }}
//                                 />
//                             </div>
                            
//                             <div>
//                                 <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
//                                     Costo del producto
//                                 </label>
//                                 <input
//                                     type="number"
//                                     value={formData.productCost}
//                                     onChange={(e) => handleInputChange('productCost', parseFloat(e.target.value))}
//                                     disabled={!isEditing}
//                                     className="w-full p-3 rounded border"
//                                     style={{ 
//                                         backgroundColor: colors.background, 
//                                         borderColor: colors.border,
//                                         color: colors.textPrimary
//                                     }}
//                                 />
//                             </div>
                            
//                             <div>
//                                 <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
//                                     Precio con descuento
//                                 </label>
//                                 <input
//                                     type="number"
//                                     value={formData.productDiscount}
//                                     onChange={(e) => handleInputChange('productDiscount', parseFloat(e.target.value))}
//                                     disabled={!isEditing}
//                                     className="w-full p-3 rounded border"
//                                     style={{ 
//                                         backgroundColor: colors.background, 
//                                         borderColor: colors.border,
//                                         color: colors.textPrimary
//                                     }}
//                                 />
//                             </div>
                            
//                             <div>
//                                 <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
//                                     Margen de ganancia
//                                 </label>
//                                 <div className="p-3 rounded border" style={{ 
//                                     backgroundColor: colors.background, 
//                                     borderColor: colors.border,
//                                     color: formData.productCost > 0 ? 
//                                         ((formData.productPrice - formData.productCost) / formData.productCost * 100 > 0 ? '#10b981' : '#ef4444') : 
//                                         colors.textPrimary
//                                 }}>
//                                     {formData.productCost > 0 ? 
//                                         `${((formData.productPrice - formData.productCost) / formData.productCost * 100).toFixed(1)}%` : 
//                                         '0%'
//                                     }
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="space-y-3">
//                             <div className="flex items-center gap-3">
//                                 <input
//                                     type="checkbox"
//                                     checked={formData.productOffer}
//                                     onChange={(e) => handleCheckboxChange('productOffer', e.target.checked)}
//                                     disabled={!isEditing}
//                                     className="w-4 h-4 rounded border"
//                                     style={{ 
//                                         borderColor: colors.border,
//                                         backgroundColor: formData.productOffer ? colors.primary : colors.background
//                                     }}
//                                 />
//                                 <span style={{ color: colors.textPrimary }}>Producto en oferta</span>
//                             </div>
                            
//                             <div className="flex items-center gap-3">
//                                 <input
//                                     type="checkbox"
//                                     checked={formData.isPriceDisabled}
//                                     onChange={(e) => handleCheckboxChange('isPriceDisabled', e.target.checked)}
//                                     disabled={!isEditing}
//                                     className="w-4 h-4 rounded border"
//                                     style={{ 
//                                         borderColor: colors.border,
//                                         backgroundColor: formData.isPriceDisabled ? colors.primary : colors.background
//                                     }}
//                                 />
//                                 <span style={{ color: colors.textPrimary }}>Deshabilitar precio</span>
//                             </div>
//                         </div>
//                     </div>
//                 );

//             case 'Ventas':
//                 return (
//                     <div className="space-y-6">
//                         <div className="flex justify-between items-center">
//                             <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>
//                                 Información de Ventas
//                             </h3>
//                             <button
//                                 onClick={() => setIsEditing(!isEditing)}
//                                 className="px-4 py-2 rounded-lg border text-sm"
//                                 style={{ 
//                                     borderColor: colors.border,
//                                     color: isEditing ? '#fff' : colors.textPrimary,
//                                     backgroundColor: isEditing ? colors.primary : 'transparent'
//                                 }}
//                             >
//                                 {isEditing ? 'Guardar' : 'Editar'}
//                             </button>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
//                                     Categoría
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={formData.category}
//                                     onChange={(e) => handleInputChange('productCategory', e.target.value)}
//                                     disabled={!isEditing}
//                                     className="w-full p-3 rounded border"
//                                     style={{ 
//                                         backgroundColor: colors.background, 
//                                         borderColor: colors.border,
//                                         color: colors.textPrimary
//                                     }}
//                                 />
//                             </div>
                            
//                             <div>
//                                 <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
//                                     SKU
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={product._id || ''}
//                                     disabled
//                                     className="w-full p-3 rounded border"
//                                     style={{ 
//                                         backgroundColor: colors.border, 
//                                         borderColor: colors.border,
//                                         color: colors.textSecondary
//                                     }}
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
//                                 Comentarios internos
//                             </label>
//                             <textarea
//                                 value={formData.productComment}
//                                 onChange={(e) => handleInputChange('productComment', e.target.value)}
//                                 disabled={!isEditing}
//                                 className="w-full p-4 rounded border min-h-24 resize-none"
//                                 style={{ 
//                                     backgroundColor: colors.background, 
//                                     borderColor: colors.border,
//                                     color: colors.textPrimary
//                                 }}
//                                 placeholder="Comentarios internos sobre el producto"
//                             />
//                         </div>
//                     </div>
//                 );

//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="w-full border rounded-lg" style={{ borderColor: colors.border }}>
//             <div className="flex border-b" style={{ borderColor: colors.border }}>
//                 {tabs.map((tab) => (
//                     <button
//                         key={tab}
//                         className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
//                             activeTab === tab ? 'font-semibold' : ''
//                         }`}
//                         style={{ 
//                             borderColor: activeTab === tab ? colors.primary : 'transparent',
//                             color: activeTab === tab ? colors.primary : colors.textSecondary,
//                             backgroundColor: activeTab === tab ? colors.primary + '08' : 'transparent'
//                         }}
//                         onClick={() => setActiveTab(tab)}
//                     >
//                         {tab}
//                     </button>
//                 ))}
//             </div>

//             <div className="p-5" style={{ color: colors.textPrimary }}>
//                 {renderTabContent()}
//             </div>
//         </div>
//     );
// }

// export default Tabs;