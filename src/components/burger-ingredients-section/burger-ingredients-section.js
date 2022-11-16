import { useMemo } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import IngredientCard from "../ingredient-card/ingredient-card";
import burgerIngredientsSectionStyles from "./burger-ingredients-section.module.css";

const BurgerIngredientsSection = ({ name, category, innerRef }) => {
  const { ingredients } = useSelector((state) => state.ingredients);

  const content = useMemo(() => {
    return ingredients.map((ingredient) => {
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
      <div className={burgerIngredientsSectionStyles.cards}>{content}</div>
    </div>
  );
};

BurgerIngredientsSection.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  innerRef: PropTypes.func.isRequired,
};

export default BurgerIngredientsSection;