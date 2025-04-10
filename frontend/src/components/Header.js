import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

// Función auxiliar para obtener el valor de la cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  console.log('value:', value); // Para depuración
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [user, setUser] = useState(null);

	useEffect(() => {
		// Intentar recuperar el token de la cookie 'token'
		const token = getCookie('token');
		if (token) {
			setUser(true); // Solo indica que la sesión está iniciada
		} else {
			setUser(null);
		}
	}, [location]);

	const handleLogout = () => {
		// Borrar la cookie 'token'
		document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		setUser(null);
		navigate('/'); // Redirigir a la landing page
	};

	return (
		<header className="header">
			<div className="header-container">
				<div className="logo">
					<Link to="/">
						<h1>Sistema de Gestión de Incidencias</h1>
					</Link>
				</div>
				<nav className="navigation">
					<ul>
						<li>
							<Link to="/dashboard">Dashboard</Link>
						</li>
						{ user ? (
							<>
								<li>
									<button className="btn-logout" onClick={handleLogout}>Cerrar Sesión</button>
								</li>
							</>
						) : (
							null
						)}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;