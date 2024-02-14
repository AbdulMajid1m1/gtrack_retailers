import { QrCode } from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import { SnackbarContext } from '../../Contexts/SnackbarContext';
import newRequest from '../../utils/userRequest';

const SalesAmountPrint = ({ openModel, serialNo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState('');
  const [cashAmount, setCashAmount] = useState('');
  const [spanAmount, setSpanAmount] = useState('');
  const [tenderAmount, setTenderAmount] = useState('');
  const [change, setChange] = useState('');
  const { openSnackbar } = useContext(SnackbarContext);
  console.log(serialNo);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  // Event listener for F3 key press
  const handleKeyPress = (event) => {
    if (event.key === 'F3') {
      toggleModal();
    }
  };

  // Add event listener when the component mounts
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);



  // Print Page
  const handlePrint = async () => {
    if (totalAmount === '' || cashAmount === '' || spanAmount === '' || tenderAmount === '' || change === '') {
      openSnackbar('Please fill all the fields');
      return;
    }

    try {
      const deleteResponse = await newRequest.delete(`/deleteRecordBySerialNo?serialNo=${serialNo}`);
      console.log(deleteResponse);
      openSnackbar('Controlled Item Deleted Successfully');

    } catch (err) {
      console.log(err);
      openSnackbar('Failed to delete Controlled Item');
    }

    const printWindow = window.open('', 'Print Window', 'height=400,width=800');
    const html = '<html><head><title>Test</title>' +
      '<style>' +
      // '@page { size: 4in 6in; margin: 0; }' +
      '@page { size: 80mm auto; margin: 0; }' +
      'body { font-size: 27px;}' +
      '#header {text-align: center; padding: 10px;}' +
      '#customer {padding-left: 15px; font-Weight: 600;}' +
      '#customer-data {display: flex; padding-left: 15px; gap: 30px; margin-top: -30px; font-Weight: 500; }' +
      '#customer-name {font-Weight: 600;}' +
      '#inside-border-data {border: 1px solid black; height: 200px; margin-top: -10px; width: 100%;}' +
      // '#customer-title {font-size: 25px;}' +
      '#description {display: flex; justify-content: space-between; padding-left: 35px; padding-right: 35px; gap: 30px; margin-top: -20px; font-Weight: 600;}' +
      '#inside-description {display: flex; justify-content: space-between; padding-left: 35px; padding-right: 35px; gap: 30px; margin-top: -20px; font-Weight: 400;}' +
      '#last-data {margin-top: -20px; font-Weight: 600;}' +
      '#inside-last-data {display: flex; justify-content: space-between; padding-left: 35px; padding-right: 35px; gap: 30px; margin-top: -25px; font-Weight: 600;}' +
      // '#qrcode {display: flex; justify-content: center; align-items: center; margin-top: -20px; height: 200px; width: 300px;}' +
      '</style>' +
      '</head><body>' +
      '<div style="">' +
      '</div>' +
      '<div style="">' +
      '<div id="barcode"></div>' +
      '</div>' +
      '<div id="qrcode"></div>' +
      '<p id="parag"></p>' +
      '</body></html>';

    printWindow.document.write(html);
    const barcodeContainer = printWindow.document.getElementById('barcode');
    const barcode = document.getElementById('barcode').cloneNode(true);
    barcodeContainer.appendChild(barcode);

    printWindow.print();
    printWindow.close();

    // Clear the updatedRows state after printing
    setCashAmount('');
    setSpanAmount('');
    setTenderAmount('');
    setChange('');
    setTotalAmount('');

    // }
  };



  return (
    <div>
      {/* Modal toggle button */}
      <button
        onClick={toggleModal}
        className="h-auto w-full text-center text-white rounded-sm font-semibold px-4 py-5 bg-orange"
        type="button"
      >
        F-3 Tender Cash
      </button>

      {/* Main modal */}
      {isModalOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto backdrop-filter backdrop-blur-lg backdrop-brightness-75"
        >
          <div className="relative w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={closeModal}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Cash Sales Amount</h3>
                <form className="space-y-3">
                  <div>
                    <label
                      htmlFor="totalAmount"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Total Amount
                    </label>
                    <input
                      type="number"
                      id="totalAmount"
                      value={totalAmount}
                      onChange={(e) => setTotalAmount(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Total Amount"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cashanoumt"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Cash Amount
                    </label>
                    <input
                      type="number"
                      id="cashanoumt"
                      value={cashAmount}
                      onChange={(e) => setCashAmount(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Cash Amount"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="spanamount"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Span Amount
                    </label>
                    <input
                      type="number"
                      id="spanamount"
                      value={spanAmount}
                      onChange={(e) => setSpanAmount(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Span Amount"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="tenderamount"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Tender Amount
                    </label>
                    <input
                      type="number"
                      id="tenderamount"
                      value={tenderAmount}
                      onChange={(e) => setTenderAmount(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Tender Amount"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="change"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Change
                    </label>
                    <input
                      type="number"
                      id="change"
                      value={change}
                      onChange={(e) => setChange(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Change"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="w-full text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Submit Invoice
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>
      )}




      {/* Print code */}
      <div id="barcode">
        <div id="barcode" className='hidden'>
          <div>
            <p id='header'>Sales Invoice</p>
          </div>

          <p id='customer'>Customer</p>

          <div id='customer-data'>
            <p id='customer-name'>VAT#</p>
            <p id='customer-title'>0</p>
          </div>

          <div id='customer-data'>
            <p id='customer-name'>Receipt</p>
            <p id='customer-title'>123456789</p>
          </div>

          <div id='customer-data'>
            <p id='customer-name'>Date</p>
            <p id='customer-title'>30/9/2023</p>
          </div>

          <div id='customer-data'>
            <p id='customer-name'>Customer</p>
            <p id='customer-title'>EX01000003</p>
          </div>

          <div id='customer-data'>
            <p id='customer-name'>Name:</p>
            <p id='customer-title'>EXCHANGE SALES</p>
          </div>
          <hr />
          <div id='description'>
            <p>Description</p>
            <p>Qty</p>
            <p>Price</p>
            <p>Total</p>
          </div>
          <div id='inside-border-data'>
            <div id='inside-description'>
              <p>Safely Shoe</p>
              <p>1.00</p>
              <p>240.00</p>
              <p>{tenderAmount}</p>
            </div>
          </div>


          {/* Last data */}
          <div id='last-data'>
            <div id='inside-last-data'>
              <p>Gross</p>
              <p>Arabic</p>
              <p>{totalAmount}</p>
            </div>

            <div id='inside-last-data'>
              <p>VAT#</p>
              <p>Arabic</p>
              <p>{spanAmount}</p>
            </div>

            <div id='inside-last-data'>
              <p>Paid Amount:</p>
              <p>Arabic</p>
              <p>{cashAmount}</p>
            </div>

            <div id='inside-last-data'>
              <p>Change Amount:</p>
              <p>Arabic</p>
              <p>{change}</p>
            </div>
          </div>

          {/* <div>
                      <QrCode id="qrcode"/>
                    </div> */}
        </div>
      </div>

    </div>
  );
};

export default SalesAmountPrint;
