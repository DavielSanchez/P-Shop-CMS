// hooks/useProductSizes.js
import { useState } from 'react';

export const useProductSizes = (productCategory) => {
    const [useMeasures, setUseMeasures] = useState(false);

    // Determinar el tipo de opciones basado en la categoría
    const getSizeType = () => {
        if (!productCategory) return 'tallas';

        const category = productCategory.toLowerCase();

        // Categorías que usan tallas de ropa
        const clothingCategories = ['camiseta', 't-shirt', 'textil', 'ropa', 'polera', 'playera'];
        if (clothingCategories.some(clothing => category.includes(clothing))) {
            return 'tallas';
        }

        // Categorías que usan medidas
        const measureCategories = ['mousepad', 'mouse pad', 'rompecabezas', 'portavasos', 'llavero', 'destapador'];
        if (measureCategories.some(measure => category.includes(measure))) {
            return 'medidas';
        }

        // Categorías que usan volumen
        const volumeCategories = ['taza', 'termo', 'vaso', 'botella', 'jarra', 'cristalería', 'vidrio', 'acero'];
        if (volumeCategories.some(volume => category.includes(volume))) {
            return 'volumen';
        }

        return 'tallas'; // Por defecto
    };

    const sizeType = getSizeType();

    // Opciones para tallas de ropa
    const clothingSizes = [
        { value: "2", label: "2" },
        { value: "4", label: "4" },
        { value: "6", label: "6" },
        { value: "8", label: "8" },
        { value: "10", label: "10" },
        { value: "12", label: "12" },
        { value: "14", label: "14" },
        { value: "16", label: "16" },
        { value: "XS", label: "XS" },
        { value: "S", label: "S" },
        { value: "M", label: "M" },
        { value: "L", label: "L" },
        { value: "XL", label: "XL" },
        { value: "2XL", label: "2XL" },
        { value: "3XL", label: "3XL" },
        { value: "4XL", label: "4XL" },
        { value: "5XL", label: "5XL" }
    ];

    // Opciones para medidas
    const measureSizes = [
        { value: "25x20cm", label: "25 × 20 cm" },
        { value: "30x25cm", label: "30 × 25 cm" },
        { value: "35x30cm", label: "35 × 30 cm" },
        { value: "40x30cm", label: "40 × 30 cm" },
        { value: "80x30cm", label: "80 × 30 cm" },
        { value: "90x40cm", label: "90 × 40 cm" },
        { value: "10x10cm", label: "10 × 10 cm" },
        { value: "15x15cm", label: "15 × 15 cm" },
        { value: "20x20cm", label: "20 × 20 cm" }
    ];

    // Opciones para volumen (tazas, termos, vasos)
    const volumeSizes = [
        { value: "8oz", label: "8 OZ" },
        { value: "10oz", label: "10 OZ" },
        { value: "11oz", label: "11 OZ" },
        { value: "12oz", label: "12 OZ" },
        { value: "14oz", label: "14 OZ" },
        { value: "16oz", label: "16 OZ" },
        { value: "20oz", label: "20 OZ" },
        { value: "300ml", label: "300 ml" },
        { value: "350ml", label: "350 ml" },
        { value: "400ml", label: "400 ml" },
        { value: "450ml", label: "450 ml" },
        { value: "500ml", label: "500 ml" },
        { value: "600ml", label: "600 ml" },
        { value: "650ml", label: "650 ml" },
        { value: "750ml", label: "750 ml" }
    ];

    const getOptions = () => {
        switch (sizeType) {
            case 'tallas':
                return clothingSizes;
            case 'medidas':
                return measureSizes;
            case 'volumen':
                return volumeSizes;
            default:
                return clothingSizes;
        }
    };

    const getLabel = () => {
        switch (sizeType) {
            case 'tallas':
                return "Tallas disponibles";
            case 'medidas':
                return "Medidas disponibles";
            case 'volumen':
                return "Tamaños disponibles";
            default:
                return "Tallas/Medidas disponibles";
        }
    };

    const getPlaceholder = () => {
        switch (sizeType) {
            case 'tallas':
                return "Seleccionar talla para agregar";
            case 'medidas':
                return "Seleccionar medida para agregar";
            case 'volumen':
                return "Seleccionar tamaño para agregar";
            default:
                return "Seleccionar opción para agregar";
        }
    };

    const getEmptyMessage = () => {
        switch (sizeType) {
            case 'tallas':
                return "No hay tallas seleccionadas";
            case 'medidas':
                return "No hay medidas seleccionadas";
            case 'volumen':
                return "No hay tamaños seleccionados";
            default:
                return "No hay opciones seleccionadas";
        }
    };

    return {
        sizeType,
        useMeasures,
        setUseMeasures,
        options: getOptions(),
        label: getLabel(),
        placeholder: getPlaceholder(),
        emptyMessage: getEmptyMessage()
    };
};