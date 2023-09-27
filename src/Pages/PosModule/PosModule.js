import React, { useContext, useState } from 'react'
import "./PosModule.css"
import newRequest from '../../utils/userRequest';
import { SnackbarContext } from '../../Contexts/SnackbarContext';

const PosModule = () => {
  const [barcode, setBarcode] = useState('');
  const [responseData, setResponseData] = useState(null);
  const { openSnackbar } = useContext(SnackbarContext);

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
  return (
    <div>
      <div className="p-1 h-full sm:ml-72 bg-slate-100">
        <div className='h-auto w-full'>
          <form>
            <div className='h-14 w-full bg-primary flex justify-start items-center'>
              <h3 className='text-white text-1xl font-semibold ml-2'>Sales Entry Form (Direct Invoice)</h3>
            </div>
            <div className='border-4 mt-2 border-dashed border-gray-300'>
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

                <div className='flex justify-end items-center mr-2 gap-2'>
                  <p>INVOICE NO</p>
                  <input
                    type='text'
                    value={"001-Branch" + "-" + new Date().toLocaleDateString()}
                    className='h-8 w-auto text-center border-2 border-gray-400' />

                </div>
              </div>

              <div className='grid 2xl:grid-cols-4 mt-2 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1'>
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
              </div>

              <div className='grid 2xl:grid-cols-3 mt-2 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-1'>
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
              </div>


              <div className='grid 2xl:grid-cols-2 mt-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1'>
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
              </div>

              <div className='grid 2xl:grid-cols-2 mt-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1'>
                <div className='flex items-center gap-1 px-2 font-semibold'>
                  <label className='text-xs flex-shrink-0'>Barcode</label>
                  <input
                    type='text'
                    className='h-8 w-[70%] text-center border border-gray-400 bg-yellow-300'
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
                        {/* add price plse price 15% */}
                        <td>{1 + (1 * 15) / 100}</td>

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
          </form>
        </div>
      </div>
    </div>
  )
}

export default PosModule