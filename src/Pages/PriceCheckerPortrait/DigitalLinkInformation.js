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
import amazon from "../../Images/amazon.png";
import { SnackbarContext } from '../../Contexts/SnackbarContext';
import gs1logo from "../../Images/gs1.png";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import DataTable from '../../Components/Datatable/Datatable';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {
  ElectronicLeafletsColumn,
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
import CardPopUp from '../../Components/CardPopUp/CardPopUp';
import AmazonCardPopUp from '../../Components/AmazonCardPopUp/AmazonCardPopUp';

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
  const { currentUser } = useContext(CurrentUserContext);

  
  const handleDelete = (id) => {
    console.log(id);
  }

   // // this is the popup code
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const [cardData, setCardData] = useState(null);
  // const handleOpenAddProductsForItem = (index) => {
  //   setCardData(cardData[index]);
  //   handleOpen(); 
  // };

  const [selectedOption, setSelectedOption] = useState("Safety Information");
  const { openSnackbar } = useContext(SnackbarContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleDropdown = () => {
    if (gtinData?.gtin === undefined) {
      openSnackbar("Please select a product first", "error");
      setIsMenuOpen(false);
      return;
    }
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
          <div className='h-auto w-full mt-3'>
            {/* <DataTable
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
            /> */}
            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
                <h1 className='font-normal bg-primary text-white px-2 py-1'>Detailed Information</h1>
                <div className='flex justify-between'>
                    <div className='w-[50%]'>
                        <p className='text-[#4AA9C4]'>Safety Information</p>
                    </div>
                    <div className='flex w-[50%] overflow-x-auto gap-2'>
                      <p>:</p>
                      <span className='ml-1 text-[#CD8742]'>{safetyInformation?.[0]?.SafetyDetailedInformation}</span>
                    </div>
                </div>
                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>Link Type</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          <span className='ml-1 text-[#CD8742]'>{safetyInformation?.[0]?.LinkType}</span>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>Target URL</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          <span className='ml-1 text-[#CD8742]'>{safetyInformation?.[0]?.TargetURL}</span>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>Company Name</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          <span className='ml-1 text-[#CD8742]'>{safetyInformation?.[0]?.companyName}</span>
                      </div>
                  </div>
            </div>

          </div>
        );

      case "Promotional Offers":
        return (
          <div className='h-auto w-full mt-3'>
          {/*  <div style={{ marginLeft: '-10px', marginRight: '-10px' }}> */}
            {/* <DataTable
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
            /> */}

            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
                <h1 className='font-normal bg-primary text-white px-2 py-1'>Detailed Information</h1>
                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>Promotional Offers</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          <span className='ml-1 text-[#CD8742]'>{promotionalOffers?.[0]?.PromotionalOffers}</span>
                      </div>
                  </div>
               
                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>Link Type</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          <span className='ml-1 text-[#CD8742]'>{promotionalOffers?.[0]?.LinkType}</span>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>Target URL</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          <span className='ml-1 text-[#CD8742]'>{promotionalOffers?.[0]?.TargetURL}</span>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>Price</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          <span className='ml-1 text-[#CD8742]'>{promotionalOffers?.[0]?.price}</span>
                      </div>
                  </div>
            </div>

          </div>
        );

      case "Product Contents":
        return (
          <div className='h-auto w-full mt-3'>
           {/* <div style={{ marginLeft: '-10px', marginRight: '-10px' }}>
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
            </div> */}
          <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
              <h1 className='font-normal bg-primary text-white px-2 py-1'>Detailed Information</h1>
                 <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>Product Allergen Information</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          <span className='ml-1 text-[#CD8742]'>{productContent?.[0]?.ProductAllergenInformation}</span>
                      </div>
                  </div>
              
                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>Allergen Info</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          <span className='ml-1 text-[#CD8742]'>{productContent?.[0]?.allergen_info}</span>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>Ingredients</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          <span className='ml-1 text-[#CD8742]'>{productContent?.[0]?.ingredients}</span>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>Manufacturing Date</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          <span className='ml-1 text-[#CD8742]'>{productContent?.[0]?.ManufacturingDate}</span>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>Best Before Date</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          <span className='ml-1 text-[#CD8742]'>{productContent?.[0]?.bestBeforeDate}</span>
                      </div>
                  </div> 
                </div>
          </div>
        );

      case "ProductLocationofOrigin":
        return (
          <div className='h-auto w-full mt-3'>
          {/*  <div style={{ marginLeft: '-10px', marginRight: '-10px' }}>
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
             /> */}

            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
              <h1 className='font-normal bg-primary text-white px-2 py-1'>Detailed Information</h1>
              
              <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>Product Location Origin</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          <span className='ml-1 text-[#CD8742]'>{productLocationofOrigin?.[0]?.ProductLocationOrigin}</span>
                      </div>
              </div>

              <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Link Type</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{productLocationofOrigin?.[0]?.LinkType}</span>
                  </div>
              </div>

              <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Ingredients</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{productLocationofOrigin?.[0]?.GTIN}</span>
                  </div>
              </div>

              <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Manufacturing Date</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{productLocationofOrigin?.[0]?.ExpiryDate}</span>
                  </div>
              </div>
          </div>
          </div>
        );

      case "ProductRecall":
        return (
          <div className='h-auto w-full mt-3'>
          {/* <div style={{ marginLeft: '-10px', marginRight: '-10px' }}>
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
            /> */}
            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
                {/* <h1 className='text-center font-semibold bg-yellow-100'>Product Recall RECORD</h1> */}
                <h1 className='font-normal bg-primary text-white px-2 py-1'>Detailed Information</h1>

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>ProductRecall</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{productRecall?.[0]?.ProductRecall}</span>
                  </div>
               </div>
               
                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>GTIN</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{productRecall?.[0]?.GTIN}</span>
                  </div>
                </div>


                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Link Type</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{productRecall?.[0]?.LinkType}</span>
                  </div>
                </div>


                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Expiry Date</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{productRecall?.[0]?.ExpiryDate}</span>
                  </div>
                </div>
            </div>
          </div>
        );

      case "recipe":
        return (
          <div className='h-auto w-full mt-3'>
          {/* <div style={{ marginLeft: '-10px', marginRight: '-10px' }}>
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
            /> */}
             <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
                {/* <h1 className='text-center font-semibold bg-yellow-100'>Recipe RECORD</h1> */}
                <h1 className='font-normal bg-primary text-white px-2 py-1'>Detailed Information</h1>
                {/* <div>
                    <p className='text-base'>Title: <span className='font-semibold ml-1'>{recipe?.[0]?.title}</span></p>
                </div> */}

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Title</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{recipe?.[0]?.title}</span>
                  </div>
                </div>

                {/* <div>
                    <p className='text-base'>Description: <span className='font-semibold ml-1'>{recipe?.[0]?.description}</span></p>
                </div> */}

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Description</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{recipe?.[0]?.description}</span>
                  </div>
                </div>

                {/* <div>
                    <p className='text-base'>Ingredients: <span className='font-semibold ml-1'>{recipe?.[0]?.ingredients}</span></p>
                </div> */}
                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Ingredients</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{recipe?.[0]?.ingredients}</span>
                  </div>
                </div>

                {/* <div>
                    <p className='text-base'>Link Type: <span className='font-semibold ml-1'>{recipe?.[0]?.LinkType}</span></p>
                </div> */}
                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Link Type</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{recipe?.[0]?.LinkType}</span>
                  </div>
                </div>
            </div>
          </div>
        );

      case "PackagingComposition":
        return (
          <div className='h-auto w-full mt-3'>
          {/* <div style={{ marginLeft: '-10px', marginRight: '-10px' }}>
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
            /> */}
            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
                <h1 className='font-normal bg-primary text-white px-2 py-1'>Detailed Information</h1>

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Packaging Composition</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{packagingComposition?.[0]?.consumerProductVariant}</span>
                  </div>
                </div>
               

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Link Type</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{packagingComposition?.[0]?.LinkType}</span>
                  </div>
                </div>

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Recyclability</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{packagingComposition?.[0]?.recyclability}</span>
                  </div>
                </div>

                {/* <div>
                    <p className='text-base'>Material: <span className='font-semibold ml-1'>{packagingComposition?.[0]?.material}</span></p>
                </div> */}
                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Material</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{packagingComposition?.[0]?.material}</span>
                  </div>
                </div>

              </div>
          </div>
        );

      case "ElectronicLeaflets":
        return (
          <div className='h-auto w-full mt-3'>
          {/* <div style={{ marginLeft: '-10px', marginRight: '-10px' }}>
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
            /> */}
            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
                <h1 className='font-normal bg-primary text-white px-2 py-1'>Detailed Information</h1>

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Product Leaflet Information</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{electronicLeaflets?.[0]?.ProductLeafletInformation}</span>
                  </div>
                </div>


                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Link Type</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{electronicLeaflets?.[0]?.LinkType}</span>
                  </div>
                </div>

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Language</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{electronicLeaflets?.[0]?.Lang}</span>
                  </div>
                </div>

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>GTIN</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{electronicLeaflets?.[0]?.GTIN}</span>
                  </div>
                </div>
              </div>
          </div>
        );

        // case "GtinFacts":
        // return (
        //   <div className='h-auto w-full mt-3'>
        //     <section className="py-1">
        //       <div className="grid max-w-6xl  grid-cols-1 gap-5 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        //         {/* {cardData?.map((item, index) => { */}

        //           {/* return ( */}
        //             <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
        //               <div className="relative h-56 flex items-end overflow-hidden rounded-xl">
        //                 <img 
        //                   className='' 
        //                   src={safetyInformationIcon} alt="image"
        //                      onClick={() => handleOpenAddProductsForItem(index)}
        //                      style={{
        //                      objectFit: 'contain',
        //                      height: '100%', margin: 'auto'
        //                     }}

        //                 />
        //               </div>

        //               <div className="mt-1 p-2 flex flex-col gap-1">
        //                 <div className='flex justify-between items-center'>
        //                     <p className="text-sm font-semibold text-slate-700">Arabic Name</p>
        //                     <p className="mt-1 font-semibold text-sm text-slate-700">English Name</p>
        //                 </div>
        //                 <div className='flex justify-between'>
        //                   <p className="mt-1 font-semibold text-sm text-slate-700">628100000113</p>
        //                   <p className="mt-1 font-semibold text-sm text-slate-700">Unit Testing</p>
        //                 </div>
        //                   <p className="mt-1 font-semibold text-sm text-slate-700">Product Name</p>
        //                 </div>
        //                     <div className="flex gap-3 justify-end">
        //                       <CardDetailsPopUp
        //                         title={"Open DEtails"}
        //                         handleClose={handleClose}
        //                         handleOpen={handleOpen}
        //                         open={open}
        //                         cardData={cardData}
        //                       />
        //                     </div>
        //                 </article>
        //           </div>
        //       </section>
        //   </div>
        // );

        // case "amazon":
        // return (
        //   <div className='h-auto w-full mt-3'>
        //     <section className="py-1">
        //       <div className="grid max-w-6xl  grid-cols-1 gap-5 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        //         {/* {cardData?.map((item, index) => { */}

        //           {/* return ( */}
        //             <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
        //               <div className="relative h-56 flex items-end overflow-hidden rounded-xl">
        //                 {/* <img 
        //                   className='' 
        //                   src={phpImagesBaseUrl + "/" + item?.front_image} alt="image"
        //                      onClick={() => handleOpenAddProductsForItem(index)}
        //                      style={{
        //                      objectFit: 'contain',
        //                       height: '100%', margin: 'auto'
        //                     }}

        //                 /> */}
        //                 <img 
        //                   className='' 
        //                   src={electronicLeafletsIcon} alt="image"
        //                     //  onClick={() => handleOpenAddProductsForItem(index)}
        //                      style={{
        //                      objectFit: 'contain',
        //                       height: '100%', margin: 'auto'
        //                     }}

        //                 />
        //               </div>

        //               <div className="mt-1 p-2 flex flex-col gap-1">
        //                 <div className='flex justify-between items-center'>
        //                     <p className="text-sm font-semibold text-slate-700">AMAZON Arabic Name</p>
        //                     <p className="mt-1 font-semibold text-sm text-slate-700">AMAZON English Name</p>
        //                 </div>
        //                 <div className='flex justify-between'>
        //                   <p className="mt-1 font-semibold text-sm text-slate-700">628100000113</p>
        //                   <p className="mt-1 font-semibold text-sm text-slate-700">Unit Testing</p>
        //                 </div>
        //                   <p className="mt-1 font-semibold text-sm text-slate-700">Product Name</p>
        //                 </div>   
        //               </article>

        //           </div>
        //       </section>
        //   </div>
        // );
      // Add more cases for other options
      default:
        return null;
    }
  };




  return (
    <div
      style={{
        height: '100%', width: '100%',
        padding: '0 10px',
        position: 'relative',
      }}
    >
      {/* new design */}
      <div className="popup-header">
        <div className="w-full font-body p-6 shadow-xl rounded-md text-black bg-[#D4EDDA] text-xl mb:2 md:mb-5">
            <div className='flex justify-start gap-2 text-xs sm:text-sm'>
                <div>
                  <img src={gs1logo} className='h-10 w-10' alt='' />
                </div>
                <div>
                  <p className='font-semibold'>Complete Data</p>
                  <p>This number is registered to company: : <span className='font-semibold'>{currentUser?.user?.company_name_eng}</span></p>
                </div>
            </div>
        </div>
      </div>

      <div className="h-10 w-full bg-[#e49515] shadow-xl flex justify-between items-center px-5 mt-3 sm:mt-0"
        onClick={toggleDropdown}>
        <p className="sm:w-auto w-full sm:text-lg text-sm font-body text-white">
          Digital Link Information
        </p>

        {/* <span

          className="cursor-pointer text-white"
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </span> */}
      </div>

      {/* <div className="h-auto w-full flex justify-between flex-wrap"> */}
      {/* {isDropdownOpen && ( */}
        <div className="h-auto w-full flex gap-3 mt-3"
          // style={{ position: "absolute", zIndex: 10, background: "#fff", }}
        >
          <div className='w-full flex flex-col gap-2'>
            <span
              className={`bg-[#3b5998] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer 
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
              className={`bg-[#00acee] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${selectedOption === "Promotional Offers" ? "bg-yellow-500" : ""
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
              className={`bg-[#0072b1] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${selectedOption === "Product Contents" ? "bg-yellow-500" : ""
                }`}
              onClick={() => handleOptionChange("Product Contents")}
            >
              <img src={productContentIcon} className="w-5 h-5 ml-1" alt="" />
              Product Contents
            </span>
            <span
              className={`bg-[#E60023] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${selectedOption === "ProductLocationofOrigin"
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
              className={`bg-[#0072b1] py-[2px] flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${selectedOption === "GtinFacts"
                ? "bg-yellow-500"
                : ""
                }`}
              onClick={() => handleOptionChange("GtinFacts")}
            >
              <img
                src={electronicLeafletsIcon}
                className="h-5 w-5 ml-1"
                alt=""
              />
              {/* GTIN FACTS */}
              <div className='w-full'>
                <CardPopUp 
                    handleClosePopUp={handleClose}
                    handleOpenPopUp={handleOpen}
                    openPopUp={open}
                    title={"GTIN FACTS"}
                    />
                </div>
            </span>
          </div>

          <div className='w-full flex flex-col gap-2'>
            <span
              className={`bg-[#0099FF] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${selectedOption === "ProductRecall" ? "bg-yellow-500" : ""
                }`}
              onClick={() => handleOptionChange("ProductRecall")}
            >
              <img src={productRecallIcon} className="h-5 w-5 ml-1" alt="" />
              Product Recall
            </span>
            <span
              className={`bg-[#db4a39] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${selectedOption === "recipe" ? "bg-yellow-500" : ""
                }`}
              onClick={() => handleOptionChange("recipe")}
            >
              <img src={recipeIcon} className="h-5 w-5 ml-1" alt="" />
              Recipe
            </span>
            <span
              className={`bg-[#25d366] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${selectedOption === "PackagingComposition"
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
              className={`bg-[#CD201F] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${selectedOption === "ElectronicLeaflets" ? "bg-yellow-500" : ""
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
            <span
              className={`bg-[#3b5998] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${selectedOption === "amazon" ? "bg-yellow-500" : ""
                }`}
              onClick={() => handleOptionChange("amazon")}
            >
              <img
                src={amazon}
                className="h-5 w-5 ml-1"
                alt=""
              />
              {/* AMAZON */}
              <div className='w-full'>
                <AmazonCardPopUp 
                    handleClosePopUp={handleClose}
                    handleOpenPopUp={handleOpen}
                    openPopUp={open}
                    title={"AMAZON"}
                    />
                </div>
            </span>
          </div>
        </div>
      {/* ) */}
      {/* } */}

      {/* All Datagird Display on the right side */}
      <div className="sm:w-full w-full">{renderDataGrid()}</div>

    </div >
  )
}

export default DigitalLinkInformation