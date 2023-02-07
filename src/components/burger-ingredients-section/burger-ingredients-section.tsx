import { FC, useMemo } from "react";

import { useAppSelector } from "../../hooks/redux-hooks";
import { IngredientCard } from "../ingredient-card/ingredient-card";

import styles from "./burger-ingredients-section.module.scss";

type BurgerIngredientsSectionProps = {
  name: string;
  category: string;
  innerRef: (node?: Element | null | undefined) => void;
};

export const BurgerIngredientsSection: FC<BurgerIngredientsSectionProps> = ({
  name,
  category,
  innerRef,
}) => {
  const { ingredients } = useAppSelector((state) => state.ingredients);

  const content = useMemo(() => {
    return ingredients?.map((ingredient) => {
      return (
        ingredient.type === category && (
          <IngredientCard
            ingredient={ingredient}
            key={ingredient._id}
            category={category}
          />
        )
      );
    });
  }, [ingredients, category]);

  return (
    <div className="mb-10" ref={innerRef}>
      <h2 className="text text_type_main-medium mb-6">{name}</h2>
      <div
        className={styles.cards}
        data-at-selector={`burger-cards-${category}`}
      >
        {content}
      </div>
    </div>
  );
};
