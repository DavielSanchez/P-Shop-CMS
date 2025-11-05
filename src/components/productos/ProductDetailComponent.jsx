import React, { useEffect, useState } from 'react';
import { useColors } from '../../hooks/useColor';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowBack, Edit, Save, Cancel } from "@mui/icons-material";
import { useProducts } from "../../hooks/useProducts";
import { productService } from "../../services/products";
import { useProductForm } from "../../hooks/useProductForm";
import Aside from "./detailsSections/aside";
import Tabs from "./detailsSections/Tabs";

function ProductDetail() {
  const colors = useColors();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [originalProduct, setOriginalProduct] = useState(
    location.state?.product || null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  const { formData, handleInputChange, handleCheckboxChange, resetForm } =
    useProductForm(originalProduct);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      // ... código existente
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (originalProduct && !isEditing) {
      resetForm();
    }
  }, [originalProduct, isEditing, resetForm]);

  const handleDropdownToggle = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSave = () => {
    console.log("Guardando cambios:", formData);
    setIsEditing(false);
    setOriginalProduct(formData);
  };

  const handleCancel = () => {
    console.log("Cancelando edición...");
    setIsEditing(false);
    resetForm();
    setForceUpdate((prev) => prev + 1);
  };

  const handleGoBack = () => {
    // Intentar volver a la página anterior
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Si no hay historial, ir a la lista de productos
      navigate("/products"); // Ajusta esta ruta según tu aplicación
    }
  };

  // Estados de carga y error
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"
            style={{ borderColor: colors.primary }}
          ></div>
          <p className="mt-2" style={{ color: colors.textPrimary }}>
            Cargando producto...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <h2
          className="text-lg font-semibold mb-3"
          style={{ color: colors.textPrimary }}
        >
          Error al cargar el producto
        </h2>
        <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>
          {error}
        </p>
        <button
          onClick={handleGoBack}
          className="px-3 py-2 rounded-lg flex items-center gap-1 text-sm mx-auto"
          style={{ backgroundColor: colors.primary, color: "#fff" }}
        >
          <ArrowBack fontSize="small" />
          Volver a productos
        </button>
      </div>
    );
  }

  if (!originalProduct) {
    return (
      <div className="text-center py-8">
        <h2
          className="text-lg font-semibold mb-3"
          style={{ color: colors.textPrimary }}
        >
          Producto no encontrado
        </h2>
        <button
          onClick={handleGoBack}
          className="px-3 py-2 rounded-lg flex items-center gap-1 text-sm mx-auto"
          style={{ backgroundColor: colors.primary, color: "#fff" }}
        >
          <ArrowBack fontSize="small" />
          Volver a productos
        </button>
      </div>
    );
  }

  const currentProduct = isEditing ? formData : originalProduct;

  return (
    <div key={forceUpdate}>
      <div className="max-w-full">
        <div
          className="flex items-center justify-between gap-2 mb-6 py-4 rounded-xl"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <button
              onClick={handleGoBack}
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
                {currentProduct.productName}
              </h1>
              <span
                className="flex-shrink-0 self-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ml-3"
                style={{
                  backgroundColor: isEditing ? "#f59e0b15" : "#10b98115",
                  color: isEditing ? "#f59e0b" : "#10b981",
                }}
              >
                {isEditing ? "Editando" : "Habilitado"}
              </span>
            </div>
          </div>

          {/* ... resto del código igual ... */}
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <Aside
            product={currentProduct}
            isEditing={isEditing}
            onMainImageChange={(imageUrl) =>
              handleInputChange("productMainImage", imageUrl)
            }
            onMainImageRemove={() => handleInputChange("productMainImage", "")}
            onAdditionalImagesChange={(images) =>
              handleInputChange("productImages", images)
            }
          />
          <Tabs
            product={currentProduct}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            formData={formData}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;