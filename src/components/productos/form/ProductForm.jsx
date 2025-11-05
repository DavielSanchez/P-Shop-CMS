import React, { useState, useEffect } from "react";
import { useColors } from "../../../hooks/useColor";
import { ArrowBack, Save, Cancel } from "@mui/icons-material";
import DetailsTab from "./tabs/DetailsTab";
import InventoryTab from "./tabs/InventoryTab";
import AccountingTab from "./tabs/AccountingTab";
import SalesTab from "./tabs/SalesTab";
import Aside from "./Aside";

function ProductForm({ product, onClose, onSave }) {
  const colors = useColors();
  const isEditing = !!product;
  const [activeTab, setActiveTab] = useState("Detalles");
  const [isEditingMode, setIsEditingMode] = useState(!isEditing);

  const [formData, setFormData] = useState({
    // Detalles
    productName: "",
    productTag: [],
    productColors: [],
    productSizes: [],
    productSummary: "",
    productDescription: "",
    productMainImage: "",

    // Inventario
    productStock: 0,
    minStock: 0,
    maxStock: 100,
    maintainStock: true,

    // Contabilidad
    productPrice: 0,
    productCost: 0,
    productDiscount: 0,
    productOffer: false,
    isPriceDisabled: false,

    // Ventas
    productCategory: "",
    category: "",
    productComment: "",
    sku: "",
    barcode: "",
    status: "active",
    isPublished: true,
  });

  const [currentTag, setCurrentTag] = useState("");
  const [currentColor, setCurrentColor] = useState("");
  const [currentSize, setCurrentSize] = useState("");

  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.productName || "",
        productTag: product.productTag || [],
        productColors: product.productColors || [],
        productSizes: product.productSizes || [],
        productSummary: product.productSummary || "",
        productDescription: product.productDescription || "",
        productMainImage: product.productMainImage || "",

        productStock: product.productStock || 0,
        minStock: product.minStock || 0,
        maxStock: product.maxStock || 100,
        maintainStock:
          product.maintainStock !== undefined ? product.maintainStock : true,

        productPrice: product.productPrice || 0,
        productCost: product.cost || 0,
        productDiscount: product.productDiscount || 0,
        productOffer: product.productOffer || false,
        isPriceDisabled: product.isPriceDisabled || false,

        productCategory:
          product.productCategory?.categoryName || product.category || "",
        category: product.category || "",
        productComment: product.productComment || "",
        sku: product.sku || "",
        barcode: product.barcode || "",
        status: product.status || "active",
        isPublished:
          product.isPublished !== undefined ? product.isPublished : true,
      });
    }
  }, [product]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (field, checked) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked,
    }));
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.productTag.includes(currentTag.trim())) {
      handleInputChange("productTag", [
        ...formData.productTag,
        currentTag.trim(),
      ]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = formData.productTag.filter((_, i) => i !== index);
    handleInputChange("productTag", newTags);
  };

  const handleAddColor = () => {
    if (
      currentColor.trim() &&
      !formData.productColors.includes(currentColor.trim())
    ) {
      handleInputChange("productColors", [
        ...formData.productColors,
        currentColor.trim(),
      ]);
      setCurrentColor("");
    }
  };

  const handleRemoveColor = (index) => {
    const newColors = formData.productColors.filter((_, i) => i !== index);
    handleInputChange("productColors", newColors);
  };

  const handleAddSize = () => {
    if (
      currentSize.trim() &&
      !formData.productSizes.includes(currentSize.trim())
    ) {
      handleInputChange("productSizes", [
        ...formData.productSizes,
        currentSize.trim(),
      ]);
      setCurrentSize("");
    }
  };

  const handleRemoveSize = (index) => {
    const newSizes = formData.productSizes.filter((_, i) => i !== index);
    handleInputChange("productSizes", newSizes);
  };

  // Función para manejar el cambio de imagen principal
  const handleMainImageChange = (imageUrl) => {
    handleInputChange("productMainImage", imageUrl);
  };

  // Función para eliminar la imagen principal
  const handleMainImageRemove = () => {
    handleInputChange("productMainImage", "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const calculateProfitMargin = () => {
    if (formData.productCost > 0) {
      const margin =
        ((formData.productPrice - formData.productCost) /
          formData.productCost) *
        100;
      return {
        percentage: margin.toFixed(1),
        color: margin > 0 ? "#10b981" : "#ef4444",
      };
    }
    return {
      percentage: "0",
      color: colors.textPrimary,
    };
  };

  const profitMargin = calculateProfitMargin();

  const tabs = ["Detalles", "Inventario", "Contabilidad", "Ventas"];

  const renderTabContent = () => {
    const commonProps = {
      isEditing: isEditingMode,
      setIsEditing: setIsEditingMode,
      colors,
      formData,
      handleInputChange,
      handleCheckboxChange,
      handleAddTag,
      handleRemoveTag,
      handleAddColor,
      handleRemoveColor,
      handleAddSize,
      handleRemoveSize,
      currentTag,
      setCurrentTag,
      currentColor,
      setCurrentColor,
      currentSize,
      setCurrentSize,
      profitMargin,
    };

    switch (activeTab) {
      case "Detalles":
        return <DetailsTab {...commonProps} />;
      case "Inventario":
        return <InventoryTab {...commonProps} />;
      case "Contabilidad":
        return <AccountingTab {...commonProps} />;
      case "Ventas":
        return <SalesTab {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-full">
      {/* Header */}
      <div
        className="flex items-center justify-between gap-2 mb-6 py-4 rounded-xl"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1 rounded-lg transition-colors hover:bg-opacity-10"
            style={{ color: colors.textPrimary }}
          >
            <ArrowBack fontSize="small" />
          </button>

          <div className="min-w-0 flex flex-1">
            <h1
              className="text-lg md:text-2xl font-bold truncate"
              style={{ color: colors.textPrimary }}
            >
              {isEditing
                ? `Editar: ${formData.productName || "Producto"}`
                : "Nuevo Producto"}
            </h1>
            <span
              className="flex-shrink-0 self-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ml-3"
              style={{
                backgroundColor: "#10b98115",
                color: "#10b981",
              }}
            >
              {isEditing ? "Editando" : "Nuevo"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-1 px-3 py-2 rounded-lg border transition-colors hover:bg-opacity-10 text-sm"
            style={{
              borderColor: colors.border,
              color: colors.textPrimary,
            }}
          >
            <Cancel fontSize="small" />
            Cancelar
          </button>
          <button
            type="submit"
            form="product-form"
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-white transition-colors text-sm"
            style={{
              backgroundColor: colors.primary,
            }}
          >
            <Save fontSize="small" />
            {isEditing ? "Actualizar" : "Crear"}
          </button>
        </div>
      </div>

      {/* Contenido principal con Aside y Formulario */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Aside */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <Aside
            product={formData}
            isEditing={isEditing}
            onMainImageChange={handleMainImageChange}
            onMainImageRemove={handleMainImageRemove}
          />
        </div>

        {/* Formulario con Tabs */}
        <div className="flex-1">
          <div
            className="rounded-lg border p-6 flex flex-col h-full"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <form
              id="product-form"
              onSubmit={handleSubmit}
              className="flex-1 flex flex-col"
            >
              <div className="w-full flex-1">
                {/* Navegación de Tabs */}
                <div
                  className="flex border-b mb-6"
                  style={{ borderColor: colors.border }}
                >
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab ? "font-semibold" : ""
                      }`}
                      style={{
                        borderColor:
                          activeTab === tab ? colors.primary : "transparent",
                        color:
                          activeTab === tab
                            ? colors.primary
                            : colors.textSecondary,
                        backgroundColor:
                          activeTab === tab
                            ? colors.primary + "08"
                            : "transparent",
                      }}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Contenido del Tab */}
                <div className="pb-6 w-full flex-1">{renderTabContent()}</div>
              </div>

              {/* Botones de acción (opcionales, ya están en el header) */}
              <div
                className="flex gap-4 pt-6 border-t mt-auto lg:hidden"
                style={{ borderColor: colors.border }}
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center gap-2 px-6 py-2 border rounded-lg transition-colors flex-1 justify-center"
                  style={{
                    borderColor: colors.border,
                    color: colors.textPrimary,
                  }}
                >
                  <Cancel fontSize="small" />
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2 rounded-lg text-white transition-colors flex-1 justify-center"
                  style={{
                    backgroundColor: colors.primary,
                  }}
                >
                  <Save fontSize="small" />
                  {isEditing ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
