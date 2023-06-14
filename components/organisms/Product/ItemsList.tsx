"use client";
import Item from "../../molecules/Item";

const ItemList = ({ items }: any) => {
  console.log(items);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 my-10 ">
      {items &&
        items.length &&
        items.map((item: any) => <Item key={item.id} item={item} />)}
    </div>
  );
};

export default ItemList;
