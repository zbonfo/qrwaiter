'use client'

import { useAppTranslation } from '@/hooks/use-app-translation'
import { useLinks } from '@/hooks/use-links'
import { cn } from '@/lib/tailwind/tailwind-utils'
import { Dialog, Transition } from '@headlessui/react'
import { BiArchive } from '@react-icons/all-files/bi/BiArchive'
import { BiData } from '@react-icons/all-files/bi/BiData'
import { BiHome } from '@react-icons/all-files/bi/BiHome'
import { BiMenu } from '@react-icons/all-files/bi/BiMenu'
import { BiTime } from '@react-icons/all-files/bi/BiTime'
import { BiUserCircle } from '@react-icons/all-files/bi/BiUserCircle'
import React, { Fragment, useState } from 'react'

interface LayoutSidebarProps {
   children?: React.ReactNode
}

const navigation = [
   { name: 'All Issues', href: '#', icon: BiHome, current: true },
   { name: 'My Issues', href: '#', icon: BiData, current: false },
   { name: 'Assigned', href: '#', icon: BiUserCircle, current: false },
   { name: 'Closed', href: '#', icon: BiArchive, current: false },
   { name: 'Recent', href: '#', icon: BiTime, current: false },
]

const LayoutSidebar: React.FC<LayoutSidebarProps> = (props) => {
   
   const { children, ...rest } = props
   const links = useLinks()
   const t = useAppTranslation()
   
   const [sidebarOpen, setSidebarOpen] = useState(true)
   
   return (
      <>
         <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
               <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
               >
                  <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
               </Transition.Child>
               
               <div className="fixed inset-0 z-40 flex">
                  <Transition.Child
                     as={Fragment}
                     enter="transition ease-in-out duration-300 transform"
                     enterFrom="-translate-x-full"
                     enterTo="translate-x-0"
                     leave="transition ease-in-out duration-300 transform"
                     leaveFrom="translate-x-0"
                     leaveTo="-translate-x-full"
                  >
                     <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 pt-5 pb-4">
                        <Transition.Child
                           as={Fragment}
                           enter="ease-in-out duration-300"
                           enterFrom="opacity-0"
                           enterTo="opacity-100"
                           leave="ease-in-out duration-300"
                           leaveFrom="opacity-100"
                           leaveTo="opacity-0"
                        >
                           <div className="absolute top-0 right-0 -mr-12 pt-2">
                              <button
                                 type="button"
                                 className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                 onClick={() => setSidebarOpen(false)}
                              >
                                 <span className="sr-only">Close sidebar</span>
                                 <BiMenu className="h-6 w-6 text-white" aria-hidden="true" />
                              </button>
                           </div>
                        </Transition.Child>
                        <div className="flex flex-shrink-0 items-center px-4">
                           <img
                              className="h-8 w-auto"
                              src="https://tailwindui.com/img/logos/mark.svg?color=rose&shade=500"
                              alt="Your Company"
                           />
                        </div>
                        <div className="mt-5 h-0 flex-1 overflow-y-auto">
                           <nav className="px-2">
                              <div className="space-y-1">
                                 {navigation.map((item) => (
                                    <a
                                       key={item.name}
                                       href={item.href}
                                       className={cn(
                                          item.current
                                             ? 'bg-gray-900 text-white'
                                             : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                          'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                                       )}
                                       aria-current={item.current ? 'page' : undefined}
                                    >
                                       <item.icon
                                          className={cn(
                                             item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                                             'mr-4 flex-shrink-0 h-6 w-6',
                                          )}
                                          aria-hidden="true"
                                       />
                                       {item.name}
                                    </a>
                                 ))}
                              </div>
                           </nav>
                        </div>
                     </Dialog.Panel>
                  </Transition.Child>
                  <div className="w-14 flex-shrink-0" aria-hidden="true">
                     {/* Dummy element to force sidebar to shrink to fit close icon */}
                  </div>
               </div>
            </Dialog>
         </Transition.Root>
      </>
   )
   
}

export default LayoutSidebar
