import React, { useContext, useState } from 'react'
import newRequest from '../../utils/userRequest';
import safetyInformationIcon from "../../Images/safetyInformation.jpeg";
import promotionalOffersIcon from "../../Images/promotionalOffers.jpeg";
import productContentIcon from "../../Images/productContent.jpeg";
import productLocationofOriginIcon from "../../Images/productLocationOrigin.jpeg";
import productRecallIcon from "../../Images/ProductRecall.jpeg";
import recipeIcon from "../../Images/Recipe.jpeg";
import packagingCompositionIcon from "../../Images/packaging.jpeg";
import electronicLeafletsIcon from "../../Images/electronicLeafLets.jpeg";
import { SnackbarContext } from '../../Contexts/SnackbarContext';
<<<<<<< HEAD
import DataTable from '../../Components/Datatable/Datatable';
=======
import DataTable from '../../components/Datatable/Datatable';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
>>>>>>> 52710344ceb26532ea62c9a7e0ffa3a554b2fd6b
import { ElectronicLeafletsColumn, 
    PackagingCompositionColumn, 
    ProductContentColumn, 
    ProductLocationofOriginColumn, 
    ProductRecallColumn, 
    PromotionalOffersColumns, 
    RecipeColumn, 
    SafetyInformationColumn 
} 
from '../../utils/datatablesource';
import DeleteIcon from "@mui/icons-material/Delete";


