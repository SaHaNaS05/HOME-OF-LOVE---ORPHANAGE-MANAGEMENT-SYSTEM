import React, { } from 'react';
import { Link, Outlet} from 'react-router-dom';


function Dashboard() {
	const sectionStyle = {
		minHeight: '100vh',
		position: 'relative',
		overflow: 'hidden',
		backgroundImage: `url(${process.env.PUBLIC_URL}/image4.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
	};
	
	return (
		<div className="container-fluid" style={sectionStyle} >
		
			<div className="row flex-nowrap">
				<div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
					<div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
						<Link to="/dashboard" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"></Link>
							<span className="fs-5 fw-bolder d-none d-sm-inline">Admin Dashboard</span>
						
						<ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
							<li>
								<Link to="dashboardadmin" className="nav-link text-white px-0 align-middle">
									<span className="fs-4">&#128200;</span> <span className="ms-1 d-none d-sm-inline">Dashboard</span>
								</Link>
							</li>
							<li>
								<Link to="childrenedit" className="nav-link px-0 align-middle text-white">
									<span className="fs-4">&#128100;</span> <span className="ms-1 d-none d-sm-inline">Children</span>
								</Link>
							</li>
							<li>
								<Link to="donationadmin" className="nav-link px-0 align-middle text-white">
									<span className="fs-4">&#128101;</span> <span className="ms-1 d-none d-sm-inline">Donation</span>
								</Link>
							</li>
							<li>
								<Link to="adoptionadmin" className="nav-link px-0 align-middle text-white">
									<span className="fs-4">&#128100;</span> <span className="ms-1 d-none d-sm-inline">Adoption</span>
								</Link>
							</li>
							<li >
								<Link to="/" className="nav-link px-0 align-middle text-white">
									<span className="fs-4">&#128682;</span> <span className="ms-1 d-none d-sm-inline">Logout</span>
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="col p-0 m-0">
					<div className="p-2 d-flex justify-content-center shadow" style={{ backgroundColor: "" }} >
					<h4  style={{ color: "white" }}>HOME OF LOVE</h4>

					</div>
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
