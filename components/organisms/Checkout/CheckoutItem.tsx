import Link from "next/link";
import Select from "react-select";

const CheckoutItem = ({ item }) => {
  return (
    <>
      {item &&
        item.sizeSelected.map((size) => (
          <div
            key={size.name}
            className="flex justify-between w-5/6 h-40 border-y-slate-400 shadow-md rounded-lg hover:scale-105 transition duration-100 p-2"
          >
            <div className="inline-flex gap-2">
              <img
                className="rounded-lg"
                src={item.img}
                alt={item.name}
                width={100}
              />
              <div>
                <Link href={`/item/${item._id}`}>
                  <h2 className="text-purple-600 font-bold text-md">
                    {item.name}
                  </h2>
                </Link>
                <p className="text-lg font-semibold">
                  Talle: <span className="font-normal">{size.name}</span>
                </p>
                <p className="text-md font-semibold">${item.price}</p>
              </div>
            </div>
            <div>
              <Select
                getOptionValue={(option: any) => option.value}
                getOptionLabel={(option: any) => option.label}
                placeholder={size.peritem}
                isDisabled={true}
              />
            </div>
          </div>
        ))}
    </>
  );
};

export default CheckoutItem;
