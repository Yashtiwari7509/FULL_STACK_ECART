import { Router, Request, Response } from "express";
import { productModel } from "../Models/product";
import { verifyToken } from "./user";
import { UserModel } from "../Models/user";
import { Product_errors, UserErorr } from "../erorrs";
const router = Router();

router.get("/", async (_, res: Response) => {
  try {
    const products = await productModel.find({});
    res.json(products);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/checkout", verifyToken, async (req: Request, res: Response) => {
  const { customerID, cartItems } = req.body;

  function FilterCart(obj, predicate) {
    return Object.fromEntries(Object.entries(obj).filter(predicate));
  }
  const cartItemsFIL = FilterCart(cartItems, ([key, value]) => value > 0);

  try {
    const user = await (
      await UserModel.findById(customerID)
    ).populate("perchasedItems");

    const productIds = Object.keys(cartItemsFIL);
    const products = await productModel.find({ _id: { $in: productIds } });
    if (!user) {
      return res.status(400).json({ type: UserErorr.USER_NOT_FOUND });
    }
    if (productIds.length !== products.length) {
      return res.status(401).json({ type: Product_errors.NO_PRODUCT_FOUND });
    }

    let totalprice = 0;

    for (const item in cartItemsFIL) {
      const product = products.find((product) => String(product._id) === item);
      if (!product) {
        return res.status(401).json({ type: Product_errors.NO_PRODUCT_FOUND });
      }

      if (product.stockQuantity < (cartItemsFIL[item] as number)) {
        return res.status(401).json({ type: Product_errors.NOT_ENOUGH_STOCK });
      }
      totalprice += product.price * (cartItemsFIL[item] as number);
    }
    if (user.availableMoney < totalprice) {
      return res.status(401).json({ type: Product_errors.NOT_ENOUGH_MONEY });
    }

    const updates = [];

    for (const productId in cartItemsFIL) {
      const quantity = cartItemsFIL[productId];
      updates.push({
        filter: { _id: productId },
        update: { $inc: { stockQuantity: -quantity } }, // Decrement stockQuantity by the quantity specified in cartItems
      });
    }

    console.log(updates);

    try {
      for (const update of updates) {
        await productModel.updateOne(update.filter, update.update);
      }
      console.log("Stock quantities updated successfully.");
    } catch (error) {
      console.error("Error occurred during stock quantity update:", error);
    }
    user.availableMoney -= totalprice;
    user.perchasedItems.push(...productIds);
    await user.save();
    res.json({ message: "order created succesfully" });
  } catch (error) {
    console.log(error, "");
  }
});
export { router as productRouter };
