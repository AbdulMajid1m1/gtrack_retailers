import React, { useContext, useState } from 'react'
import "./PosModule.css"
import newRequest from '../../utils/userRequest';
import { SnackbarContext } from '../../Contexts/SnackbarContext';
import backarrow from "../../Images/backarrow1.png"
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { useNavigate } from 'react-router-dom';

const PosModule = () => {
  const [barcode, setBarcode] = useState('');
  const [responseData, setResponseData] = useState(null);
  const { openSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const handleBlur = async () => {
    try {
      const response = await newRequest.get(`/getGs1ProdProductsbyBarcode?barcode=${barcode}`);
      setResponseData(response?.data);
      console.log(response?.data);
      // openSnackbar()
    }
    catch (error) {
      openSnackbar(
        error?.response?.data?.message ?? "something went wrong!",
        "error"
      );
      console.log('Error fetching data:', error)
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

  return (
    <div>
      <div className="p-1 bg-slate-100">
        <div className='h-auto w-full'>
          {/* <form> */}
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
          <div className='border-4 mt-2 border-gray-300 p-4 pl-0 flex'>
            <div className=''
              style={{ width: '70%' }}
            >


              <div className='mt-2 mx-1'>
                <div className='grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-2 mt-2'>
                  <div className='flex gap-3 items-center'>
                    <p>STORE NO</p>
                    <div className='h-auto w-auto px-5 py-1 text-center border-2 border-gray-400 font-bold'>
                      FG101
                    </div>
                    {/* <div className='h-auto w-auto px-5 py-1 text-center border-2 border-gray-400 font-bold'>
                              SLIC- FACTORY SHOWROOM
                        </div> */}
                  </div>

                  {/* <div className='flex justify-end items-center mr-2 gap-2'>
                    <p>INVOICE NO</p>
                    <input
                      type='text'
                      value={"001-Branch"}
                      className='h-8 w-auto text-center border-2 border-gray-400' />

                  </div> */}
                </div>

                {/* <div className='grid 2xl:grid-cols-4 mt-2 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1'>
                  <div className='flex items-center gap-1 px-2 font-semibold'>
                    <label className='text-xs'>Transaction</label>
                    <input
                      type='text'
                      className='h-8 w-full text-center border border-gray-400'
                      value='Sales Entry'
                    />
                  </div>
                  <div className='flex items-center px-2 gap-1 font-semibold'>
                    <label className='text-xs'>SalesLocation</label>
                    <input type='text'
                      className='h-8 w-full text-center border border-gray-400'
                      value={"RUH"}
                    />
                  </div>
                  <div className='flex items-center px-2 gap-1 font-semibold'>
                    <label className='text-xs'>VAT#</label>
                    <input
                      type='text'
                      className='h-8 w-full text-center border bg-yellow-100 border-gray-400'
                      value={"300055050"}
                    />
                  </div>
                </div> */}

                {/* <div className='grid 2xl:grid-cols-3 mt-2 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-1'>
                  <div className='flex items-center gap-1 px-2 font-semibold'>
                    <label className='text-xs flex-shrink-0'>Customer Code</label>
                    <input type='text' className='h-8 w-full border border-gray-400' />
                  </div>
                  <div className='flex items-center px-2 gap-1 font-semibold'>
                    <label className='text-xs'>Delivery</label>
                    <input
                      type='text'
                      className='h-8 w-full text-center border border-gray-400'
                      value="AB002"
                    />
                  </div>
                  <div className='flex items-center px-2 gap-1 font-semibold'>
                    <label className='text-xs flex-shrink-0'>CUSTOMER NAME</label>
                    <input
                      type='text'
                      className='h-8 w-full text-center border border-gray-400 bg-yellow-100'
                    // value={""}
                    />
                  </div>
                </div> */}


                {/* <div className='grid 2xl:grid-cols-2 mt-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1'>
                  <div className='flex items-center gap-1 px-2 font-semibold'>
                    <label className='text-xs flex-shrink-0'>Remarks</label>
                    <input type='text' className='h-8 w-full border border-gray-400 bg-yellow-100' />
                  </div>

                  <div className='flex items-center gap-1 px-2 font-semibold'>
                    <label className='text-xs flex-shrink-0'>Type</label>
                    <input
                      type='text'
                      className='h-8 w-[40%] text-center border border-gray-400'
                      value={"Cash or Card"}
                    />
                  </div>
                </div> */}

                <div className='grid 2xl:grid-cols-2 mt-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1'>
                  <div className='flex items-center gap-1 px-2 font-semibold'>
                    <label className='text-xs flex-shrink-0'>Barcode</label>
                    <input
                      type='text'
                      className='h-8 w-[100%] text-center border border-gray-400 bg-yellow-300'
                      onChange={(e) => setBarcode(e.target.value)}
                      onBlur={handleBlur}
                    />
                    <input type='text' className='h-8 w-[30%] text-center border border-gray-400' placeholder='1' />
                  </div>

                  <div className='flex justify-end items-center gap-1 px-2 font-semibold'>
                    <label className='text-xs flex-shrink-0'>Total No. of items</label>
                    <input
                      type='text'
                      value={responseData?.length ?? 0}
                      className='h-8 w-[20%] text-center border border-gray-400 bg-gray-100' />
                  </div>
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
                          <td>1</td>
                          <td>{item.productnameenglish}</td>
                          <td>{item.productnamearabic}</td>
                          <td>15%</td>
                          <td>{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
              <div className='grid grid-cols-2 mt-5'>
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
                  <div className='h-auto w-auto text-center text-white rounded-sm font-semibold px-4 py-5 bg-orange'>
                    F-3 Tender Cash
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

                <div className='grid grid-cols-4'>

                </div>
              </div>
            </div>
            <div
              style={{ width: '30%' }}
            >
              {/* Content for the right 30% */}
              <div className='bg-blue-200 text-white p-2 text-center font-bold'>
                Header
              </div>
              <div className='bg-white'>
                <table className='w-full'>
                  <thead>
                    <tr className='bg-blue-200 text-white'>
                      <th className='p-2'>SKU</th>
                      <th className='p-2'>PRICE</th>
                      <th className='p-2'>QTY</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Your table data here */}
                    <tr className='bg-gray-200'>
                      <td className='p-2'>Item 1</td>
                      <td className='p-2'>100</td>
                      <td className='p-2'>2</td>
                    </tr>
                    <tr className='bg-white'>
                      <td className='p-2'>Item 2</td>
                      <td className='p-2'>50</td>
                      <td className='p-2'>3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='bg-white p-2 mt-2'>
                <div className='text-blue-700 font-bold'>Total Vat 15%</div>
                <div className='text-black'>200</div>
              </div>
              <div className='bg-white p-2 mt-2'>
                <div className='text-blue-700 font-bold'>Total Amount</div>
                <div className='text-black'>500</div>
              </div>
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>
    </div >
  )
}

export default PosModule