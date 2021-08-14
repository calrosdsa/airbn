import React,{useState,useEffect} from 'react'
import {DateRangePicker,DateRange} from 'react-date-range'
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import NumberInput from './NumberInput';
export default function DatePicker({
  close,
  checkInDate,
  checkOutDate,
  numberOfAdults,
  numberOfChildren,
}) {
  const [visible, setVisible] = useState(false);
  const selectionRange = {
    startDate: checkInDate.value,
    endDate: checkOutDate.value,
    key: "selection",
  };

  useEffect(() => {
    setTimeout(() => setVisible(true), 10);
    return () => setVisible(false);
  }, []);

  function handleSelect(ranges) {
    checkInDate.setValue(ranges.selection.startDate);
    checkOutDate.setValue(ranges.selection.endDate);
  }

  const options = {
    rangeColors: ["#e0565b"],
    ranges: [selectionRange],
    minDate: new Date(),
    onChange: handleSelect,
  };
    return (
        <div className=" bg-white absolute w-[300px]  rounded-xl  mt-24 px-6 -top-10 md:top-80  md:left-1/2  md:-translate-x-1/2 md:-translate-y-1/2" >
          <div>

            <h4 className="text-base font-bold text-red-400 my-3 mx-2">Pick Check-in & Check-out dates</h4>
            <div className="">
            <div className="md:hidden w-20">
                <DateRange {...options}/>
            </div>
            <div className="hidden md:inline-block text-xl  ">
                <DateRangePicker {...options}/>
            </div>
            <div className="my-5">
            <h4 className="mx-40 mb-4 text-red-400 font-bold">Add guests</h4>
          <div className="flex items-center mx-5 space-x-7" >
            <NumberInput
              name="Adults"
              value={numberOfAdults.value}
              setValue={numberOfAdults.setValue}
              />
            <NumberInput
              name="Children"
              value={numberOfChildren.value}
              setValue={numberOfChildren.setValue}
              />
          </div>
            </div>
            <button  className="absolute top-2 right-8   bg-red-500 text-gray-200 font-bold p-1 rounded-3xl" onClick={close}>
          Close
        </button>
        </div>
              </div>
              </div>
    )
}

