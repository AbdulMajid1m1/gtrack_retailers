import { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import safetyInformationIcon from "../../Images/safetyInformation.jpeg";

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

const CardDetails = ({ title, handleOpen, handleClose, open, cardData }) => {
  return (
    <div>
      <Button
        style={{ color: 'white', width: '100%', }}
        onClick={handleOpen}
      >
        {title}
      </Button>
      <Modal
        open={open}
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
            onClick={handleClose}
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
          <section class="overflow-hidden bg-white font-poppins dark:bg-gray-800">
                <div class="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
                    <div class="flex flex-wrap -mx-4">
                        <div class="w-full px-4 md:w-1/2 ">
                            <div class="flex flex-col gap-2">
                                <div class="relative mb-6 lg:mb-10 lg:h-2/4 ">
                                    <img src={cardData?.imageURL} alt=""
                                        class="object-cover w-full lg:h-full h-[70%]" />
                                </div>
                                <div class="sm:text-2xl text-lg flex flex-wrap gap-2">
                                    <h2 className='font-bold'>Brands:</h2> <span>{cardData?.brands}</span>
                                </div>
                                <div class="text-lg flex flex-wrap gap-2">
                                    <h2 className='font-bold'>Packaging:</h2> <span>{cardData?.packaging}</span>
                                </div>
                                <div class="text-lg flex gap-2">
                                    <h2 className='font-bold'>Stores:</h2> <span>{cardData?.stores}</span>
                                </div>    
                            </div>
                        </div>
                        <div class="w-full px-4 md:w-1/2 ">
                            <div class="lg:pl-20">
                                <div class="mb-8 ">
                                    <span class="text-lg font-medium text-rose-500 dark:text-rose-200">Categories</span>
                                    <h2 class="max-w-xl mt-2 mb-6 text-xl font-bold dark:text-gray-400 md:text-xl">
                                        {cardData?.categories}</h2>
                                    
                                    <div class="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                                        <p className='font-bold'>Common Name:</p><span>{cardData?.commonName}</span>
                                    </div>
                                    
                                    <div class="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                                        <p className='font-bold'>Countries Sold:</p><span>{cardData?.countriesSold}</span>
                                    </div>

                                    <div class="flex gap-2 mb-8 text-2xl font-bold text-gray-700 dark:text-gray-400 ">
                                        <p> Barcode:</p><span>{cardData?.barcode}</span>
                                    </div>
                                </div>

                                <div class="flex items-center mb-8 gap-2 -mt-2">
                                    <h2 class="w-16 mr-6 text-xl font-bold dark:text-gray-400">
                                        Quantity:</h2><span>{cardData?.quantity}</span>
                                </div>
                                <div class="flex flex-wrap items-center mb-8 gap-2">
                                    <h2 class="w-16 text-xl font-bold dark:text-gray-400">
                                        Labels:</h2><span>{cardData?.labels}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CardDetails;
