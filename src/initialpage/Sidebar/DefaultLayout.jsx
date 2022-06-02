/**
 * App Routes
 */
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Error404 from '../../MainPage/Pages/ErrorPage/error404'

// router service
import routerService from "../../router_service";//this is all the BASE routes that exist

import Header from './header.jsx';
import SidebarContent from './sidebar';

class DefaultLayout extends Component {

	render() {
		const { match, loading } = this.props;
		// if (loading) {
		// 	return (
		// 		<Space style={{
		// 			display: 'block',
		// 			textAlign: 'center',
		// 			verticalAlign: 'middle',
		// 			marginLeft: 'auto',
		// 			marginRight: 'auto',
		// 			marginTop: '50px'
		// 		}}>
		// 			<Spin size="large" />
		// 		</Space>
		// 	);
		// }


		const blocked_urls = [
			{
				module_id: 1,
				route: '/employee/overtime'
			}
		]
		
		const props_ = { blocked_urls: blocked_urls }

		return (
			<div className="main-wrapper">
				<Header />

				<div>
					{routerService && routerService.map((route, key) => {
						//	console.log("thats: ",route)
						//return <Route key={key} path={`${match.url}/${route.path}`} component={route.component} vaild='test' />
						return <Route key={key} path={`${match.url}/${route.path}`}
							render={(props) => <route.component {...props} props_={props_} />}
						/>
						
					})}
				</div>
				<SidebarContent />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	loading: state.data.loading
});

DefaultLayout.propTypes = {
	data: PropTypes.object,
};


export default connect(mapStateToProps)(withRouter(DefaultLayout));
