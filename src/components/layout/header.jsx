import usersImg from '../../assets/img/users.png';
import mainLogo from '../../assets/icon/main-logo.jpg';
import { Link } from '@reach/router';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, Input } from 'reactstrap'
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useState } from 'react';
import ChangePassword from '../../pages/auth/change-password';
import { navigate } from '@reach/router';


function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [keyword, setKeyword] = useState('')

    const logoutHandler = useStoreActions(action => action.auth.logout)
    const cartData = useStoreState(state => state.cart.data)
    const isAuth = useStoreState(state => state.auth.isAuth)
    const user = useStoreState(state => state.auth.user)

    function addHandler() {
        setIsOpen(!isOpen)
    }


    function submitHandler(e) {
        e.preventDefault();
        if (!keyword)
            return;

        navigate(`/search-result?title=${keyword}`)
    }

    console.log('keyword', keyword)

    return (
        <header id='navbar'>
            <div className="navbar-content">
                <div className="navbar-brand">
                    <Link to='/'>
                        <img src={mainLogo} alt="" />
                        <span>HYPER</span>
                    </Link>
                </div>
                <div className=" navbar-right d-flex justify-content-between align-items-center">
                    <div className="search-bar">
                        <Form onSubmit={submitHandler}>
                            <input
                                type="text"
                                placeholder="Search"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <a href="#" onClick={(e) => submitHandler(e)} class="fa fa-search"></a>
                        </Form>
                    </div>
                    <div className="">
                        {isAuth &&
                            <div className="user-wrapper ">
                                <Link to={`#`}>
                                    <img src={usersImg} alt="" />
                                </Link>
                                <UncontrolledDropdown nav inNavbar >
                                    <DropdownToggle nav caret >{user?.firstName} {user?.lastName}</DropdownToggle>
                                    <DropdownMenu className='end-0 mt-4'>
                                        <DropdownItem>
                                            <Link to='#blank' onClick={() => logoutHandler()} className='nav-link'>Log Out</Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to='/profile' className='nav-link'>Profile</Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to='/user-order   ' className='nav-link'>My Order</Link>
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            <p className='nav-link text-dark' onClick={() => addHandler()}>Change Password</p>
                                            {isOpen && <ChangePassword toggle={addHandler} />}
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown >
                            </div>}
                    </div>
                    <div className="shopping-cart ">
                        <Link to='/cart'>
                            <p class="fa fa-shopping-cart"></p>
                            {cartData.length > 0 &&
                                <span className="cat">{cartData.length}</span>}
                        </Link>
                    </div>
                </div>
            </div>
        </header >
    )
}

export default Header
