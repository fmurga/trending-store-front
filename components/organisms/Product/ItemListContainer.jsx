import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import Container from "../extra/Container";
import Loading from "../extra/Loading";
import ItemList from "./ItemList";

const ItemListContainer = ({ greeting }) => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchItems = useCallback(() => {
    setLoading(true);
    setError("");
    if (id !== undefined) {
      const q = query(collection(db, "products"), where("category", "==", id));
      getDocs(q)
        .then((snapshot) => {
          if (snapshot.size === 0) {
            console.log("No results :>> ");
          }
          setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      const products = collection(db, "products");
      getDocs(products)
        .then((snapshot) => {
          if (snapshot.size === 0) {
            console.log("No results :>> ");
          }
          setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    fetchItems(id);
    return () => {
      setItems([]);
    };
  }, [fetchItems, id]);

  return (
    <Container>
      {isNaN(id) && id !== undefined ? (
        <h1 className="font-bold text-2xl">{`${greeting}  ${id}`}</h1>
      ) : (
        <h1 className="font-bold text-2xl">{greeting}</h1>
      )}
      {loading ? <Loading /> : " "}
      {error && "No se pudieron cargar los productos"}
      {items ? <ItemList items={items} /> : <></>}
    </Container>
  );
};

export default ItemListContainer;
