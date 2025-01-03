import React from "react";

const CreditCard = ({
  cardNumber = "3778 **** **** 1234",
  expiry = "12/22",
  balance = 5756,
  cardHolder = "Eddy Cusuma",
  color = "black",
}) => {
  return (
    <div className="font-['Montserrat',sans-serif] text-sm leading-snug">
      <div className="flex-wrap m-2">
        <div className="w-[335px] h-[215px] relative">
          <div
            className={`w-full h-full rounded-2xl ${
              color === "black" ? "text-white" : "text-black"
            } shadow-lg bg-gradient-to-r ${
              color === "black"
                ? "from-gray-600 to-gray-900"
                : ""
            } overflow-hidden`}
          >
            <div className="flex justify-between">
              <div className="mt-8 ml-6 font-mono text-md">
                <div
                  className={`text-xs${
                    color === "black" ? "text-white/80" : "text-black/80"
                  } mb-1`}
                >
                  Balance
                </div>
                <div>${balance.toLocaleString()}</div>
              </div>
              <div className="mt-8 mr-6">
                <div className="w-[40px] h-[30px] rounded bg-gradient-to-b from-[#ffecc7] to-[#d0b978] overflow-hidden flex items-center justify-center">
                  <div className="w-[20px] h-[20px] border border-gray-700 rounded bg-gradient-to-b from-[#efdbab] to-[#e1cb94]" />
                  <div className="absolute w-10 h-[1px] bg-gray-700 top-[35px]" />
                  <div className="absolute w-10 h-[1px] bg-gray-700 top-[42px]" />
                  <div className="absolute w-10 h-[1px] bg-gray-700 top-[50px]" />
                  <div className="absolute w-[1px] h-[30px] bg-gray-700 left-[290px]" />
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 w-full px-6">
              <div className="flex justify-between items-start font-mono">
                <div>
                  <div
                    className={`text-xs${
                      color == "black" ? "text-white/80" : "text-black/80"
                    } mb-1`}
                  >
                    CARD HOLDER
                  </div>
                  <div>{cardHolder}</div>
                </div>
                <div>
                  <div
                    className={`text-xs${
                      color == "black" ? "text-white/80" : "text-black/80"
                    } mb-1`}
                  >
                    VALID TILL
                  </div>
                  <div>{expiry}</div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-5 w-full px-5 flex justify-between items-center">
              <div className="font-mono text-lg">{cardNumber}</div>
              <div className="flex">
                <div className="w-6 h-6 rounded-full bg-[#eb001b]" />
                <div className="w-6 h-6 rounded-full bg-[#f79e1b] opacity-70 -ml-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
