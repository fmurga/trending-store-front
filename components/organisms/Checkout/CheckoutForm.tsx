"use client";
import PaymentDetail from "@/components/atoms/PaymentDetail";
import { CartContext } from "@/contexts/CartContextProvider";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ModalAcceptBuy from "../Modals/ModalAcceptBuy";

const CheckoutForm = () => {
  const { cartItems, total, clear } = useContext(CartContext);

  const [submited, setSubmited] = useState(false);
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [validForm, setValidForm] = useState(false);

  const [orederId, setOrderId] = useState("");
  const [open, setOpen] = useState(false);

  const initialForm = useMemo(() => {
    return {
      name: "",
      email: "",
      phone: "",
    };
  }, []);

  const [form, setForm] = useState(initialForm);
  const modalMessage = `Se ha creado tu compra con id ${orederId}`;
  const modalTitle = "Compra Exitosa";

  // const navigate = useNavigate();

  const handleInputChange = (e) => {
    e.preventDefault();
    setError("");
    setNameError("");
    setPhoneError("");
    setEmailError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isFormValid = validateForm();
    if (isFormValid) {
      const buyer = form;
      const items = cartItems.map((item) => ({
        id: item._id,
        title: item.name,
        price: item.price,
      }));
      const order = {
        buyer: buyer,
        items: items,
        // date: serverTimestamp(),
        total: total,
      };
      // checkItemsStock().then((res) => {
      //   if (res.includes(false)) {
      //     setError(
      //       "No se ha podido procesar la compra, intente nuevamente mas tarde"
      //     );
      //   } else {
      //     updateStock();
      //     const ordersColl = collection(db, "orders");
      //     addDoc(ordersColl, order).then(({ id }) => {
      //       setOrderId(id);
      //       setOpen(true);
      //     });
      //   }
      // });
    } else {
      setError("Ha ocurrido un error en el Formulario");
    }
  };

  const checkItemsStock = () => {
    const promises = [];

    cartItems.forEach((prod) => {
      const productRef = doc(db, "products", prod._id);
      const promise = getDoc(productRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            prod.sizeSelected.forEach((element) => {
              const aux = snapshot
                .data()
                .sizes.filter((size) => size.name === element.name);
              console.log("aux", aux);
              if (aux[0].stock < element.peritem) {
                return false;
              } else {
                return true;
              }
            });
          }
        })
        .catch((err) => console.log("error :>>", err));
      promises.push(promise);
    });
    return Promise.all(promises);
  };

  const updateStock = () => {
    cartItems.forEach((prod) => {
      prod.sizeSelected.forEach((element) => {
        const aux = prod.sizes.filter((size) => size.name === element.name);
        aux[0].stock = aux[0].stock - element.peritem;
        if (aux[0].stock === 0) {
          aux[0].inStock = false;
        }
      });
      const itemRef = doc(db, "products", prod._id);
      updateDoc(itemRef, prod);
    });
  };

  const validateForm = () => {
    let isFormValid = false;
    if (form.name === "") {
      setNameError("Se requiere el nombre");
      isFormValid = false;
    } else {
      setNameError("");
    }

    if (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        form.email
      ) === false &&
      form.email !== ""
    ) {
      setEmailError("El email no es valido");
      isFormValid = false;
    } else {
      if (form.email === "") {
        setEmailError("Se requiere el email");
        isFormValid = false;
      } else {
        setEmailError("");
      }
    }

    if (
      /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/.test(
        form.phone
      ) === false &&
      form.phone !== ""
    ) {
      setPhoneError("Ingresar un telefono valido (351)-2222-222");
      isFormValid = false;
    } else {
      if (form.phone === "") {
        setPhoneError("Se requiere el telefono");
        isFormValid = false;
      } else {
        setPhoneError("");
      }
    }

    if (
      /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/.test(
        form.phone
      ) === true &&
      form.phone !== "" &&
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        form.email
      ) === true &&
      form.email !== "" &&
      form.name !== ""
    ) {
      isFormValid = true;
    }

    return isFormValid;
  };

  const endBuy = useCallback(() => {
    setForm(initialForm);
    clear();
    // navigate("/");
  }, [clear, initialForm]);

  useEffect(() => {
    if (submited) {
      endBuy();
    }
  }, [endBuy, submited]);

  return (
    <>
      <div className="w-5/12 h-full rounded-md">
        <div className="leading-loose">
          {error && <p className="text-red-600">{error}</p>}
          <form
            className="w-full p-10 bg-white rounded shadow-xl"
            onSubmit={handleSubmit}
          >
            <h2 className="text-gray-800 font-medium text-xl py-2">
              Pagar Compra
            </h2>
            <div className="mt-2">
              <label className="block text-sm text-gray-700" htmlFor="name">
                Nombre
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                id="name"
                name="name"
                type="text"
                aria-label="Name"
                value={form.name}
              />
              {nameError && <p className="text-red-600">{nameError}</p>}
            </div>
            <div className="mt-2">
              <label className="block text-sm text-gray-600" htmlFor="email">
                Email
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                name="email"
                aria-label="Email"
                value={form.email}
              />
              {emailError && <p className="text-red-600">{emailError}</p>}
            </div>
            <div className=" mt-2">
              <label className=" block text-sm text-gray-600" htmlFor="phone">
                Telefono
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                name="phone"
                aria-label="Phone"
                value={form.phone}
              />
              {phoneError && <p className="text-red-600">{phoneError}</p>}
            </div>
            <PaymentDetail />
            <div className="mt-4">
              <button
                className="px-4 py-1 text-white font-bold bg-gray-900 rounded"
                type="submit"
              >
                Comprar
              </button>
            </div>
          </form>
        </div>
      </div>
      <ModalAcceptBuy
        open={open}
        setOpen={setOpen}
        title={modalTitle}
        message={modalMessage}
        submited={setSubmited}
      />
    </>
  );
};

export default CheckoutForm;
