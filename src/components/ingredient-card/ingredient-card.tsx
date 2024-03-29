import { FC, useMemo } from "react";
import { useDrag } from "react-dnd";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppSelector } from "../../hooks/redux-hooks";

import styles from "./ingredient-card.module.scss";

export type Card = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

type IngredientCardProps = {
  ingredient: Card;
};

export const IngredientCard: FC<IngredientCardProps> = ({ ingredient }) => {
  const { constructorIngredients } = useAppSelector((state) => state.ingredients);
  const history = useHistory();
  const location = useLocation();
  const id = ingredient._id;

  const ingredientsCount = useMemo(() => {
    if (!constructorIngredients) {
      return {};
    }

    return constructorIngredients.reduce(
      (acc: Record<string, number>, item) => ({ ...acc, [item._id]: (acc[item._id] || 0) + 1 }),
      {}
    );
  }, [constructorIngredients]);

  const handleCardClick = () => {
    history.replace(`/ingredients/${id}`);
  };

  const [{ opacity }, ref] = useDrag({
    type: "ingredients",
    item: { id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <Link
      to={{
        pathname: `/ingredients/${id}`,
        state: { background: location, ingredient },
      }}
      className={styles.link}
    >
      <article
        className={styles.card}
        data-at-selector="ingredient-card"
        onClick={handleCardClick}
        style={{ opacity }}
        ref={ref}
      >
        <img src={ingredient.image} alt={ingredient.name} />
        <div className={`${styles.price} mt-2 mb-2`}>
          <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p
          className={`${styles.name} text text_type_main-small mr-2 mb-6`}
          data-at-selector="ingredient-card-name"
        >
          {ingredient.name}
        </p>

        {ingredientsCount[id] && <Counter count={ingredientsCount[id]} size="small" />}
      </article>
    </Link>
  );
};
