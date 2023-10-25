import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import CardDetails from './CardDetails';
import "./CardPopUp.css"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '90%',
  maxWidth: '90%',
  maxHeight: '90%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};


const CardPopUp = ({ title, handleOpenPopUp, handleClosePopUp, openPopUp, apiResponse }) => {

  const [open, setOpen] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState(null); // Track selected card data

  // console.log(apiResponse);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button 
        onClick={handleOpenPopUp} 
        className="text-white w-full text-left py-[6px]">
        {title}
      </button>
      <Modal
        open={openPopUp}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            '@media (max-width: 768px)': {
              width: '90%',
              height: '90%',
            },
          }}
        >
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClosePopUp}
            aria-label="close"
            sx={{
              position: 'absolute',
              top: '6px',
              right: '18px',
            }}
          >
            <ClearIcon />
          </IconButton>
          
          <div className="p-3 h-full shadow" style={{ maxHeight: '100%', overflowY: 'auto' }}>
            <h1 className='font-normal bg-primary text-white px-2 py-1'>Detailed Information</h1>
            <section className="py-1">
              <div className="grid max-w-6xl grid-cols-1 gap-5 p-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
                {apiResponse !== null && apiResponse.map((item, index) => (
                  <article key={index} className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300">
                    <div 
                      // onClick={() => handleOpen()} 
                      onClick={() => {
                        setSelectedCardData(item); // Set the selected card data
                        handleOpen(); // Open the CardDetails modal
                      }}
                      className="relative h-56 flex items-end overflow-hidden rounded-xl">
                      <img
                          className=""
                          src={item.imageURL} // Use the appropriate property from the API response
                          // alt={item.commonName} // Add alt text for accessibility
                          style={{
                            objectFit: 'contain',
                            height: '100%',
                            margin: 'auto',
                          }}
                        />
                    </div>

                    <div className="mt-1 p-2 flex flex-col gap-1">
                      <div className='flex justify-between items-center'>
                        <p className="text-sm font-semibold text-slate-700">
                          {`${item.commonName} - ${item.brands} - ${item.quantity}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                      {selectedCardData && (
                        <CardDetails
                          title={selectedCardData.commonName} // Pass the card title or any other relevant data
                          handleOpen={handleOpen}
                          handleClose={handleClose}
                          open={open}
                          cardData={selectedCardData} // Pass the selected card data
                        />
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
            </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CardPopUp;
