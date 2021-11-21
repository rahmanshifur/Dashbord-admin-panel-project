import { createStore, persist } from "easy-peasy";


import AuthModel from "./model/auth";
import CategoryModel from "./model/category";
import ColorModel from "./model/color";
import ProductModel from "./model/product";
import ReviewModel from "./model/review";
import SizeModel from "./model/size";
import SubcategoryModel from "./model/subcategory";
import UserModel from "./model/user";



const store = createStore({
    review: persist(ReviewModel),
    auth: persist(AuthModel),
    product: persist(ProductModel),
    subcategory: persist(SubcategoryModel),
    category: persist(CategoryModel),
    size: persist(SizeModel),
    color: persist(ColorModel),
    user: persist(UserModel),
})

export default store;