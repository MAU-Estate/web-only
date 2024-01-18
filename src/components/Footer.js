import React, { useState } from "react"
import { useCurrentBreakpoint } from "../hooks/useCurrentBreakpoint"

import Icon from "./Icon"

export default function Footer() {
  const [mailchimpState, setMailchimpState] = useState()
  const [mailchimpError, setMailchimpError] = useState("")

  const { atLarge } = useCurrentBreakpoint()

  const handleMailingListSubmit = async (e) => {
    e.preventDefault()

    const email = document.getElementById("email")
    mailchimpState && setMailchimpState("")
    fetch("/.netlify/functions/addEmailToMailchimp", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: email.value,
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        if (data.status === 400) {
          setMailchimpState("ERROR")
          setMailchimpError(
            data.title === "Member Exists"
              ? `${email.value} is already signed up`
              : data.detail
          )
        } else {
          setMailchimpState("SUCCESS")
          email.value = ""
        }
      })
  }

  return (
    <div className="bg-black-b pt-d pb-d3 relative">
      <div className="container text-white">
        <div className="md:grid grid-cols-2 justify-start mb-d2">
          <Icon
            name="logo"
            className="sm-only:mb-20 pr-8 md:pr-24 xl:pr-0 sm-only:w-full sm-only:max-w-[400px] w-full md:max-w-[520px]"
          />
          <div className="xl:flex items-end">
            <p className="mb-8 xl:mb-0 f-3 w-64 md:w-72 md:mr-20 ">
              Keep in touch with the estate through our newsletter:
            </p>
            <div>
              <form onSubmit={handleMailingListSubmit} className="w-72">
                <label className="h-14 w-full relative border-b border-grey-b flex text-grey-c">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`bg-transparent f-4 outline-none text-grey-c ${
                      mailchimpState === "SUCCESS" ? "opacity-0" : ""
                    }`}
                    placeholder="ENTER YOUR EMAIL ADDRESS"
                    required
                  />
                  <button
                    onClick={handleMailingListSubmit}
                    className="h-7 mt-[5px]"
                  >
                    <Icon name="arrowSignUp" className="h-full" />
                  </button>
                  {mailchimpState === "SUCCESS" && (
                    <div className="absolute left-0 bottom-0 top-0 right-0 flex items-center">
                      <p className="f-4 uppercase">Thank you.</p>
                    </div>
                  )}
                </label>
                {mailchimpState === "ERROR" && (
                  <div className="mt-4">
                    <p className="f-4 uppercase">{mailchimpError}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-x-0 lg:flex justify-between xl:grid xl:grid-cols-4 border-t border-grey-b pt-4">
          <div className="sm-only:order-1 ">
            <button
              className="flex f-2 hover:underline"
              style={{ textDecorationThickness: ".5px" }}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                })
              }}
            >
              Back to top ↑
            </button>
          </div>
          {atLarge ? (
            renderFooterLinks()
          ) : (
            <div className="lg:flex justify-between">{renderFooterLinks()}</div>
          )}
        </div>
      </div>
    </div>
  )
}

const renderFooterLinks = () => {
  const currentDate = new Date()
  let currentYear = currentDate.getFullYear()
  return (
    <>
      <div className="mb-3 lg:mb-0">
        <a
          className="block f-2 hover:underline"
          href="mailto:estate@maryannunger.com"
          style={{ textDecorationThickness: ".5px" }}
        >
          estate@maryannunger.com
        </a>
      </div>
      <div className="mb-12 lg:mb-0">
        <a
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="block f-2 hover:underline"
          href="https://instagram.com/maryannungerestate"
          style={{ textDecorationThickness: ".5px" }}
        >
          Join us on Instagram
        </a>
      </div>
      <div className="mb-24 lg:mb-0">
        <div className="f-2">© {currentYear} Mary Ann Unger Estate</div>
      </div>
    </>
  )
}
