import usersImg from '../../assets/img/users.png';
import mainLogo from '../../assets/icon/main-logo.jpg';
import { Link } from '@reach/router';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, Input } from 'reactstrap'
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import ChangePassword from '../../pages/auth/change-password';
import { navigate } from '@reach/router';


function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [keyword, setKeyword] = useState('')

    const logoutHandler = useStoreActions(action => action.auth.logout)
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
                <div className="navbar-right ">
                    <a href="#" class="fa fa-cog"></a>
                    {user.length === 0 ?
                        <div>
                        </div> :
                        <div className="user-wrapper">
                            <Link to={`#`}>
                                <img src={usersImg} alt="" />
                            </Link>
                            <UncontrolledDropdown nav inNavbar >
                                <DropdownToggle nav caret >{user?.firstName} {user?.lastName}</DropdownToggle>
                                <DropdownMenu >
                                    <DropdownItem>
                                        <Link to='#blank' onClick={() => logoutHandler()} className='nav-link'>Log Out</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to='/profile' className='nav-link'>Profile</Link>
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
            </div>
        </header >
    )
}

export default Header
