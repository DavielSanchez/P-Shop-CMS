import { useState, useEffect } from 'react';

export const useProductForm = (product) => {
    const [formData, setFormData] = useState({
        productName: '',
        productTag: [],
        productColors: [],
        productSizes: [],
        productSummary: '',
        productDescription: '',
        productMainImage: '',
        productImages: [],
        productStock: 0,
        productPrice: 0,
        productCost: 0,
        productDiscount: 0,
        productOffer: false,
        isPriceDisabled: false,
        productCategory: '',
        category: '',
        productComment: '',
        minStock: 0,
        maxStock: 100,
        maintainStock: true,
        sku: '',
        barcode: '',
        status: 'active',
        isPublished: true
    });

    // Actualizar formData cuando cambia el producto
    useEffect(() => {
        if (product) {
            setFormData({
                productName: product.productName || '',
                productTag: product.productTag || [],
                productColors: product.productColors || [],
                productSizes: product.productSizes || [],
                productSummary: product.productSummary || '',
                productDescription: product.productDescription || '',
                productMainImage: product.productMainImage || '',
                productImages: product.productImages || [],
                productStock: product.productStock || 0,
                productPrice: product.productPrice || 0,
                productCost: product.cost || 0,
                productDiscount: product.productDiscount || 0,
                productOffer: product.productOffer || false,
                isPriceDisabled: product.isPriceDisabled || false,
                productCategory: product.productCategory?.categoryName || product.category || '',
                category: product.category || '',
                productComment: product.productComment || '',
                minStock: product.minStock || 0,
                maxStock: product.maxStock || 100,
                maintainStock: product.maintainStock !== undefined ? product.maintainStock : true,
                sku: product.sku || '',
                barcode: product.barcode || '',
                status: product.status || 'active',
                isPublished: product.isPublished !== undefined ? product.isPublished : true
            });
        }
    }, [product]);

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

    const resetForm = () => {
        if (product) {
            setFormData({
                productName: product.productName || '',
                productTag: product.productTag || [],
                productColors: product.productColors || [],
                productSizes: product.productSizes || [],
                productSummary: product.productSummary || '',
                productDescription: product.productDescription || '',
                productMainImage: product.productMainImage || '',
                productImages: product.productImages || [],
                productStock: product.productStock || 0,
                productPrice: product.productPrice || 0,
                productCost: product.cost || 0,
                productDiscount: product.productDiscount || 0,
                productOffer: product.productOffer || false,
                isPriceDisabled: product.isPriceDisabled || false,
                productCategory: product.productCategory?.categoryName || product.category || '',
                category: product.category || '',
                productComment: product.productComment || '',
                minStock: product.minStock || 0,
                maxStock: product.maxStock || 100,
                maintainStock: product.maintainStock !== undefined ? product.maintainStock : true,
                sku: product.sku || '',
                barcode: product.barcode || '',
                status: product.status || 'active',
                isPublished: product.isPublished !== undefined ? product.isPublished : true
            });
        }
    };

    return {
        formData,
        handleInputChange,
        handleCheckboxChange,
        resetForm
    };
};