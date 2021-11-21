import Footer from './footer';
import Header from './header';
import Sidebar from './sidebar';
import { Container } from 'reactstrap'
import { useStoreState } from 'easy-peasy';

function Layout(props) {
    const authUser = useStoreState(state => state.auth.isAuth)
    const isAuth = authUser

    return (
        <>
            {isAuth && <Header />}
            <Container fluid className="p-0">
                {isAuth && <Sidebar />}
                <div id={isAuth ? 'middle-content' : ''}>
                    <main>
                        {props.children}
                    </main>
                    {isAuth && <Footer />}
                </div>
            </Container>
        </>
    )
}
export default Layout