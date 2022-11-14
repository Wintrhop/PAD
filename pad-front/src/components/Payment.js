import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Payment = ({
  type,
  className,
  price1,
  name1,
  tradlibPrev,
  mayorExtPrev,
  escrituraPrev,
  regPropHoPrev,
  setClick
}) => {
  const navigate = useNavigate();
  
  let params = useParams();
  var handler = window.ePayco.checkout.configure({
    key: process.env.REACT_APP_PAD_EPAYCO,
    test: true,
  });

  const handleClick = async () => {
    try {
        if (!tradlibPrev || !mayorExtPrev || !escrituraPrev || !regPropHoPrev) {
            Swal.fire({
              title: "Error",
              text: "Debes Agregar todos los documentos",
              icon: "error",
              confirmButtonText: "Perfecto",
            });
            throw new Error("sin documentos");
          }

       const pay = await handler.open({
        //Parametros compra (obligatorio)
        name: name1,
        description: "jhon",
        currency: "cop",
        amount: price1,
        tax_base: "0",
        tax: "0",
        country: "co",
        lang: "en",

        //Onpage="false" - Standard="true"
        external: "false",

        //Atributos opcionales
        extra1: `${params.id}`,
        extra2: "extra2",
        extra3: "extra3",
        response: "",
        acepted: `${window.location.href}`,

        //Atributos cliente
        name_billing: "",
        address_billing: "Calle falsa 1233",
        type_doc_billing: "cc",
        mobilephone_billing: "3101234567",
        number_doc_billing: "1234567896",

        //atributo deshabilitación metodo de pago
        methodsDisable: ["SP"],
      });
    } catch (err) {
        console.log(err)
    }
  };

  return (
    <div className="reserve">
      <button className={className} type={"submit"} onClick={handleClick}>
        Pagar y Solicitar
      </button>
    </div>
  );
};

export default Payment;
