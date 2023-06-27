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

  const postOrder = async (order) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    };
    await fetch(`${process.env.API_FETCH_PATH}/api/orders/`, requestOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isFormValid = validateForm();
    if (isFormValid) {
      const buyer = form;
      const items = cartItems.map((item) => ({
        product: item._id,
        sizes: [...item.sizeSelected],
      }));
      const order = {
        buyer: buyer,
        detail: items,
        total: total,
      };
      checkItemsStock().then((status) => {
        if (!status) {
          setError(
            "No se ha podido procesar la compra, intente nuevamente mas tarde"
          );
        } else {
          console.log("updating stock");
          try {
            updateStock();
            postOrder(order);
            // setSubmited(true);
          } catch (error) {
            console.log("updating failed");
          }
        }
      });
    } else {
      setError("Ha ocurrido un error en el Formulario");
    }
  };

  const checkItemsStock = async () => {
    let isStock = true; // Initialize isStock as true

    for (const prod of cartItems) {
      try {
        const response = await fetch(
          `${process.env.API_FETCH_PATH}/api/clothes/${prod._id}`
        );
        const product = await response.json();

        for (const element of prod.sizeSelected) {
          const size = product.sizes.find((size) => size.name === element.name);
          if (size && size.stock < element.peritem) {
            console.log(
              `Product ${prod._id} - Size ${element.name} is out of stock`
            );
            isStock = false;
            break; // Exit the loop if any item is out of stock
          }
        }
      } catch (error) {
        console.log("Error:", error);
        return false;
      }
    }

    console.log("All items have stock:", isStock);
    return isStock;
  };

  const updateStock = async () => {
    for (const prod of cartItems) {
      for (const element of prod.sizeSelected) {
        console.log(element);
        const size = prod.sizes.find((size) => size.name === element.name);
        console.log();
        if (size) {
          size.stock -= element.peritem;
          if (size.stock === 0) {
            size.inStock = false;
          }
        }
        const updatedProduct = {
          _id: prod._id,
          sizes: prod.sizes.map((size) => {
            if (size.name === element.name) {
              return {
                ...size,
                stock: size.stock - element.peritem,
              };
            } else {
              return size;
            }
          }),
        };

        try {
          const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProduct),
          };

          const response = await fetch(
            `${process.env.API_FETCH_PATH}/api/clothes/${prod._id}`,
            requestOptions
          );

          if (!response.ok) {
            console.error(`Failed to update stock for product ${prod._id}`);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }
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
