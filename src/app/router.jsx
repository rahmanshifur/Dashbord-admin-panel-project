
import { Router } from '@reach/router'


// IMPORT PAGES
import Home from '../pages/home/index';
import PageNotFound from './../pages/404/index';
import Layout from '../components/layout';
import User from '../pages/user';
import UserDetails from '../pages/user/details';
import LogIn from '../pages/auth/login';
import { useStoreState } from 'easy-peasy';
import SignUp from '../pages/auth/signup';
import Color from './../pages/color/index';
import Size from '../pages/size';
import Category from '../pages/category';
import Subcategory from '../pages/subcategory';
import Product from '../pages/product';
import ColorDetails from '../pages/color/details';
import SizeDetails from '../pages/size/details';
import CategoryDetails from '../pages/category/details';
import SubcategoryDetails from '../pages/subcategory/details';
import Profile from '../pages/auth/profile-info';
import AllProducts from '../pages/all-products';
import ProductDetails from '../pages/product-details';
import ScatProducts from '../pages/scat-products';
import SearchResult from '../pages/search-result';
import Review from './../pages/review/index';

function AppRouter() {
    const authUser = useStoreState(state => state.auth.isAuth)
    const isAuth = authUser

    return (
        <>
            {isAuth ? PrivateRouter() : PublicRouter()}
        </>
    )
}

export default AppRouter

function PublicRouter() {
    return (
        <Layout>
            <Router>
                <SignUp path='/sign-up' />
                <LogIn path='/login' default />
            </Router>
        </Layout>
    )
}
function PrivateRouter() {
    return (
        <Layout>
            <Router>
                <Review path='/review' />
                <SearchResult path='/search-result' />
                <ScatProducts path='/category/:catId/:catName/:scatId/:scatName' />
                <ScatProducts path='/category/:catId/:catName' />
                <ProductDetails path='/product-details/:id/:title' />
                <AllProducts path='/all-products' />
                <Profile path='/profile' />
                <Product path='/product' />
                <SubcategoryDetails path='/subcategory/:id/:name' />
                <Subcategory path='/subcategory' />
                <CategoryDetails path='/category/:id/:name' />
                <Category path='/category' />
                <SizeDetails path='/size/:id/:name' />
                <Size path='/size' />
                <ColorDetails path='/color/:id/:name' />
                <Color path='/color' />
                <UserDetails path='/user/:id/:name' />
                <User path='/user' />
                <Home path='/' />
                <PageNotFound default />
            </Router>
        </Layout>
    )
}
