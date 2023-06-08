import { RadioGroup } from "@headlessui/react";
import React, { useContext, useEffect, useState } from "react";
import { SizesContext } from "../../contexts/SizesProvider";

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const SizesSelector = ({ sizes }) => {
  const [selectedSize, setSelectedSize] = useState({});
  const { setSharedSelectedSize } = useContext(SizesContext);

  useEffect(() => {
    setSharedSelectedSize(selectedSize);
  }, [selectedSize]);

  useEffect(() => {
    let initialSize = sizes.find((size) => size.stock > 0 && size.inStock === true);
    setSelectedSize(initialSize);
  }, []);

  return (
    <form className="mt-10">
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-sm text-gray-900 font-medium">Talles</h3>
        </div>

        <RadioGroup
          value={selectedSize}
          onChange={setSelectedSize}
          className="mt-4">
          <RadioGroup.Label className="sr-only">Elija un talle</RadioGroup.Label>
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
            {sizes &&
              sizes.map((size) => (
                <RadioGroup.Option
                  key={size.name}
                  value={size}
                  disabled={!size.inStock}
                  className={({ active, checked }) =>
                    classNames(
                      size.inStock
                        ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                        : "bg-gray-50 text-gray-200 cursor-not-allowed",
                      active ? "ring-2 ring-indigo-500" : "",
                      checked ? "ring-1 ring-indigo-500" : "",
                      "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                    )
                  }>
                  {({ active, checked }) => (
                    <>
                      <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                      {size.inStock ? (
                        <span
                          className={classNames(
                            active ? "border" : "border-2",
                            checked
                              ? "border-indigo-500"
                              : "border-transparent",
                            "absolute -inset-px rounded-md pointer-events-none"
                          )}
                          aria-hidden="true"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none">
                          <svg
                            className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            stroke="currentColor">
                            <line
                              x1={0}
                              y1={100}
                              x2={100}
                              y2={0}
                              vectorEffect="non-scaling-stroke"
                            />
                          </svg>
                        </span>
                      )}
                    </>
                  )}
                </RadioGroup.Option>
              ))}
          </div>
        </RadioGroup>
      </div>
    </form>
  );
};

export default SizesSelector;
