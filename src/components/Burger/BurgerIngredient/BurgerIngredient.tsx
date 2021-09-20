import classes from "./BurgerIngredient.module.css";

// interface BurgIngredInterf {
//   (props: String): React.ReactElement;
// }

interface BurgerProps {
  type: string;
}

const BurgerIngredient = (props: BurgerProps): React.ReactElement | null => {
  let ingredient: React.ReactElement | null;

  switch (props.type) {
    case "bread-bottom":
      return ingredient = <div className={classes.BreadBottom}></div>;
    case "bread-top":
      return ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
    case "meat":
      return ingredient = <div className={classes.Meat}></div>;
    case "cheese":
      return ingredient = <div className={classes.Cheese}></div>;
    case "salad":
      return ingredient = <div className={classes.Salad}></div>;
    case "bacon":
      return ingredient = <div className={classes.Bacon}></div>;
    default:
      return ingredient = null;

  }

};

export default BurgerIngredient;
