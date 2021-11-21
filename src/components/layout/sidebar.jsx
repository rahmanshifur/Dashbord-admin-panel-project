import mainLogo from '../../assets/icon/main-logo.jpg';
import noImg from '../../assets/img/no-img.png';
import { Link } from '@reach/router';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { useEffect } from 'react';


function Sidebar() {


    const getCategory = useStoreActions(action => action.category.getCategory)
    const getSubcategory = useStoreActions(action => action.subcategory.getSubcategory)
    const categoryData = useStoreState(state => state.category.data)
    const subcategoryData = useStoreState(state => state.subcategory.data)


    useEffect(() => {
        if (categoryData.length === 0) {
            getCategory()
        }
        if (subcategoryData.length === 0) {
            getSubcategory()
        }
    }, [categoryData, subcategoryData])

    return (
        <aside id='sidebar' className="clearfix">

            <div className="sidebar-nav">
                <ul>
                    <p>Admin view</p>
                    <li>
                        <a href="#">
                            <img src={noImg} alt="" />
                            <span> Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <Link to='/user'>
                            <img src={noImg} alt="" />
                            <span>User</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/color'>
                            <img src={noImg} alt="" />
                            <span>Color</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/size'>
                            <img src={noImg} alt="" />
                            <span>Size</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/category'>
                            <img src={noImg} alt="" />
                            <span>Category</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/subcategory'>
                            <img src={noImg} alt="" />
                            <span>Subcategory</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/product'>
                            <img src={noImg} alt="" />
                            <span>Product</span>
                        </Link>
                    </li>

                </ul>

            </div>
            <div className="sidebar-menu">
                <ul>
                    <p>User view</p>
                    <li>
                        <a href="#">
                            <img src={mainLogo} alt="" />
                            <Link className='ps-0' to="/all-products">All Products</Link>
                        </a>
                    </li>
                    <li>
                        <div className=''>
                            {categoryData.length !== 0 && categoryData.map(cat =>
                                <UncontrolledDropdown key={cat._id} className='cat'>
                                    <DropdownToggle nav >
                                        <img src={mainLogo} alt="" />
                                        <span>{cat.name}</span>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {subcategoryData.length !== 0 && subcategoryData.map(scat => scat.category._id === cat._id &&
                                            <DropdownItem key={scat._id} className='scat'>
                                                <Link to={`/category/${cat._id}/${cat.name}/${scat._id}/${scat.name}`} className='nav-link text-dark'>{scat.name}</Link>
                                            </DropdownItem>)}
                                    </DropdownMenu>
                                </UncontrolledDropdown>)}
                        </div>
                    </li>
                    <li>
                        <a href="#">
                            <img src={mainLogo} alt="" />
                            <span> Dashboard</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar