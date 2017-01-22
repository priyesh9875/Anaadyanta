/**
 * Whole App Container
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import { DefaultRenderer } from 'react-native-router-flux';

// Consts and Libs
import { AppSizes } from '@theme/';

// Containers
import Menu from './Menu/MenuView';

/* Redux ==================================================================== */
// Actions
import * as SideMenuActions from '@redux/sidemenu/actions';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  sideMenuIsOpen: state.sidemenu.isOpen,
  currentUser: state.currentUser
});

// Any actions to map to the component?
const mapDispatchToProps = {
  toggleSideMenu: SideMenuActions.toggle,
  closeSideMenu: SideMenuActions.close,
};

/* Component ==================================================================== */
class Drawer extends Component {
  static componentName = 'Drawer';

  static propTypes = {
    navigationState: PropTypes.shape({}),
    onNavigate: PropTypes.func,
    sideMenuIsOpen: PropTypes.bool,
    closeSideMenu: PropTypes.func.isRequired,
    toggleSideMenu: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)
    // alert(this.props.currentUser)
  }

  /**
    * Toggle Side Menu
    */
  onSideMenuChange = (isOpen) => {
    if (isOpen !== this.props.sideMenuIsOpen) {
      this.props.toggleSideMenu();
    }
  }

  closeSideMenu() {
    this.props.closeSideMenu()
  }

  render() {
    const state = this.props.navigationState;
    const children = state.children;

    return (
      <SideMenu
        ref={(a) => { this.rootSidebarMenu = a; } }
        openMenuOffset={AppSizes.screen.width * 0.75}
        menu={
          <Menu
            closeSideMenu={this.closeSideMenu.bind(this)}
            ref={(b) => { this.rootSidebarMenuMenu = b; } }
            ns={() => { alert("ns") } }
            currentUser={this.props.currentUser}
            />
        }
        isOpen={this.props.sideMenuIsOpen}
        onChange={this.onSideMenuChange}
        >
        <View style={{ backgroundColor: '#000', flex: 1 }}>
          <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
        </View>
      </SideMenu>
    );
  }
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
