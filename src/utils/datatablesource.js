import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import imageLiveUrl from "./urlConverter/imageLiveUrl";
import { useGridApiContext } from "@mui/x-data-grid";
import { Box } from "@mui/material";

function ImageEditInputCell(props) {
  const { id, field, fieldUpdated, value, mode } = props;
  const apiRef = useGridApiContext();

  const handleFileChange = (event) => {
    const file = event.target?.files?.[0];

    if (!file) {
      apiRef.current.setEditCellValue({
        id,
        field: fieldUpdated,
        value: false,
      });
      return;
    }

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageValue = reader.result;
        apiRef.current.setEditCellValue({
          id,
          field: fieldUpdated,
          value: true,
        });
        apiRef.current.setEditCellValue({
          id,
          field,
          value: { file, dataURL: imageValue, isUpdate: true },
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRef = (element) => {
    if (element) {
      const input = element.querySelector('input[type="file"]');
      input?.focus();
    }
  };

  if (mode === "edit") {
    return (
      <Box sx={{ display: "flex", alignItems: "center", pr: 2 }}>
        <input
          ref={handleRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </Box>
    );
  }

  console.log("Value");
  console.log(value);
}

const renderImageEditInputCell = (params) => {
  const { field, fieldUpdated } = params;
  return (
    <ImageEditInputCell {...params} mode="edit" fieldUpdated={fieldUpdated} />
  );
};

function DocEditInputCell(props) {
  const { id, field, fieldUpdated, value, mode } = props;
  const apiRef = useGridApiContext();

  const handleFileChange = (event) => {
    const file = event.target?.files?.[0];

    if (!file) {
      apiRef.current.setEditCellValue({
        id,
        field: fieldUpdated,
        value: false,
      });
      return;
    }

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageValue = reader.result;
        apiRef.current.setEditCellValue({
          id,
          field: fieldUpdated,
          value: true,
        });
        apiRef.current.setEditCellValue({
          id,
          field,
          value: { file, dataURL: imageValue, isUpdate: true },
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRef = (element) => {
    if (element) {
      const input = element.querySelector('input[type="file"]');
      input?.focus();
    }
  };

  if (mode === "edit") {
    return (
      <Box sx={{ display: "flex", alignItems: "center", pr: 2 }}>
        <input
          ref={handleRef}
          type="file"
          // accept =all types of documents
          // name="PdfDoc"
          accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
          onChange={handleFileChange}
        />
      </Box>
    );
  }

  console.log("Value");
  console.log(value);
}

const renderDocEditInputCell = (params) => {
  const { field, fieldUpdated } = params;
  return (
    <DocEditInputCell {...params} mode="edit" fieldUpdated={fieldUpdated} />
  );
};

export const ProductsDataColumn = [
  {
    field: "id",
    headerName: "ID",
    width: 180,
    editable: false,
  },
  {
    field: "user_id",
    headerName: "User ID",
    width: 180,
    editable: false,
  },
  {
    field: "gcpGLNID",
    headerName: "GCP GLN ID",
    width: 180,
    editable: false,
  },
  {
    field: "import_code",
    headerName: "Import Code",
    width: 180,
    editable: false,
  },
  {
    field: "productnameenglish",
    headerName: "Product Name (English)",
    width: 180,
    editable: false,
  },
  {
    field: "productnamearabic",
    headerName: "Product Name (Arabic)",
    width: 180,
    editable: false,
  },
  {
    field: "BrandName",
    headerName: "Brand Name",
    width: 180,
    editable: false,
  },
  {
    field: "BrandNameAr",
    headerName: "Brand Name (Arabic)",
    width: 180,
    editable: false,
  },
  {
    field: "ProductType",
    headerName: "Product Type",
    width: 180,
    editable: false,
  },
  {
    field: "Origin",
    headerName: "Origin",
    width: 180,
    editable: false,
  },
  {
    field: "PackagingType",
    headerName: "Packaging Type",
    width: 180,
    editable: false,
  },
  {
    field: "MnfCode",
    headerName: "Manufacturer Code",
    width: 180,
    editable: false,
  },
  {
    field: "MnfGLN",
    headerName: "Manufacturer GLN",
    width: 180,
    editable: false,
  },
  {
    field: "ProvGLN",
    headerName: "Provider GLN",
    width: 180,
    editable: false,
  },
  {
    field: "unit",
    headerName: "Unit",
    width: 180,
    editable: false,
  },
  {
    field: "size",
    headerName: "Size",
    width: 180,
    editable: false,
  },
  {
    field: "front_image",
    headerName: "Front Image",
    width: 180,
    editable: false,
  },
  {
    field: "back_image",
    headerName: "Back Image",
    width: 180,
    editable: false,
  },
  {
    field: "childProduct",
    headerName: "Child Product",
    width: 180,
    editable: false,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 180,
    editable: false,
  },
  {
    field: "barcode",
    headerName: "Barcode",
    width: 180,
    editable: false,
  },
  {
    field: "gpc",
    headerName: "GPC",
    width: 180,
    editable: false,
  },
  {
    field: "gpc_code",
    headerName: "GPC Code",
    width: 180,
    editable: false,
  },
  {
    field: "countrySale",
    headerName: "Country Sale",
    width: 180,
    editable: false,
  },
  {
    field: "HSCODES",
    headerName: "HS Codes",
    width: 180,
    editable: false,
  },
  {
    field: "HsDescription",
    headerName: "HS Description",
    width: 180,
    editable: false,
  },
  {
    field: "gcp_type",
    headerName: "GCP Type",
    width: 180,
    editable: false,
  },
  {
    field: "prod_lang",
    headerName: "Product Language",
    width: 180,
    editable: false,
  },
  {
    field: "details_page",
    headerName: "Details Page",
    width: 180,
    editable: false,
  },
  {
    field: "details_page_ar",
    headerName: "Details Page (Arabic)",
    width: 180,
    editable: false,
  },
  {
    field: "status",
    headerName: "Status",
    width: 180,
    editable: false,
  },
  {
    field: "deleted_at",
    headerName: "Deleted At",
    width: 180,
    editable: false,
  },
  {
    field: "created_at",
    headerName: "Created At",
    width: 180,
    editable: false,
  },
  {
    field: "updated_at",
    headerName: "Updated At",
    width: 180,
    editable: false,
  },
  {
    field: "memberID",
    headerName: "Member ID",
    width: 180,
    editable: false,
  },
  {
    field: "admin_id",
    headerName: "Admin ID",
    width: 180,
    editable: false,
  },
  {
    field: "save_as",
    headerName: "Save As",
    width: 180,
    editable: false,
  },
  {
    field: "gtin_type",
    headerName: "GTIN Type",
    width: 180,
    editable: false,
  },
  {
    field: "product_url",
    headerName: "Product URL",
    width: 180,
    editable: false,
  },
  {
    field: "product_link_url",
    headerName: "Product Link URL",
    width: 180,
    editable: false,
  },
  {
    field: "readyForGepir",
    headerName: "Ready For Gepir",
    width: 180,
    editable: false,
  },
  {
    field: "gepirPosted",
    headerName: "Gepir Posted",
    width: 180,
    editable: false,
  },
];


const GTINCell = (params) => {
  const style = {
    backgroundColor: "rgb(21 128 61)",
    color: "white",
    borderRadius: "30px",
    padding: "2px 5px",
  };
  return <div style={style}>{params.value}</div>;
};


export const PromotionalOffersColumns = [
  {
    field: "PromotionalOffers",
    headerName: "Promotional Offers",
    width: 180,
    editable: true,
  },
  {
    field: "LinkType",
    headerName: "Link Type",
    width: 180,
    editable: true,
  },
  {
    field: "Lang",
    headerName: "Lang",
    width: 180,
    editable: true,
  },
  {
    field: "TargetURL",
    headerName: "Target URL",
    width: 150,
    editable: true,
  },

  {
    field: "GTIN",
    headerName: "GTIN",
    width: 180,
    renderCell: GTINCell,
    editable: false,
  },
  {
    field: "ExpiryDate",
    headerName: "ExpiryDate",
    width: 180,
    editable: true,
  },
  {
    field: "price",
    headerName: "Price",
    width: 180,
    editable: true,
    type: "Float",
  },
  {
    field: "banner",
    headerName: "Banner",
    width: 180,
    editable: true,
  },
];


export const SafetyInformationColumn = [
  {
    field: "SafetyDetailedInformation",
    headerName: "Safety Detailed Information",
    width: 180,
    editable: true,
  },
  {
    field: "LinkType",
    headerName: "Link Type",
    width: 180,
    editable: true,
  },
  {
    field: "Lang",
    headerName: "Lang",
    width: 180,
    editable: true,
  },
  {
    field: "TargetURL",
    headerName: "Target URL",
    width: 150,
    editable: true,
  },

  {
    field: "GTIN",
    headerName: "GTIN",
    width: 180,
    renderCell: GTINCell,
    editable: false,
  },

  {
    field: "logo",
    headerName: "Logo",
    renderCell: (params) => {
      console.log("params");
      console.log(params);
      const fieldUpdated = params?.row?.[params.field]?.isUpdate;
      const imageUrl = fieldUpdated
        ? params?.row?.[params.field]?.dataURL
        : imageLiveUrl(params.row[params.field]);

      return (
        <img
          src={imageUrl}
          alt="Image"
          style={{ width: 80, height: 80, objectFit: "contain" }}
        />
      );
    },
    renderEditCell: (params) =>
      renderImageEditInputCell({ ...params, fieldUpdated: "logoUpdated" }),
    editable: true,
    width: 180,
    type: "string",
  },
  {
    field: "companyName",
    headerName: "Company Name",
    width: 150,
    editable: true,
  },
  {
    field: "process",
    headerName: "Process",
    width: 150,
    editable: true,
  },
];



export const ProductLocationofOriginColumn = [
  {
    field: "ProductLocationOrigin",
    headerName: "Product Location Origin",
    width: 180,
    editable: true,
  },
  {
    field: "LinkType",
    headerName: "Link Type",
    width: 180,
    editable: true,
  },
  {
    field: "Lang",
    headerName: "Lang",
    width: 180,
    editable: true,
  },
  {
    field: "TargetURL",
    headerName: "Target URL",
    width: 150,
    editable: true,
  },

  {
    field: "GTIN",
    headerName: "GTIN",
    width: 180,
    renderCell: GTINCell,
    editable: false,
  },
  {
    field: "ExpiryDate",
    headerName: "ExpiryDate",
    width: 180,
    editable: true,
  },
];

export const ProductRecallColumn = [
  {
    field: "ProductRecall",
    headerName: "Product Recall",
    width: 180,
    editable: true,
  },
  {
    field: "LinkType",
    headerName: "Link Type",
    width: 180,
    editable: true,
  },
  {
    field: "Lang",
    headerName: "Lang",
    width: 180,
    editable: true,
  },
  {
    field: "TargetURL",
    headerName: "Target URL",
    width: 150,
    editable: true,
  },

  {
    field: "GTIN",
    headerName: "GTIN",
    width: 180,
    renderCell: GTINCell,
    editable: false,
  },
  {
    field: "ExpiryDate",
    headerName: "ExpiryDate",
    width: 180,
    editable: true,
  },
];



export const PackagingCompositionColumn = [
  {
    field: "logo",
    headerName: "Logo",
    renderCell: (params) => {
      console.log("params");
      console.log(params);
      const fieldUpdated = params?.row?.[params.field]?.isUpdate;
      const imageUrl = fieldUpdated
        ? params?.row?.[params.field]?.dataURL
        : imageLiveUrl(params.row[params.field]);

      return (
        <img
          src={imageUrl}
          alt="Image"
          style={{ width: 80, height: 80, objectFit: "contain" }}
        />
      );
    },
    renderEditCell: (params) =>
      renderImageEditInputCell({ ...params, fieldUpdated: "logoUpdated" }),
    editable: true,
    width: 180,
    type: "string",
  },
  {
    field: "title",
    headerName: "Title",
    width: 180,
    editable: true,
  },
  {
    field: "consumerProductVariant",
    headerName: "Consumer Product Variant",
    width: 180,
    editable: true,
  },
  {
    field: "packaging",
    headerName: "Packaging",
    width: 150,
    editable: true,
  },

  {
    field: "material",
    headerName: "Material",
    width: 180,
    editable: true,
  },
  {
    field: "recyclability",
    headerName: "Recyclability",
    width: 180,
    editable: true,
  },
  {
    field: "productOwner",
    headerName: "ProductOwner",
    width: 180,
    editable: true,
  },
  {
    field: "LinkType",
    headerName: "LinkType",
    width: 180,
    editable: true,
  },
  {
    field: "GTIN",
    headerName: "GTIN",
    width: 180,
    renderCell: GTINCell,
    editable: false,
  },
  {
    field: "brand_owner",
    headerName: "brand_owner",
    width: 180,
    editable: true,
  },
];

export const ElectronicLeafletsColumn = [
  {
    field: "ProductLeafletInformation",
    headerName: "Product Leaflets Information",
    width: 180,
    editable: true,
  },
  {
    field: "Lang",
    headerName: "Lang",
    width: 180,
    editable: true,
  },
  {
    field: "LinkType",
    headerName: "Link Type",
    width: 180,
    editable: true,
  },

  {
    field: "TargetURL",
    headerName: "Target URL",
    width: 150,
    editable: true,
  },

  {
    field: "GTIN",
    headerName: "GTIN",
    width: 180,
    renderCell: GTINCell,
    editable: false,
  },

  {
    field: "PdfDoc",
    headerName: "Pdf Doc",
    width: 180,
    renderCell: (params) => {
      console.log("params");
      console.log(params);
      const fieldUpdated = params?.row?.[params.field]?.isUpdate;
      const docUrl = fieldUpdated
        ? params?.row?.[params.field]?.dataURL
        : imageLiveUrl(params.row[params.field]);

      const onClickIcon = () => {
        if (fieldUpdated) {
          // removing the "data:application/pdf;base64," part
          const base64 = docUrl.split(",")[1];
          const binary = atob(base64);
          const binaryLen = binary.length;
          const buffer = new ArrayBuffer(binaryLen);
          const view = new Uint8Array(buffer);
          for (let i = 0; i < binaryLen; i++) {
            view[i] = binary.charCodeAt(i);
          }
          // create Blob from ArrayBuffer
          const blob = new Blob([view], { type: "application/pdf" });

          // create an object URL from the Blob
          const objectUrl = URL.createObjectURL(blob);

          // open a link to the Object URL
          const link = document.createElement("a");
          link.href = objectUrl;
          link.download = "file.pdf"; // you can set file name here
          link.click();
        } else {
          window.open(docUrl, "_blank");
        }
      };

      return (
        <InsertDriveFileIcon
          style={{
            color: "black",
            width: "40px",
            height: "40px",
            cursor: "pointer",
          }}
          onClick={onClickIcon}
        />
      );
    },

    renderEditCell: (params) =>
      renderDocEditInputCell({ ...params, fieldUpdated: "logoUpdated" }),
    editable: true,
    type: "string",
  },
];


export const RecipeColumn = [
  {
    field: "logo",
    headerName: "Logo",
    renderCell: (params) => {
      console.log("params");
      console.log(params);
      const fieldUpdated = params?.row?.[params.field]?.isUpdate;
      const imageUrl = fieldUpdated
        ? params?.row?.[params.field]?.dataURL
        : imageLiveUrl(params.row[params.field]);

      return (
        <img
          src={imageUrl}
          alt="Image"
          style={{ width: 80, height: 80, objectFit: "contain" }}
        />
      );
    },
    renderEditCell: (params) =>
      renderImageEditInputCell({ ...params, fieldUpdated: "logoUpdated" }),
    editable: true,
    width: 180,
    type: "string",
  },
  {
    field: "title",
    headerName: "Title",
    width: 180,
    editable: true,
  },
  {
    field: "description",
    headerName: "Description",
    width: 180,
    editable: true,
  },
  {
    field: "ingredients",
    headerName: "Ingredients",
    width: 150,
    editable: true,
  },

  {
    field: "LinkType",
    headerName: "Link Type",
    width: 180,
    editable: true,
  },
  {
    field: "GTIN",
    headerName: "GTIN",
    width: 180,
    renderCell: GTINCell,
    editable: false,
  },
];


export const ProductContentColumn = [
  {
    field: "ProductAllergenInformation",
    headerName: "ProductAllergenInformation",
    width: 180,
    editable: true,
  },
  {
    field: "ProductNutrientsInformation",
    headerName: "Product Nutrients Information",
    width: 180,
    editable: true,
  },
  {
    field: "GTIN",
    headerName: "GTIN",
    width: 180,
    renderCell: GTINCell,
    editable: false,
  },
  {
    field: "LinkType",
    headerName: "LinkType",
    width: 150,
    editable: true,
  },

  {
    field: "Batch",
    headerName: "Batch",
    width: 180,
    editable: true,
  },
  {
    field: "Expiry",
    headerName: "Expiry",
    width: 180,
    editable: true,
  },

  {
    field: "Serial",
    headerName: "Serial",
    width: 120,
    editable: true,
  },

  {
    field: "ManufacturingDate",
    headerName: "Manufacturing Date",
    width: 180,
    editable: true,
    type: "date",
    valueGetter: (params) => {
      return new Date(params.row.ManufacturingDate);
    },
  },
  {
    field: "bestBeforeDate",
    headerName: "best Before Date",
    width: 180,
    editable: true,
  },
  {
    field: "GLNIDFrom",
    headerName: "GLNID From",
    width: 180,
    editable: true,
  },
  {
    field: "unitPrice",
    headerName: "unit Price",
    width: 180,
    editable: true,
    type: "float",
  },
  {
    field: "ingredients",
    headerName: "ingredients",
    width: 180,
    editable: true,
  },
  {
    field: "allergen_info",
    headerName: "Allergen info",
    width: 180,
    editable: true,
  },
  {
    field: "calories",
    headerName: "calories",
    width: 180,
    editable: true,
  },
  {
    field: "sugar",
    headerName: "sugar",
    width: 180,
    editable: true,
  },
  {
    field: "salt",
    headerName: "salt",
    width: 180,
    editable: true,
  },
  {
    field: "fat",
    headerName: "fat",
    width: 180,
    editable: true,
  },
];
