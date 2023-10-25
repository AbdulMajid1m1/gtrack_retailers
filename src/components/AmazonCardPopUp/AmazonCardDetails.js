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

const modalContainerStyle = {
    backgroundColor: 'transparent', // Set the overlay background to transparent
  };

const AmazonCardDetails = ({ title, handleOpen, handleClose, open, cardData }) => {
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
        BackdropProps={{ style: modalContainerStyle }} 
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
                            <div class="sticky top-0 z-50 overflow-hidden ">
                                <div class="relative mb-6 lg:mb-10 lg:h-2/4 ">
                                    <img src={safetyInformationIcon} alt=""
                                        class="object-cover w-full lg:h-full " />
                                </div>
                                <div class="flex-wrap hidden md:flex ">
                                    <div class="w-1/2 p-2 sm:w-1/4">
                                        <a href="#"
                                            class="block border border-blue-300 dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                                            <img src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg" alt=""
                                                class="object-cover w-full lg:h-20" />
                                        </a>
                                    </div>
                                    <div class="w-1/2 p-2 sm:w-1/4">
                                        <a href="#"
                                            class="block border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                                            <img src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg" alt=""
                                                class="object-cover w-full lg:h-20" />
                                        </a>
                                    </div>
                                    <div class="w-1/2 p-2 sm:w-1/4">
                                        <a href="#"
                                            class="block border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                                            <img src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg" alt=""
                                                class="object-cover w-full lg:h-20" />
                                        </a>
                                    </div>
                                    <div class="w-1/2 p-2 sm:w-1/4">
                                        <a href="#"
                                            class="block border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                                            <img src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg" alt=""
                                                class="object-cover w-full lg:h-20" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-full px-4 md:w-1/2 ">
                            <div class="lg:pl-20">
                                <div class="mb-8 ">
                                    <span class="text-lg font-medium text-rose-500 dark:text-rose-200">New</span>
                                    <h2 class="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                                        Shoes</h2>
                                    <div class="flex items-center mb-6">
                                        <ul class="flex mr-2">
                                            <li>
                                                <a href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor"
                                                        class="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                                        viewBox="0 0 16 16">
                                                        <path
                                                            d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor"
                                                        class="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                                        viewBox="0 0 16 16">
                                                        <path
                                                            d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor"
                                                        class="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                                        viewBox="0 0 16 16">
                                                        <path
                                                            d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor"
                                                        class="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                                        viewBox="0 0 16 16">
                                                        <path
                                                            d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                    </svg>
                                                </a>
                                            </li>
                                        </ul>
                                        <p class="text-xs dark:text-gray-400 ">(2 customer reviews)</p>
                                    </div>
                                    <p class="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                                        Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet
                                        Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet
                                    </p>
                                    <p class="inline-block mb-8 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                                        <span>$1000.99</span>
                                        <span
                                            class="text-base font-normal text-gray-500 line-through dark:text-gray-400">$1500.99</span>
                                    </p>
                                    <p class="text-green-600 dark:text-green-300 ">7 in stock</p>
                                </div>
                                <div class="flex items-center mb-8">
                                    <h2 class="w-16 mr-6 text-xl font-bold dark:text-gray-400">
                                        Colors:</h2>
                                    <div class="flex flex-wrap -mx-2 -mb-2">
                                        <button
                                            class="p-1 mb-2 mr-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400 ">
                                            <div class="w-6 h-6 bg-cyan-300"></div>
                                        </button>
                                        <button
                                            class="p-1 mb-2 mr-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400">
                                            <div class="w-6 h-6 bg-green-300 "></div>
                                        </button>
                                        <button
                                            class="p-1 mb-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400">
                                            <div class="w-6 h-6 bg-red-200 "></div>
                                        </button>
                                    </div>
                                </div>
                                <div class="flex items-center mb-8">
                                    <h2 class="w-16 text-xl font-bold dark:text-gray-400">
                                        Size:</h2>
                                    <div class="flex flex-wrap -mx-2 -mb-2">
                                        <button
                                            class="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400">XL
                                        </button>
                                        <button
                                            class="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">S
                                        </button>
                                        <button
                                            class="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">M
                                        </button>
                                        <button
                                            class="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">XS
                                        </button>
                                    </div>
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

export default AmazonCardDetails;
