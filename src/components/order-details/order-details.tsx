import { useAppSelector } from "../../hooks/redux-hooks";

import orderDetailsStyles from "./order-details.module.scss";
import orderDoneImage from "../../images/order-done.png";

const OrderDetails = () => {
  const orderNumber = useAppSelector((state) => state.order.orderNumber);

  return (
    <div className={orderDetailsStyles.container}>
      <p className={`${orderDetailsStyles.number} text text_type_digits-large`}>
        {orderNumber}
      </p>
      <p className="text text_type_main-medium mt-8 mb-15">
        идентификатор заказа
      </p>
      <img
        className={orderDetailsStyles.image}
        src={orderDoneImage}
        alt="Заказ выполнен"
      />
      <p className="text text_type_main-default mt-15 mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
