import { useState } from 'react';

export const useProductForm = (product) => {
    const [formData, setFormData] = useState({
        productName: product.productName || 'No especificado',
        productTag: product.productTag || [],
        productColors: product.productColors || [],
        productSizes: product.productSizes || [],
        productSummary: product.productSummary || '',
        productDescription: product.productDescription || '',
        productStock: product.productStock || 0,
        productPrice: product.productPrice || 0,
        productCost: product.cost || 0,
        productOffer: product.productOffer || false,
        productDiscount: product.productDiscount || 0,
        isPriceDisabled: product.isPriceDisabled || false,
        productCategory: product.productCategory || '',
        category: product.category || '',
        productComment: product.productComment || '',
        minStock: product.minStock || 0,
        maintainStock: product.maintainStock !== undefined ? product.maintainStock : true
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCheckboxChange = (field, checked) => {
        setFormData(prev => ({
            ...prev,
            [field]: checked
        }));
    };

    return {
        formData,
        handleInputChange,
        handleCheckboxChange
    };
};