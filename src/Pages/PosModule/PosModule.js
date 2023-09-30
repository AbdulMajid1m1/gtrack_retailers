import React, { useContext, useEffect, useState } from 'react'
import "./PosModule.css"
import newRequest from '../../utils/userRequest';
import { SnackbarContext } from '../../Contexts/SnackbarContext';
import backarrow from "../../Images/backarrow1.png"
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { useNavigate } from 'react-router-dom';
import SalesAmountPrint from './SalesAmountPrint';

const PosModule = () => {
  const [barcode, setBarcode] = useState('');
  const [responseData, setResponseData] = useState([]);
  const [qty, setQty] = useState(1);
  const { openSnackbar } = useContext(SnackbarContext);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(responseData);
  }, [responseData]);

  const [totalVat, setTotalVat] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {


    let vatSum = 0;
    let amountSum = 0;
    if (responseData.length === 0) return;

    responseData.forEach(item => {
      const unitPrice = parseFloat(item.unitPrice);
      const qty = parseFloat(item.qty);

      if (isNaN(unitPrice) || isNaN(qty)) {
        console.error('Failed to convert string to number:', item);
        return;  // Skip this item and continue with the next
      }

      const amount = unitPrice * qty;
      const vat = amount * 0.15;

      vatSum += vat;
      amountSum += amount;
    });

    setTotalVat(vatSum);
    setTotalAmount(amountSum);
  }, [responseData]);

  const handleBlur = async () => {
    if (!barcode) return;
    try {
      const response = await newRequest.get(`/getGs1ProdProductsbyBarcode?barcode=${barcode}`);
      let data = response?.data[0];
      console.log(response?.data);

      const productContentRes = await newRequest.get(`/getProductContentByGtin/${barcode}`);
      console.log(productContentRes);
      let produectContentData = productContentRes?.data[0];
      data = { ...data, unitPrice: produectContentData?.unitPrice, qty: qty };

      setResponseData((prev) => {
        // Check if barcode already exists
        const barcodeExists = prev.some(item => item.barcode === barcode);

        if (barcodeExists) {
          // If barcode exists, update the qty of the existing item
          return prev.map(item =>
            item.barcode === barcode
              ? { ...item, qty: item.qty + qty }
              : item
          );
        } else {
          // If barcode does not exist, add the new item
          return [...prev, data];
        }
      });

      setBarcode('');
      setQty(1);

    } catch (error) {
      openSnackbar(
        error?.response?.data?.message ?? "something went wrong!",
        "error"
      );
      console.log('Error fetching data:', error);
      setResponseData([]);
    }
  };



  // Full Screen Code
  const [isFullscreen, setIsFullscreen] = useState(document.fullscreenElement != null);

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen().catch((error) => {
        console.error(`Error exiting full-screen mode: ${error.message} (${error.name})`);
      });
    } else {
      document.documentElement.requestFullscreen().catch((error) => {
        console.error(`Error entering full-screen mode: ${error.message} (${error.name})`);
      });
    }
    setIsFullscreen(!isFullscreen);  // Update the state to reflect the new full-screen status
  };


  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <div className="p-1 bg-slate-100">
        <div className='h-auto w-full'>
          <div className='h-14 w-full bg-primary flex justify-start items-center'>
            <button onClick={() => navigate(-1)} className='font-medium rounded-sm p-2 py-1'>
              <span>
                <img src={backarrow}
                  className='h-auto w-8 object-contain'
                  alt=''
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </span>
            </button>

            <button onClick={toggleFullscreen} className='font-medium h-auto w-14 rounded-sm p-2 py-1'>
              <FullscreenIcon
                style={{ height: 'auto', width: '40px', filter: 'brightness(0) invert(1)' }}
                className=''
                alt=''

              />
            </button>

            <h3 className='text-white text-1xl font-semibold ml-2'>Sales Entry Form (Direct Invoice)</h3>
          </div>

          <div className='flex justify-between w-full'>
            <div className='border-4 mt-2 border-dashed border-gray-300 w-[70%]'>
              <div className='grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-2 mt-2'>
                <div className='flex gap-3 items-center'>
                  <p>STORE NO</p>
                  <div className='h-auto w-auto px-5 py-1 text-center border-2 border-gray-400 font-bold'>
                    FG101
                  </div>
                </div>
              </div>

              <div className='grid 2xl:grid-cols-1 mt-2 xl:grid-cols-1 lg:grid-cols-1 md:grid-cols-1 grid-cols-1'>
                <div className='flex items-center gap-1 px-2 font-semibold'>
                  <label className='text-xs flex-shrink-0'>Barcode</label>
                  <input
                    type='text'
                    className='h-8 w-full text-center border border-gray-400 bg-yellow-300'
                    onChange={(e) => setBarcode(e.target.value)}
                    value={barcode}
                    onBlur={handleBlur}
                  />
                  <input
                    type='text'
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className='h-8 w-[30%] text-center border border-gray-400' placeholder='Enter Qty' />
                </div>

                {/* <div className='flex justify-end items-center gap-1 px-2 font-semibold mt-2'>
                <label className='text-xs flex-shrink-0'>Total No. of items</label>
                <input
                  type='text'
                  value={responseData?.length ?? 0}
                  className='h-8 w-[20%] text-center border border-gray-400 bg-gray-100' />
              </div> */}
              </div>


              {/* // creae excel like Tables  */}
              <div className="table-bintobin-transfer">
                <table>
                  <thead>
                    <tr>
                      <th>LineNo</th>
                      <th>SKU</th>
                      <th>Brand</th>
                      {/* <th>DISC1</th> */}
                      <th>PCS</th>
                      <th>SIZE</th>
                      <th>PRICE</th>
                      <th>DESC</th>
                      <th>DESC2</th>
                      <th>QTY</th>
                      <th>VAT</th>
                      <th>TOTAL WITH VAT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {responseData?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.barcode}</td>
                        <td>{item.BrandName}</td>
                        {/* <td>{item.DISC1}</td> */}
                        <td>{item.ProductType}</td>
                        <td>{item.size}</td>
                        <td>{item.unitPrice}</td>
                        <td>{item.productnameenglish}</td>
                        <td>{item.productnamearabic}</td>
                        <td>{item.qty}</td>
                        <td>15%</td>
                        <td>{(item.unitPrice * item.qty * 1.15).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>


              <div className='grid mt-5 w-full'>
                <div className='grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2'>
                  <div className='h-auto w-auto text-center text-white rounded-sm font-semibold px-4 py-5 bg-[#0978A2]'>
                    F-10 Open Drawer
                  </div>
                  <div className='h-auto w-auto text-center text-white rounded-sm font-semibold px-4 py-5 bg-blue-700'>
                    F-6 PLU Inquiry
                  </div>
                  <div className='h-auto w-auto text-center text-white rounded-sm font-semibold px-4 py-5 bg-[#0978A2]'>
                    F-2 Department
                  </div>
                  <div className='h-auto w-auto text-center text-white rounded-sm font-semibold px-4 py-5 bg-[#0978A2]'>
                    F-4 Last Receipt
                  </div>

                  {/* Second Row */}
                  <div className='h-auto w-auto text-center text-white rounded-sm font-semibold px-4 py-5 bg-amber-700'>
                    F-1 Edit Quantity
                  </div>
                  <div className='h-auto w-auto text-center text-white rounded-sm font-semibold px-4 py-5 bg-yellow-300'>
                    F-9 Old Invoice
                  </div>
                  <div className='h-auto w-auto text-center text-white rounded-sm font-semibold px-4 py-5 bg-blue-500'>
                    F-2 Delete Line
                  </div>
                  <div className='h-auto w-auto text-center text-white rounded-sm font-semibold px-4 py-5 bg-[#0978A2]'>
                    F-4 Last Receipt
                  </div>

                  {/* third Row */}
                  {/* <div className='h-auto w-auto text-center text-white rounded-sm font-semibold px-4 py-5 bg-orange'>
                    F-3 Tender Cash
                  </div> */}
                  <div 
                  // className='h-auto w-auto text-center text-white rounded-sm font-semibold px-4 py-5 bg-orange'
                  // onClick={toggleModal}
                  >
                  {/* I call the popup Component their */}
                  <SalesAmountPrint />
                </div>
                  <div className='h-auto w-auto text-center text-white rounded-sm font-semibold px-4 py-5 bg-black'>
                    F-8 Z-Report
                  </div>
                  <div className='h-auto w-auto text-center text-white rounded-sm font-semibold px-4 py-5 bg-amber-600'>
                    F-5 Returns Items
                  </div>
                  <div className='h-auto w-auto text-center text-white rounded-sm font-semibold px-4 py-5 bg-[#0978A2]'>
                    F-4 Last Receipt
                  </div>

                  
                </div>
              </div>
            </div>

            {/* Right Side 30% Screen */}
            <div className='w-[30%]'>
              <div className='h-10 w-full bg-gray-400 flex justify-center items-center text-white'>
                <h1>Sales Summary</h1>
              </div>

              {/* // Right Side Table  */}
              <div className="table-sales-summary">
                <table>
                  <thead>
                    <tr>
                      <th>SKU</th>
                      <th>PRICE</th>
                      <th>QTY</th>
                    </tr>
                  </thead>
                  <tbody>
                    {responseData?.map((item, index) => (
                      <tr key={index}>
                        <td>{item?.memberID}</td>
                        <td>{item?.unitPrice}</td>
                        <td>{item?.qty}</td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>

              {/* Add last two inputs */}
              <div className='p-2'>
                <div className='flex justify-between items-center p-1'>
                  <label>Total Vat 15%</label>
                  <input type='text' className='h-10 w-[60%] p-2' placeholder='Total Vat'
                    value={totalVat.toFixed(2)}
                  />
                </div>
                <div className='flex justify-between items-center p-1'>
                  <label>Total Amount</label>
                  <input type='text' className='h-10 w-[60%] p-2' placeholder='Total Amount'
                    value={totalAmount.toFixed(2)}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>


    </div>
  )
}

export default PosModule