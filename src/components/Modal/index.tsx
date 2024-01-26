import { Fragment, ReactNode } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoCloseOutline } from 'react-icons/io5'

interface IProps {
  isOpen: boolean
  handleClose: () => void
  headline?: string
  children: ReactNode
}

const Modal = ({ isOpen, handleClose, headline, children }: IProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-30' onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-50' />
        </Transition.Child>
        <div className='fixed inset-0'>
          <div className='flex min-h-full items-center justify-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='max-w-[calc(100vw_-_20%)] rounded-lg bg-[#f9fafb] dark:bg-[#111827] shadow-xl transition-all p-3'>
                {headline && (
                  <Dialog.Title
                    as='h3'
                    className='text-xl font-medium leading-6 text-[#38404e] dark:text-[#d9dfe9] flex justify-between items-center'
                  >
                    {headline}
                    <IoCloseOutline
                      onClick={handleClose}
                      className='text-2xl cursor-pointer'
                    />
                  </Dialog.Title>
                )}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