const DigitalLinkInformation = ({ gtinData }) => {
    const [data, setData] = useState([]);
    const [safetyInformation, setSafetyInformation] = useState([]);
    const [recipe, setRecipe] = useState([]);
    const [productContent, setProductContent] = useState([]);
    const [promotionalOffers, setPromotionalOffers] = useState([]);
    const [productLocationofOrigin, setProductLocationofOrigin] = useState([]);
    const [productRecall, setProductRecall] = useState([]);
    const [packagingComposition, setPackagingComposition] = useState([]);
    const [electronicLeaflets, setElectronicLeaflets] = useState([]);
  
    
    const handleDelete = (id) => {
        console.log(id);
    }

    const [selectedOption, setSelectedOption] = useState("Safety Information");
    const { openSnackbar } = useContext(SnackbarContext);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

   
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
      setIsMenuOpen((prev) => !prev);
    };

    const handleOptionChange = (option) => {
      setSelectedOption(option);
      setIsDropdownOpen(false);
      
    switch (option) {
      case "Safety Information":
        newRequest
          .get(`/getSafetyInformationByGtin/${gtinData?.gtin}`)
          .then((response) => {
            console.log(response.data);
            setSafetyInformation(response.data);
          })
          .catch((err) => {
            console.log(err);
            openSnackbar(
              err?.response?.data?.message ?? "something went wrong!",
              "error"
            );
            setSafetyInformation([]);
          });
        break;

      case "Promotional Offers":
        newRequest
          .get(`/getPromotionalOffersByGtin/${gtinData?.gtin}`)
          .then((response) => {
            console.log(response.data);
            setPromotionalOffers(response.data);
          })
          .catch((err) => {
            console.log(err);
            openSnackbar(err?.response?.data?.message, "error");
            setPromotionalOffers([]);
          });
        break;

      case "Product Contents":
        newRequest
          .get(`/getProductContentByGtin/${gtinData?.gtin}`)
          .then((response) => {
            console.log(response.data);
            console.log("called");
            setProductContent(response.data);
          })
          .catch((err) => {
            console.log(err);
            openSnackbar(err?.response?.data?.message, "error");
            setProductContent([]);
          });
        break;

      case "ProductLocationofOrigin":
        newRequest
          .get(`/getProductLocationOriginByGtin/${gtinData?.gtin}`)
          .then((response) => {
            console.log(response.data);
            setProductLocationofOrigin(response.data);
          })
          .catch((err) => {
            console.log(err);
            openSnackbar(err?.response?.data?.message, "error");
            setProductLocationofOrigin([]);
          });
        break;

      case "ProductRecall":
        newRequest
          .get(`/getProductsRecallByGtin/${gtinData?.gtin}`)
          .then((response) => {
            console.log(response.data);
            setProductRecall(response.data);
          })
          .catch((err) => {
            console.log(err);
            openSnackbar(err?.response?.data?.message, "error");
            setProductRecall([]);
          });
        break;

      case "recipe":
        newRequest
          .get(`/getRecipeDataByGtin/${gtinData?.gtin}`)
          .then((response) => {
            console.log(response.data);
            setRecipe(response.data);
          })
          .catch((err) => {
            console.log(err);
            openSnackbar(err?.response?.data?.message, "error");
            setRecipe([]);
          });
        break;

      case "PackagingComposition":
        newRequest
          .get(
            `/getAlltblPkgCompositionDataByGtin/${gtinData?.gtin}`
          )
          .then((response) => {
            console.log(response.data);
            setPackagingComposition(response.data);
          })
          .catch((err) => {
            console.log(err);
            openSnackbar(err?.response?.data?.message, "error");

            setPackagingComposition([]);
          });
        break;

      case "ElectronicLeaflets":
        newRequest
          .get(`/getProductLeafLetsDataByGtin/${gtinData?.gtin}`)
          .then((response) => {
            console.log(response.data);
            setElectronicLeaflets(response.data);
          })
          .catch((err) => {
            console.log(err);
            openSnackbar(err?.response?.data?.message, "error");
            setElectronicLeaflets([]);
          });
        break;

      // Add more cases for other options
      default:
        break;
    }
  };


  const renderDataGrid = () => {
    switch (selectedOption) {
      case "Safety Information":
        return (
          <div style={{marginLeft: '-10px', marginRight: '-10px'}}>
          <DataTable
            data={safetyInformation}
            title={"Safety Information"}
            secondaryColor="secondary"
            columnsName={SafetyInformationColumn}
            checkboxSelection="disabled"
            // processRowUpdate={processRowUpdate}
            backButton={false}
            dropDownOptions={[
              {
                label: "Delete",
                icon: (
                  <DeleteIcon fontSize="small" style={{ color: "#FF0032" }} />
                  ),
                  action: handleDelete,
                },
              ]}
              />
          </div>
        );

      case "Promotional Offers":
        return (
          <div style={{marginLeft: '-10px', marginRight: '-10px'}}>
          <DataTable
            data={promotionalOffers}
            title="Promotional Offers"
            columnsName={PromotionalOffersColumns}
            secondaryColor="secondary"
            checkboxSelection="disabled"
            // processRowUpdate={processRowUpdate}
            backButton={false}
            dropDownOptions={[
              {
                label: "Delete",
                icon: (
                  <DeleteIcon fontSize="small" style={{ color: "#FF0032" }} />
                ),
                action: handleDelete,
              },
            ]}
          />
          </div>
        );

      case "Product Contents":
        return (
          <div style={{marginLeft: '-10px', marginRight: '-10px'}}>
          <DataTable
            data={productContent}
            title="Product Contents"
            secondaryColor="secondary"
            columnsName={ProductContentColumn}
            checkboxSelection="disabled"
            // processRowUpdate={processRowUpdate}
            backButton={false}
            dropDownOptions={[
              {
                label: "Delete",
                icon: (
                  <DeleteIcon fontSize="small" style={{ color: "#FF0032" }} />
                ),
                action: handleDelete,
              },
            ]}
          />
          </div>
        );

      case "ProductLocationofOrigin":
        return (
          <div style={{marginLeft: '-10px', marginRight: '-10px'}}>
          <DataTable
            data={productLocationofOrigin}
            title="Product Location of Origin"
            secondaryColor="secondary"
            columnsName={ProductLocationofOriginColumn}
            checkboxSelection="disabled"
            // processRowUpdate={processRowUpdate}
            backButton={false}
            dropDownOptions={[
              {
                label: "Delete",
                icon: (
                  <DeleteIcon fontSize="small" style={{ color: "#FF0032" }} />
                ),
                action: handleDelete,
              },
            ]}
          />
          </div>
        );

      case "ProductRecall":
        return (
          <div style={{marginLeft: '-10px', marginRight: '-10px'}}>
          <DataTable
            data={productRecall}
            title="Product Recall"
            columnsName={ProductRecallColumn}
            secondaryColor="secondary"
            checkboxSelection="disabled"
            // processRowUpdate={processRowUpdate}
            backButton={false}
            dropDownOptions={[
              {
                label: "Delete",
                icon: (
                  <DeleteIcon fontSize="small" style={{ color: "#FF0032" }} />
                ),
                action: handleDelete,
              },
            ]}
          />
          </div>
        );

      case "recipe":
        return (
          <div style={{marginLeft: '-10px', marginRight: '-10px'}}>
          <DataTable
            data={recipe}
            title="Recipe"
            columnsName={RecipeColumn}
            secondaryColor="secondary"
            checkboxSelection="disabled"
            // processRowUpdate={processRowUpdate}
            backButton={false}
            dropDownOptions={[
              {
                label: "Delete",
                icon: (
                  <DeleteIcon fontSize="small" style={{ color: "#FF0032" }} />
                ),
                action: handleDelete,
              },
            ]}
          />
          </div>
        );

      case "PackagingComposition":
        return (
          <div style={{marginLeft: '-10px', marginRight: '-10px'}}>
          <DataTable
            data={packagingComposition}
            title="Packaging Composition"
            secondaryColor="secondary"
            columnsName={PackagingCompositionColumn}
            checkboxSelection="disabled"
            // processRowUpdate={processRowUpdate}
            backButton={false}
            dropDownOptions={[
              {
                label: "Delete",
                icon: (
                  <DeleteIcon fontSize="small" style={{ color: "#FF0032" }} />
                ),
                action: handleDelete,
              },
            ]}
          />
          </div>
        );

      case "ElectronicLeaflets":
        return (
          <div style={{marginLeft: '-10px', marginRight: '-10px'}}>
          <DataTable
            data={electronicLeaflets}
            title="Electronic Leaflets"
            secondaryColor="secondary"
            columnsName={ElectronicLeafletsColumn}
            checkboxSelection="disabled"
            // processRowUpdate={processRowUpdate}
            backButton={false}
            dropDownOptions={[
              {
                label: "Delete",
                icon: (
                  <DeleteIcon fontSize="small" style={{ color: "#FF0032" }} />
                ),
                action: handleDelete,
              },
            ]}
          />
          </div>
        );
      // Add more cases for other options
      default:
        return null;
    }
  };


  

  return (
    <div>
          <div className="h-10 w-full bg-[#e49515] shadow-xl flex justify-between items-center px-5">
            <p className="sm:w-auto w-full sm:text-lg text-sm font-body text-white">
              Digital Link Information
            </p>

            <span
                onClick={toggleDropdown}
                className="cursor-pointer text-white"
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </span>
          </div>

          {/* <div className="h-auto w-full flex justify-between flex-wrap"> */}
          {isDropdownOpen && (
            <div className="h-auto w-full sm:w-full flex flex-col gap-4 mt-4">
               <span
                className={`bg-yellow-100 flex justify-start items-center gap-2 cursor-pointer ${selectedOption === "Safety Information" ? "bg-yellow-500" : ""
                  }`}
                onClick={() => handleOptionChange("Safety Information")}
              >
                <img
                  src={safetyInformationIcon}
                  className="w-5 h-5 ml-1"
                  alt=""
                />
                Safety Information
              </span>
              <span
                className={`bg-yellow-100 flex justify-start items-center gap-2 cursor-pointer ${selectedOption === "Promotional Offers" ? "bg-yellow-500" : ""
                  }`}
                onClick={() => handleOptionChange("Promotional Offers")}
              >
                <img
                  src={promotionalOffersIcon}
                  className="w-5 h-5 ml-1"
                  alt=""
                />
                Promotional Offers
              </span>
              <span
                className={`bg-yellow-100 flex justify-start items-center gap-2 cursor-pointer ${selectedOption === "Product Contents" ? "bg-yellow-500" : ""
                  }`}
                onClick={() => handleOptionChange("Product Contents")}
              >
                <img src={productContentIcon} className="w-5 h-5 ml-1" alt="" />
                Product Contents
              </span>
              <span
                className={`bg-yellow-100 flex justify-start items-center gap-2 cursor-pointer ${selectedOption === "ProductLocationofOrigin"
                  ? "bg-yellow-500"
                  : ""
                  }`}
                onClick={() => handleOptionChange("ProductLocationofOrigin")}
              >
                <img
                  src={productLocationofOriginIcon}
                  className="w-5 h-5 ml-1"
                  alt=""
                />
                Product Location of Origin
              </span>
              <span
                className={`bg-yellow-100 flex justify-start items-center gap-2 cursor-pointer ${selectedOption === "ProductRecall" ? "bg-yellow-500" : ""
                  }`}
                onClick={() => handleOptionChange("ProductRecall")}
              >
                <img src={productRecallIcon} className="h-5 w-5 ml-1" alt="" />
                Product Recall
              </span>
              <span
                className={`bg-yellow-100 flex justify-start items-center gap-2 cursor-pointer ${selectedOption === "recipe" ? "bg-yellow-500" : ""
                  }`}
                onClick={() => handleOptionChange("recipe")}
              >
                <img src={recipeIcon} className="h-5 w-5 ml-1" alt="" />
                Recipe
              </span>
              <span
                className={`bg-yellow-100 flex justify-start items-center gap-2 cursor-pointer ${selectedOption === "PackagingComposition"
                  ? "bg-yellow-500"
                  : ""
                  }`}
                onClick={() => handleOptionChange("PackagingComposition")}
              >
                <img
                  src={packagingCompositionIcon}
                  className="h-5 w-5 ml-1"
                  alt=""
                />
                Packaging Composition
              </span>
              <span
                className={`bg-yellow-100 flex justify-start items-center gap-2 cursor-pointer ${selectedOption === "ElectronicLeaflets" ? "bg-yellow-500" : ""
                  }`}
                onClick={() => handleOptionChange("ElectronicLeaflets")}
              >
                <img
                  src={electronicLeafletsIcon}
                  className="h-5 w-5 ml-1"
                  alt=""
                />
                Electronic Leaflets
              </span>
            </div>
            )}

            {/* All Datagird Display on the right side */}
            <div className="sm:w-full w-full">{renderDataGrid()}</div>

    </div>
  )
}

export default DigitalLinkInformation