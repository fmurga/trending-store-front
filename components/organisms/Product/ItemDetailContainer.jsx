import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SizesProvider from "../../contexts/SizesProvider";
import { db } from "../../firebase/firebaseConfig";
import Container from "../extra/Container";
import Loading from "../extra/Loading";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  /* Item Id from params */
  const { id } = useParams();

  /* States */
  const [item, setItem] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* Fetch Item */
  const fetchItem = (id) => {
    setLoading(true);
    setError("");
    const item = doc(db, "products", id);
    getDoc(item)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          console.log("No results :>> ");
        }
        setItem({ id: snapshot.id, ...snapshot.data() });
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchItem(id);
  }, [id]);

  return (
    <Container>
      {loading ? <Loading /> : <></>}
      {error && <>{error}</>}
      <SizesProvider>
        {Object.keys(item).length !== 0 && <ItemDetail item={item} />}
      </SizesProvider>
    </Container>
  );
};

export default ItemDetailContainer;
