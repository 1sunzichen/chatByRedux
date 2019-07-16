import React from 'react';
import PropsTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
@withRouter
@connect(
    state=>state.chat
)
class NavLink extends React.Component {
    static propsTypes = {
        data: PropsTypes.array.isRequired
    }
    render() {
        const { location,history,unread } = this.props;
        const navList = this.props.data.filter(v=>!v.hide)
        console.log(this.props);
        
        return (
            <TabBar>
                {navList.map(v => (
                    <TabBar.Item
                        key={v.path}
                        badge={v.path=='/msg'?this.props.unread:0}
                        title={v.text}
                        icon={{ uri: require(`./image/${v.icon}.png`) }}
                        selectedIcon={{uri:require(`./image/${v.icon}-active.png`)}}
                        selected={location.pathname===v.path}
                        onPress={()=>{
                            history.push(v.path)
                        }}
                    >

                    </TabBar.Item>
                )
                )}
            </TabBar>
        )
    }
}
export default NavLink;