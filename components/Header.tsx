"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "./ui/button"
import { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle } from "./ui/drawer"

const data = [
  {
    text: "Patient and Families",
    dropdown: [],
  },
  {
    text: "Sites & Investigators",
    dropdown: [],
  },
  {
    text: "Contact Us",
    href: "/contact-us",
  },
  {
    text: "About Us",
    href: "/about-us",
  },
]

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header>
      <div className="bg-[#000000] flex gap-4">
        <div className="max-w-[1200px] mx-auto flex w-full justify-center gap-20 items-center px-4 py-2">
          <div className="flex lg:items-center lg:justify-center">
            <Image src={"/icons/icon (2).png"} alt="announcement icon" width={24} height={24} />
            <p className="text-white font-bold text-[10px] md:text-sm lg:flex md:items-center md:justify-center lg:text-center">
              This announcement banner can be used to inform visitors of
              <span className="text-[#E5CB61] ml-2">something important</span>
            </p>
          </div>
          <div className="h-6 w-6 bg-[#343A40] rounded-full flex items-center justify-center">
            <Image src={"/icons/close.png"} alt="close icon" width={16} height={16} />
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto flex justify-between items-center py-3 px-4 lg:px-0">
        <div>
          <Image src={"/icons/trial_cliniq_logo.png"} alt="TrialCliniq Logo" width={124} height={39} />
        </div>
        <div className="hidden lg:flex items-center gap-10">
          {data.map((item, index) => (
            <div key={index} className="text-lg font-medium text-[#181D27] flex items-center gap-2">
              <p>{item.text}</p>
              {item.dropdown && (
                <div className="bg-[#DDE1FD] rounded-full w-fit">
                  <Image src={"/icons/expand_more.png"} alt="dropdown icon" width={16} height={16} />
                </div>
              )}
              {item.dropdown && item.dropdown.length > 0 && (
                <ul>
                  {item.dropdown.map((subItem, subIndex) => (
                    <li key={subIndex}>{subItem}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="space-x-4 hidden lg:flex items-center justify-center">
          <Button className="text-[#1033E5] border border-[#1033E5] py-4  px-4 rounded-[50px] bg-transparent text-base font-semibold hover:bg-transparent">
            Sign in
          </Button>
          <Button className="text-[#1033E5] bg-[#DDE1FD] py-2 px-4 rounded-[50px] text-base font-semibold hover:bg-[#C5CBEF]">
            Get Started
          </Button>
        </div>

        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <div className="lg:hidden flex items-center justify-center h-10 w-10 bg-[#F8F9FA] rounded-lg cursor-pointer hover:bg-[#E9ECEF] transition-colors">
              <Image src={"/Menu (6).png"} alt="hamburger icon" height={24} width={24} />
            </div>
          </DrawerTrigger>
          <DrawerContent className="h-[85vh] px-0">
            <DrawerHeader className="px-6 pb-4 border-b border-gray-100">
              <DrawerTitle className="flex items-center justify-center">
                <Image src={"/icons/trial_cliniq_logo.png"} alt="TrialCliniq Logo" width={120} height={38} />
              </DrawerTitle>
            </DrawerHeader>

            <div className="flex flex-col h-full px-6 py-6">
              <nav className="flex flex-col space-y-1 flex-1">
                {data.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="text-lg font-medium text-[#181D27] flex items-center justify-between py-4 px-4 rounded-xl hover:bg-[#F8F9FA] transition-colors cursor-pointer">
                      <p>{item.text}</p>
                      {item.dropdown && (
                        <div className="bg-[#DDE1FD] rounded-full p-1 hover:bg-[#C5CBEF] transition-colors">
                          <Image src={"/icons/expand_more.png"} alt="dropdown icon" width={16} height={16} />
                        </div>
                      )}
                    </div>
                    {item.dropdown && item.dropdown.length > 0 && (
                      <div className="ml-6 mb-2 space-y-2">
                        {item.dropdown.map((subItem, subIndex) => (
                          <p
                            key={subIndex}
                            className="text-sm text-gray-600 py-2 px-4 hover:bg-[#F8F9FA] rounded-lg cursor-pointer transition-colors"
                          >
                            {subItem}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              <div className="space-y-3 pt-6 border-t border-gray-100">
                <Button className="w-full text-[#1033E5] border border-[#1033E5] py-4 px-6 rounded-[50px] bg-transparent text-base font-semibold hover:bg-[#1033E5] hover:text-white transition-all duration-200">
                  Sign in
                </Button>
                <Button className="w-full text-[#1033E5] bg-[#DDE1FD] py-4 px-6 rounded-[50px] text-base font-semibold hover:bg-[#C5CBEF] hover:shadow-md transition-all duration-200">
                  Get Started
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  )
}

export default Header
